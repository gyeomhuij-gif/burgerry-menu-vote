const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const DATA_FILE = process.env.DATA_FILE || path.join(ROOT, "votes.json");
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const PORT = Number(process.env.PORT || 3000);
const HOST = process.argv.includes("--lan") ? "0.0.0.0" : (process.env.HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1"));
const MENU_IDS = new Set([
  "grilled-cheese",
  "double-grilled-cheese",
  "wasabi-shrimp",
  "wasabi-double-shrimp",
  "wasabi-shrimp-beef",
  "truffle-cheese",
  "double-truffle-cheese",
  "truffle-bacon-hash",
  "texas-bbq",
  "fresh",
  "burgerry",
  "hawaiian",
  "hot-chipotle",
  "classic-cheese",
  "double-classic-cheese",
  "beef-bulgogi",
  "egg-bulgogi",
  "egg-bacon",
  "shrimp",
  "beef-shrimp",
  "classic-chicken",
  "crispy-chicken",
]);
const SIDES = new Set([
  "프렌치프라이(L)",
  "해쉬브라운",
  "통모짜치즈스틱",
  "치즈스틱",
  "새우링",
  "양념너겟(멕시칸칠리)",
  "양념너겟(샤워크림어니언)",
  "코울슬로",
  "콘샐러드",
  "치킨너겟",
  "크리스피치킨텐더",
  "양념감자(멕시칸칠리)",
  "양념감자(샤워크림어니언)",
  "어니언링",
  "버팔로윙&스틱",
]);
const DRINKS = new Set([
  "아메리카노(ICE)",
  "아메리카노(HOT)",
  "펩시콜라 355ml",
  "펩시제로콜라 355ml",
  "칠성사이다 355ml",
  "탐스오렌지 355ml",
  "트레비레몬 355ml",
  "아이스티",
  "오렌지주스",
  "샤인머스캣에이드",
  "자몽에이드",
  "한라봉에이드",
]);
const STATIC_FILES = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/admin", ["admin.html", "text/html; charset=utf-8"]],
  ["/admin.html", ["admin.html", "text/html; charset=utf-8"]],
  ["/admin.js", ["admin.js", "text/javascript; charset=utf-8"]],
]);

function isAdmin(request) {
  return !ADMIN_KEY || request.headers["x-admin-key"] === ADMIN_KEY;
}

function getPollDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const date = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${date.year}-${date.month}-${date.day}`;
}

function emptyState() {
  return { date: getPollDate(), closed: false, votes: {} };
}

function readVotes() {
  if (!fs.existsSync(DATA_FILE)) return emptyState();
  const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  if (!parsed || typeof parsed.votes !== "object" || Array.isArray(parsed.votes)) {
    throw new Error("votes.json의 형식이 올바르지 않습니다.");
  }
  return parsed.date === getPollDate() ? parsed : emptyState();
}

function writeVotes(state) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), "utf8");
}

function respondJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let settled = false;
    request.setEncoding("utf8");
    request.on("data", chunk => {
      if (settled) return;
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > 16 * 1024) {
        settled = true;
        const error = new Error("요청 데이터가 너무 큽니다.");
        error.statusCode = 413;
        reject(error);
      }
    });
    request.on("end", () => {
      if (settled) return;
      try {
        settled = true;
        resolve(JSON.parse(body));
      } catch {
        const error = new Error("요청 데이터가 올바른 JSON이 아닙니다.");
        error.statusCode = 400;
        reject(error);
      }
    });
    request.on("error", error => {
      if (!settled) reject(error);
    });
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (url.pathname === "/api/close") {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      respondJson(response, 405, { error: "지원하지 않는 요청입니다." });
      return;
    }
    if (!isAdmin(request)) {
      respondJson(response, 403, { error: "관리자 비밀번호가 올바르지 않습니다." });
      return;
    }
    let body;
    try {
      body = await readJsonBody(request);
    } catch (error) {
      respondJson(response, error.statusCode || 400, { error: error.message });
      return;
    }
    const state = readVotes();
    state.closed = Boolean(body && body.closed);
    writeVotes(state);
    respondJson(response, 200, state);
    return;
  }
  if (url.pathname === "/api/votes") {
    if (request.method === "GET") {
      respondJson(response, 200, readVotes());
      return;
    }
    if (request.method === "POST") {
      let vote;
      try {
        vote = await readJsonBody(request);
      } catch (error) {
        respondJson(response, error.statusCode || 400, { error: error.message });
        return;
      }
      if (!vote || typeof vote !== "object" || Array.isArray(vote)) {
        respondJson(response, 400, { error: "요청 데이터의 형식이 올바르지 않습니다." });
        return;
      }
      const name = typeof vote.name === "string" ? vote.name.trim() : "";
      if (!name || name.length > 20) {
        respondJson(response, 400, { error: "이름이나 별명을 1~20자로 입력해 주세요." });
        return;
      }
      const validSet = vote.mealType === "set" && SIDES.has(vote.side) && DRINKS.has(vote.drink);
      const validSingle = vote.mealType === "single" && vote.side === null && vote.drink === null;
      if (!MENU_IDS.has(vote.menuId) || (!validSet && !validSingle)) {
        respondJson(response, 400, { error: "메뉴 또는 세트 옵션 선택이 올바르지 않습니다." });
        return;
      }
      const state = readVotes();
      if (state.closed) {
        respondJson(response, 409, { error: "투표가 마감되었어요." });
        return;
      }
      const voterId = name.normalize("NFKC").toLocaleLowerCase("ko-KR");
      state.votes[voterId] = {
        name,
        menuId: vote.menuId,
        mealType: vote.mealType,
        side: vote.side,
        drink: vote.drink,
        updatedAt: new Date().toISOString(),
      };
      writeVotes(state);
      respondJson(response, 200, state);
      return;
    }
    if (request.method === "DELETE") {
      if (!isAdmin(request)) {
        respondJson(response, 403, { error: "관리자 비밀번호가 올바르지 않습니다." });
        return;
      }
      const state = emptyState();
      writeVotes(state);
      respondJson(response, 200, state);
      return;
    }
    response.setHeader("Allow", "GET, POST, DELETE");
    respondJson(response, 405, { error: "지원하지 않는 요청입니다." });
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  const file = STATIC_FILES.get(url.pathname);
  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  const [fileName, contentType] = file;
  const content = fs.readFileSync(path.join(ROOT, fileName));
  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": content.length,
    "Cache-Control": "no-cache",
  });
  response.end(request.method === "HEAD" ? undefined : content);
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch(error => {
    console.error("요청을 처리하지 못했습니다.", error);
    if (!response.headersSent) respondJson(response, 500, { error: "서버에서 요청을 처리하지 못했습니다." });
    else response.destroy(error);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`버거리 메뉴 투표 앱이 실행 중입니다: http://${HOST}:${PORT}`);
  if (HOST === "0.0.0.0") console.log("같은 네트워크의 다른 기기에서는 이 컴퓨터의 IP 주소와 포트를 사용하세요.");
});

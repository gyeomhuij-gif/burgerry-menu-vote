const KEY_STORE = "burgerry-admin-key";
const $ = selector => document.querySelector(selector);
const won = value => `${value.toLocaleString("ko-KR")}원`;
const escapeHtml = text => String(text).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

let menuItems = [];
let adminKey = sessionStorage.getItem(KEY_STORE) || "";
let state = { votes: {}, closed: false };
let timer;

// 메뉴 가격은 app.js의 MENU_ITEMS를 그대로 재사용해 한 곳에서만 관리합니다.
async function loadMenu() {
  const source = await (await fetch("/app.js", { cache: "no-cache" })).text();
  const end = source.indexOf("const DEFAULT_STATE");
  menuItems = new Function(`${source.slice(0, end)}; return MENU_ITEMS;`)();
}

async function api(method, path, body) {
  const response = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "요청에 실패했습니다.");
  return payload;
}

function priceOf(vote) {
  const item = menuItems.find(menu => menu.id === vote.menuId);
  if (!item) return 0;
  return vote.mealType === "set" ? item.setPrice : item.singlePrice;
}

function nameOf(vote) {
  const item = menuItems.find(menu => menu.id === vote.menuId);
  return item ? item.name : vote.menuId;
}

function tally(list) {
  const map = new Map();
  list.forEach(key => map.set(key, (map.get(key) || 0) + 1));
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"));
}

function buildOrderText(votes) {
  const lines = [`[버거리 주문] ${state.date || ""} / ${votes.length}명`, ""];
  const groups = new Map();
  votes.forEach(vote => {
    const key = `${nameOf(vote)} ${vote.mealType === "set" ? "세트" : "단품"}`;
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  [...groups.entries()].forEach(([key, count]) => lines.push(`- ${key} x${count}`));
  const sides = tally(votes.filter(vote => vote.mealType === "set").map(vote => vote.side));
  const drinks = tally(votes.filter(vote => vote.mealType === "set").map(vote => vote.drink));
  if (sides.length) lines.push("", "[사이드]", ...sides.map(([name, count]) => `- ${name} x${count}`));
  if (drinks.length) lines.push("", "[음료]", ...drinks.map(([name, count]) => `- ${name} x${count}`));
  lines.push("", "[이름별]");
  votes.forEach(vote => {
    const detail = vote.mealType === "set" ? ` / ${vote.side} / ${vote.drink}` : "";
    lines.push(`${vote.name}: ${nameOf(vote)} ${vote.mealType === "set" ? "세트" : "단품"}${detail} (${won(priceOf(vote))})`);
  });
  lines.push("", `합계: ${won(votes.reduce((sum, vote) => sum + priceOf(vote), 0))}`);
  return lines.join("\n");
}

function render() {
  const votes = Object.values(state.votes).sort((a, b) => a.name.localeCompare(b.name, "ko"));
  const total = votes.reduce((sum, vote) => sum + priceOf(vote), 0);
  $("#date-label").textContent = `${state.date || ""} 기준`;
  $("#count-label").textContent = `${votes.length}명 참여 · 합계 ${won(total)}`;
  const badge = $("#status-badge");
  badge.textContent = state.closed ? "마감" : "진행 중";
  badge.className = `badge ${state.closed ? "closed" : "open"}`;
  $("#toggle-close").textContent = state.closed ? "투표 다시 열기" : "투표 마감";

  if (!votes.length) {
    $("#summary").innerHTML = $("#extras").innerHTML = $("#people").innerHTML = '<p class="empty">아직 투표가 없어요.</p>';
    $("#order-text").value = "";
    return;
  }

  const rows = new Map();
  votes.forEach(vote => {
    const key = `${vote.menuId}|${vote.mealType}`;
    const row = rows.get(key) || { name: nameOf(vote), type: vote.mealType === "set" ? "세트" : "단품", count: 0, price: priceOf(vote) };
    row.count += 1;
    rows.set(key, row);
  });
  const summaryRows = [...rows.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
  $("#summary").innerHTML = `<table><thead><tr><th>메뉴</th><th class="num">수량</th><th class="num">금액</th></tr></thead><tbody>${
    summaryRows.map(row => `<tr><td>${escapeHtml(row.name)} <small>${row.type}</small></td><td class="num">${row.count}</td><td class="num">${won(row.price * row.count)}</td></tr>`).join("")
  }</tbody><tfoot><tr><td>합계</td><td class="num">${votes.length}</td><td class="num">${won(total)}</td></tr></tfoot></table>`;

  const sets = votes.filter(vote => vote.mealType === "set");
  const extraTable = (title, entries) => `<table><thead><tr><th>${title}</th><th class="num">수량</th></tr></thead><tbody>${
    entries.map(([name, count]) => `<tr><td>${escapeHtml(name)}</td><td class="num">${count}</td></tr>`).join("")
  }</tbody></table>`;
  $("#extras").innerHTML = sets.length
    ? extraTable("사이드", tally(sets.map(vote => vote.side))) + "<br>" + extraTable("음료", tally(sets.map(vote => vote.drink)))
    : '<p class="empty">세트 주문이 없어요.</p>';

  $("#people").innerHTML = `<table><thead><tr><th>이름</th><th>주문</th><th class="num">금액</th></tr></thead><tbody>${
    votes.map(vote => `<tr><td>${escapeHtml(vote.name)}</td><td>${escapeHtml(nameOf(vote))} ${vote.mealType === "set" ? `세트<br><small>${escapeHtml(vote.side)} · ${escapeHtml(vote.drink)}</small>` : "단품"}</td><td class="num">${won(priceOf(vote))}</td></tr>`).join("")
  }</tbody></table>`;

  $("#order-text").value = buildOrderText(votes);
}

async function refresh() {
  state = await (await fetch("/api/votes", { cache: "no-store" })).json();
  render();
}

async function enter(key) {
  adminKey = key;
  await api("POST", "/api/close", { closed: Boolean((await (await fetch("/api/votes", { cache: "no-store" })).json()).closed) });
  sessionStorage.setItem(KEY_STORE, key);
  $("#login-card").hidden = true;
  $("#panel").hidden = false;
  await refresh();
  clearInterval(timer);
  timer = setInterval(() => refresh().catch(() => {}), 5000);
}

$("#login-form").addEventListener("submit", async event => {
  event.preventDefault();
  $("#login-msg").textContent = "확인 중...";
  try {
    await enter($("#admin-key").value);
    $("#login-msg").textContent = "";
  } catch (error) {
    $("#login-msg").textContent = error.message;
  }
});

$("#toggle-close").addEventListener("click", async () => {
  const closing = !state.closed;
  if (closing && !window.confirm("투표를 마감할까요? 마감하면 더 이상 투표할 수 없어요.")) return;
  try {
    state = await api("POST", "/api/close", { closed: closing });
    render();
  } catch (error) {
    window.alert(error.message);
  }
});

$("#reset").addEventListener("click", async () => {
  if (!window.confirm("모든 투표를 삭제하고 새로 시작할까요?")) return;
  try {
    state = await api("DELETE", "/api/votes");
    render();
  } catch (error) {
    window.alert(error.message);
  }
});

$("#copy").addEventListener("click", async () => {
  const text = $("#order-text").value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    $("#copy-msg").textContent = "복사했어요. 카카오톡이나 메모에 붙여넣으세요.";
  } catch {
    $("#order-text").select();
    $("#copy-msg").textContent = "자동 복사에 실패했어요. 선택된 내용을 직접 복사해 주세요.";
  }
});

loadMenu().then(() => {
  if (adminKey) enter(adminKey).catch(() => sessionStorage.removeItem(KEY_STORE));
});

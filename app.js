const MENU_ITEMS = [
  { id: "grilled-cheese", name: "그릴드치즈버거", description: "아메리칸치즈 두 장을 번에 눌러 구워낸 그릴드 치즈번과 북미 정통 소스의 조합!", category: "classic", singlePrice: 9500, setPrice: 13200, badge: "NEW", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20260811_237/17864222449142rcRu_JPEG/image.jpg?type=f220_220_60_sharpen" },
  { id: "double-grilled-cheese", name: "더블그릴드치즈버거", description: "아메리칸치즈 두 장을 번에 눌러 구워낸 그릴드 치즈번과 북미 정통 소스의 조합!", category: "classic", singlePrice: 12400, setPrice: 16100, badge: "NEW", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20260811_277/1786422322531Sf4OX_JPEG/image.jpg?type=f220_220_60_sharpen" },
  { id: "wasabi-shrimp", name: "생와사비 새우버거", description: "통새우패티에 은은하고 알싸하고 고소한 생와사비마요를 더한 버거", category: "shrimp", singlePrice: 6000, setPrice: 9700, badge: "새우", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20260519_230/1779168561310wV247_PNG/image.png?type=f220_220_60_sharpen" },
  { id: "wasabi-double-shrimp", name: "생와사비 더블알새우버거", description: "바삭 통새우패티에 통통 알새우토핑을 더해 두 가지 새우를 한 번에", category: "shrimp", singlePrice: 9000, setPrice: 12700, badge: "새우", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20260519_99/1779168644333ycmyF_PNG/image.png?type=f220_220_60_sharpen" },
  { id: "wasabi-shrimp-beef", name: "생와사비 알새우소고기버거", description: "알새우토핑과 육즙 가득 100% 소고기패티를 함께, 풍미 가득 버거", category: "shrimp", singlePrice: 9500, setPrice: 13200, badge: "새우", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20260519_299/177916875577733bei_PNG/image.png?type=f220_220_60_sharpen" },
  { id: "truffle-cheese", name: "트러플치즈버거", description: "트러플크림소스의 깊고 진한 풍미를 느낄 수 있는 트러플치즈버거", category: "classic", singlePrice: 6600, setPrice: 10300, badge: "풍미 추천", accent: "green", image: "https://naverbooking-phinf.pstatic.net/20251022_58/1761112798878HHstS_PNG/%C6%AE%B7%AF%C7%C3%C4%A1%C1%EE%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "double-truffle-cheese", name: "더블트러플치즈버거", description: "한 입 가득~ 더블패티의 육즙과 트러플크림소스의 깊고 진한 풍미", category: "classic", singlePrice: 9500, setPrice: 13200, badge: "더블패티", accent: "green", image: "https://naverbooking-phinf.pstatic.net/20251022_170/17611129003855gVx0_PNG/%B4%F5%BA%ED%C6%AE%B7%AF%C7%C3%C4%A1%C1%EE%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "truffle-bacon-hash", name: "트러플베이컨해쉬버거", description: "짭짤한 베이컨, 바삭~ 담백한 해쉬브라운이 들어가 더 풍부하게", category: "classic", singlePrice: 8700, setPrice: 12400, badge: "든든", accent: "pink", image: "https://naverbooking-phinf.pstatic.net/20251022_232/1761112968014yVBzT_PNG/%C6%AE%B7%AF%C7%C3%BA%A3%C0%CC%C4%C1%C7%D8%BD%AC%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "texas-bbq", name: "텍사스바베큐버거", description: "스모키한 바베큐 소스로 정통 텍사스의 풍미를 담은 버거리의 대표 가성비 버거", category: "classic", singlePrice: 4900, setPrice: 8600, badge: "가성비", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20260729_140/1785289695606ttqID_JPEG/image.jpg?type=f220_220_60_sharpen" },
  { id: "fresh", name: "프레쉬버거", description: "Simple is the best의 철학이 담긴 버거리의 대표 버거", category: "classic", singlePrice: 5300, setPrice: 9000, badge: "인기", accent: "green", image: "https://naverbooking-phinf.pstatic.net/20250722_243/17531736490988lXVB_PNG/%C7%C1%B7%B9%BD%AC%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "burgerry", name: "버거리버거", description: "신선한 야채, 담백한 치즈, 짭짤바삭한 베이컨! 버거리 시그니처버거", category: "classic", singlePrice: 7300, setPrice: 11000, badge: "BEST", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20250722_140/1753173661341AOLCV_PNG/%B9%F6%B0%C5%B8%AE%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "hawaiian", name: "하와이안버거", description: "구운 파인애플과 베이컨 바베큐 소스의 상큼한 조화가 매력적인 하와이안 버거", category: "classic", singlePrice: 7700, setPrice: 11400, badge: "달콤 짭짤", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20250722_295/1753173670640V9ycR_PNG/%C7%CF%BF%CD%C0%CC%BE%C8%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "hot-chipotle", name: "핫치폴레버거", description: "매운맛 3단계. 멕시코산 칠리 고추를 구워 건조시켜 만든 얼얼한 매운맛", category: "classic", singlePrice: 7500, setPrice: 11200, badge: "매콤", accent: "pink", image: "https://naverbooking-phinf.pstatic.net/20250722_46/1753173677837T9vSB_PNG/%C7%D6%C4%A1%C6%FA%B7%B9%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "classic-cheese", name: "클래식치즈버거", description: "불향 강한 패티와 아메리칸 치즈에 집중한 버거리의 진짜 치즈 버거", category: "classic", singlePrice: 6500, setPrice: 10200, badge: "클래식", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20250722_274/1753173691128AqYRD_PNG/%C5%AC%B7%A1%BD%C4%C4%A1%C1%EE%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "double-classic-cheese", name: "더블클래식치즈버거", description: "더블패티와 치즈의 육즙이 가득한 버거", category: "classic", singlePrice: 9400, setPrice: 13100, badge: "더블패티", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20250722_274/17531737008352ifhm_PNG/%B4%F5%BA%ED%C5%AC%B7%A1%BD%C4%C4%A1%C1%EE%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "beef-bulgogi", name: "소불고기버거", description: "불고기소스와 100% 소고기패티의 조합", category: "classic", singlePrice: 5400, setPrice: 9100, badge: "인기", accent: "green", image: "https://naverbooking-phinf.pstatic.net/20250722_1/1753173710998CxGje_PNG/%BC%D2%BA%D2%B0%ED%B1%E2%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "egg-bulgogi", name: "에그불고기버거", description: "불고기 소스와 100% 소고기 패티, 담백한 에그 패티를 더한 시즌 한정 메뉴", category: "classic", singlePrice: 6600, setPrice: 10300, badge: "시즌 한정", accent: "yellow", image: "https://naverbooking-phinf.pstatic.net/20250722_46/1753173734149Wz4Y2_PNG/%BF%A1%B1%D7%BA%D2%B0%ED%B1%E2%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "egg-bacon", name: "에그베이컨버거", description: "100% 소고기 패티와 담백한 에그 패티, 짭조름한 베이컨을 더한 시즌 한정 메뉴", category: "classic", singlePrice: 8200, setPrice: 11900, badge: "시즌 한정", accent: "pink", image: "https://naverbooking-phinf.pstatic.net/20250722_71/1753173742277Sfyrf_PNG/%BF%A1%B1%D7%BA%A3%C0%CC%C4%C1%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "shrimp", name: "쉬림프버거", description: "통새우의 탱글탱글한 식감을 살려 빵가루에 바삭하게 튀겨낸 쉬림프 버거", category: "shrimp", singlePrice: 5800, setPrice: 9500, badge: "새우", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20250722_213/1753173753459N9WsC_PNG/%BD%AC%B8%B2%C7%C1%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "beef-shrimp", name: "비프앤쉬림프버거", description: "통새우패티와 비프패티를 함께 즐기는 버거리만의 버거", category: "shrimp", singlePrice: 9100, setPrice: 12800, badge: "새우", accent: "orange", image: "https://naverbooking-phinf.pstatic.net/20250722_4/1753173760717Ny87N_PNG/%BA%F1%C7%C1%BE%D8%BD%AC%B8%B2%C7%C1%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "classic-chicken", name: "클래식치킨버거", description: "통닭다리살 치킨패티에 화이트소스와 체다치즈소스, 피클을 더한 베이직 치킨 버거", category: "chicken", singlePrice: 6800, setPrice: 10500, badge: "치킨", accent: "pink", image: "https://naverbooking-phinf.pstatic.net/20250722_198/1753173771822GEx7m_PNG/%C5%AC%B7%A1%BD%C4%C4%A1%C5%B2%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
  { id: "crispy-chicken", name: "크리스피치킨버거", description: "통닭다리살 치킨패티에 토마토와 로메인을 곁들인 프레쉬 치킨버거", category: "chicken", singlePrice: 7400, setPrice: 11100, badge: "치킨", accent: "pink", image: "https://naverbooking-phinf.pstatic.net/20250722_15/1753173782425xHk6q_PNG/%C5%A9%B8%AE%BD%BA%C7%C7%C4%A1%C5%B2%B9%F6%B0%C5%BC%BC%C6%AE.png?type=f220_220_60_sharpen" },
];

const DEFAULT_STATE = { votes: {} };
const menuGrid = document.querySelector("#menu-grid");
const resultsList = document.querySelector("#results-list");
const voteForm = document.querySelector("#vote-form");
const voterNameInput = document.querySelector("#voter-name");
const formMessage = document.querySelector("#form-message");
const toast = document.querySelector("#toast");
const submitVoteButton = document.querySelector(".submit-vote");
const syncStatus = document.querySelector("#sync-status span");

let state = structuredClone(DEFAULT_STATE);
let selectedMenuId = "";
let activeFilter = "all";
let toastTimer;

async function requestVotes(method = "GET", body, adminKey) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (adminKey) headers["X-Admin-Key"] = adminKey;
  const response = await fetch("/api/votes", {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "투표 요청에 실패했습니다.");
  return payload;
}

function renderMenu() {
  const items = MENU_ITEMS.filter(item => activeFilter === "all" || item.category === activeFilter);
  menuGrid.innerHTML = items.map(item => {
    const count = getVoteCount(item.id);
    const selected = item.id === selectedMenuId;
    return `
      <article class="menu-card${selected ? " is-selected" : ""}" data-menu-id="${item.id}" data-accent="${item.accent}" tabindex="0" role="button" aria-pressed="${selected}" aria-label="${item.name}, 단품 ${item.singlePrice}원, 세트 ${item.setPrice}원, ${count}표">
        <div class="menu-card-top">
          <span class="menu-photo-wrap"><span class="menu-emoji-fallback" aria-hidden="true">🍔</span><img class="menu-photo" src="${item.image}" alt="${item.name} 메뉴 사진" loading="lazy"></span>
          <span class="menu-badge${item.badge === "BEST" || item.badge === "인기" ? " popular" : ""}">${item.badge}</span>
        </div>
        <h3>${item.name}</h3>
        <p class="menu-description">${item.description}</p>
        <div class="menu-prices"><span>단품 <strong>${item.singlePrice.toLocaleString("ko-KR")}원</strong></span><i></i><span>세트 <strong>${item.setPrice.toLocaleString("ko-KR")}원</strong></span></div>
        <div class="menu-card-footer">
          <span class="vote-count">♥ <strong>${count}</strong> 표</span>
          <span class="choose-label">${selected ? "선택됨 ✓" : "선택하기 +"}</span>
        </div>
      </article>
    `;
  }).join("");
}

function getVoteCount(menuId) {
  return Object.values(state.votes).filter(vote => vote.menuId === menuId).length;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function describeVote(vote) {
  const item = MENU_ITEMS.find(menuItem => menuItem.id === vote.menuId);
  const menuName = item ? item.name : vote.menuId;
  return vote.mealType === "set"
    ? `${menuName} 세트 (사이드: ${vote.side} / 음료: ${vote.drink})`
    : `${menuName} 단품`;
}

function renderOrders() {
  const orderList = document.querySelector("#order-list");
  const votes = Object.values(state.votes);
  if (!votes.length) {
    orderList.innerHTML = '<li class="order-empty">아직 투표한 사람이 없어요</li>';
    return;
  }
  orderList.innerHTML = votes.map(vote => {
    const item = MENU_ITEMS.find(menuItem => menuItem.id === vote.menuId);
    const isSet = vote.mealType === "set";
    const price = item ? (isSet ? item.setPrice : item.singlePrice) : 0;
    return `
      <li class="order-row">
        <div class="order-who"><strong>${escapeHtml(vote.name)}</strong><span>${price.toLocaleString("ko-KR")}원</span></div>
        <div class="order-what">
          <span class="order-menu">${escapeHtml(item ? item.name : vote.menuId)} <em>${isSet ? "세트" : "단품"}</em></span>
          ${isSet ? `<span class="order-opt">사이드 · ${escapeHtml(vote.side)}</span><span class="order-opt">음료 · ${escapeHtml(vote.drink)}</span>` : ""}
        </div>
      </li>`;
  }).join("");
}

document.querySelector("#copy-order").addEventListener("click", async () => {
  const votes = Object.values(state.votes);
  if (!votes.length) return showToast("복사할 주문이 없어요");
  const text = votes.map(vote => `${vote.name}: ${describeVote(vote)}`).join("\n");
  try {
    await navigator.clipboard.writeText(text);
    showToast("주문서를 복사했어요");
  } catch {
    showToast("복사에 실패했어요");
  }
});

function renderResults() {
  const totalVoters = Object.keys(state.votes).length;
  const ranked = MENU_ITEMS.map(item => ({ ...item, count: getVoteCount(item.id) }))
    .sort((a, b) => b.count - a.count ||
      MENU_ITEMS.findIndex(item => item.id === a.id) - MENU_ITEMS.findIndex(item => item.id === b.id));
  const highest = ranked.length ? ranked[0].count : 0;

  document.querySelector("#participant-count").textContent = totalVoters;
  document.querySelector("#leading-votes").textContent = highest;

  resultsList.innerHTML = ranked.slice(0, 5).map((item, index) => {
    const percent = totalVoters ? Math.round(item.count / totalVoters * 100) : 0;
    return `
      <li class="result-row">
        <span class="result-rank">${String(index + 1).padStart(2, "0")}</span>
        <div class="result-detail">
          <div class="result-name-line"><span class="result-name">${item.name}</span><span class="result-percent">${percent}%</span></div>
          <div class="result-bar"><span style="width:${percent}%"></span></div>
        </div>
        <span class="result-votes">${item.count}</span>
      </li>
    `;
  }).join("");

  renderOrders();

  document.querySelector("#voter-list-label").textContent = totalVoters
    ? `총 ${totalVoters}명이 참여했어요`
    : "아직 참여자가 없어요";
}

function renderSelection() {
  const item = MENU_ITEMS.find(menuItem => menuItem.id === selectedMenuId);
  const isSet = document.querySelector('input[name="meal-type"]:checked').value === "set";
  const selection = document.querySelector("#selection-summary");
  selection.classList.toggle("has-selection", Boolean(item));
  const price = item ? (isSet ? item.setPrice : item.singlePrice) : 0;
  document.querySelector("#selected-name").textContent = item
    ? `${item.name} · ${isSet ? "세트" : "단품"} ${price.toLocaleString("ko-KR")}원`
    : "메뉴를 먼저 골라주세요";
}

function render() {
  renderMenu();
  renderResults();
  renderSelection();
  submitVoteButton.disabled = Boolean(state.closed);
  if (state.closed) formMessage.textContent = "투표가 마감되었어요. 주문 진행 중입니다.";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function selectMenu(menuId) {
  if (!MENU_ITEMS.some(item => item.id === menuId)) return;
  selectedMenuId = menuId;
  formMessage.textContent = "";
  renderMenu();
  renderSelection();
  if (window.matchMedia("(max-width: 700px)").matches) {
    document.querySelector("#vote-heading").scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

menuGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-menu-id]");
  if (card) selectMenu(card.dataset.menuId);
});

menuGrid.addEventListener("keydown", event => {
  const card = event.target.closest("[data-menu-id]");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    selectMenu(card.dataset.menuId);
  }
});

menuGrid.addEventListener("error", event => {
  if (event.target instanceof HTMLImageElement && event.target.classList.contains("menu-photo")) {
    event.target.hidden = true;
    event.target.closest(".menu-photo-wrap")?.classList.add("image-missing");
  }
}, true);

document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    activeFilter = tab.dataset.filter;
    document.querySelectorAll(".filter-tab").forEach(button => {
      const isActive = button === tab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    renderMenu();
  });
});

document.querySelectorAll('input[name="meal-type"]').forEach(option => {
  option.addEventListener("change", () => {
    const isSet = option.value === "set";
    document.querySelector("#side-fieldset").disabled = !isSet;
    document.querySelector("#drink-fieldset").disabled = !isSet;
    renderSelection();
  });
});

voteForm.addEventListener("submit", async event => {
  event.preventDefault();
  formMessage.textContent = "";
  const name = voterNameInput.value.trim();
  if (!selectedMenuId) {
    formMessage.textContent = "먼저 먹고 싶은 메뉴를 선택해 주세요.";
    return;
  }
  if (!name) {
    formMessage.textContent = "이름이나 별명을 입력해 주세요.";
    voterNameInput.focus();
    return;
  }

  const normalizedName = name.normalize("NFKC").toLocaleLowerCase("ko-KR");
  const previousVote = Object.values(state.votes).find(vote =>
    vote.name.normalize("NFKC").toLocaleLowerCase("ko-KR") === normalizedName);
  const isSet = document.querySelector('input[name="meal-type"]:checked').value === "set";
  const vote = {
    name,
    menuId: selectedMenuId,
    mealType: isSet ? "set" : "single",
    side: isSet ? document.querySelector('input[name="side"]:checked').value : null,
    drink: isSet ? document.querySelector('input[name="drink"]:checked').value : null,
  };
  submitVoteButton.disabled = true;
  try {
    const payload = await requestVotes("POST", vote);
    state = payload;
    const item = MENU_ITEMS.find(menuItem => menuItem.id === selectedMenuId);
    const changed = previousVote && previousVote.menuId !== selectedMenuId;
    const options = isSet ? ` · ${vote.side} · ${vote.drink}` : " · 단품";
    formMessage.textContent = `${item.name}${options}로 ${changed ? "투표를 변경했어요." : "투표했어요!"}`;
    showToast(previousVote ? "투표 내용을 업데이트했어요!" : "소중한 한 표가 등록됐어요!");
    render();
  } catch (error) {
    console.error("투표를 등록하지 못했습니다.", error);
    formMessage.textContent = error.message || "투표를 등록하지 못했어요. 잠시 후 다시 시도해 주세요.";
  } finally {
    submitVoteButton.disabled = Boolean(state.closed);
  }
});

document.querySelector("#reset-votes").addEventListener("click", async () => {
  if (!Object.keys(state.votes).length) {
    showToast("초기화할 투표가 아직 없어요.");
    return;
  }
  if (!window.confirm("모든 투표 결과를 초기화할까요?")) return;
  const adminKey = window.prompt("관리자 비밀번호를 입력하세요.");
  if (adminKey === null) return;
  const resetButton = document.querySelector("#reset-votes");
  resetButton.disabled = true;
  try {
    state = await requestVotes("DELETE", undefined, adminKey);
    formMessage.textContent = "";
    render();
    showToast("투표 결과를 초기화했어요.");
  } catch (error) {
    console.error("투표 결과를 초기화하지 못했습니다.", error);
    showToast(error.message || "투표 결과를 초기화하지 못했어요.");
  } finally {
    resetButton.disabled = false;
  }
});

document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
}).format(new Date());

async function initialize() {
  submitVoteButton.disabled = true;
  formMessage.textContent = "투표 현황을 불러오는 중...";
  try {
    state = await requestVotes();
    syncStatus.textContent = "LIVE";
    formMessage.textContent = "";
  } catch (error) {
    console.error("투표 현황을 불러오지 못했습니다.", error);
    syncStatus.textContent = "연결 오류";
    formMessage.textContent = "서버에 연결할 수 없어요. 앱 서버를 실행한 뒤 새로고침해 주세요.";
  } finally {
    render();
  }
}

window.setInterval(async () => {
  try {
    state = await requestVotes();
    syncStatus.textContent = "LIVE";
    render();
  } catch (error) {
    console.error("최신 투표 현황을 불러오지 못했습니다.", error);
    syncStatus.textContent = "연결 오류";
  }
}, 15000);

render();
initialize();

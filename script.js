let selectionSlots = [
  {
    game: null,
    gameShortName: null,
    platform: null,
    version: null,
    day: null,
    versionPage: 0,
  },
  {
    game: null,
    gameShortName: null,
    platform: null,
    version: null,
    day: null,
    versionPage: 0,
  },
];

const STUDIO_GAMES = {
  // "Detective IQ 1": {
  //   shortName: "DIQ 1",
  //   package: "com.myl.detective.iq1",
  //   tags: [
  //     "Puzzle",
  //     "Brain teaser",
  //     "Casual",
  //     "Single player",
  //     "Stylised",
  //     "Offline",
  //   ],
  //   icon: "https://play-lh.googleusercontent.com/NwByB-HJl5P0AJTb1Pe9xsx2UVpbsG-9ro1hiIYKW4EqsPoWwGszLCsS9Ry5WdG5dN1G=w240-h480-rw",
  //   platforms: ["android"],
  // },
  // "Detective IQ 1 ios": {
  //   shortName: "DIQ 1",
  //   package: "com.myl.detective.iq1.ios",
  //   tags: ["Puzzle"],
  //   icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/39/2e/7a/392e7af1-337a-0ec7-8e21-94c77c8d50a2/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/200x200ia-75.webp",
  //   platforms: ["ios"],
  // },
  // "Detective IQ 2": {
  //   shortName: "DIQ 2",
  //   package: "com.myl.detective.iq2",
  //   tags: [
  //     "Puzzle",
  //     "Brain teaser",
  //     "Casual",
  //     "Single player",
  //     "Stylised",
  //     "Funny",
  //     "Offline",
  //   ],
  //   icon: "https://play-lh.googleusercontent.com/8CXT3yJWEE1kfIxDEN5xGSaB3gUiCxs3eeUg-4JwXNQE0G8oklwmxJxTrNWsg3ektidX=w240-h480-rw",
  //   platforms: ["android"],
  // },
  // "Detective IQ 2 ios": {
  //   shortName: "DIQ 2",
  //   package: "com.myl.detective.iq2.ios",
  //   tags: ["Puzzle"],
  //   icon: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/8f/9b/3c/8f9b3ccc-d6df-8b7b-f05b-57af4e461954/Placeholder.mill/200x200bb-75.webp",
  //   platforms: ["ios"],
  // },
  // "Detective IQ 3": {
  //   shortName: "DIQ 3",
  //   package: "com.myl.detective.iq3",
  //   tags: ["Puzzle"],
  //   icon: "https://play-lh.googleusercontent.com/FHK6WetkmM6p18210H2nMS1G4CGwyG9KpnJSLPXhaztPt1hTH7pAtzJdwhEWFRiqUf8=w240-h480-rw",
  //   platforms: ["android"],
  // },
  // "Ghost IQ": {
  //   shortName: "GIQ",
  //   package: "com.myl.ghost.iq",
  //   tags: ["Puzzle"],
  //   icon: "https://play-lh.googleusercontent.com/R9ccBYwNhhayk9Rb81wM6K64I1snF8UqSDQBf8m0Kjiq2a0KQ13frTd8vt2ZXzPrSFSEIhuxrna12_XTXoxG=w240-h480-rw",
  //   platforms: ["android"],
  // },
};

// Hardcoded Test Data for DIQ 3
const MOCK_DATABASE = {
  // "Detective IQ 3_56_D0": [
  //   15000, 58.0, 30.5, 20.0, 13.0, 7.0, 4.0, 21.0, 8.0, 2.0, 0.5, 0.1, 8.5,
  //   12500, 65.0, 35.0, 23.0, 15.0, 8.0, 4.5, 83.33, 240.0, 920.0, 25.4, 14.2,
  //   5.1, 42.0, 125,
  // ],
  // "Detective IQ 3_57_D0": [
  //   18000, 62.15, 35.4, 22.8, 15.2, 9.1, 5.3, 24.5, 10.2, 4.1, 1.2, 0.25, 9.45,
  //   15500, 68.3, 38.2, 25.1, 18.4, 10.2, 6.15, 86.11, 260.5, 1050.2, 28.15,
  //   16.4, 4.25, 38.1, 140,
  // ],
  // "Detective IQ 2_108_D0": [
  //   22000, 55.2, 28.4, 18.15, 11.0, 5.2, 2.45, 18.6, 6.1, 1.55, 0.35, 0.05,
  //   7.82, 18500, 60.15, 31.4, 20.25, 12.1, 6.4, 3.15, 84.09, 210.3, 810.5, 22.1,
  //   12.35, 7.15, 48.2, 110,
  // ],
  // "Detective IQ 2_120_D0": [
  //   25000, 65.45, 40.1, 28.3, 20.15, 12.4, 8.2, 30.15, 15.4, 8.25, 3.1, 1.15,
  //   11.55, 22000, 75.2, 45.15, 32.4, 22.15, 14.3, 9.1, 88.0, 305.8, 1220.4,
  //   32.5, 18.1, 3.25, 30.15, 165,
  // ],
};

let metadata = {
  games: Object.keys(STUDIO_GAMES),
  versions: Object.keys(STUDIO_GAMES).reduce(
    (acc, game) => ({
      ...acc,
      [game]:
        game === "Detective IQ 3"
          ? ["56", "57"]
          : game === "Detective IQ 2"
            ? ["108", "120"]
            : game === "Detective IQ 1"
              ? ["108", "120"]
              : [],
    }),
    {},
  ),
};

// State management
let dashboardMode = "single";
let retentionChartMode = "install";
let performanceMode = "impact"; // 'impact' or 'efficiency'
let lastData = null;
let lastCompLayers = null;
let activeInjection = {
  game: null,
  gameShortName: null,
  platform: null,
  version: null,
  day: null,
};

let baseSelection = {
  game: null,
  gameShortName: null,
  platform: null,
  version: null,
  day: null,
};
let compSelection = {
  game: null,
  gameShortName: null,
  platform: null,
  version: null,
  day: null,
};
let currentTargetContext = "inject";
let BENCHMARK_MAP = {};

function setDashboardMode(mode, isInstant = false) {
  localStorage.setItem("dashboardMode", mode);
  const isCompare = mode === "compare";
  dashboardMode = mode;

  const els = {
    singleBtn: document.getElementById("mode-single"),
    compareBtn: document.getElementById("mode-compare"),
    singleNav: document.getElementById("single-nav-controls"),
    compareNav: document.getElementById("compare-nav-controls"),
    singleActions: document.getElementById("single-mode-actions"),
    titlePro: document.getElementById("title-pro"),
    gameHeader: document.getElementById("game-header"),
  };

  if (isInstant) {
    els.titlePro.style.transition = "none";
    els.titlePro.classList.toggle("active-pro", isCompare);

    if (isCompare) {
      els.singleNav.classList.add("hidden");
      els.singleNav.classList.remove("flex");
      els.compareNav.classList.remove("hidden");
      els.compareNav.classList.add("flex");
      els.singleActions.classList.add("hidden");
      if (els.gameHeader) els.gameHeader.classList.add("hidden");
    } else {
      els.singleNav.classList.remove("hidden");
      els.singleNav.classList.add("flex");
      els.compareNav.classList.add("hidden");
      els.compareNav.classList.remove("flex");
      els.singleActions.classList.remove("hidden");
      els.singleActions.classList.add("flex");
    }

    els.singleBtn.className = `px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${!isCompare ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`;
    els.compareBtn.className = `px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${isCompare ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`;

    if (isCompare) renderCompSlots();
    refreshDashboard2();
    return;
  }

  // 1. Toggle Static UI Elements
  els.titlePro.style.transition = ""; // Restore transition
  els.titlePro.classList.toggle("active-pro", isCompare);
  if (isCompare) els.gameHeader?.classList.add("hidden");
  else if (baseSelection.game) els.gameHeader?.classList.remove("hidden");

  // Update Toggle Button Styles
  els.singleBtn.className = `px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${!isCompare ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`;
  els.compareBtn.className = `px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${isCompare ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}`;

  // 2. Handle Nav Transition Logic
  const showEl = isCompare ? els.compareNav : els.singleNav;
  const hideEl = isCompare ? els.singleNav : els.compareNav;

  hideEl.classList.remove("nav-control-fade");
  hideEl.classList.add("nav-control-exit");

  if (isCompare) els.singleActions?.classList.add("nav-control-exit");

  setTimeout(() => {
    hideEl.classList.add("hidden");
    hideEl.classList.remove("nav-control-exit", "flex");

    if (isCompare) {
      els.singleActions?.classList.add("hidden");
      els.singleActions?.classList.remove(
        "nav-control-exit",
        "nav-control-fade",
        "flex",
      );
    } else {
      els.singleActions?.classList.remove("hidden", "nav-control-exit");
      els.singleActions?.classList.add("flex", "nav-control-fade");
    }

    showEl.classList.remove("hidden", "nav-control-exit");
    showEl.classList.add("flex", "nav-control-fade");

    if (isCompare) renderCompSlots();
    refreshDashboard2();
  }, 250);
}

function renderCompSlots() {
  const container = document.getElementById("comp-slots-container");
  if (!container) return;

  container.innerHTML = selectionSlots
    .map((slot, i) => {
      const gameData = slot.game ? STUDIO_GAMES[slot.game] : null;
      const cleanGame = slot.game
        ? slot.game.replace(/\s*ios\s*$/i, "")
        : "Select Game";
      const isAndroid =
        gameData?.platforms?.includes("android") ||
        gameData?.platform === "android";
      const pIcon = slot.game
        ? isAndroid
          ? '<i class="fab fa-android text-emerald-500 text-[11px]"></i>'
          : '<i class="fab fa-apple text-slate-400 text-[11px]"></i>'
        : "";
      const slotLabel = String.fromCharCode(65 + i);

      return `
      <div class="slot-row-wrapper bg-slate-50/30 rounded-[2rem] p-4 border border-transparent hover:border-slate-100 transition-all">
        <div class="flex items-center gap-6">
          <div class="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 shrink-0 bg-white">${slotLabel}</div>
          <div class="flex-1 flex items-center gap-3">
            <div class="flex-[1.25]">
              <button onclick="toggleSlotDropdown('GAME', ${i}, 'sd-g-${i}', this)" class="w-full flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:border-blue-400 transition-all shadow-sm">
                ${slot.game ? `<img src="${gameData.icon}" class="w-7 h-7 rounded-lg object-cover border border-slate-100 shrink-0" />` : ""}
                <div class="text-left flex-1 min-w-0">
                  <p class="text-[9px] font-extrabold text-slate-500 uppercase tracking-tighter leading-none mb-1">Game Switch</p>
                  <div class="flex items-center gap-1.5 w-full">
                    <span class="text-xs font-bold text-slate-700 tracking-tight truncate">${cleanGame}</span>
                    ${pIcon ? `<span class="shrink-0 flex items-center">${pIcon}</span>` : ""}
                    <i class="fas fa-chevron-down text-[10px] text-slate-400 shrink-0 ml-auto"></i>
                  </div>
                </div>
              </button>
            </div>
            <div class="flex-1">
              <button onclick="toggleSlotDropdown('VERSION', ${i}, 'sd-v-${i}', this)" ${!slot.game ? "disabled" : ""} class="w-full flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:border-blue-400 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <div class="text-left flex-1 min-w-0">
                  <p class="text-[9px] font-extrabold text-slate-500 uppercase tracking-tighter leading-none mb-1">Active Version</p>
                  <div class="flex items-center gap-1.5 w-full">
                    <span id="slot-v-text-${i}" class="text-xs font-bold tracking-tight truncate text-slate-700 flex items-center gap-1.5">${slot.version || "None Selected"} ${slot.version ? getBenchmarkTagsHTML(slot.game, slot.version).replace("ml-auto", "") : ""}</span>
                    <i class="fas fa-chevron-down text-[10px] text-slate-400 shrink-0 ml-auto"></i>
                  </div>
                </div>
              </button>
            </div>
            <div class="flex-1">
              <button onclick="toggleSlotDropdown('DAY', ${i}, 'sd-d-${i}', this)" ${!slot.version ? "disabled" : ""} class="w-full flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:border-blue-400 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <div class="text-left flex-1 min-w-0">
                  <p class="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none mb-1">Target Context</p>
                  <div class="flex items-center gap-1.5 w-full">
                    <span class="text-xs font-bold tracking-tight text-slate-700 truncate">${slot.day ? slot.day.replace("D", "Day ") : "Select Day"}</span>
                    <i class="fas fa-chevron-down text-[10px] text-slate-400 shrink-0 ml-auto"></i>
                  </div>
                </div>
              </button>
            </div>
          </div>
          ${i > 1 ? `<button onclick="removeSlot(${i})" class="w-8 h-8 aspect-square rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all flex items-center justify-center flex-none shadow-lg shadow-rose-100"><i class="fas fa-times text-[10px]"></i></button>` : '<div class="w-8 flex-none"></div>'}
        </div>
        </div>
        <div id="sd-g-${i}" class="slot-dropdown hidden mt-4"></div>
        <div id="sd-v-${i}" class="slot-dropdown hidden mt-4"></div>
        <div id="sd-d-${i}" class="slot-dropdown hidden mt-4"></div>
      </div>`;
    })
    .join("");

  const activeCount = selectionSlots.filter(
    (s) => s.game && s.version && s.day,
  ).length;
  const countEl = document.getElementById("comp-slots-count");
  if (countEl) countEl.innerText = `${activeCount} Active`;

  // Explicitly hide the add button container when 4 slots are reached
  const addBtnContainer = document.getElementById("add-slot-container");
  if (addBtnContainer) {
    if (selectionSlots.length >= 4) {
      addBtnContainer.classList.add("hidden");
    } else {
      addBtnContainer.classList.remove("hidden");
    }
  }
}

function toggleSlotDropdown(type, index, id, btnElement) {
  const dropdown = document.getElementById(id);
  const isHidden = dropdown.classList.contains("hidden");

  // Close all other dropdowns in all slots first
  document
    .querySelectorAll(".slot-dropdown")
    .forEach((d) => d.classList.add("hidden"));

  // Reset all chevrons in slots
  document
    .querySelectorAll("#comp-slots-container .fa-chevron-down")
    .forEach((icon) => icon.classList.remove("chevron-rotate"));

  // Reset all button backgrounds
  document
    .querySelectorAll(
      "#comp-slots-container button[onclick^='toggleSlotDropdown']",
    )
    .forEach((btn) => {
      btn.classList.remove("bg-slate-100", "border-blue-300");
      btn.classList.add("bg-white", "border-slate-200");
    });

  if (!isHidden) return;

  // Add rotation to the clicked button's chevron and change its background
  if (btnElement) {
    const chevron = btnElement.querySelector(".fa-chevron-down");
    if (chevron) chevron.classList.add("chevron-rotate");

    btnElement.classList.remove("bg-white", "border-slate-200");
    btnElement.classList.add("bg-slate-100", "border-blue-300");
  }

  const state = selectionSlots[index];
  let content = "";

  if (type === "GAME") {
    content =
      `
      <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
        <div class="flex items-center justify-between mb-4 px-2">
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Game Library</span>
          <input type="text" placeholder="Quick find game..." class="w-36 text-[10px] p-1.5 bg-white rounded-lg outline-none border border-slate-200 shadow-sm focus:border-blue-400 transition-all" oninput="filterSlotGames(${index})">
        </div>
        <div class="slot-game-list grid grid-cols-4 gap-2">` +
      Object.keys(STUDIO_GAMES)
        .map((key) => {
          const data = STUDIO_GAMES[key];
          const isSelected = state.game === key;
          const pIcon = data.platforms.includes("android")
            ? "android"
            : "apple";
          return `
          <div class="nav-item ${isSelected ? "selected" : ""} !h-10 !rounded-xl" data-search="${key.toLowerCase()}" onclick="pickOption('GAME', '${key}', '${index}')">
            <img src="${data.icon}" class="!w-5 !h-5 rounded-md" /><p class="!text-[11px] truncate">${data.shortName || key}</p>
            <div class="platform-icon-wrap"><i class="fab fa-${pIcon} ${pIcon === "android" ? "text-emerald-500" : "text-slate-400"} text-[12px]"></i></div>
          </div>`;
        })
        .join("") +
      `</div></div>`;
  } else if (type === "VERSION") {
    content = `
      <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
        <div class="flex items-center justify-between mb-4 px-2">
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Versions</span>
          <input type="text" id="slot-v-search-${index}" placeholder="Quick find version..." class="w-40 text-[10px] p-1.5 bg-white rounded-lg outline-none border border-slate-200 shadow-sm focus:border-blue-400 transition-all" oninput="filterSlotVersions(${index})">
        </div>
        <div id="sd-v-list-${index}" class="slot-version-list"></div>
        <div id="sd-v-nav-${index}"></div>
      </div>`;
    dropdown.innerHTML = content;
    dropdown.classList.remove("hidden");
    updateSlotVersionUI(index);
    return; // UI is handled by updateSlotVersionUI
  } else {
    const defaultDays = ["D0", "D7", "D30"];
    const isBackendVersion =
      STUDIO_GAMES[state.game] &&
      STUDIO_GAMES[state.game].versions &&
      STUDIO_GAMES[state.game].versions.includes(state.version);

    let daysToShow = defaultDays;

    if (!isBackendVersion) {
      // It's a TEMP game/version: Only show what has been manually injected
      const availableDays = defaultDays.filter(
        (d) => MOCK_DATABASE[`${state.game}_${state.version}_${d}`],
      );
      if (availableDays.length > 0) daysToShow = availableDays;
    }

    content =
      `
      <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Retention Day Context</p>
        <div class="grid grid-cols-3 gap-2">` +
      daysToShow
        .map(
          (d) =>
            `<button class="list-item !min-h-[36px] !text-[11px] !justify-center ${state.day === d ? "selected" : ""}" onclick="pickOption('DAY', '${d}', '${index}')">${d.replace("D", "Day ")}</button>`,
        )
        .join("") +
      `</div></div>`;
  }

  dropdown.innerHTML = content;
  dropdown.classList.remove("hidden");
  dropdown.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateSlotVersionUI(index, query = "") {
  const state = selectionSlots[index];
  const listContainer = document.getElementById(`sd-v-list-${index}`);
  const navContainer = document.getElementById(`sd-v-nav-${index}`);
  if (!listContainer || !navContainer) return;

  const baseVersions = [...(metadata.versions[state.game] || [])].reverse();

  // Hoist benchmark versions to the top
  const bmVersions = baseVersions.filter(
    (v) => getBenchmarkTagsHTML(state.game, v) !== "",
  );
  const normalVersions = baseVersions.filter(
    (v) => getBenchmarkTagsHTML(state.game, v) === "",
  );
  let versions = [...bmVersions, ...normalVersions];

  if (query) {
    versions = versions.filter((v) =>
      v.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const pageSize = 6;
  const totalPages = Math.ceil(versions.length / pageSize);

  // Auto-reset page bounds to prevent blank pagination or crashes
  if (state.versionPage >= totalPages && totalPages > 0)
    state.versionPage = totalPages - 1;
  if (state.versionPage < 0) state.versionPage = 0;

  const start = state.versionPage * pageSize;
  const pageVersions = versions.slice(start, start + pageSize);

  listContainer.innerHTML = pageVersions
    .map(
      (v) =>
        `<button class="list-item !w-auto !min-h-[40px] !text-[13px] !justify-between !px-4 gap-4 ${state.version === v ? "selected" : ""}" onclick="pickOption('VERSION', '${v}', '${index}')">
           <span class="truncate font-bold">${v}</span>
           ${getBenchmarkTagsHTML(state.game, v)}
        </button>`,
    )
    .join("");

  // Pagination Controls
  let navHtml = "";
  if (totalPages > 1) {
    const hasPrev = state.versionPage > 0;
    const hasNext = state.versionPage < totalPages - 1;

    navHtml = `
      <div class="flex justify-end items-center gap-4 mt-4 px-2">
        <span class="text-[9px] font-bold text-slate-300 uppercase mr-auto">Page ${state.versionPage + 1} of ${totalPages}</span>
        ${hasPrev ? `<button onclick="changeSlotVersionPage(${index}, -1)" class="text-slate-900 hover:text-blue-600 transition-colors text-lg">⮜</button>` : ""}
        ${hasNext ? `<button onclick="changeSlotVersionPage(${index}, 1)" class="text-slate-900 hover:text-blue-600 transition-colors text-lg">⮞</button>` : ""}
      </div>`;
  }
  navContainer.innerHTML = navHtml;
}

function changeSlotVersionPage(index, direction) {
  selectionSlots[index].versionPage += direction;
  const query = document.getElementById(`slot-v-search-${index}`)?.value || "";
  updateSlotVersionUI(index, query);
}

function addNewSlot() {
  if (selectionSlots.length >= 4) return;
  selectionSlots.push({
    game: selectionSlots[0].game,
    version: null,
    day: null,
    versionPage: 0,
  });
  renderCompSlots();
}

function removeSlot(index) {
  selectionSlots.splice(index, 1);
  renderCompSlots();
  refreshDashboard2();
}

function switchTab(tabId) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  document
    .querySelectorAll(".tab-view")
    .forEach((view) => view.classList.add("hidden"));
  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.remove("hidden");

  // Double RAF ensures the browser has finished layout paint before the chart initializes
  if (lastData) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (tabId === "retention") renderRetentionChart();
        if (tabId === "ads") renderAdDepthChart();
        if (tabId === "performance") renderFrictionChart();
        if (tabId === "dataset") renderDatasetTable();
      });
    });
  }
}

function openSelection(type, context = "inject") {
  currentTargetContext = context;
  const modal = document.getElementById("selection-modal");
  const title = document.getElementById("selection-title");
  const list = document.getElementById("selection-list");
  const addBtn = document.getElementById("selection-add-btn");

  let state;
  if (context === "inject") state = activeInjection;
  else if (context === "base") state = baseSelection;
  else state = selectionSlots[parseInt(context)];

  title.innerText = `Select ${type}`;
  list.innerHTML = "";
  modal.classList.remove("hidden");

  // Apply Grid Layouts
  list.className =
    "flex-1 overflow-y-auto pr-2 custom-scrollbar " +
    (type === "GAME" ? "selection-2col-grid" : "selection-grid-view");

  if (type === "GAME") {
    addBtn.classList.remove("hidden");
    addBtn.onclick = () => openInputModal("GAME", "selection", "");
    list.innerHTML = metadata.games
      .map((g) => {
        const data = STUDIO_GAMES[g];
        const isSelected = state.game === g;
        const displayName = data?.shortName || g.replace(/\s*ios\s*$/i, "");
        const platformIcon = data?.platforms.includes("android")
          ? '<i class="fab fa-android text-emerald-500 text-[10px]"></i>'
          : '<i class="fab fa-apple text-slate-400 text-[10px]"></i>';

        return `
        <div class="nav-item ${isSelected ? "selected" : ""}" onclick="pickOption('GAME', '${g}', '${context}')">
          <img src="${data?.icon || "https://via.placeholder.com/32"}" alt="${g}" />
          <p>${displayName}</p>
          <div class="platform-icon-wrap">${platformIcon}</div>
        </div>`;
      })
      .join("");
  } else if (type === "VERSION") {
    addBtn.classList.remove("hidden");
    addBtn.onclick = () => openInputModal("VERSION", "selection", state.game);
    const versions = metadata.versions[state.game] || [];
    list.innerHTML = versions
      .map(
        (v) => `
      <button class="list-item ${state.version === v ? "selected" : ""}" onclick="pickOption('VERSION', '${v}', '${context}')">${v}</button>
    `,
      )
      .join("");
  } else if (type === "DAY") {
    addBtn.classList.add("hidden");
    list.innerHTML = ["D0", "D7", "D30"]
      .map(
        (d) => `
      <button class="list-item ${state.day === d ? "selected" : ""}" onclick="pickOption('DAY', '${d}', '${context}')">${d}</button>
    `,
      )
      .join("");
  }
}

function pickOption(type, value, context = "inject") {
  let state =
    context === "inject"
      ? activeInjection
      : context === "base"
        ? baseSelection
        : context === "comp"
          ? compSelection
          : selectionSlots[context];

  if (context === "inject") {
    const btnId = `btn-select-${type.toLowerCase()}`;
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.classList.replace("empty", "filled");

      if (type === "GAME") {
        processBenchmarks(value);
        const gData = STUDIO_GAMES[value];
        const pIcon = gData.platforms.includes("android")
          ? "fab fa-android"
          : "fab fa-apple";
        const platform = gData.platforms.includes("android")
          ? "android"
          : "ios";

        // Store game, shortName, and platform
        state.game = value;
        state.gameShortName =
          gData.shortName || value.replace(/\s*ios\s*$/i, "");
        state.platform = platform;
        state.version = null; // Reset version when game changes
        state.day = null; // Reset day when game changes

        btn.innerHTML = `<i class="fas fa-gamepad opacity-60"></i> <span class="flex-1 text-left ml-2">${state.gameShortName}</span> <i class="${pIcon} text-[10px] opacity-60"></i>`;
        document.getElementById("btn-select-version").disabled = false;

        // Reset version and day buttons
        const versionBtn = document.getElementById("btn-select-version");
        const dayBtn = document.getElementById("btn-select-day");
        if (versionBtn) {
          versionBtn.classList.replace("filled", "empty");
          versionBtn.innerHTML = `<i class="fas fa-code-branch"></i> <span>Select Version</span>`;
          versionBtn.disabled = false;
        }
        if (dayBtn) {
          dayBtn.classList.replace("filled", "empty");
          dayBtn.innerHTML = `<i class="fas fa-calendar-day"></i> <span>Select Day</span>`;
        }
      } else if (type === "VERSION") {
        state.version = value;
        btn.innerHTML = `<i class="fas fa-code-branch opacity-60"></i> <span class="flex-1 text-left ml-2">${value}</span>`;
      } else {
        state.day = value;
        btn.innerHTML = `<i class="fas fa-calendar-day opacity-60"></i> <span class="flex-1 text-left ml-2">${value}</span>`;
      }
    }
    validateInjection();
  } else if (context === "base") {
    if (type === "GAME") {
      processBenchmarks(value);
      const gameData = STUDIO_GAMES[value];
      const platform = gameData.platforms.includes("android")
        ? "android"
        : "ios";

      // Store game, shortName, and platform
      state.game = value;
      state.gameShortName =
        gameData?.shortName || value.replace(/\s*ios\s*$/i, "");
      state.platform = platform;
      state.version = null;
      state.day = null;

      syncNavSwitcher(value);
      initNavSwitcher(); // Refresh the visual selection state in the dropdown list

      document.getElementById("nav-current-version").innerText =
        "Select Version";
      document.getElementById("nav-current-day").innerText = "Select Day";

      // Enable version button
      document.getElementById("btn-base-version").disabled = false;
      // Disable day button until version is selected
      document.getElementById("btn-base-day").disabled = true;
    } else if (type === "VERSION") {
      state.version = value;
      state.day = null; // Reset day when version changes
      const tags = getBenchmarkTagsHTML(state.game, value).replace(
        "ml-auto",
        "",
      );
      document.getElementById("nav-current-version").innerHTML =
        `<span class="flex items-center gap-1.5">${value} ${tags}</span>`;
      document.getElementById("nav-current-day").innerText = "Select Day";
      initDaySwitcher(state.game, value);
    } else if (type === "DAY") {
      state.day = value;
      document.getElementById("nav-current-day").innerText = value.replace(
        "D",
        "Day ",
      );
    }
  } else if (context === "comp") {
    if (type === "GAME") {
      processBenchmarks(value);
      const gameData = STUDIO_GAMES[value];
      const platform = gameData.platforms.includes("android")
        ? "android"
        : "ios";

      state.game = value;
      state.gameShortName =
        gameData?.shortName || value.replace(/\s*ios\s*$/i, "");
      state.platform = platform;
      state.version = null;
      state.day = null;
    } else {
      state[type.toLowerCase()] = value;
    }
  } else {
    // Slot context (index passed as string)
    if (type === "GAME") {
      processBenchmarks(value);
      const gameData = STUDIO_GAMES[value];
      const platform = gameData.platforms.includes("android")
        ? "android"
        : "ios";

      state.game = value;
      state.gameShortName =
        gameData?.shortName || value.replace(/\s*ios\s*$/i, "");
      state.platform = platform;
      state.version = null;
      state.day = null;
    } else if (type === "VERSION") {
      state.version = value;
      state.day = null; // Reset day when version changes
    } else {
      state.day = value;
    }

    renderCompSlots();
    document
      .querySelectorAll(".slot-dropdown")
      .forEach((d) => d.classList.add("hidden"));
  }

  closeSelection();

  // Prevent main dashboard reload when merely picking injection filters
  if (context !== "inject") {
    refreshDashboard2();
  }
}

function updateCompareHeader(activeSlots) {
  const header = document.getElementById("compare-header");
  if (!header) return;

  const slotLetters = ["A", "B", "C", "D"];

  header.innerHTML = activeSlots
    .map((s, i) => {
      const data = STUDIO_GAMES[s.game];
      const icon = data ? data.icon : "https://via.placeholder.com/32";
      const fullName = s.game.replace(/\s*ios\s*$/i, "");
      const formattedDay = s.day.replace("D", "Day ");

      const isAndroid =
        data?.platforms?.includes("android") || data?.platform === "android";
      const pIcon = isAndroid
        ? '<i class="fab fa-android text-emerald-500 text-[11px]"></i>'
        : '<i class="fab fa-apple text-slate-400 text-[11px]"></i>';

      // Check if the current slot's selection is a benchmark
      const isBenchmark =
        BENCHMARK_MAP[s.game] &&
        BENCHMARK_MAP[s.game][s.day] === String(s.version);

      if (i === 0) {
        const crownHtml = isBenchmark
          ? `<i class="fas fa-crown text-amber-600 mr-1"></i>`
          : "";
        return `
          <div class="flex items-center gap-3 bg-amber-50/80 border border-amber-200 px-5 py-2 rounded-full shadow-sm shadow-amber-100/60 shrink-0">
            <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black shadow-sm">A</span>
            <img src="${icon}" class="w-6 h-6 rounded-lg object-cover border border-amber-200/40 shrink-0" />
            <span class="text-sm font-black text-amber-950 tracking-tight">${fullName}</span>
            <span class="inline-flex items-center justify-center shrink-0 w-4 h-4 bg-white rounded-full border border-amber-200/40">${pIcon}</span>
            <div class="h-4 w-[1px] bg-amber-200/80 mx-0.5"></div>
            <span class="bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-tight">v${s.version}</span>
            <span class="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-tight uppercase">${crownHtml}${formattedDay}</span>
          </div>
        `;
      } else {
        const crownHtml = isBenchmark
          ? `<i class="fas fa-crown text-amber-500 mr-1 drop-shadow-sm"></i>`
          : "";
        const dayBadgeClasses = isBenchmark
          ? "bg-amber-50 text-amber-700 border border-amber-200/60 shadow-sm"
          : "bg-slate-100 text-slate-700 border border-transparent";

        return `
          <div class="flex items-center gap-3 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-sm shrink-0">
            <span class="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-black">${slotLetters[i]}</span>
            <img src="${icon}" class="w-6 h-6 rounded-lg object-cover border border-slate-100 shrink-0" />
            <span class="text-sm font-bold text-slate-700 tracking-tight">${fullName}</span>
            <span class="inline-flex items-center justify-center shrink-0 w-4 h-4 bg-slate-50 rounded-full border border-slate-100">${pIcon}</span>
            <div class="h-4 w-[1px] bg-slate-200 mx-0.5"></div>
            <span class="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-tight">v${s.version}</span>
            <span class="${dayBadgeClasses} text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-tight uppercase transition-all">${crownHtml}${formattedDay}</span>
          </div>
        `;
      }
    })
    .join("");

  header.className =
    "mb-6 pb-4 border-b border-slate-100 flex flex-wrap gap-4 items-center";
}

function refreshDashboard() {
  const gameHeader = document.getElementById("game-header");
  const compareHeader = document.getElementById("compare-header");

  if (dashboardMode === "single") {
    compareHeader?.classList.add("hidden");
    compareHeader?.classList.remove("flex");

    const g = baseSelection.game;
    const v = baseSelection.version;
    const d = baseSelection.day;

    // Only proceed if ALL three are selected
    if (!g || !v || !d) {
      // Clear dashboard or show placeholder
      clearDashboard();
      return;
    }

    if (g) updateGameHeader(g);

    const data = MOCK_DATABASE[`${g}_${v}_${d}`];
    console.log(`${g}_${v}_${d}`);

    if (data) {
      updateDashboardUI(data);
    } else {
      clearDashboard();
    }
  } else {
    // Compare mode logic remains the same...
    gameHeader?.classList.add("hidden");
    const activeSlots = selectionSlots.filter(
      (s) => s.game && s.version && s.day,
    );

    if (activeSlots.length > 0) updateCompareHeader(activeSlots);

    if (activeSlots.length < 2) {
      clearDashboard();
      return;
    }

    const datasets = activeSlots
      .map((s) => ({
        meta: s,
        data: MOCK_DATABASE[`${s.game}_${s.version}_${s.day}`],
      }))
      .filter((item) => item.data);

    if (datasets.length >= 2) {
      updateDashboardUI(datasets[0].data, datasets.slice(1));
    } else if (datasets.length === 1) {
      updateDashboardUI(datasets[0].data);
    } else {
      clearDashboard();
    }
  }
}

function updateGameHeader(gameName) {
  // Name bar removed for single mode to maximize vertical viewing space
  return;
}

let currentInputTarget = null;
let currentActiveSelect = null;
let newGameSelectedPlatform = "android"; // Default platform for new games
let charts = {}; // Consolidated chart storage

function closeSelection() {
  document.getElementById("selection-modal").classList.add("hidden");
}

function syncAllDropdowns() {
  const targets = ["base-game", "comp-game"];
  targets.forEach((id) => {
    const grid = document.getElementById(`${id}-grid`);
    if (!grid) return;
    grid.innerHTML =
      metadata.games
        .map(
          (g) => `
      <div class="filter-item" data-value="${g}" onclick="selectOption('${id}', '${g}')">
          <div class="custom-checkbox"></div> <span>${g}</span>
      </div>`,
        )
        .join("") +
      `
      <div class="filter-item add-new-btn" onclick="openInputModal('GAME', '${id}')">
          <i class="fas fa-plus"></i> Add Game
      </div>`;
  });
}

function validateInputModal() {
  const confirmBtn = document.getElementById("btn-modal-confirm");
  const tooltip = document.getElementById("modal-confirm-tooltip");

  if (currentInputTarget === "GAME") {
    const nameVal = document.getElementById("add-game-name").value.trim();
    const shortVal = document.getElementById("add-game-short").value.trim();

    if (!nameVal || !shortVal) {
      confirmBtn.disabled = true;
      tooltip.innerText = "Please fill all fields";
      return;
    }

    let isDuplicate = false;
    let duplicateReason = "Game is already available";

    for (const key in STUDIO_GAMES) {
      const g = STUDIO_GAMES[key];
      const isSamePlatform =
        g.platform === newGameSelectedPlatform ||
        (g.platforms && g.platforms.includes(newGameSelectedPlatform));

      if (isSamePlatform) {
        if (g.name.toLowerCase() === nameVal.toLowerCase()) {
          isDuplicate = true;
          duplicateReason = "Game Name already exists";
          break;
        }
        if ((g.shortName || "").toLowerCase() === shortVal.toLowerCase()) {
          isDuplicate = true;
          duplicateReason = "Short Name already used";
          break;
        }
      }
    }

    if (isDuplicate) {
      confirmBtn.disabled = true;
      tooltip.innerText = duplicateReason;
      return;
    }

    confirmBtn.disabled = false;
  } else {
    let val = document.getElementById("custom-input-field").value.trim();

    if (!val) {
      confirmBtn.disabled = true;
      tooltip.innerText = "Enter a version";
      return;
    }

    let cleanVal = val.replace(/^(v|version)\s*/i, "");

    if (/[^0-9.]/.test(cleanVal)) {
      confirmBtn.disabled = true;
      tooltip.innerText = "Use numerical values only";
      return;
    }

    let context = currentTargetContext;
    if (currentActiveSelect && currentActiveSelect.includes("base"))
      context = "base";
    if (currentActiveSelect && currentActiveSelect.includes("comp"))
      context = "comp";

    let state = activeInjection;
    if (context === "base") state = baseSelection;
    if (context === "comp") state = compSelection;
    if (typeof context === "number" || /^\d+$/.test(context))
      state = selectionSlots[context];

    if (
      state.game &&
      metadata.versions[state.game] &&
      metadata.versions[state.game].includes(cleanVal)
    ) {
      confirmBtn.disabled = true;
      tooltip.innerText = "Version already exists";
      return;
    }

    confirmBtn.disabled = false;
  }
}

function selectNewGamePlatform(platform) {
  newGameSelectedPlatform = platform;
  const btnAndroid = document.getElementById("btn-plat-android");
  const btnIos = document.getElementById("btn-plat-ios");

  if (platform === "android") {
    btnAndroid.className =
      "flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white shadow-sm flex justify-center items-center gap-2 transition-all";
    btnIos.className =
      "flex-1 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 flex justify-center items-center gap-2 transition-all";
  } else {
    btnIos.className =
      "flex-1 py-2.5 rounded-xl text-sm font-bold bg-slate-800 text-white shadow-sm flex justify-center items-center gap-2 transition-all";
    btnAndroid.className =
      "flex-1 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 flex justify-center items-center gap-2 transition-all";
  }

  validateInputModal();
}

function openInputModal(type, el, gameContext = "") {
  currentInputTarget = type;
  currentActiveSelect = el;
  const modal = document.getElementById("input-modal");
  const title = document.getElementById("input-modal-title");
  const desc = document.getElementById("input-modal-desc");

  const formGame = document.getElementById("form-game-add");
  const formVersion = document.getElementById("form-version-add");

  title.innerText = type === "GAME" ? "Add New Game" : "Add New Version";
  desc.innerText =
    type === "GAME"
      ? "Enter the details below."
      : `Add a version for ${gameContext}.`;

  if (type === "GAME") {
    formGame.classList.remove("hidden");
    formVersion.classList.add("hidden");
    document.getElementById("add-game-name").value = "";
    document.getElementById("add-game-short").value = "";
    selectNewGamePlatform("android"); // Reset to default triggers validation
    setTimeout(() => document.getElementById("add-game-name").focus(), 100);
  } else {
    formGame.classList.add("hidden");
    formVersion.classList.remove("hidden");
    const input = document.getElementById("custom-input-field");
    input.value = "";
    validateInputModal(); // Force initial disabled state
    setTimeout(() => input.focus(), 100);
  }

  modal.classList.remove("hidden");
}

function closeInputModal() {
  document.getElementById("input-modal").classList.add("hidden");
}

function submitInputModal() {
  if (currentInputTarget === "GAME") {
    const nameVal = document.getElementById("add-game-name").value.trim();
    const shortVal = document.getElementById("add-game-short").value.trim();

    if (!nameVal || !shortVal) {
      return; // Handled by validation lock
    }

    if (!metadata.games.includes(nameVal)) {
      // Inject directly into STUDIO_GAMES to preserve metadata mappings
      STUDIO_GAMES[nameVal] = {
        name: nameVal,
        displayName: nameVal,
        shortName: shortVal,
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='transparent'/%3E%3Cpath d='M83.9 33.2l-6.7-13.9A9.6 9.6 0 0 0 68.6 13H31.4a9.6 9.6 0 0 0-8.6 6.3l-6.7 13.9A19.8 19.8 0 0 0 14.2 49v11.4A10.3 10.3 0 0 0 24.5 71h3.7a8.1 8.1 0 0 0 7.3-4.7l4.3-8.7h19.4l4.3 8.7a8.1 8.1 0 0 0 7.3 4.7h3.7A10.3 10.3 0 0 0 84.8 60.4V49a19.8 19.8 0 0 0-1.9-15.8zM34.2 45.4h-5v5a1.7 1.7 0 0 1-3.4 0v-5h-5a1.7 1.7 0 0 1 0-3.4h5v-5a1.7 1.7 0 0 1 3.4 0v5h5a1.7 1.7 0 0 1 0 3.4zm30 3.4a3.3 3.3 0 1 1 3.3-3.3 3.3 3.3 0 0 1-3.3 3.3zm6.6-10a3.3 3.3 0 1 1 3.3-3.3 3.3 3.3 0 0 1-3.3 3.3z' fill='%23334155'/%3E%3C/svg%3E",
        platform: newGameSelectedPlatform,
        versions: [],
        platforms: [newGameSelectedPlatform],
      };

      metadata.games.push(nameVal);
      metadata.versions[nameVal] = [];

      if (typeof syncAllDropdowns === "function") syncAllDropdowns();
      if (typeof initNavSwitcher === "function") initNavSwitcher();

      let context = currentTargetContext;
      if (currentActiveSelect && currentActiveSelect.includes("base"))
        context = "base";
      if (currentActiveSelect && currentActiveSelect.includes("comp"))
        context = "comp";

      pickOption("GAME", nameVal, context);
    }
  } else {
    let val = document.getElementById("custom-input-field").value.trim();
    let cleanVal = val.replace(/^(v|version)\s*/i, "");
    if (!cleanVal) return;

    let context = currentTargetContext;
    if (currentActiveSelect && currentActiveSelect.includes("base"))
      context = "base";
    if (currentActiveSelect && currentActiveSelect.includes("comp"))
      context = "comp";

    let state = activeInjection;
    if (context === "base") state = baseSelection;
    if (context === "comp") state = compSelection;
    if (typeof context === "number" || /^\d+$/.test(context))
      state = selectionSlots[context];

    if (state.game && !metadata.versions[state.game].includes(cleanVal)) {
      metadata.versions[state.game].push(cleanVal);
      pickOption("VERSION", cleanVal, context);
    }
  }
  document.getElementById("input-modal").classList.add("hidden");
}

let pendingRowData = null;

function previewData() {
  const textarea = document.getElementById("inject-textarea");
  const rawData = textarea.value.trim();
  if (!rawData) return;

  const row = rawData
    .split(/[\t\n\r]+/)
    .map((val) => parseFloat(val.replace(/,/g, "").replace(/%/g, "")));

  if (row.length < 34) {
    alert(`⚠️ Error: Found ${row.length} KPIs, 34 expected.`);
    return;
  }

  pendingRowData = row;

  // Hide upload form and show clean success popup
  document.getElementById("upload-modal").classList.add("hidden");
  const successModal = document.getElementById("inject-success-modal");
  successModal.classList.remove("hidden");
  textarea.value = "";

  // Auto-close logic: 800ms for animation + 2s "stay" time
  setTimeout(() => {
    finalizeInjection();
  }, 1800);
}

function finalizeInjection() {
  if (pendingRowData) {
    // Save to local Mock Database so the dynamic dropdowns can detect the new data
    MOCK_DATABASE[
      `${activeInjection.game}_${activeInjection.version}_${activeInjection.day}`
    ] = pendingRowData;

    // Recalculate benchmarks in case this newly injected data is the winner
    processBenchmarks(activeInjection.game);

    // Sync injection state to base selection
    baseSelection.game = activeInjection.game;
    baseSelection.gameShortName = activeInjection.gameShortName;
    baseSelection.platform = activeInjection.platform;
    baseSelection.version = activeInjection.version;
    baseSelection.day = activeInjection.day;

    // Force top nav bar UI to reflect the newly injected data
    syncNavSwitcher(baseSelection.game);
    initNavSwitcher(); // Refresh the visual selection state in the dropdown list

    document.getElementById("btn-base-version").disabled = false;
    document.getElementById("nav-current-version").innerText =
      baseSelection.version;

    // Populate the dynamic day list for the new injection
    initDaySwitcher(baseSelection.game, baseSelection.version);
    document.getElementById("nav-current-day").innerText =
      baseSelection.day.replace("D", "Day ");

    // Render preview
    updateDashboardUI(pendingRowData);
    pendingRowData = null;
  }
  document.getElementById("inject-success-modal").classList.add("hidden");
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
};

const tailwindColors = {
  blue: { hex: "#3b82f6", glass: "rgba(59, 130, 246, 0.12)" },
  orange: { hex: "#f97316", glass: "rgba(249, 115, 22, 0.12)" },
  emerald: { hex: "#10b981", glass: "rgba(16, 185, 129, 0.12)" },
  violet: { hex: "#8b5cf6", glass: "rgba(139, 92, 246, 0.12)" },
  indigo: { hex: "#6366f1", glass: "rgba(99, 102, 241, 0.12)" },
  rose: { hex: "#f43f5e", glass: "rgba(244, 63, 94, 0.12)" },
  cyan: { hex: "#06b6d4", glass: "rgba(6, 182, 212, 0.12)" },
  pink: { hex: "#ec4899", glass: "rgba(236, 72, 153, 0.12)" },
};
function getLayerLabel(index) {
  if (dashboardMode !== "compare")
    return `LAYER ${["A", "B", "C", "D"][index]}`;
  const activeSlots = selectionSlots.filter((s) => s.game && s.version);
  if (index >= activeSlots.length)
    return `LAYER ${["A", "B", "C", "D"][index]}`;
  const slot = activeSlots[index];
  const shortName = (
    STUDIO_GAMES[slot.game]?.shortName ||
    slot.game.replace(/\s*ios\s*$/i, "").substring(0, 6)
  ).toUpperCase();
  return `${shortName} (v${slot.version} , ${slot.day})`;
}
const generateCard = (c, i, customId = "") => `
  <div ${customId ? `id="${customId}"` : ""} class="premium-card p-7 group" style="--card-color: ${tailwindColors[c.color].hex}; --card-tint: ${tailwindColors[c.color].glass}; animation-delay: ${i * 80}ms">
    <div class="card-content-wrapper transition-all duration-200">
      <div class="flex justify-between items-center mb-10">
        <div class="card-icon-container w-14 h-14 bg-white text-${c.color}-600 rounded-2xl text-xl shadow-sm border border-slate-50">
          ${c.icon.startsWith("<") ? c.icon : `<i class="fas ${c.icon}"></i>`}
        </div>
        <div class="flex flex-col items-end">
           <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Data Source</span>
           <div class="flex items-center gap-1.5 mt-1">
             <div class="pulse-dot w-1.5 h-1.5 rounded-full bg-${c.color}-500 animate-pulse"></div>
             <span class="synced-text text-[8px] font-bold text-${c.color}-600 uppercase">Synced</span>
           </div>
        </div>
      </div>
      <p class="card-label text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-2 group-hover:text-slate-600 transition-colors">${c.label}</p>
      <div class="flex items-baseline">
        <h3 class="card-value text-4xl font-extrabold text-slate-800 tracking-tighter">${c.val}</h3>
      </div>
    </div>
  </div>`;

const formatCValue = (val, idx) => {
  if (idx === 0) return val.toLocaleString();
  if (
    idx === 27 ||
    idx === 20 ||
    idx === 23 ||
    idx === 24 ||
    idx === 25 ||
    idx === 26
  )
    return val.toFixed(2) + "%";
  if (idx === 12) return val.toFixed(2);
  if (idx >= 28 && idx <= 33) return val.toFixed(3);
  if (idx === 22 || idx === 21) return formatTime(val);
  return val;
};

const generateOverviewCard = (c, i, compLayers, customId = "") => {
  if (dashboardMode === "single" || !compLayers || compLayers.length === 0) {
    return generateCard(c, i, customId);
  }

  const baseRaw = c.rawVal;
  const slotLetters = ["B", "C", "D"];

  const rowsHTML = compLayers
    .map((layer, idx) => {
      const compRaw = layer.data[c.index];
      const compValStr = formatCValue(compRaw, c.index);
      const isAbs = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 23, 24,
        25, 26, 27,
      ].includes(c.index);
      let delta = 0;
      let deltaStr = "";

      if (isAbs) {
        delta = compRaw - baseRaw;
        deltaStr =
          delta > 0 ? `+${delta.toFixed(2)}pp` : `${delta.toFixed(2)}pp`;
      } else {
        delta =
          baseRaw === 0
            ? compRaw > 0
              ? 100
              : 0
            : ((compRaw - baseRaw) / baseRaw) * 100;
        deltaStr = delta > 0 ? `+${delta.toFixed(2)}%` : `${delta.toFixed(2)}%`;
      }

      let isPositive = c.invertDelta ? delta <= 0 : delta >= 0;

      const dColorStyle = isPositive
        ? "bg-emerald-500 text-white border border-emerald-600"
        : "bg-rose-500 text-white border border-rose-600";

      return `
                    <div class="py-2.5 border-b border-slate-200/50 last:border-0 last:pb-0 first:pt-0 flex flex-col justify-center">
                      <span class="text-[10px] font-bold tracking-widest text-slate-400 mb-1.5 leading-[1.1]">${getLayerLabel(idx + 1)}</span>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[24px] font-black text-slate-800 tabular-nums leading-none tracking-tight">${compValStr}</span>
                <span class="px-3 py-1 rounded-full text-[13px] font-black ${dColorStyle} shadow-sm whitespace-nowrap tracking-tight leading-none">${deltaStr}</span>
              </div>
            </div>`;
    })
    .join("");

  return `
        <div ${customId ? `id="${customId}"` : ""} class="premium-card p-5 group flex flex-col justify-between" style="--card-color: ${tailwindColors[c.color].hex}; --card-tint: ${tailwindColors[c.color].glass}; animation-delay: ${i * 80}ms">
          <div class="flex items-center justify-between mb-4">
             <div class="flex items-center gap-3">
                 <div class="overview-icon-container w-11 h-11 rounded-[12px] bg-white text-${c.color}-500 flex items-center justify-center text-lg shadow-sm border border-slate-100">
                     ${c.icon.startsWith("<") ? c.icon : `<i class="fas ${c.icon}"></i>`}
                 </div>
                 <h4 class="text-[14px] font-black text-slate-800 uppercase tracking-widest leading-none">${c.label}</h4>
             </div>
             <div class="flex items-center gap-1.5">
                 <div class="w-1.5 h-1.5 rounded-full bg-${c.color}-500 animate-pulse"></div>
                 <span class="text-[9px] font-bold text-${c.color}-600 uppercase tracking-widest">Synced</span>
             </div>
          </div>

          <div class="flex flex-row items-stretch h-full gap-5 mt-1">
             <div class="flex-1 flex flex-col justify-center">
                 <p class="text-[10px] font-bold tracking-widest text-slate-400 mb-2 leading-[1.1]">${getLayerLabel(0)}</p>
                 <h3 class="text-[40px] font-black text-${c.color}-500 tracking-tighter drop-shadow-sm leading-none">${c.val}</h3>
             </div>
             
             <div class="w-px bg-slate-200/80 my-2"></div>
             
             <div class="flex-[1.2] flex flex-col justify-center min-w-[150px]">
                ${rowsHTML}
             </div>
          </div>
        </div>`;
};

function updateDashboardUI(data, compLayers = null) {
  lastData = data;
  lastCompLayers = compLayers;

  // Reconstruct Tab Layouts from placeholders to active containers
  document.getElementById("view-overview").className =
    "tab-view hidden space-y-8";
  document.getElementById("view-overview").innerHTML =
    `<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="kpi-cards-container"></div>`;

  document.getElementById("view-retention").className =
    "tab-view hidden space-y-8";
  document.getElementById("view-retention").innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="retention-cards-container"></div>
    <div class="premium-card p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div><h4 class="text-lg font-bold text-slate-800">Retention Progression</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level-based User Drop-off</p></div>
        <div class="flex items-center gap-4">
          <div class="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button onclick="toggleRetentionMode('install')" id="btn-ret-install" class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${retentionChartMode === "install" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}">Vs Install</button>
            <button onclick="toggleRetentionMode('onboard')" id="btn-ret-onboard" class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${retentionChartMode === "onboard" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"}">Vs Onboarded</button>
          </div>
          <div class="relative group">
            <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all flex items-center justify-center"><i class="fas fa-info-circle"></i></button>
            <div class="absolute right-0 top-10 w-72 bg-slate-900 text-white text-[11px] p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-2xl pointer-events-none leading-relaxed" id="ret-info-content"></div>
          </div>
        </div>
      </div>
      <div class="h-[400px] chart-container-stable"><canvas id="funnelChart"></canvas></div>
    </div>`;

  document.getElementById("view-ads").className = "tab-view hidden space-y-8";
  document.getElementById("view-ads").innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" id="ad-cards-container"></div>
    <div class="premium-card p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div><h4 class="text-lg font-bold text-slate-800">Ad Depth Analysis</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Threshold Reach & Conversion Table</p></div>
        <div class="relative group">
          <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all flex items-center justify-center"><i class="fas fa-info-circle"></i></button>
          <div class="absolute right-0 top-10 w-72 bg-slate-900 text-white text-[11px] p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-2xl pointer-events-none leading-relaxed" id="ads-info-content"></div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <div class="h-[350px] chart-container-stable lg:w-3/5"><canvas id="adDepthChart"></canvas></div>
        <div class="w-full lg:w-2/5 bg-white/50 rounded-2xl border border-slate-100 p-2 overflow-hidden" id="ad-depth-table-container"></div>
      </div>
    </div>`;

  document.getElementById("view-performance").className =
    "tab-view hidden space-y-8";
  document.getElementById("view-performance").innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="performance-cards-container"></div>
    <div class="premium-card p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div><h4 class="text-lg font-bold text-slate-800" id="perf-chart-title">Friction Drop Analysis</h4><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identifying Level Progression Bottlenecks</p></div>
        <div class="flex items-center gap-4">
          <div class="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button onclick="togglePerformanceMode('impact')" id="btn-perf-impact" class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm text-blue-600">Friction Drop</button>
            <button onclick="togglePerformanceMode('efficiency')" id="btn-perf-efficiency" class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-slate-500 hover:text-slate-700">Group Performance</button>
          </div>
          <div class="relative group">
            <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all flex items-center justify-center"><i class="fas fa-info-circle"></i></button>
            <div class="absolute right-0 top-10 w-72 bg-slate-900 text-white text-[11px] p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-2xl pointer-events-none leading-relaxed" id="perf-info-content"></div>
          </div>
        </div>
      </div>
      <div id="perf-legend-container" class="mb-8"></div>
      <div class="h-[380px] chart-container-stable"><canvas id="frictionChart"></canvas></div>
    </div>`;

  document.getElementById("view-dataset").className = "tab-view hidden";
  document.getElementById("view-dataset").innerHTML = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 px-2">
          <div>
            <h4 class="text-2xl font-black text-slate-900 tracking-tight">Consolidated Dataset</h4>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Categorized Metric Ledger</p>
          </div>
        </div>
        <div id="dataset-container" class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"></div>`;
  const overviewContainer = document.getElementById("kpi-cards-container");
  const retentionContainer = document.getElementById(
    "retention-cards-container",
  );

  const overviewCards = [
    {
      label: "Total Installs",
      val: data[0].toLocaleString(),
      rawVal: data[0],
      index: 0,
      icon: "fa-download",
      color: "blue",
    },
    {
      label: "Return On Ad Spend",
      val: data[27].toFixed(2) + "%",
      rawVal: data[27],
      index: 27,
      icon: "fa-hand-holding-dollar",
      color: "orange",
    },
    {
      label: "Avg Ad per User",
      val: data[12].toFixed(2),
      rawVal: data[12],
      index: 12,
      icon: "fa-video relative ad-text-icon",
      color: "emerald",
    },
    {
      label: "Day 1 Retention",
      val: data[23].toFixed(2) + "%",
      rawVal: data[23],
      index: 23,
      icon: "fa-calendar relative d1-text-icon",
      color: "indigo",
    },
    {
      label: "Day 3 Retention",
      val: data[24].toFixed(2) + "%",
      rawVal: data[24],
      index: 24,
      icon: "fa-calendar relative d3-text-icon",
      color: "blue",
    },
    {
      label: "Avg Playtime",
      val: formatTime(data[22]),
      rawVal: data[22],
      index: 22,
      icon: "fa-bolt",
      color: "rose",
    },
    {
      label: "Avg. Session Length",
      val: formatTime(data[21]),
      rawVal: data[21],
      index: 21,
      icon: "fa-clock",
      color: "violet",
    },
    {
      label: "Interstitial /user",
      val: data[29].toFixed(3),
      rawVal: data[29],
      index: 29,
      icon: "fa-circle relative is-text-icon",
      color: "cyan",
    },
    {
      label: "Rewarded /user",
      val: data[28].toFixed(3),
      rawVal: data[28],
      index: 28,
      icon: "fa-circle relative rv-text-icon",
      color: "pink",
    },
  ];

  const isInstall = retentionChartMode === "install";
  const retentionCards = [
    isInstall
      ? {
          label: "Total Installs",
          val: data[0].toLocaleString(),
          rawVal: data[0],
          index: 0,
          icon: "fa-download",
          color: "blue",
        }
      : {
          label: "Onboarded Users",
          val: data[13].toLocaleString(),
          rawVal: data[13],
          index: 13,
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 1.25em; height: 1.25em;"><path d="M4.5 3.5C3.5 3.5 2.5 4.3 2.5 5.3v13.4c0 1 1 1.8 2 1.8l7.5 1.7c.8.2 1.5-.4 1.5-1.2V3c0-.8-.7-1.4-1.5-1.2L4.5 3.5z"/><circle cx="9.5" cy="12" r="1.3" fill="white"/><path d="M23.5 10.5h-5.5v-2.5l-4 4 4 4v-2.5h5.5v-3z"/><path d="M15 2v2h4c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1h-4v2h4c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3h-4z"/></svg>`,
          color: "violet",
        },
    {
      label: "Day 1 Retention",
      val: data[23].toFixed(2) + "%",
      rawVal: data[23],
      index: 23,
      icon: "fa-calendar relative d1-text-icon",
      color: "indigo",
    },
    {
      label: "Day 3 Retention",
      val: data[24].toFixed(2) + "%",
      rawVal: data[24],
      index: 24,
      icon: "fa-calendar relative d3-text-icon",
      color: "blue",
    },
  ];

  const adCards = [
    {
      label: "Return On Ad Spend",
      val: data[27].toFixed(2) + "%",
      rawVal: data[27],
      index: 27,
      icon: "fa-hand-holding-dollar",
      color: "orange",
    },
    {
      label: "Avg Ad per User",
      val: data[12].toFixed(2),
      rawVal: data[12],
      index: 12,
      icon: "fa-video relative ad-text-icon",
      color: "emerald",
    },
    {
      label: "User Ad Failure Rate",
      val: data[25].toFixed(2) + "%",
      rawVal: data[25],
      index: 25,
      icon: "fa-user-slash",
      color: "rose",
      invertDelta: true,
    },
    {
      label: "Ad Request Failure %",
      val: data[26].toFixed(2) + "%",
      rawVal: data[26],
      index: 26,
      icon: "fa-video-slash relative ad-text-icon",
      color: "orange",
      invertDelta: true,
    },
  ];

  const performanceCards = [
    {
      label: "Install to Onboard %",
      val: data[20].toFixed(2) + "%",
      rawVal: data[20],
      index: 20,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 1.25em; height: 1.25em;"><path d="M4.5 3.5C3.5 3.5 2.5 4.3 2.5 5.3v13.4c0 1 1 1.8 2 1.8l7.5 1.7c.8.2 1.5-.4 1.5-1.2V3c0-.8-.7-1.4-1.5-1.2L4.5 3.5z"/><circle cx="9.5" cy="12" r="1.3" fill="white"/><path d="M23.5 10.5h-5.5v-2.5l-4 4 4 4v-2.5h5.5v-3z"/><path d="M15 2v2h4c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1h-4v2h4c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3h-4z"/></svg>`,
      color: "violet",
    },
    {
      label: "Avg. Session Length",
      val: formatTime(data[21]),
      rawVal: data[21],
      index: 21,
      icon: "fa-clock",
      color: "blue",
    },
    {
      label: "Avg. Playtime",
      val: formatTime(data[22]),
      rawVal: data[22],
      index: 22,
      icon: "fa-bolt",
      color: "rose",
    },
  ];
  overviewContainer.innerHTML = overviewCards
    .map((c, i) => generateOverviewCard(c, i, compLayers))
    .join("");
  retentionContainer.innerHTML = retentionCards
    .map((c, i) =>
      generateOverviewCard(c, i, compLayers, i === 0 ? "dynamic-ret-card" : ""),
    )
    .join("");
  document.getElementById("ad-cards-container").innerHTML = adCards
    .map((c, i) => generateOverviewCard(c, i, compLayers))
    .join("");
  document.getElementById("performance-cards-container").innerHTML =
    performanceCards
      .map((c, i) => generateOverviewCard(c, i, compLayers))
      .join("");

  const activeTab = document.querySelector(".tab-btn.active").dataset.tab;
  switchTab(activeTab);
}

function renderDatasetTable() {
  if (!lastData) return;
  const container = document.getElementById("dataset-container");
  if (!container) return;

  const formatNum = (val) => val.toLocaleString();
  const formatPct = (val) => val.toFixed(2) + "%";
  const formatDec = (val) => val.toFixed(2);
  const formatDec3 = (val) => val.toFixed(3);

  const tailwindColors = {
    blue: { hex: "#3b82f6", glass: "rgba(59, 130, 246, 0.08)" },
    violet: { hex: "#8b5cf6", glass: "rgba(139, 92, 246, 0.08)" },
    emerald: { hex: "#10b981", glass: "rgba(16, 185, 129, 0.08)" },
    rose: { hex: "#f43f5e", glass: "rgba(244, 63, 94, 0.08)" },
    orange: { hex: "#f97316", glass: "rgba(249, 115, 22, 0.08)" },
    cyan: { hex: "#06b6d4", glass: "rgba(6, 182, 212, 0.08)" },
    pink: { hex: "#ec4899", glass: "rgba(236, 72, 153, 0.08)" },
  };

  const categories = [
    {
      title: "Core Funnel",
      icon: "fa-rocket",
      color: "blue",
      metrics: [
        { label: "Total Installs", idx: 0, fmt: formatNum },
        { label: "Install to Onboard %", idx: 20, fmt: formatPct },
      ],
    },
    {
      title: "Level Progression",
      icon: "fa-arrow-down-wide-short",
      color: "violet",
      metrics: [
        { label: "Lvl 20 Reach %", idx: 1, fmt: formatPct },
        { label: "Lvl 50 Reach %", idx: 2, fmt: formatPct },
        { label: "Lvl 70 Reach %", idx: 3, fmt: formatPct },
        { label: "Lvl 100 Reach %", idx: 4, fmt: formatPct },
        { label: "Lvl 150 Reach %", idx: 5, fmt: formatPct },
        { label: "Lvl 200 Reach %", idx: 6, fmt: formatPct },
      ],
    },
    {
      title: "Monetization Systems",
      icon: "fa-video relative ad-text-icon",
      color: "emerald",
      metrics: [
        { label: "Ads 10 Reach %", idx: 7, fmt: formatPct },
        { label: "Ads 20 Reach %", idx: 8, fmt: formatPct },
        { label: "Ads 40 Reach %", idx: 9, fmt: formatPct },
        { label: "Ads 70 Reach %", idx: 10, fmt: formatPct },
        { label: "Ads 100 Reach %", idx: 11, fmt: formatPct },
        { label: "Interstitial /user", idx: 29, fmt: formatDec3 },
        { label: "Rewarded /user", idx: 28, fmt: formatDec3 },
        { label: "Banner /user", idx: 30, fmt: formatDec3 },
        { label: "Interstitial ECPM", idx: 32, fmt: formatDec3 },
        { label: "Rewarded ECPM", idx: 31, fmt: formatDec3 },
        { label: "Banner ECPM", idx: 33, fmt: formatDec3 },
      ],
    },
    {
      title: "Engagement & Quality",
      icon: "fa-heart",
      color: "rose",
      metrics: [
        { label: "Avg. Session Length", idx: 21, fmt: formatTime },
        { label: "Avg. Playtime", idx: 22, fmt: formatTime },
        { label: "Day 1 Retention", idx: 23, fmt: formatPct },
        { label: "Day 3 Retention", idx: 24, fmt: formatPct },
      ],
    },
    {
      title: "Revenue Health",
      icon: "fa-hand-holding-dollar",
      color: "orange",
      metrics: [
        { label: "Return On Ad Spend", idx: 27, fmt: formatPct },
        { label: "Avg Ad per user", idx: 12, fmt: formatDec },
        {
          label: "User Ad Failure Rate",
          idx: 25,
          fmt: formatPct,
          invert: true,
        },
        {
          label: "Ad Request Failure %",
          idx: 26,
          fmt: formatPct,
          invert: true,
        },
      ],
    },
  ];

  const isCompare =
    dashboardMode === "compare" && lastCompLayers && lastCompLayers.length > 0;
  const slotLetters = ["B", "C", "D"];

  container.className = "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6";

  container.innerHTML = categories
    .map((cat, i) => {
      let headersHTML = "";
      if (isCompare) {
        headersHTML = `
            <div class="flex justify-between items-center px-2 py-2 border-b border-slate-200/80 mb-2 bg-slate-50 rounded-t-lg">
              <span class="w-[30%] text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">KPI</span>
              <div class="flex-1 flex items-center">
                <span class="flex-1 text-center text-[9px] font-black text-slate-400 tracking-widest leading-[1.1]">${getLayerLabel(0)}</span>
                      ${lastCompLayers.map((_, idx) => `<span class="flex-1 text-center text-[9px] font-black text-slate-400 tracking-widest border-l border-slate-200/60 leading-[1.1]">${getLayerLabel(idx + 1)}</span>`).join("")}
              </div>
            </div>
          `;
      }

      const metricsHTML = cat.metrics
        .map((m, mIdx) => {
          const baseRaw = lastData[m.idx];
          const baseFormatted = m.fmt(baseRaw);

          if (!isCompare) {
            return `
              <div class="flex justify-between items-center px-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group animate-slide-up" style="animation-fill-mode: both; animation-delay: ${150 + mIdx * 60}ms">
                <span class="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">${m.label}</span>
                <span class="text-[12px] font-black text-slate-800 tabular-nums bg-white border border-slate-200/80 shadow-sm px-2.5 py-1 rounded-md transition-colors">${baseFormatted}</span>
              </div>
            `;
          } else {
            let compValsHTML = lastCompLayers
              .map((layer) => {
                const compRaw = layer.data[m.idx];
                const compVal = m.fmt(compRaw);

                const isAbs = [
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20,
                  23, 24, 25, 26, 27,
                ].includes(m.idx);
                let delta = 0;
                let deltaStr = "";

                if (isAbs) {
                  delta = compRaw - baseRaw;
                  deltaStr =
                    delta > 0
                      ? `+${delta.toFixed(2)}pp`
                      : `${delta.toFixed(2)}pp`;
                } else {
                  if (baseRaw !== 0) {
                    delta = ((compRaw - baseRaw) / baseRaw) * 100;
                  } else if (compRaw > 0) {
                    delta = 100;
                  }
                  deltaStr =
                    delta > 0
                      ? `+${delta.toFixed(2)}%`
                      : `${delta.toFixed(2)}%`;
                }

                let isPositive = m.invert ? delta <= 0 : delta >= 0;

                const pillClass = isPositive ? "bg-emerald-500" : "bg-rose-500";
                const arrowClass = isPositive
                  ? "border-t-emerald-500"
                  : "border-t-rose-500";

                return `
                <div class="flex-1 flex justify-center items-center px-1 border-l border-slate-200/60">
                  <div class="relative w-full max-w-[80px] h-[32px] flex justify-center items-center rounded-lg transition-all duration-200 hover:bg-slate-100 hover:shadow-inner hover:scale-95 cursor-default group/cell">
                    <span class="text-[11px] font-bold text-slate-700 group-hover/cell:text-slate-900 group-hover/cell:font-black transition-all tabular-nums">${compVal}</span>
                    
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover/cell:opacity-100 transition-all duration-200 pointer-events-none z-[100] transform translate-y-2 group-hover/cell:translate-y-0 flex flex-col items-center drop-shadow-lg">
                       <div class="px-3 py-1.5 rounded-xl text-[12px] font-black text-white ${pillClass} whitespace-nowrap tracking-tight leading-none shadow-sm">${deltaStr}</div>
                       <div class="w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] ${arrowClass} -mt-[0.5px]"></div>
                    </div>
                  </div>
                </div>
              `;
              })
              .join("");

            return `
              <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-100/50 last:border-0 hover:bg-slate-50 transition-colors group animate-slide-up" style="animation-fill-mode: both; animation-delay: ${150 + mIdx * 60}ms">
                <span class="w-[30%] text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors truncate pr-2">${m.label}</span>
                <div class="flex-1 flex items-center">
                  <div class="flex-1 flex justify-center items-center px-1">
                    <div class="relative w-full max-w-[80px] h-[32px] flex justify-center items-center rounded-lg border border-transparent transition-all duration-200 group-hover:bg-white group-hover:border-slate-200/80 group-hover:shadow-sm">
                      <span class="text-[11px] font-black text-slate-800 tabular-nums">${baseFormatted}</span>
                    </div>
                  </div>
                  ${compValsHTML}
                </div>
              </div>
            `;
          }
        })
        .join("");

      return `
      <div class="premium-card p-6 break-inside-avoid mb-6" style="--card-color: ${tailwindColors[cat.color].hex}; --card-tint: ${tailwindColors[cat.color].glass}; animation: slideUpRow 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; animation-delay: ${i * 80}ms; opacity: 0;">
        <div class="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100/50">
          <div class="dataset-icon-container w-10 h-10 rounded-[10px] bg-white border border-slate-100 shadow-sm flex items-center justify-center" style="color: var(--card-color)">
            ${cat.icon.startsWith("<") ? cat.icon : `<i class="fas ${cat.icon} text-base"></i>`}
          </div>
          <h5 class="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em]">${cat.title}</h5>
        </div>
        ${headersHTML}
        <div class="space-y-1">
          ${metricsHTML}
        </div>
      </div>
    `;
    })
    .join("");
}
function toggleRetentionMode(mode) {
  retentionChartMode = mode;
  const instBtn = document.getElementById("btn-ret-install");
  const onbBtn = document.getElementById("btn-ret-onboard");

  if (mode === "install") {
    instBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm text-blue-600";
    onbBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-slate-500 hover:text-slate-700";
  } else {
    onbBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm text-blue-600";
    instBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-slate-500 hover:text-slate-700";
  }

  renderRetentionChart();
  updateDynamicRetentionCard();
}

function updateDynamicRetentionCard() {
  const card = document.getElementById("dynamic-ret-card");
  if (!card || !lastData) return;

  const isInstall = retentionChartMode === "install";
  const cData = isInstall
    ? {
        label: "Total Installs",
        val: lastData[0].toLocaleString(),
        rawVal: lastData[0],
        index: 0,
        icon: "fa-download",
        color: "blue",
      }
    : {
        label: "Onboarded Users",
        val: lastData[13].toLocaleString(),
        rawVal: lastData[13],
        index: 13,
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 1.25em; height: 1.25em;"><path d="M4.5 3.5C3.5 3.5 2.5 4.3 2.5 5.3v13.4c0 1 1 1.8 2 1.8l7.5 1.7c.8.2 1.5-.4 1.5-1.2V3c0-.8-.7-1.4-1.5-1.2L4.5 3.5z"/><circle cx="9.5" cy="12" r="1.3" fill="white"/><path d="M23.5 10.5h-5.5v-2.5l-4 4 4 4v-2.5h5.5v-3z"/><path d="M15 2v2h4c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1h-4v2h4c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3h-4z"/></svg>`,
        color: "violet",
      };

  card.style.transition = "opacity 0.2s ease-in-out";
  card.style.opacity = "0";

  setTimeout(() => {
    const newHTML = generateOverviewCard(
      cData,
      0,
      lastCompLayers,
      "dynamic-ret-card",
    );
    card.outerHTML = newHTML;

    const newCard = document.getElementById("dynamic-ret-card");
    if (newCard) {
      newCard.style.animation = "none";
      newCard.style.transform = "translateY(0)"; // Locks hover transform anomaly
      newCard.style.opacity = "0";
      void newCard.offsetWidth; // Trigger reflow
      newCard.style.transition = "opacity 0.3s ease-in-out";
      newCard.style.opacity = "1";

      setTimeout(() => {
        newCard.style.transition = "";
        // Keeping transform inline seamlessly prevents the hover popup
      }, 300);
    }
  }, 200);
}

function renderRetentionChart() {
  if (!lastData) return;
  const ctx = document.getElementById("funnelChart").getContext("2d");
  const infoContent = document.getElementById("ret-info-content");
  if (retentionChartMode === "install") {
    infoContent.innerHTML = `
      <p class="text-blue-400 font-black uppercase tracking-widest text-[9px] mb-2">Vs Install</p>
      <p class="text-slate-300">Tracks retention from the first time the app is opened to each level reached. This represents the absolute user funnel from install.</p>`;
  } else {
    infoContent.innerHTML = `
      <p class="text-violet-400 font-black uppercase tracking-widest text-[9px] mb-2">Vs Onboarded</p>
      <p class="text-slate-300">Tracks retention from the start of Level 1 or 2 (onboarding completion) to each hit point. This measures how well players stay after actually starting the game.</p>`;
  }

  const baseValues =
    retentionChartMode === "install"
      ? lastData.slice(1, 7)
      : lastData.slice(14, 20);

  const label =
    retentionChartMode === "install" ? "Reach %" : "Onboard to Lvl %";

  const isCompare =
    dashboardMode === "compare" && lastCompLayers && lastCompLayers.length > 0;
  let datasets = [];

  const layerColors = [
    { hex: "#83A95C", rgb: "131, 169, 92" },
    { hex: "#944E6C", rgb: "148, 78, 108" },
    { hex: "#433D3C", rgb: "67, 61, 60" },
    { hex: "#3b82f6", rgb: "59, 130, 246" },
  ];

  const createGradient = (ctx, chartArea, rgb) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, `rgba(${rgb}, 0.45)`);
    gradient.addColorStop(0.5, `rgba(${rgb}, 0.15)`);
    gradient.addColorStop(1, `rgba(${rgb}, 0.05)`);
    return gradient;
  };

  const addLayerDataset = (dataVals, layerIdx, customLabel = null) => {
    const color = layerColors[layerIdx];
    datasets.push({
      label: customLabel || getLayerLabel(layerIdx),
      data: dataVals,
      borderColor: color.hex,
      borderWidth: 3,
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        return createGradient(ctx, chartArea, color.rgb);
      },
      fill: true,
      tension: 0.45,
      pointRadius: 5,
      pointBackgroundColor: color.hex,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: color.hex,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2.5,
    });
  };

  if (!isCompare) {
    addLayerDataset(baseValues, 0, label);
  } else {
    addLayerDataset(baseValues, 0);
    lastCompLayers.forEach((layer, idx) => {
      const compValues =
        retentionChartMode === "install"
          ? layer.data.slice(1, 7)
          : layer.data.slice(14, 20);
      addLayerDataset(compValues, idx + 1);
    });
  }

  if (charts.funnel) charts.funnel.destroy();
  charts.funnel = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Lvl 20", "Lvl 50", "Lvl 70", "Lvl 100", "Lvl 150", "Lvl 200"],
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
        delay: (context) =>
          context.type === "data" ? context.dataIndex * 50 : 0,
      },
      plugins: {
        legend: {
          display: isCompare,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: { family: "Outfit", size: 10, weight: "bold" },
            color: "#64748b",
          },
        },
        tooltip: {
          enabled: true,
          usePointStyle: true,
          boxPadding: 4,
          displayColors: isCompare,
          backgroundColor: "#1e293b",
          padding: 15,
          cornerRadius: 12,
          titleFont: {
            family: "Outfit",
            size: isCompare ? 11 : 0,
            color: "#94a3b8",
            weight: "bold",
          },
          bodyFont: { family: "Outfit", size: 14, weight: "700" },
          callbacks: {
            title: (ctxs) => (isCompare ? ctxs[0].label : ""),
            label: (ctx) =>
              `${isCompare ? ctx.dataset.label : ctx.label}: ${ctx.raw.toFixed(2)}%`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: "rgba(0,0,0,0.02)", drawBorder: false },
          ticks: {
            font: { family: "Outfit", size: 10, weight: "600" },
            callback: (v) => v + "%",
          },
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: "Outfit", size: 10, weight: "600" } },
        },
      },
    },
  });
}

function renderAdDepthChart() {
  if (!lastData) return;
  const values = lastData.slice(7, 12);
  const ctx = document.getElementById("adDepthChart").getContext("2d");
  const tableContainer = document.getElementById("ad-depth-table-container");
  const infoContent = document.getElementById("ads-info-content");
  infoContent.innerHTML = `
    <p class="text-emerald-400 font-black uppercase tracking-widest text-[9px] mb-2">Ad Depth Reach</p>
    <p class="text-slate-300">Shows the % of active users who hit specific ad milestones. Use this to find our "power watchers" and check if ads are balanced.</p>`;
  const labels = ["10 Ads", "20 Ads", "40 Ads", "70 Ads", "100 Ads"];

  const isCompare =
    dashboardMode === "compare" && lastCompLayers && lastCompLayers.length > 0;

  let tableHTML = "";
  let datasets = [];

  const palette = [
    { bg: "#84B179", hover: "#709c66", text: "text-white" },
    { bg: "#A2CB8B", hover: "#8bb574", text: "text-slate-900" },
    { bg: "#C7EABB", hover: "#b0d6a3", text: "text-slate-900" },
    { bg: "#E8F5BD", hover: "#d1e0a6", text: "text-slate-900" },
  ];

  if (!isCompare) {
    tableHTML = `
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-slate-100">
            <th class="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Milestone</th>
            <th class="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">User Reach %</th>
          </tr>
        </thead>
        <tbody>
          ${labels
            .map(
              (label, i) => `
            <tr class="group hover:bg-slate-50 transition-colors animate-slide-up" style="animation-fill-mode: both; animation-delay: ${150 + i * 80}ms">
              <td class="px-4 py-3 text-xs font-bold text-slate-600">${label}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-black text-slate-800">${values[i].toFixed(2)}%</span>
                  <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                    <div class="h-full rounded-full" style="width: ${values[i]}%; background-color: ${palette[0].bg};"></div>
                  </div>
                </div>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;

    datasets.push({
      label: "Reach %",
      data: values,
      backgroundColor: palette[0].bg,
      hoverBackgroundColor: palette[0].hover,
      borderRadius: 10,
      barThickness: 45,
      borderWidth: 0,
    });
  } else {
    const headers = [
      "Milestone",
      getLayerLabel(0),
      ...lastCompLayers.map((_, i) => getLayerLabel(i + 1)),
    ];

    let rowsHTML = labels
      .map((label, idx) => {
        const baseVal = values[idx];

        let rowCols = `<td class="px-4 py-3 text-xs font-bold text-slate-500 border-b border-slate-100/50 sticky left-0 bg-white group-hover:bg-slate-50 group-hover:text-slate-900 transition-colors z-10">${label}</td>`;

        rowCols += `<td class="px-2 py-1.5 border-b border-l border-slate-100/50 text-center bg-slate-50/30">
          <div class="relative w-full h-full flex justify-center items-center py-2.5 rounded-xl transition-all duration-200 group-hover:bg-white">
            <span class="text-xs font-black text-slate-800">${baseVal.toFixed(2)}%</span>
          </div>
        </td>`;

        lastCompLayers.forEach((layer, lIdx) => {
          const compVal = layer.data[7 + idx];
          let delta = compVal - baseVal;
          const deltaStr =
            delta > 0 ? `+${delta.toFixed(2)}pp` : `${delta.toFixed(2)}pp`;

          const pillClass = delta >= 0 ? "bg-emerald-500" : "bg-rose-500";
          const arrowClass =
            delta >= 0 ? "border-t-emerald-500" : "border-t-rose-500";

          rowCols += `
          <td class="px-2 py-1.5 border-b border-l border-slate-100/50 min-w-[90px] text-center">
            <div class="relative w-full h-full flex justify-center items-center py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100 hover:shadow-inner hover:scale-95 cursor-default group/cell">
              <span class="text-xs font-bold text-slate-700 group-hover/cell:text-slate-900 group-hover/cell:font-black transition-all">${compVal.toFixed(2)}%</span>
              
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover/cell:opacity-100 transition-all duration-200 pointer-events-none z-[100] transform translate-y-2 group-hover/cell:translate-y-0 flex flex-col items-center drop-shadow-lg">
                 <div class="px-4 py-2 rounded-xl text-[13px] font-black text-white ${pillClass} whitespace-nowrap tracking-tight leading-none shadow-sm">${deltaStr} <span class="font-bold opacity-90 text-[10px] ml-0.5"></span></div>
                 <div class="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] ${arrowClass} -mt-[0.5px]"></div>
              </div>
            </div>
          </td>`;
        });

        return `<tr class="animate-slide-up group" style="animation-fill-mode: both; animation-delay: ${150 + idx * 80}ms">${rowCols}</tr>`;
      })
      .join("");

    tableHTML = `
      <div class="overflow-x-auto custom-scrollbar pb-6 rounded-xl pt-12 -mt-12">
        <table class="w-full text-left whitespace-nowrap border-separate border-spacing-0">
          <thead>
            <tr>
              ${headers
                .map((h, i) => {
                  if (i === 0)
                    return `<th class="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100/50 sticky left-0 bg-white z-20">${h}</th>`;
                  return `<th class="px-4 py-3 text-[9px] font-black tracking-widest border-b border-l border-slate-100/50 text-center ${palette[i - 1].text}" style="background-color: ${palette[i - 1].bg};">${h}</th>`;
                })
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;

    datasets.push({
      label: getLayerLabel(0),
      data: values,
      backgroundColor: palette[0].bg,
      hoverBackgroundColor: palette[0].hover,
      borderRadius: 6,
      borderWidth: 0,
    });

    lastCompLayers.forEach((layer, i) => {
      datasets.push({
        label: getLayerLabel(i + 1),
        data: layer.data.slice(7, 12),
        backgroundColor: palette[i + 1].bg,
        hoverBackgroundColor: palette[i + 1].hover,
        borderWidth: 0,
        borderRadius: 6,
      });
    });
  }

  // Only inject HTML on initial data pull when container is empty to stop tab-switch reflow drops
  if (!tableContainer.innerHTML.trim()) {
    tableContainer.innerHTML = tableHTML;
  }

  if (charts.ads) charts.ads.destroy();

  charts.ads = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
        delay: (context) =>
          context.type === "data" ? context.dataIndex * 100 : 0,
      },
      plugins: {
        legend: {
          display: isCompare,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: { family: "Outfit", size: 10, weight: "bold" },
            color: "#64748b",
          },
        },
        tooltip: {
          enabled: true,
          displayColors: isCompare,
          backgroundColor: "#1e293b",
          padding: 15,
          cornerRadius: 12,
          titleFont: {
            family: "Outfit",
            size: isCompare ? 11 : 0,
            color: "#94a3b8",
            weight: "bold",
          },
          bodyFont: { family: "Outfit", size: 14, weight: "700" },
          callbacks: {
            title: (ctxs) => (isCompare ? ctxs[0].label : ""),
            label: (ctx) =>
              `${isCompare ? ctx.dataset.label : ctx.label}: ${ctx.raw.toFixed(2)}%`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.02)" },
          ticks: {
            font: { family: "Outfit", size: 10, weight: "bold" },
            callback: (v) => v + "%",
          },
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: "Outfit", size: 10, weight: "bold" } },
        },
      },
    },
  });
}

function togglePerformanceMode(mode) {
  performanceMode = mode;
  const impactBtn = document.getElementById("btn-perf-impact");
  const efficiencyBtn = document.getElementById("btn-perf-efficiency");

  if (mode === "impact") {
    impactBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm text-blue-600";
    efficiencyBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-slate-500 hover:text-slate-700";
  } else {
    efficiencyBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all bg-white shadow-sm text-blue-600";
    impactBtn.className =
      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-slate-500 hover:text-slate-700";
  }
  renderFrictionChart();
}

function renderFrictionChart() {
  if (!lastData) return;
  const ctx = document.getElementById("frictionChart").getContext("2d");
  const infoContent = document.getElementById("perf-info-content");
  const legendContainer = document.getElementById("perf-legend-container");

  const labels = [
    "Onboard-Lvl 20",
    "Lvl 20-50",
    "Lvl 50-70",
    "Lvl 70-100",
    "Lvl 100-150",
    "Lvl 150-200",
  ];
  const gaps = [20, 30, 20, 30, 50, 50];

  const isCompare =
    dashboardMode === "compare" && lastCompLayers && lastCompLayers.length > 0;

  const calcData = (rawData) => {
    const reach = rawData.slice(14, 20);
    const frictionDrop = [
      reach[0],
      ((reach[0] - reach[1]) / reach[0]) * 100,
      ((reach[1] - reach[2]) / reach[1]) * 100,
      ((reach[2] - reach[3]) / reach[2]) * 100,
      ((reach[3] - reach[4]) / reach[3]) * 100,
      ((reach[4] - reach[5]) / reach[4]) * 100,
    ];
    const safeFrictionDrop = frictionDrop.map((v) =>
      isNaN(v) || !isFinite(v) ? 0 : v,
    );
    const piData = safeFrictionDrop.map((val, i) =>
      Math.pow(Math.max(0, val) / 100, 1 / gaps[i]),
    );
    return { frictionDrop: safeFrictionDrop, piData };
  };

  const baseCalc = calcData(lastData);
  let datasets = [];
  let tooltipLabel, yAxisLabel;

  const colorMap = {
    0: "#35d05e", // high (max)
    1: "#7ce09a", // high (low)
    2: "#98a6ae", // mid (high)
    3: "#b9d5e6", // mid (low)
    4: "#ffa1a9", // low (low)
    5: "#ff3f42", // low (max)
  };

  const getEfficiencyColors = (piData, layerIndex) => {
    const rankedIndices = piData
      .map((val, idx) => ({ val, idx }))
      .sort((a, b) => b.val - a.val)
      .map((item) => item.idx);

    let colors = new Array(6);
    const alpha = 1 - layerIndex * 0.15; // Layer variants: 100%, 85%, 70%, 55%

    rankedIndices.forEach((originalIdx, rank) => {
      const hex = colorMap[rank];
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      colors[originalIdx] = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    });
    return colors;
  };

  infoContent.innerHTML =
    performanceMode === "impact"
      ? `<p class="text-rose-400 font-black uppercase tracking-widest text-[9px] mb-2">Friction Drop</p><p class="text-slate-300">Shows exactly where the highest number of players are leaving the game.</p>`
      : `<p class="text-emerald-400 font-black uppercase tracking-widest text-[9px] mb-2">Group Performance</p><p class="text-slate-300">Highlights which level groups are actually the most difficult for players.</p>`;

  legendContainer.innerHTML =
    performanceMode === "efficiency"
      ? `
    <div class="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4">
      <div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-[#35d05e]"></div> Best</div>
      <div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-[#98a6ae]"></div> Moderate</div>
      <div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-[#ff3f42]"></div> Worst</div>
    </div>`
      : "";

  if (!isCompare) {
    if (performanceMode === "impact") {
      const redGradient = ctx.createLinearGradient(0, 0, 0, 400);
      redGradient.addColorStop(0, "#f87171");
      redGradient.addColorStop(1, "#ef4444");

      datasets.push({
        type: "line",
        data: baseCalc.frictionDrop,
        borderColor: "#262626",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
        order: 1,
      });

      datasets.push({
        type: "bar",
        data: baseCalc.frictionDrop,
        backgroundColor: redGradient,
        borderRadius: 8,
        barThickness: 55,
        order: 2,
      });

      tooltipLabel = "Friction Drop";
      yAxisLabel = (v) => v + "%";
    } else {
      datasets.push({
        type: "bar",
        data: baseCalc.piData,
        backgroundColor: getEfficiencyColors(baseCalc.piData, 0),
        borderRadius: 8,
        barThickness: 55,
        order: 2,
      });

      tooltipLabel = "Efficiency Index";
      yAxisLabel = (v) => v.toFixed(3);
    }
  } else {
    const slotLetters = ["B", "C", "D"];
    const redPalette = ["#D96C6C", "#E68A8A", "#F2ABAB", "#FAD4D4"]; // Vibrant equivalent to the green palette

    tooltipLabel =
      performanceMode === "impact" ? "Friction Drop" : "Efficiency Index";
    yAxisLabel =
      performanceMode === "impact" ? (v) => v + "%" : (v) => v.toFixed(3);

    datasets.push({
      label: getLayerLabel(0),
      type: "bar",
      data:
        performanceMode === "impact" ? baseCalc.frictionDrop : baseCalc.piData,
      backgroundColor:
        performanceMode === "impact"
          ? redPalette[0]
          : getEfficiencyColors(baseCalc.piData, 0),
      borderRadius: 6,
      borderWidth: 0,
    });

    lastCompLayers.forEach((layer, i) => {
      const compCalc = calcData(layer.data);
      datasets.push({
        label: getLayerLabel(i + 1),
        type: "bar",
        data:
          performanceMode === "impact"
            ? compCalc.frictionDrop
            : compCalc.piData,
        backgroundColor:
          performanceMode === "impact"
            ? redPalette[i + 1]
            : getEfficiencyColors(compCalc.piData, i + 1),
        borderRadius: 6,
        borderWidth: 0,
      });
    });
  }

  if (charts.friction) charts.friction.destroy();

  const barLabelsPlugin = {
    id: "barLabels",
    afterDatasetsDraw(chart) {
      if (!isCompare) return;
      const { ctx } = chart;

      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        if (meta.hidden || dataset.type !== "bar") return;

        const letter = isCompare
          ? getLayerLabel(i).split(" ")[0]
          : ["A", "B", "C", "D"][i];

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "900 10px Outfit";

        meta.data.forEach((bar) => {
          let yPos = bar.y - 6;
          ctx.fillStyle = "#94a3b8"; // slate-400

          if (yPos < 20) {
            yPos = bar.y + 16;
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          }

          ctx.fillText(letter, bar.x, yPos);
        });
        ctx.restore();
      });
    },
  };

  charts.friction = new Chart(ctx, {
    plugins: [barLabelsPlugin],
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
        delay: (context) =>
          context.type === "data"
            ? context.dataIndex * (isCompare ? 50 : 100)
            : 0,
      },
      plugins: {
        legend: {
          display: isCompare,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: { family: "Outfit", size: 10, weight: "bold" },
            color: "#64748b",
          },
        },
        tooltip: {
          enabled: true,
          displayColors: isCompare,
          backgroundColor: "#1e293b",
          padding: 15,
          cornerRadius: 12,
          titleFont: {
            family: "Outfit",
            size: isCompare ? 11 : 0,
            color: "#94a3b8",
            weight: "bold",
          },
          bodyFont: { family: "Outfit", size: 14, weight: "700" },
          callbacks: {
            title: (ctxs) => (isCompare ? ctxs[0].label : ""),
            label: (ctx) => {
              const val =
                performanceMode === "impact"
                  ? ctx.raw.toFixed(2) + "%"
                  : ctx.raw.toFixed(3);
              return isCompare
                ? `${ctx.dataset.label}: ${val}`
                : `${tooltipLabel}: ${val}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: performanceMode === "impact",
          min: performanceMode === "efficiency" && !isCompare ? 0.9 : undefined,
          grid: { color: "rgba(0,0,0,0.02)" },
          ticks: {
            font: { family: "Outfit", weight: "600" },
            callback: yAxisLabel,
          },
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: "Outfit", weight: "700", size: 11 } },
        },
      },
    },
  });
}

async function saveToDatabase() {
  // Get the current injection context
  const { game, gameShortName, version, day, platform } = activeInjection;
  const dataArray = lastData;

  if (!game || !version || !day || !dataArray) {
    console.warn("Missing required fields for save");
    showResultPopup(false, "Missing required fields");
    return;
  }

  // Hide confirm modal
  document.getElementById("confirm-modal").classList.add("hidden");

  // Show loading state (optional - you can add a loading modal)
  // document.getElementById("loading-modal").classList.remove("hidden");

  try {
    const finalArray = [];
    const requestBody = buildKpiRequestBody(
      game,
      version,
      day,
      dataArray,
      platform,
    );
    finalArray.push(requestBody);

    const finalFormat = {
      gameData: finalArray,
    };

    const r = await saveGameVersionKpiData(finalFormat);

    // Reset button state
    const confirmBtn = document.querySelector("#confirm-modal .bg-blue-600");
    if (confirmBtn) {
      confirmBtn.innerText = "Confirm";
      confirmBtn.disabled = false;
    }

    if (r.success) {
      // Show success popup with details
      showResultPopup(true, game, gameShortName, version, day);
    } else {
      // Show failure popup
      showResultPopup(
        false,
        game,
        gameShortName,
        version,
        day,
        r.message || "Failed to save data",
      );
    }

    console.log("Save result:", r.success, r);
  } catch (error) {
    console.error("Error saving to database:", error);
    showResultPopup(false, game, gameShortName, version, day, error.message);
  }
}

function executeDummyPush(event) {
  const btn = event.target;
  btn.innerText = "Pushing...";
  btn.disabled = true;

  // Capture selection for the success message
  const g = baseSelection.game || "Unknown Game";
  const v = baseSelection.version || "N/A";
  const d = baseSelection.day || "D0";

  setTimeout(() => {
    document.getElementById("confirm-modal").classList.add("hidden");
    const successModal = document.getElementById("success-modal");
    const details = document.getElementById("success-details");

    // Formats the detail pill to: "Detective IQ 3 | v56 | Day 0"
    const dayLabel = d === "D0" ? "Day 0" : d === "D7" ? "Day 7" : "Day 30";
    details.innerText = `${g.replace(/\s*ios\s*$/i, "")} | v${v} | ${dayLabel}`;
    successModal.classList.remove("hidden");

    btn.innerText = "Confirm";
    btn.disabled = false;
  }, 1200);
}

function validateInjection() {
  const textarea = document.getElementById("inject-textarea");
  const data = textarea ? textarea.value.trim() : "";
  const btn = document.getElementById("inject-btn");
  const warning = document.getElementById("override-warning");

  const { game, version, day } = activeInjection;
  const isFiltersSelected = game && version && day;

  // 1. Warning Logic: Check database existence immediately upon filter selection
  if (isFiltersSelected) {
    // True if the version was pulled from the backend originally
    const isExistingBackendVersion =
      STUDIO_GAMES[game] &&
      STUDIO_GAMES[game].versions &&
      STUDIO_GAMES[game].versions.includes(version);
    // True if already cached in local preview
    const isInMockDb = MOCK_DATABASE.hasOwnProperty(
      `${game}_${version}_${day}`,
    );

    if (isExistingBackendVersion || isInMockDb) {
      if (warning) warning.classList.remove("hidden");
    } else {
      if (warning) warning.classList.add("hidden");
    }
  } else {
    if (warning) warning.classList.add("hidden");
  }

  // 2. Button Logic: Require data to enable "Add to Dashboard Preview"
  const isReady = isFiltersSelected && data;

  if (isReady) {
    btn.disabled = false;
    btn.classList.replace("bg-slate-200", "bg-slate-900");
    btn.classList.replace("text-slate-400", "text-white");
  } else {
    btn.disabled = true;
    btn.classList.replace("bg-slate-900", "bg-slate-200");
    btn.classList.replace("text-white", "text-slate-400");
  }
}

window.onload = () => {
  syncAllDropdowns();
  initNavSwitcher();
  document
    .getElementById("inject-textarea")
    .addEventListener("input", validateInjection);

  // Restore dashboard mode from local storage
  const savedMode = localStorage.getItem("dashboardMode") || "single";
  if (savedMode === "compare") {
    setDashboardMode("compare", true);
  }
};

function initNavSwitcher() {
  const list = document.getElementById("nav-game-list");
  list.innerHTML = Object.keys(STUDIO_GAMES)
    .map((key) => {
      const data = STUDIO_GAMES[key];
      const isSelected = baseSelection.game === key;
      const platformIcon = data.platforms.includes("android")
        ? "android"
        : "apple";
      return `
      <div class="nav-item ${isSelected ? "selected" : ""}" data-search="${key.toLowerCase()}" onclick="pickOption('GAME', '${key}', 'base'); toggleDropdown('nav-dropdown');">
        <img src="${data.icon}" alt="${key}" />
        <p>${data.shortName || key}</p>
        <div class="platform-icon-wrap"><i class="fab fa-${platformIcon} ${platformIcon === "android" ? "text-emerald-500" : "text-slate-400"} text-[12px]"></i></div>
      </div>`;
    })
    .join("");
}

function filterNavGames() {
  const query = document.getElementById("nav-search").value.toLowerCase();
  const items = document.querySelectorAll("#nav-game-list .nav-item");
  items.forEach((item) => {
    const searchContext = item.getAttribute("data-search");
    const displayContext = item.querySelector("p").innerText.toLowerCase();
    const isMatch =
      searchContext.includes(query) || displayContext.includes(query);
    item.style.display = isMatch ? "flex" : "none";
  });
}

function filterSlotGames(index) {
  const container = document.getElementById(`sd-g-${index}`);
  const query = container.querySelector("input").value.toLowerCase();
  const items = container.querySelectorAll(".nav-item");
  items.forEach((item) => {
    const searchContext = item.getAttribute("data-search");
    const displayContext = item.querySelector("p").innerText.toLowerCase();
    const isMatch =
      searchContext.includes(query) || displayContext.includes(query);
    item.style.display = isMatch ? "flex" : "none";
  });
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  const isCurrentlyHidden = dropdown.classList.contains("hidden");

  // Close other dropdowns and safely reverse any active arrow animations
  document.querySelectorAll(".dropdown-content").forEach((d) => {
    if (d.id !== id) d.classList.add("hidden");
  });
  document
    .querySelectorAll(
      "nav .fa-chevron-down, #comp-slots-container .fa-chevron-down",
    )
    .forEach((icon) => {
      icon.classList.remove("chevron-rotate");
    });

  dropdown.classList.toggle("hidden", !isCurrentlyHidden);

  // Synchronize targeted selector arrow rotation state
  if (isCurrentlyHidden) {
    const parentContainer = dropdown.closest(".relative");
    const activeChevron = parentContainer?.querySelector(".fa-chevron-down");
    if (activeChevron) activeChevron.classList.add("chevron-rotate");

    if (id === "nav-dropdown") {
      setTimeout(() => document.getElementById("nav-search").focus(), 30);
    }
  }
}
function getBenchmarkTagsHTML(gameName, version) {
  if (!BENCHMARK_MAP[gameName]) return "";
  const wonDays = [];
  if (BENCHMARK_MAP[gameName]["D0"] === String(version)) wonDays.push("D0");
  if (BENCHMARK_MAP[gameName]["D7"] === String(version)) wonDays.push("D7");
  if (BENCHMARK_MAP[gameName]["D30"] === String(version)) wonDays.push("D30");

  if (wonDays.length > 0) {
    return `<span class="ml-auto flex items-center gap-1 bg-amber-50 border border-amber-200/60 text-amber-600 text-[10px] px-2 py-0.5 rounded-md font-black tracking-wider shadow-sm shrink-0"><i class="fas fa-crown text-[9px]"></i> ${wonDays.join(", ")}</span>`;
  }
  return "";
}

async function processBenchmarks(gameName) {
  const versions = metadata.versions[gameName] || [];
  if (versions.length === 0) return;

  const platform = STUDIO_GAMES[gameName]?.platform || "android";
  const query = [
    { game: gameName, day: "D0", versions: versions, platform },
    { game: gameName, day: "D7", versions: versions, platform },
    { game: gameName, day: "D30", versions: versions, platform },
  ];

  try {
    // 1. Silent Background Fetch for all versions of this game
    const result = await fetchGameVersionKpiData(query);
    await addServerDataToMockDatabase(result);
  } catch (e) {
    console.warn("Silent benchmark fetch failed", e);
  }

  // 2. Calculate Benchmark Winners (Index 12 is AAPU)
  BENCHMARK_MAP[gameName] = { D0: null, D7: null, D30: null };

  ["D0", "D7", "D30"].forEach((day) => {
    let maxAapu = -1;
    let bestVersion = null;

    // Check MOCK_DATABASE to include both server data and freshly injected live-test data
    const allPossibleVersions = new Set([...versions]);
    Object.keys(MOCK_DATABASE).forEach((key) => {
      // Safe parsing to support game names that might contain underscores
      const parts = key.split("_");
      if (parts.length >= 3) {
        const d = parts.pop();
        const v = parts.pop();
        const g = parts.join("_");
        if (g === gameName && d === day) allPossibleVersions.add(v);
      }
    });

    allPossibleVersions.forEach((v) => {
      const data = MOCK_DATABASE[`${gameName}_${v}_${day}`];
      if (data && data[12] !== undefined) {
        const aapu = parseFloat(data[12]);
        if (aapu > maxAapu) {
          maxAapu = aapu;
          bestVersion = v;
        }
      }
    });
    BENCHMARK_MAP[gameName][day] = bestVersion;
  });

  // 3. Trigger Dropdown UI Refreshes if they belong to this game
  if (baseSelection.game === gameName) {
    const queryStr = document.getElementById("nav-version-search")?.value || "";
    initVersionSwitcher(gameName, queryStr);
    // Live update the selected text in case a crown arrived from backend
    if (baseSelection.version) {
      const tags = getBenchmarkTagsHTML(
        gameName,
        baseSelection.version,
      ).replace("ml-auto", "");
      const nvSpan = document.getElementById("nav-current-version");
      if (nvSpan)
        nvSpan.innerHTML = `<span class="flex items-center gap-1.5">${baseSelection.version} ${tags}</span>`;
    }
  }

  selectionSlots.forEach((slot, index) => {
    if (slot.game === gameName) {
      const queryStr =
        document.getElementById(`slot-v-search-${index}`)?.value || "";
      updateSlotVersionUI(index, queryStr);
      // Live update the specific slot text without collapsing the dropdown
      if (slot.version) {
        const tags = getBenchmarkTagsHTML(gameName, slot.version).replace(
          "ml-auto",
          "",
        );
        const span = document.getElementById(`slot-v-text-${index}`);
        if (span) span.innerHTML = `${slot.version} ${tags}`;
      }
    }
  });
}
function initDaySwitcher(gameName, version) {
  const list = document.getElementById("nav-day-list");
  const btn = document.getElementById("btn-base-day");

  if (!gameName || !version) {
    btn.disabled = true;
    document.getElementById("nav-current-day").innerText = "Select Day";
    return;
  }

  btn.disabled = false;

  const defaultDays = ["D0", "D7", "D30"];
  const isBackendVersion =
    STUDIO_GAMES[gameName] &&
    STUDIO_GAMES[gameName].versions &&
    STUDIO_GAMES[gameName].versions.includes(version);

  let daysToShow = defaultDays;

  if (!isBackendVersion) {
    // It's a TEMP game/version: Only show what has been manually injected
    const availableDays = defaultDays.filter(
      (d) => MOCK_DATABASE[`${gameName}_${version}_${d}`],
    );
    if (availableDays.length > 0) daysToShow = availableDays;
  }

  list.innerHTML = daysToShow
    .map(
      (d) => `
    <button class="list-item !min-h-[40px] !text-[13px] !justify-center ${baseSelection.day === d ? "selected" : ""}"
      onclick="pickOption('DAY', '${d}', 'base'); toggleDropdown('nav-day-dropdown');">
      ${d.replace("D", "Day ")}
    </button>
  `,
    )
    .join("");
}

function initVersionSwitcher(gameName, query = "") {
  const list = document.getElementById("nav-version-list");
  if (!gameName) return;
  const baseVersions = [...(metadata.versions[gameName] || [])].reverse(); // Show latest first
  const btn = document.getElementById("btn-base-version");

  // Hoist benchmark versions to the top
  const bmVersions = baseVersions.filter(
    (v) => getBenchmarkTagsHTML(gameName, v) !== "",
  );
  const normalVersions = baseVersions.filter(
    (v) => getBenchmarkTagsHTML(gameName, v) === "",
  );
  let versions = [...bmVersions, ...normalVersions];

  if (query) {
    versions = versions.filter((v) =>
      v.toLowerCase().includes(query.toLowerCase()),
    );
  }

  // Disable button if completely empty, but not if just searching
  if (btn) btn.disabled = versions.length === 0 && !query;

  if (versions.length === 0) {
    list.innerHTML =
      '<p class="text-[10px] text-slate-400 text-center py-4 w-full">No versions found</p>';
    if (!query)
      document.getElementById("nav-current-version").innerText =
        "None Selected";
    return;
  }

  list.innerHTML = versions
    .map(
      (v) => `
    <button class="list-item !w-auto !min-h-[40px] !text-[13px] flex justify-between items-center gap-4 !px-4 ${baseSelection.version === v ? "selected" : ""}" data-search="${v}" onclick="pickOption('VERSION', '${v}', 'base'); toggleDropdown('nav-version-dropdown');">
      <span class="truncate font-bold">${v}</span>
      ${getBenchmarkTagsHTML(gameName, v)}
    </button>
  `,
    )
    .join("");
}

function filterNavVersions() {
  const query = document.getElementById("nav-version-search").value;
  initVersionSwitcher(baseSelection.game, query);
}

function filterSlotVersions(index) {
  const query = document.getElementById(`slot-v-search-${index}`).value;
  updateSlotVersionUI(index, query);
}

function syncNavSwitcher(gameName) {
  const data = STUDIO_GAMES[gameName];
  if (!data) return;

  const iconImg = document.getElementById("nav-current-icon");
  const nameSpan = document.getElementById("nav-current-game");

  iconImg.src = data.icon || "https://via.placeholder.com/32";
  iconImg.classList.remove("hidden");

  const fullName = gameName.replace(/\s*ios\s*$/i, "");
  const isAndroid =
    data.platforms?.includes("android") || data.platform === "android";
  const pIcon = isAndroid
    ? '<i class="fab fa-android text-emerald-500 text-[11px] ml-2"></i>'
    : '<i class="fab fa-apple text-slate-400 text-[11px] ml-2"></i>';

  nameSpan.innerHTML = `${fullName}${pIcon}`;

  // Update Version dropdown for this game
  initVersionSwitcher(gameName);
}

function clearDashboard() {
  // Reset all tab views to show placeholder messages
  document.getElementById("view-overview").className =
    "tab-view min-h-[400px] flex items-center justify-center";
  document.getElementById("view-overview").innerHTML =
    `<p class="text-slate-400 font-medium italic">Select a Game, Version, and Day to view primary growth KPIs and retention health.</p>`;

  document.getElementById("view-retention").className =
    "tab-view hidden min-h-[400px] flex items-center justify-center";
  document.getElementById("view-retention").innerHTML =
    `<p class="text-slate-400 font-medium italic">Select a Game, Version, and Day to track user drop-off progression across levels.</p>`;

  document.getElementById("view-ads").className =
    "tab-view hidden min-h-[400px] flex items-center justify-center";
  document.getElementById("view-ads").innerHTML =
    `<p class="text-slate-400 font-medium italic">Select a Game, Version, and Day to analyze ad-watching behavior and revenue milestones.</p>`;

  document.getElementById("view-performance").className =
    "tab-view hidden min-h-[400px] flex items-center justify-center";
  document.getElementById("view-performance").innerHTML =
    `<p class="text-slate-400 font-medium italic">Select a Game, Version, and Day to pinpoint level-based churn and gameplay bottlenecks.</p>`;

  document.getElementById("view-dataset").className =
    "tab-view hidden min-h-[400px] flex items-center justify-center";
  document.getElementById("view-dataset").innerHTML =
    `<p class="text-slate-400 font-medium italic">Select a Game, Version, and Day to view the consolidated raw metrics.</p>`;

  // Hide game header
  document.getElementById("game-header")?.classList.add("hidden");

  // Reset lastData
  lastData = null;
  lastCompLayers = null;
}

window.addEventListener("click", (e) => {
  const target = e.target;

  // 1. Close Modals on Backdrop Click
  if (
    target.id &&
    target.id.endsWith("-modal") &&
    target.classList.contains("fixed")
  ) {
    target.classList.add("hidden");
  }

  // 2. Close Dropdowns on Outside Click and reset chevron spin status
  if (
    !target.closest(".group") &&
    !target.closest(".dropdown-content") &&
    !target.closest(".slot-dropdown")
  ) {
    document
      .querySelectorAll(".dropdown-content, .slot-dropdown")
      .forEach((d) => d.classList.add("hidden"));
    document
      .querySelectorAll(
        "nav .fa-chevron-down, #comp-slots-container .fa-chevron-down",
      )
      .forEach((icon) => icon.classList.remove("chevron-rotate"));
    document
      .querySelectorAll(
        "#comp-slots-container button[onclick^='toggleSlotDropdown']",
      )
      .forEach((btn) => {
        btn.classList.remove("bg-slate-100", "border-blue-300");
        btn.classList.add("bg-white", "border-slate-200");
      });
  }
});

/**
 * Builds a KPI data payload for the backend.
 */

function buildKpiRequestBody(
  game,
  version,
  day,
  dataArray,
  platform,
  date = null,
) {
  const dataString = dataArray.join("\n");
  const gameData = STUDIO_GAMES[game];
  const gameName = gameData?.name;
  const today = date || new Date().toISOString().split("T")[0];

  return [gameName, version, day, dataArray, platform];
}

/**
 * Sends KPI data to the backend for upsert.
 */

async function saveGameVersionKpiData(payload) {
  // console.log("payload ----", payload)

  const response = await fetch(
    "https://mindyourlogic.in/api/v1/save-game-version-kpi-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameName: payload.gameData[0][0],
        version: payload.gameData[0][1],
        day: payload.gameData[0][2],
        dataArray: payload.gameData[0][3],
        platform: payload.gameData[0][4],
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "API request failed");
  }

  return result;
}

/**
 * Fetches KPI data for specified games, versions, and dates.
 */

async function fetchGameVersionKpiData(queryArray) {
  if (!Array.isArray(queryArray) || queryArray.length === 0) {
    throw new Error("queryArray must be a non-empty array");
  }

  const queryString = `gameData=${encodeURIComponent(JSON.stringify(queryArray))}`;
  const url = `https://mindyourlogic.in/api/v1/get-game-version-kpi-data?${queryString}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    console.log("-----------------------------", url);
    return data;
  } catch (error) {
    console.error("Failed to fetch KPI data:", error);
    throw error;
  }
}

async function fetchKpiFromDB(gameName, version, day, platform, isMulti = []) {
  try {
    if (isMulti.length > 0) {
      const result = await fetchGameVersionKpiData(isMulti);
      const r = await addServerDataToMockDatabase(result);
    } else {
      const query = [
        {
          date: new Date(),
          game: gameName,
          day: day,
          versions: [version],
          platform: platform,
        },
      ];
      const result = await fetchGameVersionKpiData(query);
      const r = await addServerDataToMockDatabase(result);
    }
  } catch (error) {
    console.error("Failed to fetch KPI data:", error);
    return null;
  }
}

async function refreshDashboard2() {
  const gameHeader = document.getElementById("game-header");
  const compareHeader = document.getElementById("compare-header");

  if (dashboardMode === "single") {
    compareHeader?.classList.add("hidden");
    compareHeader?.classList.remove("flex");

    const g = baseSelection.game;
    const v = baseSelection.version;
    const d = baseSelection.day;
    const p = baseSelection.platform;

    if (!g || !v || !d) {
      clearDashboard();
      return;
    }

    // Wait for data to be fetched
    await fetchKpiFromDB(g, v, d, p);

    if (g) {
      // Check if STUDIO_GAMES has the game before updating header
      if (STUDIO_GAMES && STUDIO_GAMES[g]) {
        updateGameHeader(g);
      } else {
        console.warn("Game not found in STUDIO_GAMES:", g);
      }
    }

    const data = MOCK_DATABASE[`${g}_${v}_${d}`];

    if (data) {
      updateDashboardUI(data);
    } else {
      clearDashboard();
    }
  } else {
    gameHeader?.classList.add("hidden");
    const activeSlots = selectionSlots.filter(
      (s) => s.game && s.version && s.day,
    );

    if (activeSlots.length > 0) updateCompareHeader(activeSlots);

    if (activeSlots.length < 2) {
      clearDashboard();
      return;
    }

    const activeSlotsFormatted = convertActiveSlotsToRequestFormat(activeSlots);
    await fetchKpiFromDB(null, null, null, null, activeSlotsFormatted);

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

async function addServerDataToMockDatabase(serverData) {
  let dataArray = serverData;

  while (dataArray && Array.isArray(dataArray)) {
    if (
      dataArray.length > 0 &&
      dataArray.every((item) => Array.isArray(item))
    ) {
      dataArray = dataArray.flat();
    } else if (dataArray.length === 1 && Array.isArray(dataArray[0])) {
      dataArray = dataArray[0];
    } else if (
      dataArray.length > 0 &&
      dataArray.every(
        (item) => item && typeof item === "object" && !Array.isArray(item),
      )
    ) {
      break;
    } else if (
      dataArray.length === 1 &&
      dataArray[0] &&
      typeof dataArray[0] === "object" &&
      !Array.isArray(dataArray[0])
    ) {
      break;
    } else {
      break;
    }
  }

  console.log("Unwrapped dataArray:", dataArray);

  if (dataArray && typeof dataArray === "object" && !Array.isArray(dataArray)) {
    dataArray = [dataArray];
  }

  if (!Array.isArray(dataArray)) {
    console.error("Invalid data format:", dataArray);
    return;
  }

  if (
    dataArray.length === 1 &&
    dataArray[0] &&
    typeof dataArray[0] === "object"
  ) {
    if (dataArray[0].gameData && Array.isArray(dataArray[0].gameData)) {
      dataArray = dataArray[0].gameData;
    }
  }

  console.log("Processing dataArray:", dataArray);

  for (const item of dataArray) {
    let actualItem = item;
    while (Array.isArray(actualItem) && actualItem.length > 0) {
      actualItem = actualItem[0];
    }

    if (
      actualItem &&
      typeof actualItem === "object" &&
      actualItem.game &&
      actualItem.version
    ) {
      console.log("Processing item:", actualItem.game, actualItem.version);

      const dProps = Object.keys(actualItem).filter(
        (key) => /^D_\d+$/.test(key) || /^D\d+$/.test(key),
      );

      for (const dProp of dProps) {
        const dValue = actualItem[dProp];
        if (!dValue) continue;

        const key = `${actualItem.game}_${actualItem.version}_${dProp}`;
        let values = [];

        if (Array.isArray(dValue)) {
          values = dValue;
        } else if (typeof dValue === "string") {
          values = String(dValue)
            .split("\n")
            .filter((v) => v && v.trim());
        } else {
          values = [String(dValue)];
        }

        const parsedValues = values.map((v) => {
          const trimmed = String(v).trim();
          const num = Number(trimmed);
          if (!isNaN(num) && isFinite(num)) {
            return num;
          }
          return trimmed;
        });

        MOCK_DATABASE[key] = parsedValues;
        console.log(
          `Added ${key} to MOCK_DATABASE with ${parsedValues.length} values`,
        );
      }
    } else {
      console.warn("Skipping invalid item:", actualItem);
    }
  }

  console.log("Final MOCK_DATABASE:", MOCK_DATABASE);
}

function convertActiveSlotsToRequestFormat(activeSlots) {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const grouped = {};

  activeSlots.forEach((slot) => {
    const key = `${slot.game}_${slot.day}`;
    if (!grouped[key]) {
      grouped[key] = {
        date: dateStr,
        game: slot.game,
        day: slot.day,
        versions: [],
        platform: slot.platform,
      };
    }
    if (!grouped[key].versions.includes(slot.version)) {
      grouped[key].versions.push(slot.version);
    }
  });

  return Object.values(grouped);
}

function showResultPopup(
  isSuccess,
  game,
  gameShortName,
  version,
  day,
  errorMessage = "",
) {
  const modalId = isSuccess ? "success-modal" : "error-modal";
  const modal = document.getElementById(modalId);

  if (!modal) {
    if (!isSuccess) {
      showErrorInSuccessModal(game, gameShortName, version, day, errorMessage);
    }
    return;
  }

  if (isSuccess) {
    const details = document.getElementById("success-details");
    if (details) {
      const displayName = gameShortName || game?.replace(/\s*ios\s*$/i, "");
      const dayLabel =
        day === "D0" ? "Day 0" : day === "D7" ? "Day 7" : "Day 30";
      details.innerText = `${displayName} | v${version} | ${dayLabel}`;
    }
  } else {
    const errorDetails = document.getElementById("error-details");
    const errorMessageEl = document.getElementById("error-message");
    if (errorDetails) {
      const displayName =
        gameShortName || game?.replace(/\s*ios\s*$/i, "") || "Unknown";
      const versionText = version || "N/A";
      const dayLabel =
        day === "D0" ? "Day 0" : day === "D7" ? "Day 7" : "Day 30";
      errorDetails.innerText = `${displayName} | v${versionText} | ${dayLabel}`;
    }
    if (errorMessageEl) {
      errorMessageEl.innerText = errorMessage || "An unknown error occurred";
    }
  }

  modal.classList.remove("hidden");
}

function showErrorInSuccessModal(
  game,
  gameShortName,
  version,
  day,
  errorMessage,
) {
  const successModal = document.getElementById("success-modal");
  if (!successModal) return;

  const iconContainer = successModal.querySelector(".bg-emerald-50");
  const icon = successModal.querySelector(".fa-check-circle");
  const title = successModal.querySelector("h3");
  const subtitle = successModal.querySelector("p.text-slate-400");

  if (iconContainer) {
    iconContainer.classList.remove("bg-emerald-50", "text-emerald-500");
    iconContainer.classList.add("bg-rose-50", "text-rose-500");
  }
  if (icon) {
    icon.classList.remove("fa-check-circle");
    icon.classList.add("fa-times-circle");
  }
  if (title) {
    title.innerText = "Failed to Save";
    title.classList.add("text-rose-600");
  }
  if (subtitle) {
    subtitle.innerText = "Synchronization Failed";
  }

  const details = document.getElementById("success-details");
  if (details) {
    const displayName =
      gameShortName || game?.replace(/\s*ios\s*$/i, "") || "Unknown";
    const versionText = version || "N/A";
    const dayLabel = day === "D0" ? "Day 0" : day === "D7" ? "Day 7" : "Day 30";
    details.innerText = `${displayName} | v${versionText} | ${dayLabel}`;
  }

  const detailsContainer = details?.parentElement;
  if (detailsContainer) {
    const errorMsgEl = document.createElement("p");
    errorMsgEl.className = "text-rose-500 text-xs font-medium mt-2";
    errorMsgEl.innerText = errorMessage || "Failed to save data";
    detailsContainer.appendChild(errorMsgEl);
  }

  successModal.classList.remove("hidden");
}

async function convertToStudioGamesFormat(gameData) {
  const STUDIO_GAMES_OBJ = {};

  gameData.forEach((game) => {
    // If game already exists, merge versions instead of overwriting
    if (STUDIO_GAMES_OBJ[game.name]) {
      // Merge versions array (avoid duplicates)
      const existingVersions = STUDIO_GAMES_OBJ[game.name].versions || [];
      const newVersions = game.versions || [];
      const mergedVersions = [
        ...new Set([...existingVersions, ...newVersions]),
      ];

      STUDIO_GAMES_OBJ[game.name].versions = mergedVersions;

      // Merge platforms if needed
      if (
        game.platform &&
        !STUDIO_GAMES_OBJ[game.name].platforms.includes(game.platform)
      ) {
        STUDIO_GAMES_OBJ[game.name].platforms.push(game.platform);
      }
    } else {
      // New game - create entry
      STUDIO_GAMES_OBJ[game.name] = {
        name: game.name,
        displayName: game.displayName,
        shortName: game.shortName,
        icon: game.icon,
        platform: game.platform,
        versions: game.versions || [],
        platforms: [game.platform],
      };
    }
  });

  return STUDIO_GAMES_OBJ;
}

async function loadGameData() {
  try {
    const response = await fetch("https://mindyourlogic.in/get-dropdown-data", {
      method: "GET",
      mode: "cors",
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();

      console.log("-----------------", data);

      if (data && Array.isArray(data) && data.length > 0) {
        const gameData = data.map((game) => ({
          // Use original name as is
          name: game.name, // Keep as "Detective IQ 2", not "detective iq 2"
          displayName: game.displayName,
          shortName: game.shortName || game.name.substring(0, 2).toUpperCase(),
          icon: game.icon || "",
          platform: game.platform,
          // Force string cast to prevent strict equality crashes against database integers
          versions: (game.versions || []).map(String),
        }));

        const newStudioGames = await convertToStudioGamesFormat(gameData);

        // Clear and update STUDIO_GAMES
        Object.keys(STUDIO_GAMES).forEach((key) => delete STUDIO_GAMES[key]);
        Object.assign(STUDIO_GAMES, newStudioGames);

        console.log("STUDIO_GAMES object:", STUDIO_GAMES);

        updateMetadataFromStudioGames();

        if (typeof syncAllDropdowns === "function") syncAllDropdowns();
        if (typeof initNavSwitcher === "function") initNavSwitcher();
        if (typeof renderCompSlots === "function") renderCompSlots();

        return STUDIO_GAMES;
      }
    }
  } catch (error) {
    console.error("Error loading game data:", error);
  }
}

// Call loadGameData immediately
loadGameData();

function updateMetadataFromStudioGames() {
  metadata.games = Object.keys(STUDIO_GAMES);
  metadata.versions = {};

  Object.keys(STUDIO_GAMES).forEach((gameKey) => {
    const gameData = STUDIO_GAMES[gameKey];
    // Clone the array to prevent local version additions from mutating the backend list
    metadata.versions[gameKey] = [...(gameData.versions || [])];
  });

  console.log("Metadata updated:", metadata);
}

// Load games on page load
loadGameData();

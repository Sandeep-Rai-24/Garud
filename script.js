(() => {
  "use strict";

  // ==========================================
  // GARUD AI — LIVE AIR OPERATIONS
  // Interactive demonstration prototype
  // ==========================================

  const aircraft = [
    {
      id: "A-01",
      name: "Aircraft A-01",
      type: "Fighter",
      task: "Readiness assessment",
      region: "Northern region",
      status: "Ready",
      lat: 31.2,
      lng: 77.1,
      photo: "assets/aircraft/fighter-reference.jpg",
      kind: "fighter",
      code: "A01"
    },
    {
      id: "B-02",
      name: "Aircraft B-02",
      type: "Transport",
      task: "Logistics simulation",
      region: "Central region",
      status: "In transit (simulated)",
      lat: 26.8,
      lng: 80.9,
      photo: "assets/aircraft/transport-reference.jpg",
      kind: "transport",
      code: "B02"
    },
    {
      id: "C-03",
      name: "Aircraft C-03",
      type: "Surveillance",
      task: "Monitoring scenario",
      region: "Eastern region",
      status: "Awaiting review",
      lat: 26.1,
      lng: 91.7,
      photo: "assets/aircraft/surveillance-reference.jpg",
      kind: "surveillance",
      code: "C03"
    },
    {
      id: "D-04",
      name: "Aircraft D-04",
      type: "Training",
      task: "Training scenario",
      region: "Western region",
      status: "Ready",
      lat: 19.1,
      lng: 72.9,
      photo: "assets/aircraft/training-reference.jpg",
      kind: "training",
      code: "D04"
    },
    {
      id: "E-05",
      name: "Aircraft E-05",
      type: "Transport",
      task: "Resource planning",
      region: "Southern region",
      status: "In transit (simulated)",
      lat: 13.1,
      lng: 80.3,
      photo: "assets/aircraft/transport-reference-2.jpg",
      kind: "transport",
      code: "E05"
    },
    {
      id: "F-06",
      name: "Aircraft F-06",
      type: "Fighter",
      task: "Scenario review",
      region: "North-central region",
      status: "Awaiting review",
      lat: 28.6,
      lng: 77.2,
      photo: "assets/aircraft/fighter-reference-2.jpg",
      kind: "fighter",
      code: "F06"
    }
  ];

  const $ = id => document.getElementById(id);

  let map = null;
  let markers = new Map();
  let routeLayers = [];

  let selectedId = "A-01";
  let paused = false;
  let routesVisible = true;
  let eventCount = 3;

  // ==========================================
  // NOTIFICATION
  // ==========================================

  function notify(message) {
    const toast = $("opsToast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(notify.timer);

    notify.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  // ==========================================
  // STATUS HELPERS
  // ==========================================

  function getStatusType(status) {
    const value = status.toLowerCase();

    if (value.includes("review")) {
      return "review";
    }

    if (value.includes("transit")) {
      return "transit";
    }

    return "ready";
  }

  function updateSummary() {
    $("opsAssetCount").textContent =
      String(aircraft.length).padStart(2, "0");

    $("opsTransitCount").textContent =
      String(
        aircraft.filter(
          item => getStatusType(item.status) === "transit"
        ).length
      ).padStart(2, "0");

    $("opsReviewCount").textContent =
      String(
        aircraft.filter(
          item => getStatusType(item.status) === "review"
        ).length
      ).padStart(2, "0");

    $("opsEventCount").textContent =
      String(eventCount).padStart(2, "0");
  }

  // ==========================================
  // AIRCRAFT IMAGE HANDLING
  // ==========================================

  function setAircraftImage(imageId, placeholderId, imagePath) {
    const image = $(imageId);
    const placeholder = $(placeholderId);

    if (!image || !placeholder) return;

    image.style.display = "none";
    placeholder.style.display = "block";

    image.onload = () => {
      image.style.display = "block";
      placeholder.style.display = "none";
    };

    image.onerror = () => {
      image.style.display = "none";
      placeholder.style.display = "block";
    };

    image.src = imagePath;
  }

  // ==========================================
  // SELECT AIRCRAFT
  // ==========================================

  function selectAircraft(id, panToAircraft = true) {
    const item = aircraft.find(a => a.id === id);

    if (!item) return;

    selectedId = id;

    $("opsSelectedName").textContent = item.name;

    $("opsSelectedType").textContent =
      `${item.type} · Sample record`;

    $("opsSelectedId").textContent =
      `GARUD-DEMO-${item.code}`;

    $("opsSelectedTask").textContent = item.task;

    $("opsSelectedRegion").textContent = item.region;

    $("opsSelectedResource").textContent = item.status;

    $("opsSelectedUpdated").textContent =
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      });

    // Update status badge.

    const badge = $("opsSelectedStatus");
    const statusType = getStatusType(item.status);

    badge.textContent = item.status.toUpperCase();

    if (statusType === "review") {
      badge.style.background = "#fff0dc";
      badge.style.color = "#a56c19";
    } else if (statusType === "transit") {
      badge.style.background = "#e5f1ff";
      badge.style.color = "#226fa7";
    } else {
      badge.style.background = "#e4f5eb";
      badge.style.color = "#18824f";
    }

    // Load aircraft reference image.

    setAircraftImage(
      "opsSelectedImage",
      "opsSelectedPlaceholder",
      item.photo
    );

    // Highlight selected registry card.

    document.querySelectorAll(".ops-asset-card").forEach(card => {
      card.classList.toggle(
        "selected",
        card.dataset.id === id
      );
    });

    // Move map to selected marker.

    if (
      panToAircraft &&
      map &&
      markers.has(id)
    ) {
      map.panTo(markers.get(id).getLatLng());
    }

    // Open marker details if available.

    if (markers.has(id)) {
      markers.get(id).openPopup();
    }
  }

  // ==========================================
  // MAP MARKER ICON
  // ==========================================

  function createAircraftIcon(item) {
    return L.divIcon({
      className: "",
      html: `
        <div class="ops-air-marker ${item.kind}">
          ✈
        </div>
      `,
      iconSize: [29, 29],
      iconAnchor: [14, 14]
    });
  }

  // ==========================================
  // AIRCRAFT REGISTRY
  // ==========================================

  function renderRegistry(items) {
    const registry = $("opsRegistry");

    registry.innerHTML = "";

    $("opsRegistryCount").textContent =
      `${String(items.length).padStart(2, "0")} SAMPLE RECORDS`;

    items.forEach(item => {
      const card = document.createElement("article");

      card.className =
        "ops-asset-card" +
        (item.id === selectedId ? " selected" : "");

      card.dataset.id = item.id;
      card.tabIndex = 0;
      card.setAttribute("role", "button");

      card.setAttribute(
        "aria-label",
        `Select ${item.name}`
      );

      const statusType = getStatusType(item.status);

      card.innerHTML = `
        <div class="ops-asset-photo">

          <img
            alt="${item.type} reference photo"
            src="${item.photo}"
          >

          <div class="ops-asset-placeholder">
            <span>✈</span>
            <small>Aircraft image slot</small>
          </div>

          <span class="ops-asset-type">
            ${item.type.toUpperCase()}
          </span>

        </div>

        <div class="ops-asset-content">

          <h3>${item.name}</h3>

          <p>${item.region} · ${item.id}</p>

          <div class="ops-asset-bottom">

            <span class="ops-asset-status ${statusType}">
              ${item.status}
            </span>

            <button
              class="ops-asset-open"
              type="button"
            >
              View record ↗
            </button>

          </div>

        </div>
      `;

      const image = card.querySelector("img");

      const placeholder =
        card.querySelector(".ops-asset-placeholder");

      image.onload = () => {
        image.style.display = "block";
        placeholder.style.display = "none";
      };

      image.onerror = () => {
        image.style.display = "none";
        placeholder.style.display = "block";
      };

      card.addEventListener("click", () => {
        selectAircraft(item.id);
      });

      card.addEventListener("keydown", event => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          selectAircraft(item.id);
        }
      });

      registry.appendChild(card);
    });
  }

  // ==========================================
  // MAP MARKERS + SEARCH + FILTERS
  // ==========================================

  function renderMarkers() {
    if (!map) return;

    markers.forEach(marker => {
      map.removeLayer(marker);
    });

    markers.clear();

    const selectedType = $("opsTypeFilter").value;

    const query = $("opsSearch")
      .value
      .trim()
      .toLowerCase();

    const visibleAircraft = aircraft.filter(item => {
      const matchesType =
        selectedType === "all" ||
        item.type === selectedType;

      const searchableText = [
        item.name,
        item.type,
        item.region,
        item.task,
        item.id
      ].join(" ").toLowerCase();

      const matchesSearch =
        searchableText.includes(query);

      return matchesType && matchesSearch;
    });

    visibleAircraft.forEach(item => {
      const marker = L.marker(
        [item.lat, item.lng],
        {
          icon: createAircraftIcon(item)
        }
      ).addTo(map);

      marker.bindPopup(`
        <div class="ops-popup-title">
          ${item.name}
        </div>

        <div class="ops-popup-line">
          Category: ${item.type}
        </div>

        <div class="ops-popup-line">
          Activity: ${item.task}
        </div>

        <div class="ops-popup-line">
          Status: ${item.status}
        </div>

        <div class="ops-popup-line">
          <em>Sample data only</em>
        </div>
      `);

      marker.on("click", () => {
        selectAircraft(item.id, false);
      });

      markers.set(item.id, marker);
    });

    $("opsMapCount").textContent =
      `${String(visibleAircraft.length).padStart(2, "0")} records displayed`;

    $("opsMapMessage").textContent =
      visibleAircraft.length
        ? "Map ready"
        : "No records match your filter";

    renderRegistry(visibleAircraft);
  }

  // ==========================================
  // ILLUSTRATIVE ROUTES
  // ==========================================

  function drawRoutes() {
    if (!map) return;

    routeLayers.forEach(layer => {
      map.removeLayer(layer);
    });

    routeLayers = [];

    if (!routesVisible) return;

    const routes = [
      {
        points: [
          [31.2, 77.1],
          [29.8, 78.3],
          [28.6, 77.2]
        ],
        color: "#c84b51"
      },
      {
        points: [
          [26.8, 80.9],
          [25.5, 84.2],
          [23.2, 87.1]
        ],
        color: "#2878b8"
      },
      {
        points: [
          [26.1, 91.7],
          [24.5, 89.4],
          [22.6, 88.4]
        ],
        color: "#c18a31"
      },
      {
        points: [
          [19.1, 72.9],
          [16.8, 76.3],
          [13.1, 80.3]
        ],
        color: "#218c59"
      },
      {
        points: [
          [13.1, 80.3],
          [15.1, 82.2],
          [17.4, 83.2]
        ],
        color: "#2878b8"
      }
    ];

    routes.forEach(route => {
      const line = L.polyline(
        route.points,
        {
          color: route.color,
          weight: 2,
          dashArray: "6 7",
          opacity: 0.7
        }
      ).addTo(map);

      routeLayers.push(line);
    });
  }

  // ==========================================
  // ACTIVITY LOG
  // ==========================================

  function addEvent(title, description, symbol = "↻") {
    const eventCard = document.createElement("article");

    eventCard.className = "ops-event";

    eventCard.innerHTML = `
      <span class="ops-event-icon">
        ${symbol}
      </span>

      <div>
        <b></b>
        <small></small>
      </div>
    `;

    eventCard.querySelector("b").textContent = title;

    eventCard.querySelector("small").textContent =
      description;

    $("opsEventList").prepend(eventCard);

    // Keep the latest six entries.

    while (
      $("opsEventList").children.length > 6
    ) {
      $("opsEventList").lastElementChild.remove();
    }

    eventCount = Math.min(eventCount + 1, 99);

    updateSummary();
  }

  // ==========================================
  // DEMONSTRATION STATUS SIMULATION
  // ==========================================

  function simulationTick() {
    if (paused) return;

    const eligibleAircraft = aircraft.filter(item => {
      return getStatusType(item.status) !== "review";
    });

    if (!eligibleAircraft.length) return;

    const item = eligibleAircraft[
      Math.floor(Math.random() * eligibleAircraft.length)
    ];

    item.status =
      item.status === "Ready"
        ? "In transit (simulated)"
        : "Ready";

    updateSummary();

    renderMarkers();

    selectAircraft(selectedId, false);

    addEvent(
      "Demo status refreshed",
      `${item.name} → ${item.status}. No external feed is connected.`,
      "↻"
    );
  }

  // ==========================================
  // CLOCK
  // ==========================================

  function updateClock() {
    const clock = $("opsClock");

    if (!clock) return;

    clock.textContent =
      new Date()
        .toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })
        .toUpperCase() + " IST";
  }

  // ==========================================
  // INITIALISE PAGE
  // ==========================================

  function init() {
    updateClock();

    setInterval(updateClock, 30000);

    updateSummary();

    // Initial sample events.

    addEvent(
      "Simulation started",
      "Sample records loaded for the local prototype.",
      "↻"
    );

    addEvent(
      "Registry validation completed",
      "Illustrative records passed basic checks.",
      "✓"
    );

    addEvent(
      "Review flag raised",
      "One sample record is marked for human review.",
      "!",
    );

    // Initialise interactive map.

    if (window.L) {
      map = L.map("opsMap", {
        scrollWheelZoom: false
      }).setView([22.8, 82], 4.4);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution: "&copy; OpenStreetMap contributors"
        }
      ).addTo(map);

      drawRoutes();

      renderMarkers();

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

    } else {
      $("opsMap").innerHTML = `
        <div style="padding:24px;color:#294a65;font-size:12px">
          Map library could not load. Check your internet connection.
          Aircraft registry controls remain available.
        </div>
      `;

      renderRegistry(aircraft);
    }

    selectAircraft(selectedId, false);

    // Refresh the simulated status every 12 seconds.

    setInterval(simulationTick, 12000);

    // ========================================
    // PAUSE / RESUME
    // ========================================

    $("opsPause").addEventListener("click", () => {
      paused = !paused;

      $("opsPause").textContent = paused
        ? "▶ Resume simulation"
        : "Ⅱ Pause simulation";

      $("opsFeedState").innerHTML = paused
        ? "<i style='background:#c18a31'></i> SIMULATION PAUSED"
        : "<i></i> DEMO FEED ACTIVE";

      notify(
        paused
          ? "Simulation paused"
          : "Simulation resumed"
      );
    });

    // ========================================
    // ROUTE VISIBILITY
    // ========================================

    $("opsRoutes").addEventListener("click", () => {
      routesVisible = !routesVisible;

      $("opsRoutes").textContent = routesVisible
        ? "Routes visible"
        : "Routes hidden";

      drawRoutes();

      notify(
        routesVisible
          ? "Illustrative routes shown"
          : "Illustrative routes hidden"
      );
    });

    // ========================================
    // RESET MAP AND FILTERS
    // ========================================

    $("opsReset").addEventListener("click", () => {
      $("opsSearch").value = "";

      $("opsTypeFilter").value = "all";

      routesVisible = true;

      $("opsRoutes").textContent = "Routes visible";

      if (map) {
        map.setView([22.8, 82], 4.4);
      }

      drawRoutes();

      renderMarkers();

      selectAircraft("A-01", false);

      notify("Map and filters reset");
    });

    // ========================================
    // SEARCH
    // ========================================

    $("opsSearch").addEventListener(
      "input",
      renderMarkers
    );

    // ========================================
    // CATEGORY FILTER
    // ========================================

    $("opsTypeFilter").addEventListener(
      "change",
      renderMarkers
    );

    // ========================================
    // CLEAR ACTIVITY LOG
    // ========================================

    $("opsClearEvents").addEventListener("click", () => {
      $("opsEventList").innerHTML = `
        <div class="ops-empty">
          No events in the local log.
        </div>
      `;

      eventCount = 0;

      updateSummary();

      notify("Activity log cleared");
    });
  }

  // ==========================================
  // START WHEN HTML IS READY
  // ==========================================

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$("#date").textContent=new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
const data={
Aircraft:{heads:["Asset ID","Type","Status","Availability","Score"],rows:[
["A-01","Su-30MKI","Ready","✓ Available","92%"],["A-02","Rafale","Ready","✓ Available","88%"],["A-03","Tejas","Maintenance","✕ Unavailable","—"],["A-04","MiG-29","Ready","✓ Available","75%"],["A-05","AWACS","Ready","✓ Available","80%"],["A-06","C-17","Maintenance","✕ Unavailable","—"]]},
Crew:{heads:["Team ID","Role","Status","Availability","Hours"],rows:[
["C-01","Pilot team","Ready","✓ Available","6.5"],["C-02","Support crew","Ready","✓ Available","7.0"],["C-03","Pilot team","Standby","Limited","—"],["C-04","Ground crew","Ready","✓ Available","5.5"],["C-05","Support crew","Unavailable","✕ Unavailable","—"],["C-06","Ground crew","Ready","✓ Available","6.0"]]},
Fuel:{heads:["Resource","Region","Status","Availability","Readiness"],rows:[
["F-01","North demo","Ready","✓ Available","92%"],["F-02","West demo","Ready","✓ Available","86%"],["F-03","Central demo","Review","Limited","65%"],["F-04","East demo","Ready","✓ Available","89%"],["F-05","Reserve","Standby","Limited","—"],["F-06","Depot","Review","Limited","72%"]]},
Weather:{heads:["Region","Condition","Status","Planning impact","Updated"],rows:[
["North demo","Clear","Ready","Low","09:45"],["West demo","Windy","Review","Medium","09:40"],["Central demo","Cloudy","Ready","Low","09:42"],["East demo","Rain","Constraint","High","09:38"],["South demo","Clear","Ready","Low","09:44"],["Reserve","Unknown","Review","Check","—"]]},
Constraints:{heads:["Constraint","Category","Severity","Status","Action"],rows:[
["Asset A-03","Maintenance","High","Open","Exclude"],["Crew C-05","Availability","Medium","Open","Review"],["East demo","Weather","Medium","Open","Check"],["Fuel F-03","Readiness","Low","Review","Monitor"],["Schedule overlap","Timing","Medium","Review","Resolve"],["Data quality","Input","Low","Review","Validate"]]}
};
function renderTable(key){const d=data[key];$("#tableHead").innerHTML=d.heads.map(x=>`<th>${x}</th>`).join("");$("#tableBody").innerHTML=d.rows.map(row=>`<tr>${row.map((v,i)=>{let cl="";if(i===2||i===3){if(/Ready|Available|Clear/.test(v))cl="ready";else if(/Maintenance|Review|Constraint|Limited|Medium|High|Open|Unavailable|Rain|Windy|Unknown/.test(v))cl=/Maintenance|Unavailable|High|Constraint|Rain/.test(v)?"unavailable":"maint";}return `<td>${cl?`<span class="status ${cl}">${v}</span>`:v}</td>`}).join("")}</tr>`).join("");$("#tableFoot").textContent=`Showing illustrative ${key.toLowerCase()} records · ${d.rows.length} items`}
renderTable("Aircraft");
$$(".tab").forEach(b=>b.addEventListener("click",()=>{$$(".tab").forEach(t=>t.classList.remove("active"));b.classList.add("active");renderTable(b.dataset.tab)}));
$("#operation").addEventListener("change",e=>{$("#scenarioName").textContent=e.target.value;toast("Scenario changed: "+e.target.value);});
function runOptimisation(){const op=$("#operation").value,priority=$("#priority").value;$("#scenarioName").textContent=op;$("#resultStatus").textContent="Demo result";$("#optResources").textContent=priority==="High"?"3":"2";$("#optCrew").textContent=priority==="High"?"24":"18";$("#optFuel").textContent=priority==="High"?"36,000 L":"31,000 L";$("#optRisk").textContent=priority==="High"?"1":"0";$("#saving").textContent=priority==="High"?"−25%":"−35%";$("#confidence").textContent="Demo confidence: "+(priority==="High"?"87%":priority==="Medium"?"82%":"78%");$("#recommendTitle").textContent="Sample recommendation generated";$("#recommendText").textContent=`For the ${op.toLowerCase()} scenario, the demo comparison indicates lower estimated resource use. Check all constraints before review.`;$("#reasons").innerHTML="<li>Unavailable assets are excluded from the sample plan.</li><li>Crew and maintenance constraints are included in the comparison.</li><li>Estimated fuel use is compared against the baseline.</li>";$("#reviewStatus").textContent="Awaiting human review · Demo only";toast("Demo optimisation complete. Review the illustrative comparison.");}
$("#runBtn").addEventListener("click",runOptimisation);$("#proceedBtn").addEventListener("click",runOptimisation);$("#analyseBtn").addEventListener("click",()=>{renderTable("Constraints");$$(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab==="Constraints"));toast("Sample constraints displayed for review.");});
$("#loadBtn").addEventListener("click",()=>{$("#operation").value="Air Patrol";$("#priority").value="High";$("#region").selectedIndex=0;$("#scenarioName").textContent="Air Patrol";toast("Default demo scenario loaded.");});
$("#alternativesBtn").addEventListener("click",()=>{const current=$("#optResources").textContent;$("#optResources").textContent=current==="3"?"2":"3";$("#optFuel").textContent=current==="3"?"31,000 L":"36,000 L";$("#saving").textContent=current==="3"?"−35%":"−25%";$("#recommendTitle").textContent="Alternative sample plan";$("#recommendText").textContent="Alternative plan displayed for comparison. Estimates are illustrative and need validation.";toast("Alternative demo plan selected.");});
$("#reviewBtn").addEventListener("click",()=>{$("#reviewStatus").textContent="Marked reviewed in this demo session";$("#reviewBtn").textContent="Reviewed ✓";$("#reviewBtn").disabled=true;toast("Review state updated locally (demo only).");});
$$(".map-pin").forEach(pin=>pin.addEventListener("click",()=>toast("Selected illustrative asset "+pin.dataset.pin)));
let timer;function toast(s){const t=$("#toast");t.textContent=s;t.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>t.classList.remove("show"),2600)}
<div align="center">

# 🇮🇳 GARUD AI

### Generalised AI for Resource Utilisation & Decision Support

**AI-Powered Air Operations & Resource Optimisation Dashboard**



### 🎥 PROJECT DEMONSTRATION

**Watch the Project Video**

[![YouTube](https://img.shields.io/badge/▶_Watch_Demo_on_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/Og2R_YX1-9I?si=ayXUZyDXNdpwe3o-)

### 🌐 LIVE DEMO

**Explore the GARUD AI Dashboard**

[![Live Demo](https://img.shields.io/badge/🚀_Launch_Live_Demo-1769B0?style=for-the-badge)](https://garud-eight.vercel.app/)

> Replace the YouTube and Live Demo placeholders with your actual URLs.

---

**STRONGER SKIES · SMARTER DECISIONS · A STRONGER INDIA**

*An aviation-focused decision-support prototype.*

</div>

---

## 📌 About the Project

**GARUD AI** stands for **Generalised AI for Resource Utilisation & Decision Support**.

GARUD AI is a web-based prototype designed to demonstrate how air operations, aircraft information, resource readiness, mission tasks, weather scenarios, and alerts can be presented through a unified dashboard.

The platform explores the concept of bringing multiple operational information categories into one interface to improve visibility, simplify information review, and support informed decision-making.

The project combines an aviation-inspired interface with interactive maps, visual indicators, simulated radar visualisation, structured data tables, and a conversational assistant.

### 🎯 Project Objectives

- Present operational information through a unified dashboard.
- Demonstrate interactive aircraft visualisation on a map.
- Provide an overview of fleet and resource readiness.
- Organise mission tasks and alerts in structured tables.
- Demonstrate a radar-style monitoring interface.
- Introduce Saarthi, a conversational assistant for basic dashboard queries.
- Explore explainable, human-reviewed decision-support concepts.

---

## ✨ Key Features

### 1. 📊 Air Operations Dashboard

A centralised overview of the prototype's operational information.

- Total aircraft summary.
- Available crew indicators.
- Ongoing mission statistics.
- Fuel readiness percentage.
- Active alert counters.
- Interactive dashboard cards.

### 2. 🗺️ Interactive Air Operations Map

A map-based interface built using Leaflet.js.

- Interactive map navigation.
- Selectable aircraft markers.
- Aircraft information pop-ups.
- Aircraft category filters.
- Illustrative routes and locations.
- Air Force Station markers, where implemented.
- Map reset controls.

The map is intended to demonstrate how location-based information can be visualised within an aviation dashboard.

### 3. 📡 Live Radar Tracking Simulation

A dedicated radar-style visualisation designed to demonstrate a monitoring interface.

- Radar grid.
- Rotating sweep animation.
- Simulated contact indicators.
- Tactical-inspired interface.
- Dedicated radar overlay.

**Note:** Radar contacts are simulated and do not represent real radar detections or live military telemetry.

### 4. ✈️ Aircraft & Fleet Information

The selected-aircraft panel demonstrates how aircraft information can be organised.

Depending on the selected sample record, it may display:

- Aircraft name and type.
- Call sign and sample asset ID.
- Speed and altitude.
- Fuel status.
- Crew information.
- Payload information.
- Assigned task.
- Illustrative region.
- Readiness state.

### 5. 🛠️ Resource Readiness

A structured overview of sample resource availability.

- Resource group summaries.
- Availability percentages.
- Readiness indicators.
- Status labels.
- Resource review information.

### 6. 📋 Mission & Task Management

A structured view of ongoing demonstration tasks.

- Task identification.
- Task category.
- Associated sample resource.
- Task status.
- Expanded detail views, where implemented.

### 7. 🌦️ Weather & Airspace

A dashboard section for illustrative environmental scenarios.

- Sample weather conditions.
- Temperature and visibility indicators.
- Wind and humidity metrics.
- Scenario forecast rows.
- Airspace review notifications.

Weather values are illustrative unless a verified live data source is explicitly integrated.

### 8. 🔔 Alerts & Notifications

An interface for displaying sample events and review items.

- Alert descriptions.
- Severity indicators.
- Status labels.
- Notification summaries.
- Expanded alert details, where implemented.

### 9. 🤖 Saarthi AI Assistant

Saarthi is a conversational assistant concept integrated into the dashboard.

Depending on the implemented version, users can enter keyword-based queries such as:

| Keyword | Demonstration Purpose |
|---|---|
| `status` | Display a fleet-status response |
| `weather` | Display a weather-scenario response |
| `resources` | Display resource-readiness information |
| `alerts` | Display alert-related information |
| `help` | Display supported commands |

The local keyword-based assistant does not require an external AI API key.

**Important:** Saarthi's local responses are demonstration logic, not responses generated by a connected operational intelligence service.

### 10. 🧠 Decision-Support Concept

The dashboard demonstrates how recommendations may be presented to support information review.

Example concepts include:

- Reviewing resource availability.
- Validating input data.
- Identifying information requiring attention.
- Keeping human approval within the decision-making process.

---

## 🖥️ Dashboard Modules

| Module | Description |
|---|---|
| Dashboard | Overview of sample operational metrics |
| Live Air Operations | Interactive map visualisation |
| Mission Planning | Mission-planning interface |
| Resource Management | Resource availability and readiness |
| Airspace & Routes | Route and airspace interface |
| Aircraft & Fleet | Aircraft information |
| Weather & Threats | Environmental scenarios |
| AI Optimisation | Decision-support concepts |
| Reports & Analytics | Reporting interface |
| Alerts & Notifications | Alert and notification management |

Some modules may require separate HTML pages. Ensure the relevant files are present in the project directory and that navigation links point to the correct paths.

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Dashboard structure |
| CSS3 | Styling and layout |
| JavaScript | Interactive functionality |
| Leaflet.js | Interactive mapping |
| OpenStreetMap-compatible tiles | Map visualisation, depending on configuration |
| SVG | Scalable graphics, where used |
| Google Fonts | Typography, where configured |

### Architecture

The prototype primarily uses a browser-based frontend.

- **Frontend:** HTML, CSS, JavaScript.
- **Mapping:** Leaflet.js.
- **Assistant:** Local keyword-based response logic.
- **Data:** Demonstration and simulated records.
- **Backend:** Not required for the basic static prototype.

External map tiles, fonts, libraries, and images may require an internet connection.

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser such as Google Chrome or Microsoft Edge.
- An internet connection for external libraries, map tiles, fonts, and hosted images.
- Python is optional if you want to run a local development server.

### Step 1: Download the Project

Download or clone the repository to your computer.

### Step 2: Open the Project

Locate the main dashboard file, for example:

```text
index.html
```

If the main file has another name, open that HTML file instead.

### Step 3: Run in Your Browser

Double-click the HTML file to open the dashboard.

For more reliable local testing, use a development server.

### Step 4: Run a Local Server

Open a terminal inside the project folder and run:

```bash
python -m http.server 8000
```

Then open the following address in your browser:

```text
http://localhost:8000
```

If your main file is named `GARUD_AI_Enhanced.html`, open:

```text
http://localhost:8000/GARUD_AI_Enhanced.html
```

---

## 🌐 Deployment

The static prototype can be hosted on a compatible static website hosting platform.

Possible options include:

- GitHub Pages
- Netlify
- Vercel

### Deployment Checklist

1. Upload the main HTML file and all required project assets.
2. Include additional HTML pages used by the navigation menu.
3. Verify image paths and external dependencies.
4. Configure the correct publishing directory.
5. Open the deployed website and test its interactions.
6. Verify the map, radar interface, chatbot, and detail modals.
7. Add the final deployment URL to the Live Demo button at the top of this README.

---

## 🎬 Suggested Project Demonstration

For a short project presentation, follow this sequence:

1. Introduce GARUD AI and its objectives.
2. Show the main dashboard and operational summary cards.
3. Select an aircraft on the interactive map.
4. Open the radar simulation.
5. Demonstrate fleet and resource readiness.
6. Show the weather and airspace scenario panel.
7. Open the alerts section.
8. Interact with Saarthi using supported keywords.
9. Finish by explaining the project's potential and current prototype limitations.

---

## 🔐 Data Authenticity & Limitations

GARUD AI is a prototype for demonstration and evaluation.

- Aircraft locations and routes may be simulated.
- Radar contacts are illustrative.
- Aircraft metrics and resource figures may be sample values.
- Weather conditions are not necessarily live observations.
- The chatbot uses local demonstration logic unless separately integrated with an AI service.
- No classified or restricted military data is required.
- The interface does not control aircraft or issue operational commands.
- Recommendations are illustrative and are not operational instructions.
- External libraries, fonts, map tiles, and images are subject to their respective terms and availability.

**GARUD AI is an independent prototype concept. It is not an official Government of India or Indian Air Force platform and is not affiliated with or endorsed by either organisation.**

---

## 🛣️ Future Scope

Potential improvements include:

- [ ] Enhanced mobile and tablet responsiveness.
- [ ] Improved accessibility and keyboard navigation.
- [ ] More detailed dashboard filtering.
- [ ] Exportable reports and summaries.
- [ ] Improved loading and error states.
- [ ] Automated frontend testing.
- [ ] Integration with authorised public data sources.
- [ ] Data freshness indicators and source attribution.
- [ ] Backend support for persistent application data.
- [ ] Secure authentication and role-based access, if required.

These are potential future enhancements, not claims about existing functionality.

---

## 🤝 Contributions

Suggestions and improvements are welcome.

1. Identify a bug or propose an enhancement.
2. Describe the expected behaviour clearly.
3. Keep simulated information labelled appropriately.
4. Do not commit API keys, passwords, credentials, or sensitive data.
5. Test changes before submitting them.

---

## 📄 License

No license is specified for this project by this README.

Before distributing the project for reuse, add an appropriate `LICENSE` file and verify the terms for all third-party libraries, images, fonts, and map services.

---

<div align="center">

## 🇮🇳 GARUD AI

### Stronger Skies. Smarter Decisions. A Stronger India.

**Built to demonstrate a unified vision for aviation decision support.**

**Jai Hind!**

</div>

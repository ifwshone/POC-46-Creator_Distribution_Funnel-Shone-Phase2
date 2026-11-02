# Real Rails Intelligence Library — PoC 46: Creator Distribution Funnel

[![Real Rails DNA](https://img.shields.io/badge/Real%20Rails%20DNA-Compliant-38BDF8?style=flat-square&logo=terminal)](https://github.com)
[![Gate 1 VAR](https://img.shields.io/badge/Gate%201%20VAR-PASS-10B981?style=flat-square)](./VISUALIZATION_AUDIT_REPORT.md)
[![Gate 2 UAT](https://img.shields.io/badge/Gate%202%20UAT-PASS-10B981?style=flat-square)](./UAT_CHECKLIST.md)
[![License](https://img.shields.io/badge/License-Proprietary-818CF8?style=flat-square)](LICENSE)

An institutional-grade intelligence dashboard evaluating the non-sovereign demand rails of digital media distribution. PoC 46 analyzes the step-down conversion gradient—from algorithmic reach to persistent retention and monetization capture—across competing gatekeeper platforms.

---

## 1. Project Parameters & Metadata

- **PoC ID:** 46
- **Project Title:** Creator Distribution Funnel
- **Rail Category:** Distribution & Demand
- **Primary Data Sources:** GDELT (Macro reach and media events)
- **Fallback Simulation Engine:** Synthetic post impressions, watch time, CTR, conversions, and monetization yield (Compliant with the Real Rails 2-Hour Fallback Rule)
- **Key Institutions & Gatekeepers:** Alphabet (YouTube), ByteDance (TikTok), Meta (Instagram), X Corp (X)
- **Core Value Proposition:** Directly actionable for founders, operators, and allocators auditing audience acquisition costs and platform protocol rents.

---

## 2. Real Rails Architecture & DNA Specifications

| Constraint | Protocol Standard | Implementation Status |
| :--- | :--- | :--- |
| **Color Palette** | `#030712` Obsidian Canvas, `#0B1117` Card Surface, `#38BDF8` Electric Cyan, `#818CF8` Indigo, `#1F2937` Slate Border | **100% Verified** |
| **Layout Split** | Strict 70% Interactive Stage / 30% Intelligence Sidebar | **100% Enforced** |
| **Visualization Engine** | Recharts (Composite Funnel & Log-scale Monetization Curve) | **Production Grade** |
| **Backend Orchestration**| Python FastAPI with automated CORS & synthetic generation fallback | **Operational** |
| **The Handshake** | Interactive drill-down linking 70% stage bar clicks to 30% sidebar telemetry | **Verified** |

---

## 3. Technology Stack

### Frontend
- **Framework:** Next.js 16+ (App Router) with Node.js 20+ base runtime
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom `#030712` theme)
- **Visualization:** Recharts (`ComposedChart`, `Bar`, `Line`, `ResponsiveContainer`)
- **Icons:** Lucide React (`Download`, `Filter`, `Layers`, `ShieldCheck`, `TrendingUp`)

### Backend
- **Framework:** Python FastAPI
- **Server:** Uvicorn
- **Data Engine:** Python standard math & dict pipelines (zero C-compiler build bottlenecks)
- **Protocol:** RESTful API with preconfigured CORS support

---

## 4. Quick Start & Production Container Deployment

### Option A: Containerized Production Deployment (Docker Compose)
To spin up the entire stack with containerized isolation using Docker:

1. Create a `.env` file at the root directory with your environment and API configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   MAPBOX_API_KEY=your_mapbox_key_here
   DATA_API_KEY=your_data_api_key_here
   ```
2. Build and spin up the stack in detached mode:
   ```bash
   docker compose build --no-cache
   docker compose up -d
   ```
3. Access the services:
   - **Frontend Dashboard:** `http://localhost:3000`
   - **FastAPI Documentation:** `http://localhost:8000/docs`

---

### Option B: Local Native Setup (Development)

#### Prerequisites
- **Node.js:** v20.9.0+ or higher
- **Python:** v3.10+ or higher
- **Package Managers:** `npm` and `pip`

#### Step 1: Start the FastAPI Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the API orchestration server:
   ```bash
   python main.py
   ```

#### Step 2: Start the Next.js Frontend
1. Open a new terminal tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js local development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard in your browser at `http://localhost:3000`.

---

## 5. Functional Features & User Workflow

1. **Staged Funnel Visualization:** Multi-stage drop-off tracking: *Impressions $\rightarrow$ Clicks $\rightarrow$ Watch Time $\rightarrow$ Conversions*.
2. **Monetization Overlay:** Real-time yield line tracks capture efficiency across each platform rail.
3. **The 70/30 Bidirectional Handshake:** Clicking any bar cluster on the 70% Main Stage updates the 30% Intelligence Sidebar with platform-specific drop-off ratios and telemetry.
4. **Data Portability:** "Download Sample Data" exports a structured `.json` bundle containing active filters and metrics.

---

## 6. Audit & Compliance Reports

- **Visualization Audit Report (Gate 1):** [`VISUALIZATION_AUDIT_REPORT.md`](./VISUALIZATION_AUDIT_REPORT.md) — **VAR PASS**
- **Functional User Acceptance Testing (Gate 2):** [`UAT_CHECKLIST.md`](./UAT_CHECKLIST.md) — **UAT PASS (38/38 Test Cases Verified)**
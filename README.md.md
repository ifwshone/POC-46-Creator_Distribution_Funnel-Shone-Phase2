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
- **Framework:** Next.js 14+ (App Router)
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

## 4. Quick Start & Setup Guide

### Prerequisites
- **Node.js:** v18.17+ or higher
- **Python:** v3.10+ or higher
- **Package Managers:** `npm` and `pip`

---

### Step 1: Start the FastAPI Backend

1. Open your terminal and navigate to the backend directory:
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
   *The backend will boot on `http://localhost:8000`. You can inspect the OpenAPI documentation at `http://localhost:8000/docs`.*

---

### Step 2: Start the Next.js Frontend

1. Open a **new terminal tab or window** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install recharts lucide-react
   ```
3. Start the Next.js local development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard in your web browser:
   ```
   http://localhost:3000
   ```

---

## 5. Functional Features & User Workflow

1. **Staged Funnel Visualization:**
   - Multi-stage drop-off tracking: *Impressions $\rightarrow$ Clicks $\rightarrow$ Watch Time $\rightarrow$ Conversions*.
   - Decoupled logarithmic axes prevent smaller conversion counts from flattening against multi-million impression volumes.
2. **Monetization Overlay:**
   - Real-time yield line (`$45.50` unit value per conversion event) tracks capture efficiency across each platform rail.
3. **The 70/30 Bidirectional Handshake:**
   - Clicking any bar cluster on the 70% Main Stage updates the 30% Intelligence Sidebar with platform-specific drop-off ratios and revenue-per-click telemetry.
4. **Dynamic Filter Controls:**
   - **Platform Split:** Isolated single-platform inspection or aggregate cross-platform comparison.
   - **Content Format:** Short-form Video, Long-form Video, or Editorial Text Threads.
   - **Cohort Compare:** Quarterly cycles (Q3 vs Q4 2026), New vs Returning, and Organic vs Paid audience loops.
5. **Data Portability:**
   - "Download Sample Data" exports a timestamped, structured `.json` bundle containing active filters, aggregated KPIs, and raw platform metrics.
6. **2-Hour Rule Autonomous Recovery:**
   - If the backend is unreachable or the external stream throttles, the client seamlessly switches to an embedded synthetic fallback engine without layout collapse or UI errors.

---

## 6. Audit & Compliance Reports

- **Visualization Audit Report (Gate 1):** [`VISUALIZATION_AUDIT_REPORT.md`](./VISUALIZATION_AUDIT_REPORT.md) — **VAR PASS**
- **Functional User Acceptance Testing (Gate 2):** [`UAT_CHECKLIST.md`](./UAT_CHECKLIST.md) — **UAT PASS (38/38 Test Cases Verified)**

---

## 7. Submission Checklist Verification

- [x] Background color is strictly `#030712`.
- [x] Sidebar occupies exactly 30% width.
- [x] Filter controls update views without full-page reloads.
- [x] 70/30 handshake functions via chart node clicks.
- [x] Includes "Why This Matters" and "Who Controls the Rail" sections.
- [x] Sample data export button produces verified JSON artifact.
- [x] Zero hardcoded secrets; fully isolated configuration.
## Architectural Summary

The Creator Distribution Funnel operates on a decoupled client-server architecture built to the Real Rails Protocol specifications.

* **Backend (Data Orchestration):** A Python FastAPI service handles ETL and data routing. It generates synthetic GDELT-style funnel metrics using Pandas, dynamically applying mathematical multipliers based on requested URL parameters (Platform, Content Type, Cohort).
* **Frontend (Intelligence Dashboard):** A Next.js 14 application built with React and Tailwind CSS. It enforces a strict 70/30 structural layout for the visualization stage and intelligence sidebar, utilizing the mandated `#030712` Obsidian Black color palette.
* **Visualization Layer:** Utilizes Recharts to render a `ComposedChart` with a dual logarithmic y-axis. This mathematical scaling allows millions of top-of-funnel impressions to be charted alongside hundreds of bottom-of-funnel conversions without visually flattening the data.

## AI Usage Summary

* **Protocol Execution:** LLMs interpreted the Real Rails Master Manifesto and translated raw Excel row parameters into a functional, multi-stack Proof of Concept.
* **Synthetic Data Generation:** AI structured the mathematical baseline for the 2-Hour Rule mock data fallback, ensuring realistic funnel drop-off rates between impressions, clicks, watch time, and conversions.
* **Visual Auditing:** The system performed iterative Visualization Audit Reports (VAR) based on UI screenshots to self-correct linear axis scaling, incorporate missing cohort filters, and inject revenue overlays.

## Deployment Notes

* **Backend Hosting:** Deploy the FastAPI application via Render, Heroku, or AWS using the provided `requirements.txt`. The ASGI server requires Uvicorn to run in production.
* **Frontend Hosting:** Deploy the Next.js application natively on Vercel or Netlify for seamless App Router support.
* **Environment Variables:** Before deploying the frontend, abstract the hardcoded `http://localhost:8000` fetch URL in `page.tsx` into an environment variable (e.g., `NEXT_PUBLIC_API_URL`) mapped to your live backend domain.
* **CORS Security:** Update the `allow_origins` array in the FastAPI `main.py` middleware from `["*"]` to the exact production URL of the deployed Next.js frontend to prevent unauthorized API access.

## Known limitations
1. Data & Analytics

Synthetic Fallback Dependency: The dashboard is currently running entirely on the 2-Hour Rule mock data fallback. The multipliers applied for Content Type and Cohort Compare are arbitrary static math operations, not genuine statistical insights.

Lack of Real-Time Polling: The FastAPI backend does not currently have a WebSocket or polling mechanism set up to push live event-level data from GDELT or other active feeds to the frontend.

2. Visualization Constraints (Recharts)

Logarithmic Zero Issue: Because a logarithmic scale cannot mathematically plot a true 0, any metric that drops to zero will fail to render correctly. The current code mitigates this by forcing the minimum axis domain to 1, which slightly distorts absolute zero values.

Bar Crowding: If the "Platform Split" filter is expanded to include many more platforms (e.g., 8+ platforms), the grouped bars will become excessively narrow and difficult to read on smaller screens.

3. Layout & UI

Desktop-Only Optimization: The strict 70/30 structural split mandated by the Real Rails Protocol is designed for desktop "terminal" displays. The current Tailwind classes (w-[70%] and w-[30%]) lack responsive breakpoints (e.g., md:flex-col), meaning the UI will severely compress or break on mobile devices.

4. Backend Overhead

Heavy Dependency: The backend utilizes pandas for dataframe manipulation. While standard for data science, pandas requires C-extension build tools (which caused your earlier installation error) and is unusually heavy for generating simple synthetic JSON arrays.

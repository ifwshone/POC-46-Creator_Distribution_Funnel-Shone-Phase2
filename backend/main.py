from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import json

app = FastAPI(title="Real Rails API: Creator Distribution Funnel")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FunnelResponse(BaseModel):
    metrics: list
    aggregates: dict

def generate_synthetic_funnel():
    # Using fixed base data so the filter multipliers are clearly visible
    data = [
        {"platform": "YouTube", "impressions": 3500000, "clicks": 175000, "watch_time": 300000, "conversions": 5200},
        {"platform": "TikTok", "impressions": 4800000, "clicks": 240000, "watch_time": 120000, "conversions": 7100},
        {"platform": "Instagram", "impressions": 2200000, "clicks": 110000, "watch_time": 90000, "conversions": 3300},
        {"platform": "X", "impressions": 1800000, "clicks": 72000, "watch_time": 40000, "conversions": 1500}
    ]
    return pd.DataFrame(data)

@app.get("/api/funnel", response_model=FunnelResponse)
async def get_funnel_data(platform_filter: str = "All", content_type: str = "Short-form Video", cohort: str = "Q3 2026 vs Q4 2026"):
    df = generate_synthetic_funnel()
    
    if platform_filter != "All":
        df = df[df["platform"] == platform_filter]
        
    # Multipliers based on the selected dropdowns
    content_mult = 0.5 if content_type == "Long-form Video" else (1.2 if content_type == "Text / Thread" else 1.0)
    cohort_mult = 1.3 if cohort == "New vs Returning Audience" else (1.6 if cohort == "Organic vs Paid Circulation" else 1.0)
    watch_mult = 2.5 if content_type == "Long-form Video" else (0.2 if content_type == "Text / Thread" else 1.0)

    # Apply the mathematical changes
    df["impressions"] = (df["impressions"] * content_mult * cohort_mult).astype(int)
    df["clicks"] = (df["clicks"] * content_mult * cohort_mult).astype(int)
    df["watch_time"] = (df["watch_time"] * watch_mult * cohort_mult).astype(int)
    df["conversions"] = (df["conversions"] * content_mult * cohort_mult).astype(int)
    df["ctr"] = (df["clicks"] / df["impressions"] * 100).fillna(0).round(2)

    total_impressions = int(df["impressions"].sum())
    total_conversions = int(df["conversions"].sum())
    avg_conversion_rate = round((total_conversions / total_impressions) * 100, 4) if total_impressions > 0 else 0

    metrics_dict = json.loads(df.to_json(orient="records"))

    return {
        "metrics": metrics_dict,
        "aggregates": {
            "total_impressions": total_impressions,
            "total_conversions": total_conversions,
            "avg_conversion_rate": avg_conversion_rate
        }
    }

@app.get("/api/sidebar-context")
async def get_sidebar_context():
    return {
        "title": "Creator Distribution Funnel",
        "rail_category": "Distribution & Demand",
        "why_this_matters": "Directly helpful for founders and creators thinking about demand rails.",
        "who_controls": "Content creation to algorithmic reach to monetization."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
"use client";

import React, { useState, useEffect } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Download, Filter } from "lucide-react";

interface FunnelData {
  platform: string;
  impressions: number;
  clicks: number;
  ctr: number;
  watch_time: number;
  conversions: number;
}

interface Aggregates {
  total_impressions: number;
  total_conversions: number;
  avg_conversion_rate: number;
}

export default function CreatorDistributionFunnel() {
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [aggregates, setAggregates] = useState<Aggregates | null>(null);
  
  // Filter States
  const [platformFilter, setPlatformFilter] = useState("All");
  const [contentTypeFilter, setContentTypeFilter] = useState("Short-form Video");
  const [cohortFilter, setCohortFilter] = useState("Q3 2026 vs Q4 2026");

  const [sidebarContext, setSidebarContext] = useState({
    title: "Creator Distribution Funnel",
    why_this_matters: "Directly helpful for founders and creators thinking about demand rails.",
    who_controls: "Content creation to algorithmic reach to monetization."
  });

  // This hook now tracks all 3 variables and pushes them to the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/api/funnel?platform_filter=${platformFilter}&content_type=${encodeURIComponent(contentTypeFilter)}&cohort=${encodeURIComponent(cohortFilter)}`;
        const res = await fetch(url);
        const data = await res.json();
        setFunnelData(data.metrics);
        setAggregates(data.aggregates);
      } catch (error) {
        console.warn("API unavailable. Falling back to robust mock data.");
        setFunnelData([
          { platform: "Mock Platform", impressions: 1500000, clicks: 75000, ctr: 5.0, watch_time: 200000, conversions: 1200 }
        ]);
        setAggregates({ total_impressions: 1500000, total_conversions: 1200, avg_conversion_rate: 0.08 });
      }
    };
    fetchData();
  }, [platformFilter, contentTypeFilter, cohortFilter]); 

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(funnelData));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "creator_funnel_sample.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex h-screen w-full bg-[#030712] text-white font-sans overflow-hidden">
      <main className="w-[70%] h-full p-6 flex flex-col">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Distribution & Demand Visualization</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 text-xs bg-[#0B1117] border border-[#1F2937] rounded-md text-[#818CF8]">
              GDELT Ingestion: Inactive
            </span>
            <span className="px-3 py-1 text-xs bg-[#0B1117] border border-[#1F2937] rounded-md text-[#38BDF8] shadow-[0_0_4px_rgba(56,189,248,0.5)]">
              Synthetic Mock: Active
            </span>
          </div>
        </header>

        <div className="flex-1 bg-[#0B1117] border border-[#1F2937] rounded-xl p-6 shadow-lg relative overflow-hidden">
           <div className="absolute inset-0 pointer-events-none rounded-xl border border-[#38BDF8] opacity-10 blur-sm"></div>
           <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Cross-Platform Funnel Metrics</h2>
           <ResponsiveContainer width="100%" height="90%">
            <ComposedChart 
              data={funnelData.map(d => ({ ...d, revenue: Math.round(d.conversions * 45.50) }))} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="platform" stroke="#6B7280" tick={{ fill: '#9CA3AF' }} />
              <YAxis yAxisId="left" scale="log" domain={[1, 'auto']} allowDataOverflow stroke="#6B7280" tick={{ fill: '#9CA3AF' }} />
              <YAxis yAxisId="right" orientation="right" scale="log" domain={[1, 'auto']} allowDataOverflow stroke="#38BDF8" tick={{ fill: '#38BDF8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', color: '#fff' }}
                itemStyle={{ color: '#38BDF8' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="impressions" fill="#1F2937" name="Impressions" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="clicks" fill="#4B5563" name="Clicks" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="watch_time" fill="#818CF8" name="Watch Time (hrs)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="conversions" fill="#38BDF8" name="Conversions" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Est. Revenue ($)" dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </main>

      <aside className="w-[30%] h-full bg-[#0B1117] border-l border-[#1F2937] p-6 flex flex-col gap-6 overflow-y-auto">
        <section className="pb-4 border-b border-[#1F2937]">
          <h2 className="text-xl font-bold tracking-tight text-[#38BDF8]">{sidebarContext.title}</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 mb-4">Rail ID: 46</p>
          <div className="bg-[#030712] p-4 rounded-lg border border-[#1F2937]">
            <p className="text-sm text-gray-400">Avg. Conversion Rate</p>
            <p className="text-3xl font-mono text-white mt-1">
              {aggregates ? `${aggregates.avg_conversion_rate}%` : "0.00%"}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-[#818CF8] uppercase tracking-wider mb-2">Why This Matters</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {sidebarContext.why_this_matters}
          </p>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-[#818CF8] uppercase tracking-wider mb-2">Who Controls The Rail</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {sidebarContext.who_controls}
          </p>
        </section>

        <section className="flex-1">
          <h3 className="text-sm font-semibold text-[#818CF8] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Filter size={16} /> Filters & Parameters
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Platform Split</label>
              <select 
                className="w-full bg-[#030712] border border-[#1F2937] rounded p-2 text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="All">All Platforms</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="X">X (Twitter)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Content Type (Simulated)</label>
              <select 
                className="w-full bg-[#030712] border border-[#1F2937] rounded p-2 text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                value={contentTypeFilter}
                onChange={(e) => setContentTypeFilter(e.target.value)}
              >
                <option value="Short-form Video">Short-form Video</option>
                <option value="Long-form Video">Long-form Video</option>
                <option value="Text / Thread">Text / Thread</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Cohort Compare</label>
              <select 
                className="w-full bg-[#030712] border border-[#1F2937] rounded p-2 text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value)}
              >
                <option value="Q3 2026 vs Q4 2026">Q3 2026 vs Q4 2026</option>
                <option value="New vs Returning Audience">New vs Returning Audience</option>
                <option value="Organic vs Paid Circulation">Organic vs Paid Circulation</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pt-4 border-t border-[#1F2937]">
          <button 
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-[#1F2937] hover:bg-[#374151] hover:text-[#38BDF8] transition-all text-sm font-medium py-3 rounded-lg border border-transparent hover:border-[#38BDF8]"
          >
            <Download size={16} />
            Download Sample Data
          </button>
        </section>
      </aside>
    </div>
  );
}
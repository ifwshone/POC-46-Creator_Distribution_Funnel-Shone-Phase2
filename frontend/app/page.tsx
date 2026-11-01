"use client";

import React, { useState, useEffect, useRef } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import {
  Download,
  Terminal,
  Activity,
  ShieldAlert,
  Cpu,
  Settings2,
  X,
  Check,
  ChevronDown,
  Lock,
  Radio,
  Database,
  Target,
} from "lucide-react";

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

interface DropdownOption {
  value: string;
  label: string;
}

// Display-only helper for axis ticks (does not touch data)
const compact = (v: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(v);

/* ------------------------------------------------------------------
   Custom dropdown: replaces the native <select> so the options have
   their own GUI. Values and onChange are exactly the same as before.
------------------------------------------------------------------- */
function Dropdown({
  label,
  accent,
  value,
  options,
  onChange,
}: {
  label: string;
  accent: string;
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="dd"
      data-open={open}
      style={{ ["--acc" as string]: accent }}
    >
      <label className="eyebrow mb-2.5 block" style={{ color: accent }}>
        {label}
      </label>
      <button
        type="button"
        className="dd-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">{current ? current.label : value}</span>
        <ChevronDown size={18} className="dd-chevron" />
      </button>

      <div className="dd-collapse">
        <div>
          <div className="dd-list" role="listbox" aria-label={label}>
            {options.map((o, i) => (
              <button
                type="button"
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                tabIndex={open ? 0 : -1}
                className="dd-option"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span className="dd-radio" />
                <span className="truncate">{o.label}</span>
                {o.value === value ? (
                  <Check size={15} className="ml-auto" style={{ color: accent }} />
                ) : (
                  <span className="dd-idx">{String(i + 1).padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PLATFORM_OPTIONS: DropdownOption[] = [
  { value: "All", label: "All Networks (Global)" },
  { value: "YouTube", label: "YouTube" },
  { value: "TikTok", label: "TikTok" },
  { value: "Instagram", label: "Instagram" },
  { value: "X", label: "X (Twitter)" },
];

const CONTENT_OPTIONS: DropdownOption[] = [
  { value: "Short-form Video", label: "Short-form Video" },
  { value: "Long-form Video", label: "Long-form Video" },
  { value: "Text / Thread", label: "Text / Thread" },
];

const COHORT_OPTIONS: DropdownOption[] = [
  { value: "Q3 2026 vs Q4 2026", label: "Q3 2026 vs Q4 2026" },
  { value: "New vs Returning Audience", label: "New vs Returning Audience" },
  { value: "Organic vs Paid Circulation", label: "Organic vs Paid Circulation" },
];

export default function CreatorDistributionFunnel() {
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [aggregates, setAggregates] = useState<Aggregates | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("All");
  const [contentTypeFilter, setContentTypeFilter] = useState("Short-form Video");
  const [cohortFilter, setCohortFilter] = useState("Q3 2026 vs Q4 2026");

  // Untouched Data Fetching Logic
  useEffect(() => {
    const fetchData = async () => {
      // Phones can't reach "localhost" (that would be the phone itself), so the
      // API host follows whatever host the page was opened from. Set
      // NEXT_PUBLIC_API_URL to override it (e.g. for a deployed backend).
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ?? `http://${window.location.hostname}:8000`;
      // Give up after 5s so the fallback data appears quickly on bad networks.
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      try {
        const url = `${API_BASE}/api/funnel?platform_filter=${platformFilter}&content_type=${encodeURIComponent(contentTypeFilter)}&cohort=${encodeURIComponent(cohortFilter)}`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setFunnelData(data.metrics);
        setAggregates(data.aggregates);
      } catch (error) {
        console.warn("API unavailable. Falling back to robust mock data.");
        setFunnelData([
          { platform: "Fallback Node", impressions: 2500000, clicks: 85000, ctr: 3.4, watch_time: 150000, conversions: 4200 }
        ]);
        setAggregates({ total_impressions: 2500000, total_conversions: 4200, avg_conversion_rate: 0.168 });
      } finally {
        clearTimeout(timer);
      }
    };
    fetchData();
  }, [platformFilter, contentTypeFilter, cohortFilter]);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(funnelData));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cinematic_rail_intel.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="relative z-10 w-full text-cream">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-8 pb-12">

        {/* Top Navigation / Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 py-6 sm:py-8">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-gold/30 to-coral/20 border border-gold/30 shadow-[0_10px_40px_-10px_rgba(245,184,75,0.55)]">
              <Terminal className="text-gold" size={24} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[1.65rem] sm:text-4xl font-semibold tracking-tight gradient-text leading-none">
                Content Intelligence
              </h1>
              <p className="eyebrow mt-2.5 flex items-center gap-2 truncate">
                <span className="ring-dot shrink-0" style={{ transform: "scale(0.8)" }} />
                SYS.INTEL // INFOCREON_BATCH_02
              </p>
            </div>
          </div>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gold text-ink font-bold text-xs uppercase tracking-[0.14em] shadow-[0_10px_30px_-10px_rgba(245,184,75,0.8)] hover:shadow-[0_14px_40px_-8px_rgba(245,184,75,0.95)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Settings2 size={16} className="group-hover:rotate-90 transition-transform duration-500" />
            Control Panel
          </button>
        </header>

        {/* Main Grid Layout (stacks on mobile: telemetry -> chart -> status) */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* Network Telemetry */}
          <section className="card p-6 sm:p-8 lg:col-span-4">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -top-28 -right-28 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <h2 className="card-title mb-7 relative">
              <span className="icon-chip"><Activity size={16} className="text-gold" /></span>
              Network Telemetry
            </h2>

            <div className="space-y-6 relative">
              <div>
                <p className="eyebrow mb-2">Global Conversion Yield</p>
                <p className="font-display text-[3.4rem] sm:text-7xl font-semibold tracking-tight leading-none gradient-text">
                  {aggregates ? `${aggregates.avg_conversion_rate}%` : "0.00%"}
                </p>
              </div>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 pt-6 border-t border-line">
                <div className="min-w-0 rounded-2xl bg-cream/[0.04] border border-line p-4">
                  <p className="eyebrow !text-gold mb-2">Total Packets (Imp)</p>
                  <p className="text-xl font-mono font-medium truncate">{aggregates ? aggregates.total_impressions.toLocaleString() : "0"}</p>
                </div>
                <div className="min-w-0 rounded-2xl bg-cream/[0.04] border border-line p-4">
                  <p className="eyebrow !text-coral mb-2">Secured Nodes (Conv)</p>
                  <p className="text-xl font-mono font-medium truncate">{aggregates ? aggregates.total_conversions.toLocaleString() : "0"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Visualization Chart (spans both rows on desktop) */}
          <section className="card p-5 sm:p-8 lg:col-span-8 lg:row-span-2 flex flex-col">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orchid to-transparent" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-orchid/10 blur-3xl pointer-events-none" />
            <h2 className="card-title mb-6 relative">
              <span className="icon-chip !bg-orchid/10 !border-orchid/30"><ShieldAlert size={16} className="text-orchid" /></span>
              Signal Distribution Matrix
            </h2>

            <div className="w-full h-[340px] sm:h-[440px] lg:h-[560px] relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 320, height: 340 }}>
                <ComposedChart
                  data={funnelData.map(d => ({ ...d, revenue: Math.round(d.conversions * 45.50) }))}
                  margin={{ top: 20, right: 4, left: 0, bottom: 20 }}
                >
                  {/* SVG Definitions for gradients */}
                  <defs>
                    <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5B84B" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#F5B84B" stopOpacity={0.15}/>
                    </linearGradient>
                    <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3DD6C6" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#3DD6C6" stopOpacity={0.15}/>
                    </linearGradient>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B8A" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#FF6B8A" stopOpacity={0.15}/>
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 6" stroke="rgba(239,228,204,0.10)" vertical={false} />
                  <XAxis dataKey="platform" stroke="rgba(239,228,204,0.25)" tickLine={false} tick={{ fill: '#EFE4CC', fontSize: 12 }} />
                  <YAxis yAxisId="left" width={44} scale="log" domain={[1, 'auto']} allowDataOverflow stroke="rgba(239,228,204,0.25)" tickLine={false} tickFormatter={compact} tick={{ fill: '#B4A98F', fontSize: 11 }} />
                  <YAxis yAxisId="right" width={44} orientation="right" scale="log" domain={[1, 'auto']} allowDataOverflow stroke="rgba(201,167,255,0.4)" tickLine={false} tickFormatter={compact} tick={{ fill: '#C9A7FF', fontSize: 11 }} />

                  <Tooltip
                    cursor={{ fill: 'rgba(245, 184, 75, 0.06)' }}
                    contentStyle={{ backgroundColor: '#15101e', border: '1px solid rgba(245,184,75,0.4)', color: '#EFE4CC', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.9)', fontSize: '12px', borderRadius: '14px' }}
                    labelStyle={{ color: '#F5B84B', fontWeight: 700 }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />

                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#EFE4CC' }} />

                  {/* ActiveBar properties create the glowing, slightly enlarged effect on hover */}
                  <Bar yAxisId="left" dataKey="impressions" fill="url(#colorImp)" name="Impressions" radius={[8, 8, 0, 0]}
                    activeBar={{ stroke: '#F5B84B', strokeWidth: 1.5, filter: 'drop-shadow(0 0 10px rgba(245,184,75,0.7))', fillOpacity: 1 }}
                  />
                  <Bar yAxisId="left" dataKey="clicks" fill="url(#colorClick)" name="Clicks" radius={[8, 8, 0, 0]}
                    activeBar={{ stroke: '#3DD6C6', strokeWidth: 1.5, filter: 'drop-shadow(0 0 10px rgba(61,214,198,0.7))', fillOpacity: 1 }}
                  />
                  <Bar yAxisId="right" dataKey="conversions" fill="url(#colorConv)" name="Conversions" radius={[8, 8, 0, 0]}
                    activeBar={{ stroke: '#FF6B8A', strokeWidth: 1.5, filter: 'drop-shadow(0 0 10px rgba(255,107,138,0.7))', fillOpacity: 1 }}
                  />

                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#C9A7FF" strokeWidth={3} name="Est. Revenue ($)"
                    dot={false} activeDot={false} style={{ filter: 'drop-shadow(0 0 6px rgba(201,167,255,0.6))' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* System Status */}
          <section className="card p-6 sm:p-8 lg:col-span-4">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-aqua to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-aqua/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative">
              <h2 className="card-title">
                <span className="icon-chip !bg-aqua/10 !border-aqua/30"><Cpu size={16} className="text-aqua" /></span>
                System Status
              </h2>
              <div className="sig-bars" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
            </div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 relative">
              <div className="status-tile">
                <div className="flex items-center justify-between mb-3">
                  <Radio size={16} className="text-aqua" />
                  <span className="ring-dot" />
                </div>
                <p className="eyebrow mb-1.5">Uplink Status</p>
                <p className="font-mono text-sm font-bold text-aqua tracking-wider">SECURE</p>
              </div>

              <div className="status-tile">
                <div className="flex items-center justify-between mb-3">
                  <Lock size={16} className="text-gold" />
                </div>
                <p className="eyebrow mb-1.5">Encryption Protocol</p>
                <p className="font-mono text-sm font-medium text-cream break-words">AES-256-GCM</p>
              </div>

              <div className="status-tile">
                <div className="flex items-center justify-between mb-3">
                  <Database size={16} className="text-orchid" />
                </div>
                <p className="eyebrow mb-1.5">Active Pipeline</p>
                <p className="font-mono text-sm font-medium text-orchid break-words">GDELT_LIVE</p>
              </div>

              <div className="status-tile">
                <div className="flex items-center justify-between mb-3">
                  <Target size={16} className="text-coral" />
                </div>
                <p className="eyebrow mb-1.5">Target Segment</p>
                <p className="font-mono text-sm font-bold text-coral break-words">{platformFilter}</p>
              </div>
            </div>

            {/* decorative live-signal trace */}
            <svg className="w-full h-10 mt-6 relative" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0 20 H40 L50 20 L56 6 L64 34 L70 20 H120 L130 20 L136 10 L142 28 L148 20 H200"
                fill="none"
                stroke="#3DD6C6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="pulse-line"
              />
            </svg>
          </section>
        </main>
      </div>

      {/* Slide-over Control Panel (Sidebar) */}
      <div
        className={`fixed inset-0 bg-black/75 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Solid (non-translucent) sidebar, scrolls independently */}
      <aside
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-[#120d1b] border-l border-gold/30 shadow-[-30px_0_80px_rgba(0,0,0,0.8)] z-50 flex flex-col overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-[3px] w-full shrink-0 bg-gradient-to-r from-gold via-coral to-orchid" />

        <div className="flex flex-col gap-8 p-6 sm:p-8 flex-1">
          <div className="flex justify-between items-center pb-5 border-b border-line">
            <h2 className="font-display text-2xl font-semibold gradient-text">Control Array</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2.5 rounded-full bg-cream/[0.06] border border-line text-sand hover:text-ink hover:bg-gold hover:border-gold transition-colors"
              aria-label="Close control panel"
            >
              <X size={18} />
            </button>
          </div>

          <section className="space-y-6">
            <Dropdown
              label="Target Platform Node"
              accent="#F5B84B"
              value={platformFilter}
              options={PLATFORM_OPTIONS}
              onChange={setPlatformFilter}
            />
            <Dropdown
              label="Content Vector"
              accent="#FF6B8A"
              value={contentTypeFilter}
              options={CONTENT_OPTIONS}
              onChange={setContentTypeFilter}
            />
            <Dropdown
              label="Temporal Cohort"
              accent="#C9A7FF"
              value={cohortFilter}
              options={COHORT_OPTIONS}
              onChange={setCohortFilter}
            />
          </section>

          <section className="pt-6 border-t border-line space-y-5 mt-auto">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold to-coral text-ink text-xs font-extrabold uppercase tracking-[0.16em] py-4 shadow-[0_12px_30px_-10px_rgba(245,184,75,0.7)] hover:shadow-[0_16px_40px_-8px_rgba(255,107,138,0.8)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download size={17} />
              Extract Data Payload
            </button>

            <div className="font-mono text-[11px] text-sand leading-relaxed bg-[#1a1327] p-4 rounded-2xl border border-line">
              <p className="eyebrow !text-gold mb-2 border-b border-line pb-2">Identity Tag</p>
              <p>OPERATIVE: <span className="text-cream">Shone</span></p>
              <p>ID PROTOCOL: <span className="text-cream">PoC 46</span></p>
              <p>GITHUB NODE: <span className="text-cream">@ifwshone</span></p>
              <p className="text-coral mt-2">INFOCREON INTERNSHIP SECURE CONNECTION</p>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
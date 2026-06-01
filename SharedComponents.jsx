import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS, DAYS, EMERALD, fadeUp } from "../data/constants";

// ─── ANIMATED NUMBER ──────────────────────────────────────────────────────────

export function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const ctrl = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        if (node) node.textContent = Math.floor(v).toLocaleString("fi-FI") + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── TREND BADGE ──────────────────────────────────────────────────────────────

export function TrendBadge({ value, inverted = false }) {
  const positive = inverted ? value < 0 : value > 0;
  const color = positive ? "text-emerald-400" : "text-red-400";
  const arrow = value > 0 ? "↑" : "↓";
  return (
    <span className={`text-xs font-medium ${color} flex items-center gap-0.5`}>
      {arrow} {Math.abs(value)}%
    </span>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────

export function Section({ title, children, delay = 0, theme }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      className="space-y-5"
    >
      <motion.h2 variants={fadeUp} className="text-2xl font-light tracking-wide" style={{ color: theme ? theme.textColor : 'rgba(232,232,232,0.9)' }}>
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = "", accent, theme }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-xl p-5 relative overflow-hidden ${className}`}
      style={{
        background: theme ? theme.msgBg : '#232325',
        borderColor: theme ? theme.border : 'rgba(255,255,255,0.09)',
        border: `1px solid ${theme ? theme.border : 'rgba(255,255,255,0.09)'}`,
        ...(accent ? { borderLeft: `3px solid ${accent}` } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

export const CustomTooltip = ({ active, payload, label, theme: t }) => {
  if (!active || !payload?.length) return null;
  const bg = t ? t.inputBg : '#27272a';
  const border = t ? t.border : 'rgba(255,255,255,0.09)';
  const text = t ? t.textColor : '#e8e8e8';
  const subtle = t ? t.subtleText : 'rgba(255,255,255,0.4)';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, color: text }} className="rounded-lg px-3 py-2 text-xs shadow-xl">
      <div style={{ color: subtle }} className="mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || EMERALD }}>{p.name}: <strong>{p.value?.toLocaleString?.() ?? p.value}</strong></div>
      ))}
    </div>
  );
};

// ─── DONUT CHART ──────────────────────────────────────────────────────────────

export function DonutChart({ data, title, theme }) {
  return (
    <div>
      <p className="text-xs mb-3 uppercase tracking-widest font-medium" style={{ color: theme ? theme.subtleText : 'rgba(255,255,255,0.4)' }}>{title}</p>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
            dataKey="value" paddingAngle={3} strokeWidth={0}>
            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip theme={theme} />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: theme ? theme.subtleText : 'rgba(255,255,255,0.4)' }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            {d.name} <span className="font-medium" style={{ color: theme ? theme.textColor : '#e8e8e8' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PEAK HOURS HEATMAP ───────────────────────────────────────────────────────

export function PeakHoursHeatmap({ matrix, theme }) {
  const max = Math.max(...matrix.flat());
  const subtle = theme ? theme.subtleText : 'rgba(255,255,255,0.22)';
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="flex gap-0.5 mb-1 pl-10">
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="flex-1 text-center text-[9px]" style={{ color: subtle }}>
              {h % 3 === 0 ? `${h}h` : ""}
            </div>
          ))}
        </div>
        {matrix.map((row, d) => (
          <div key={d} className="flex gap-0.5 mb-0.5 items-center">
            <div className="w-9 text-[10px] text-right pr-2 shrink-0" style={{ color: subtle }}>{DAYS[d]}</div>
            {row.map((val, h) => {
              const intensity = max > 0 ? val / max : 0;
              const bg = intensity < 0.1
                ? "bg-zinc-800"
                : intensity < 0.3
                ? "bg-emerald-900/60"
                : intensity < 0.6
                ? "bg-emerald-700/70"
                : intensity < 0.85
                ? "bg-emerald-500/80"
                : "bg-emerald-400";
              return (
                <div
                  key={h}
                  title={`${DAYS[d]} ${h}:00 — ${val} conversations`}
                  className={`flex-1 h-5 rounded-sm ${bg} cursor-default transition-opacity hover:opacity-80`}
                />
              );
            })}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: subtle }}>
          <span>Low</span>
          {["bg-zinc-800", "bg-emerald-900/60", "bg-emerald-700/70", "bg-emerald-500/80", "bg-emerald-400"].map((c, i) => (
            <div key={i} className={`w-4 h-3 rounded-sm ${c}`} />
          ))}
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

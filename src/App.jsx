import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockData } from "./data/mockData";
import OverviewSection from "./sections/OverviewSection";
import MonthlyTrendsSection from "./sections/MonthlyTrendsSection";
import AIPerformanceSection from "./sections/AIPerformanceSection";
import CustomerBehaviorSection from "./sections/CustomerBehaviorSection";

// ── Theme definitions ────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0f0f11",
    surface: "#18181b",
    msgBg: "#232325",
    inputBg: "#27272a",
    border: "rgba(255,255,255,0.09)",
    textColor: "rgba(232,232,232,0.92)",
    subtleText: "rgba(255,255,255,0.38)",
    navBg: "rgba(15,15,17,0.85)",
  },
  light: {
    bg: "#f8f8f6",
    surface: "#ffffff",
    msgBg: "#f1f1ef",
    inputBg: "#e8e8e6",
    border: "rgba(0,0,0,0.09)",
    textColor: "rgba(20,20,20,0.92)",
    subtleText: "rgba(0,0,0,0.4)",
    navBg: "rgba(248,248,246,0.85)",
  },
};

// ── Nav tabs ─────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",          label: "Overview" },
  { id: "monthly",           label: "Monthly Trends" },
  { id: "ai-performance",    label: "AI Performance" },
  { id: "customer-behavior", label: "Customer Behavior" },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const theme = darkMode ? themes.dark : themes.light;
  const dark = darkMode;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: theme.bg, color: theme.textColor }}
    >
      {/* ── Top navigation bar ───────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: theme.navBg,
          borderColor: theme.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src="https://6a1d4cd40bc623d413b1bf9a.imgix.net/logo/tia.ai.png"
              alt="TIA AI"
              className="h-7 w-auto object-contain"
              style={{ filter: dark ? "none" : "invert(1)" }}
            />
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}
            >
              Dashboard
            </span>
          </div>

          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: theme.inputBg,
              color: theme.subtleText,
            }}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* ── Tab navigation ───────────────────────────────────────── */}
        <div
          className="max-w-6xl mx-auto px-5 flex gap-1 pb-0"
          style={{ borderColor: theme.border }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg"
                style={{
                  color: active ? "#34d399" : theme.subtleText,
                  background: active ? "rgba(52,211,153,0.07)" : "transparent",
                }}
              >
                {tab.label}
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "#34d399" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewSection theme={theme} dark={dark} d={mockData} />
            )}
            {activeTab === "monthly" && (
              <MonthlyTrendsSection theme={theme} dark={dark} d={mockData} />
            )}
            {activeTab === "ai-performance" && (
              <AIPerformanceSection theme={theme} dark={dark} d={mockData} />
            )}
            {activeTab === "customer-behavior" && (
              <CustomerBehaviorSection theme={theme} dark={dark} d={mockData} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-16 py-6 text-center text-xs"
        style={{ borderColor: theme.border, color: theme.subtleText }}
      >
        TIA AI Dashboard © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Section, Card, CustomTooltip } from "../components/SharedComponents";
import { fadeUp, EMERALD, RED } from "../data/constants";

export default function AIPerformanceSection({ theme, dark, d }) {
  const cardBg = "border";
  const subText = dark ? "text-zinc-400" : "text-zinc-500";

  return (
    <Section theme={theme} title="TIA AI Performance" delay={0.05}>
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Classification Donut */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Conversation Classification</p>
          <div className="flex items-center gap-6">
            <div className="w-44 h-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Lead", value: d.ai.classification.lead.count },
                      { name: "Information", value: d.ai.classification.information.count },
                      { name: "Support", value: d.ai.classification.support.count },
                    ]}
                    cx="50%" cy="50%" innerRadius={45} outerRadius={68}
                    dataKey="value" paddingAngle={3} strokeWidth={0}
                  >
                    <Cell fill="#34d399" />
                    <Cell fill="#60a5fa" />
                    <Cell fill="#f472b6" />
                  </Pie>
                  <Tooltip content={<CustomTooltip theme={theme} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {[
                { label: "Lead", data: d.ai.classification.lead, color: "#34d399" },
                { label: "Information", data: d.ai.classification.information, color: "#60a5fa" },
                { label: "Support", data: d.ai.classification.support, color: "#f472b6" },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                    <span className="text-sm">{c.label}</span>
                    <span className={`text-xs ${subText} ml-auto`}>{c.data.percentage}%</span>
                  </div>
                  <p className="text-lg font-light ml-4" style={{ color: c.color }}>
                    {c.data.count.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Topics */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>AI Topic Analysis</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart layout="vertical" data={d.ai.topTopics} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="topic" type="category" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Bar dataKey="count" fill={EMERALD} radius={[0, 3, 3, 0]} name="Conversations" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Re-Ask Rate */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-1 ${subText}`}>Re-Ask Rate</p>
          <p className={`text-xs ${subText} mb-4`}>Users who rephrased the same question</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-4xl font-light text-red-400">{d.ai.reAskRate.percentage}%</p>
              <p className={`text-xs ${subText} mt-1`}>{d.ai.reAskRate.count} conversations</p>
            </div>
            <div className="w-32 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.ai.reAskRate.trend.map((v, i) => ({ i, v }))}>
                  <Line type="monotone" dataKey="v" stroke={RED} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Confidence Score */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-1 ${subText}`}>AI Confidence Score</p>
          <p className={`text-xs ${subText} mb-4`}>Average response quality rating</p>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke={dark ? "#27272a" : "#e4e4e7"} strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke={EMERALD} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 40 * d.ai.avgConfidence / 100} ${2 * Math.PI * 40}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center rotate-0">
                <span className="text-xl font-semibold text-emerald-400">{d.ai.avgConfidence}</span>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={d.ai.confidenceTrend}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[70, 100]} hide />
                  <Tooltip content={<CustomTooltip theme={theme} />} />
                  <Line type="monotone" dataKey="score" stroke={EMERALD} strokeWidth={2} dot={false} name="Confidence" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* AI Generated Links */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>AI Generated Links</p>
          <div className="space-y-2">
            {d.ai.topAiLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`text-xs font-medium w-4 ${subText}`}>{i + 1}</span>
                <span className="text-sm flex-1 text-emerald-400 font-medium">{link.url}</span>
                <span className={`text-xs ${subText}`}>{link.count}×</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Escalations */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Escalation Opportunities</p>
          <div className="space-y-2">
            {d.ai.escalations.map((e) => (
              <div key={e.id} className="rounded-lg border border-red-400/20 bg-red-400/5 p-3" style={{ borderLeft: "3px solid #f87171" }}>
                <p className="text-sm mb-1 italic" style={{ color: theme.textColor }}>"{e.snippet}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-red-400">{e.reason}</span>
                  <span className={`text-xs ${subText}`}>{e.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </motion.div>
    </Section>
  );
}

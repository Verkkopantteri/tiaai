import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Section, Card, CustomTooltip, DonutChart } from "../components/SharedComponents";
import { fadeUp, EMERALD, formatDuration } from "../data/constants";

export default function CustomerBehaviorSection({ theme, dark, d }) {
  const cardBg = "border";
  const subText = dark ? "text-zinc-400" : "text-zinc-500";

  return (
    <Section theme={theme} title="Customer Behavior" delay={0.05}>
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Visit Times */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Most Common Visit Times</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={d.behavior.visitTimes} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="hour" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Bar dataKey="count" fill={EMERALD} radius={[3, 3, 0, 0]} name="Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Words */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Most Common Words</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={d.behavior.topWords.slice(0, 6)} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="word" type="category" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Bar dataKey="count" fill={EMERALD} radius={[0, 3, 3, 0]} name="Occurrences" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Devices + Browsers */}
        <Card theme={theme} className={cardBg}>
          <div className="grid grid-cols-2 gap-4">
            <DonutChart data={d.behavior.deviceDistribution} title="Device Split" theme={theme} />
            <DonutChart data={d.behavior.browserDistribution} title="Browser Split" theme={theme} />
          </div>
        </Card>

        {/* Entry Pages */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Entry Pages</p>
          <div className="space-y-2">
            {d.behavior.entryPages.map((p, i) => {
              const max = d.behavior.entryPages[0].count;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-xs w-5 ${subText}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium">{p.url}</span>
                      <span className={`text-xs ${subText}`}>{p.count.toLocaleString()}</span>
                    </div>
                    <div className={`h-1 rounded-full ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${(p.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Language Distribution */}
        <Card theme={theme} className={cardBg}>
          <DonutChart data={d.behavior.languageDistribution} title="Language Distribution" theme={theme} />
        </Card>

        {/* Session Duration + Bounce */}
        <Card theme={theme} className={cardBg}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Session Duration</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Average", val: formatDuration(d.behavior.avgDuration) },
              { label: "Longest", val: formatDuration(d.behavior.longestSession) },
              { label: "Shortest", val: formatDuration(d.behavior.shortestSession) },
            ].map((s, i) => (
              <div key={i} className="rounded-lg p-3">
                <p className={`text-xs ${subText} mb-1`}>{s.label}</p>
                <p className="text-sm font-semibold text-emerald-400">{s.val}</p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <p className={`text-xs ${subText}`}>Bounce Rate</p>
              <p className="text-xs font-semibold text-red-400">{d.behavior.bounceAnalysis.percentage}%</p>
            </div>
            <div className={`h-2 rounded-full ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
              <div
                className="h-full rounded-full bg-red-400"
                style={{ width: `${d.behavior.bounceAnalysis.percentage}%` }}
              />
            </div>
            <p className={`text-xs ${subText} mt-1`}>{d.behavior.bounceAnalysis.count} users opened chat without sending a message</p>
          </div>
        </Card>

        {/* Top Clicked Links */}
        <Card theme={theme} className={`${cardBg} md:col-span-2`}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Most Clicked Links</p>
          <div className="flex items-center justify-around">
            {d.behavior.topClickedLinks.map((link, i) => (
              <div key={i} className="text-center px-4 py-2">
                <p className="text-2xl font-light text-emerald-400">{link.count}</p>
                <p className={`text-xs ${subText} mt-1`}>{link.url}</p>
              </div>
            ))}
          </div>
        </Card>

      </motion.div>
    </Section>
  );
}

import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Section, Card, CustomTooltip, PeakHoursHeatmap } from "../components/SharedComponents";
import { fadeUp, EMERALD } from "../data/constants";

export default function MonthlyTrendsSection({ theme, dark, d }) {
  const cardBg = "border";
  const subText = dark ? "text-zinc-400" : "text-zinc-500";

  const lineCharts = [
    { label: "Conversations per Day", data: d.trends.conversationsPerDay, key: "count", color: EMERALD },
    { label: "Leads per Day", data: d.trends.leadsPerDay, key: "count", color: "#60a5fa" },
    { label: "Support Requests per Day", data: d.trends.supportPerDay, key: "count", color: "#f472b6" },
    { label: "Information per Day", data: d.trends.infoPerDay, key: "count", color: "#fbbf24" },
  ];

  return (
    <Section theme={theme} title="Monthly Trends" delay={0.05}>
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {lineCharts.map((chart, i) => (
          <Card key={i} theme={theme} className={cardBg}>
            <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>{chart.label}</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chart.data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v % 5 === 0 ? v : ""} />
                <YAxis tick={{ fill: "#71717a", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip theme={theme} />} />
                <Line type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2} dot={false} name="Count" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        ))}

        {/* Peak Hours Heatmap */}
        <Card theme={theme} className={`${cardBg} md:col-span-2`}>
          <p className={`text-xs uppercase tracking-widest font-medium mb-4 ${subText}`}>Peak Hours Heatmap</p>
          <PeakHoursHeatmap matrix={d.trends.peakHoursMatrix} theme={theme} />
        </Card>

      </motion.div>
    </Section>
  );
}

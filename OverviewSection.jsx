import { motion } from "framer-motion";
import { Section, Card, AnimatedNumber, TrendBadge } from "../components/SharedComponents";
import { fadeUp, formatDuration } from "../data/constants";

export default function OverviewSection({ theme, dark, d }) {
  const cardBg = "border";
  const subText = dark ? "text-zinc-400" : "text-zinc-500";

  const kpiCards = [
    { label: "Active Conversations", value: d.overview.activeConversations, trend: d.overview.trends.activeConversations },
    { label: "Conversations This Month", value: d.overview.conversationsThisMonth, trend: d.overview.trends.conversationsThisMonth },
    { label: "Leads Generated", value: d.overview.leadsGenerated, trend: d.overview.trends.leadsGenerated },
    { label: "Avg. Session Duration", value: formatDuration(d.overview.avgSessionDuration), trend: d.overview.trends.avgSessionDuration, raw: true, inverted: true },
    { label: "Avg. AI Response Time", value: `${d.overview.avgResponseTime}ms`, trend: d.overview.trends.avgResponseTime, raw: true, inverted: true },
    { label: "Bounce Rate", value: `${d.overview.bounceRate}%`, trend: d.overview.trends.bounceRate, raw: true, inverted: true },
  ];

  return (
    <Section theme={theme} title="Overview">
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card, i) => (
          <Card key={i} theme={theme} className={cardBg}>
            <p className={`text-xs uppercase tracking-widest font-medium mb-3 ${subText}`}>{card.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-light">
                {card.raw ? card.value : <AnimatedNumber value={card.value} />}
              </span>
              <TrendBadge value={card.trend} inverted={card.inverted} />
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
}

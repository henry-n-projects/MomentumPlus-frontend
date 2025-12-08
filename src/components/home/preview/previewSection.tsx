import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { Flame } from "lucide-react";

const tagData = [
  { name: "Work", value: 45, color: "#A3C9E0" },
  { name: "Study", value: 30, color: "#C8B6E2" },
  { name: "Creative", value: 25, color: "#E5D7CF" },
];

const activityData = [
  { day: "Mon", sessions: 8 },
  { day: "Tue", sessions: 6 },
  { day: "Wed", sessions: 10 },
  { day: "Thu", sessions: 7 },
  { day: "Fri", sessions: 9 },
  { day: "Sat", sessions: 5 },
  { day: "Sun", sessions: 4 },
];

export function PreviewSection() {
  return (
    <section className="py-24 px-4 bg-[var(--soft-blue-light)]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Insights that matter
        </motion.h2>

        <motion.p
          className="text-xl text-center text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Visualize your focus patterns and watch your productivity grow.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pie Chart Card */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <h3 className="text-xl mb-6">Time by Tag</h3>

            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={tagData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tagData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {tagData.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-[var(--text-secondary)]">
                      {tag.name}
                    </span>
                  </div>
                  <span>{tag.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame className="w-16 h-16" style={{ color: "#FF6B6B" }} />
            </motion.div>

            <h3 className="text-xl mb-2">Current Streak</h3>

            <div
              className="text-6xl mb-2"
              style={{ color: "var(--soft-blue)" }}
            >
              12
            </div>

            <p className="text-[var(--text-secondary)]">days in a row</p>

            <div className="mt-6 w-full flex justify-center gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-md"
                  style={{
                    backgroundColor: i < 5 ? "#A3C9E0" : "#E5D7CF",
                    opacity: i < 5 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Weekly Activity Card */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8 }}
          >
            <h3 className="text-xl mb-6">This Week</h3>

            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={activityData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                />
                <Bar dataKey="sessions" fill="#A3C9E0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 text-center">
              <p className="text-2xl">
                49{" "}
                <span className="text-[var(--text-secondary)]">sessions</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

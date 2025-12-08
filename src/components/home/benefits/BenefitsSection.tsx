import { motion } from "motion/react";
import { TrendingUp, Target, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Understand your habits with deep analytics.",
  },
  {
    icon: Target,
    title: "Stay Consistent",
    description: "Build streaks, review sessions, and stay accountable.",
  },
  {
    icon: Sparkles,
    title: "Designed for Focus",
    description: "A minimalist experience that reduces noise.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-warmNeutral to-softBlueLight">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-20 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why choose focus?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-softBlue" />
                </motion.div>

                <h3 className="text-2xl mb-4">{benefit.title}</h3>

                <p className="text-textSecondary leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

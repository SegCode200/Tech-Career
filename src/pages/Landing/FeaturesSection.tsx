import { motion } from 'framer-motion';
import {
  CheckBadgeIcon,
  PuzzlePieceIcon,
  CommandLineIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Tailored Career Matches",
    description: "Get multiple tech careers matched specifically to your unique strengths and goals.",
    icon: CheckBadgeIcon,
  },
  {
    title: "Smart Question Framework",
    description: "We use real behavioral and preference-based logic—not generic answers.",
    icon: PuzzlePieceIcon,
  },
  {
    title: "Clear Next Steps",
    description: "See what skills, tools, and certifications you need for each recommended role.",
    icon: CommandLineIcon,
  },
  {
    title: "No Tech Experience Required",
    description: "The tool is built for everyone, whether you’re exploring or transitioning.",
    icon: SparklesIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#8B59FF] mb-4">Why Use Karion ?</h2>
        <p className="text-gray-600 mb-12">
          Designed for aspiring technologists, career changers, and curious learners alike.
        </p>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <feature.icon className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

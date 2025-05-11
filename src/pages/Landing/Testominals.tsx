import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah B.',
    title: 'Aspiring UX Designer',
    quote:
      "This assessment helped me realize I’m more creative than I thought. I'm now taking my first UI/UX course!",
  },
  {
    name: 'James O.',
    title: 'Career Changer from Finance',
    quote:
      "I had no idea which tech path to take. This tool gave me clear direction and saved me months of confusion.",
  },
  {
    name: 'Anita K.',
    title: 'CS Student',
    quote:
      "The results were spot on! It confirmed my interest in AI/ML and gave me resources to start learning.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Others Are Saying</h2>
        <p className="text-gray-600 mb-12">Real feedback from people who’ve taken the assessment.</p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-left">
                <p className="text-sm text-gray-600 italic mb-4">“{t.quote}”</p>
                <div className="font-semibold text-gray-800">{t.name}</div>
                <div className="text-xs text-gray-500">{t.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

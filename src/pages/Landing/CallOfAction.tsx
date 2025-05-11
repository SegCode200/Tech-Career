import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="bg-purple-700 text-white py-16 px-4 sm:px-8 lg:px-16">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Discover Your Tech Career Match?
        </h2>
        <p className="mb-8 text-lg">
          Take our personalized assessment and get career insights tailored to you.
        </p>
        <a
          href="/instructions"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Start the Assessment
        </a>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";

const results = [
  {
    career: "UI/UX Designer",
    match: 92,
    description: "Combines creativity and logic to design seamless digital experiences.",
  },
  {
    career: "Software Developer",
    match: 87,
    description: "Builds and maintains applications and systems with code.",
  },
  {
    career: "Product Manager",
    match: 79,
    description: "Leads product vision, working across teams to deliver value.",
  },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Your Top Career Matches
        </h2>

        <div className="space-y-6">
          {results.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-[#605CFF]">{item.career}</h3>
                <span className="text-sm text-gray-600">{item.match}% match</span>
              </div>
              <p className="text-sm text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Explore Careers
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

// src/pages/IntroPage.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          👋 Hi, I’m <span className="text-[#8B59FF]">Karion</span> — your career guide
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
          I'm here to help you discover tech roles that fit your unique personality, interests, and strengths.
          We'll go through some quick questions, and I’ll recommend tech career paths tailored just for you!
        </p>

        <button
          onClick={() => navigate("/instructions")}
          className="mt-4 bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Click to start your journey to discovery
        </button>
      </motion.div>
    </div>
  );
}

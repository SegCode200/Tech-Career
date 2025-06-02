import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#605CFF] to-[#8B59FF]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-white text-4xl sm:text-5xl font-bold tracking-wide"
      >
        Karion
      </motion.div>
    </div>
  );
}

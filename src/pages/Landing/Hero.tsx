import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Hero = () => {
  const items = [
    "Software Development",
    "Cybersecurity",
    "Animator",
    "Product Manager",
    "E-commerce Manager",
    "UI/UX Designer",
    "IT Support/Administration",
    "Business Analyst",
    "Content Creator/Social Media Manager ",
    "Artificial Intelligence/Machine Learning ",
    "Cloud Solutions Engineering",
  ];
  return (
    <div className="h-[calc(100vh-70px)]  relative">
      <div className="w-full h-full flex flex-col justify-center items-center ">
      <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-black max-w-xl text-lg sm:text-xl text-center font-medium mb-2"
        >
        Get more done, with less stress
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-6xl  text-center  sm:text-5xl md:text-6xl font-bold text-black mb-4 leading-tight"
        >
        Discover Your <span className="text-[#605CFF]">Career Path</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-black  mt-4 text-center text-base sm:text-lg  max-w-xl"
        >
           
      Feeling Stuck in Your Career? Unsure about your next step? At <span className="font-semibold">CareerTraits</span>, we help you uncover the tech path that aligns with your strengths, interests, and goals—so you can move forward with confidence.
        </motion.p>
        <Link to={"/instructions"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </motion.div>
        </Link>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-30 left-50 max-xl:hidden w-40 h-40 bg-[url('https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center  rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-60 right-50 max-xl:hidden w-40 h-40 bg-[url('https://images.unsplash.com/photo-1521185496955-15097b20c5fe?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center  rounded-full"
        />

      {/* List of Career that scroll automatically going from left to right */}

      <div className="overflow-hidden w-full bottom-2 absolute z-20  bg-[#8B59FF] py-4 transform -skew-y-3">
      <div className="whitespace-nowrap animate-scroll flex gap-10">
        {items.concat(items).map((item, index) => (
          <span key={index} className="text-white text-base font-medium">
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
      <div className="overflow-hidden bottom-2 absolute w-full h-[60px]  bg-[#605CFF] py-4 transform skew-y-1">
    </div>
      </div>
    </div>
  )
}

export default Hero
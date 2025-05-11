import { LightBulbIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
const TimeFrame = () => {
  const steps = [
    {
      title: "Take the Assessment",
      description:
        "Answer personalized questions to uncover your strengths, interests, and preferences.",
      icon: LightBulbIcon,
    },
    {
      title: "Get Your Results",
      description:
        "Receive tech career suggestions matched to your profile with scores and key traits.",
      icon: ChartBarIcon,
    },
    {
      title: "Explore Your Path",
      description:
        "Understand each career, required skills, and actionable next steps to get started.",
      icon: RocketLaunchIcon,
    },
  ];
  return (
    <div className='mt-[80px]'>
     <div className="w-full h-[70px] flex flex-col justify-center items-center">
     <div className="font-bold text-4xl text-center mt-10 mb-5">
        Get Answer in <span className=" bg-gradient-to-r from-[#605CFF] via-[#9e80e1] to-[#8B59FF] inline-block text-transparent bg-clip-text ">Less Than 5 Minutes</span>
      </div>
      <p className="text-gray-600 mb-12">In just three easy steps, discover the tech career that's right for you.</p>
     </div>

     <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
    

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <step.icon className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default TimeFrame
import { useNavigate } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function InstructionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10"
      >
        {/* Icon + Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="bg-[#605CFF] p-2 rounded-full text-white">
            <InformationCircleIcon className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold max-sm:text-xl text-gray-800">Before You Begin</h2>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 text-gray-700 max-sm:text-[14px] text-base leading-relaxed"
        >
          <p>
            This assessment will take approximately{' '}
            <span className="font-semibold text-black">2–5 minutes</span> to complete.
            You'll be asked questions about your preferences, problem-solving approach, and working style.
          </p>

          <p>
            Your responses will help us recommend the best-fit{' '}
            <span className="text-purple-600 font-medium">tech career paths</span> tailored to your strengths and interests.
          </p>

          <div className="bg-gray-100 text-sm p-4 rounded-lg border border-gray-200">
            <strong className="block text-gray-800 mb-1">Privacy Notice:</strong>
            Your answers are confidential. We do not collect personal data or share your responses with third parties.
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={() => navigate('/assessment')}
          className="mt-8 w-full bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition cursor-pointer max-sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Continue to Assessment
        </motion.button>
      </motion.div>
    </div>
  );
}

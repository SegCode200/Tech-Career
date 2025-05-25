import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setResults } from '../../store/assessmentSlice';
import { setEmail } from '../../store/userSlice';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function SubmitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);

  const responses = location.state?.responses || [];

  const handleSubmit = async () => {
    if (!name || !email.includes('@')) {
      ('Please enter your name and a valid email.');
      return;
    }
    setLoading(true);

    try {
      const payload = { name, email, responses };
 
      const { data } = await axios.post('https://tech-assessment-backend.onrender.com/api/assessement/submit', payload);

      dispatch(setEmail(email));
      dispatch(setResults(data));
      navigate('/results');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Let's Personalize Your Results
        </h2>

        <div className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#605CFF]"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#605CFF]"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white text-sm flex items-center justify-center transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#605CFF] to-[#8B59FF] hover:opacity-90'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                View My Results <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
         
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

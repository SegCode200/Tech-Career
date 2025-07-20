import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setResults } from '../../store/assessmentSlice';
import { setEmail } from '../../store/userSlice';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';
import { useForm, type SubmitHandler } from 'react-hook-form';

type ContactForm = {
  name: string;
  email: string;
  phone?: string;
};
export default function SubmitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const responses = location.state?.responses || [];

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

const onSubmit: SubmitHandler<ContactForm> = async (formData: { name: string; email: string; phone?: string }) => {
  if (!responses || responses.length === 0) return;
  setLoading(true);
  try {
    const payload = { ...formData, responses };
    const { data } = await axios.post('https://tech-assessment-backend.onrender.com/api/assessement/submit', payload);
    dispatch(setEmail(formData.email));
    dispatch(setResults(data));
    navigate(`/results/${data.sessionId}`);
  } catch (err) {
    console.error(err); 
    alert('Failed to submit. Please try again.');
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
          Get Your Personalized Results
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  <div className="relative">
    <FaUser className="absolute top-3.5 left-3 text-gray-400" />
    <input
      type="text"
      placeholder="Full Name"
      {...register('name', { required: 'Full name is required' })}
      disabled={loading}
      className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#605CFF]"
    />
    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
  </div>

  <div className="relative">
    <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
    <input
      type="email"
      placeholder="you@example.com"
      {...register('email', {
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+$/i,
          message: 'Invalid email address'
        }
      })}
      disabled={loading}
      className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#605CFF]"
    />
    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
  </div>

  <div className="relative">
    <FaPhone className="absolute top-3.5 left-3 text-gray-400" />
    <input
      type="tel"
      placeholder="Phone (optional)"
      {...register('phone')}
      disabled={loading}
      className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#605CFF]"
    />
  </div>

  <button
    type="submit"
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
</form>
      </motion.div>
    </div>
  );
}

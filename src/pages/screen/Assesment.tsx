import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useQuestions } from "../../hooks/useQuestions";
import { ToastContainer, toast } from "react-toastify";

// Dummy Questions

const cheerMessages = [
  {
    threshold: 25,
    message:
      "🎉 25% Done! You’re off to a great start. Small steps lead to big things.",
  },
  {
    threshold: 50,
    message:
      "🚀 50% Done! Keep it going. Make sure you complete all you set your mind to.",
  },
  {
    threshold: 75,
    message:
      "💪 75% Done! Inspiration does exist, but it must find you working.",
  },
  {
    threshold: 100,
    message:
      "🏁 Cheers! 100% Done! You’ve completed the questionnaire. You are resilient.",
  },
];
export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading } = useQuestions();
  const [shownMilestones, setShownMilestones] = useState<number[]>([]);
  const [cheerPrompt, setCheerPrompt] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const questions = useSelector(
    (state: RootState) => state.assessment.questions
  );
  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);
  useEffect(() => {
    const percent = Math.floor(((currentIndex + 1) / questions.length) * 100);
    const nextMilestone = cheerMessages.find(
      (c) => percent >= c.threshold && !shownMilestones.includes(c.threshold)
    );

    if (nextMilestone) {
      setCheerPrompt(nextMilestone.message);
      setShownMilestones((prev) => [...prev, nextMilestone.threshold]);
      setTimeout(() => setCheerPrompt(null), 4000); // auto-hide cheer after 4s
    }
  }, [currentIndex]);
  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (index: any) => {
    const updated = [...answers];
    updated[currentIndex] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentIndex] === null) {
      toast.error("Please select an answer before continuing.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const responses = questions.map((q, i) => ({
        questionId: q.id,
        optionIndex: answers[i],
      }));
      console.log(responses);
      navigate("/submit", {
        state: {
          responses: questions.map((q, i) => ({
            questionId: q.id,
            optionIndex: answers[i],
          })),
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);
  const Spinner = () => (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-[#8B59FF] border-dashed rounded-full animate-spin"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-10"
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#605CFF] to-[#8B59FF] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        {cheerPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="my-4 px-4 py-3 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg text-center text-sm sm:text-base"
          >
            {cheerPrompt}
          </motion.div>
        )}

        {/* Question */}
        <h2 className="text-xl max-sm:text-lg font-semibold text-gray-800 text-center mb-8">
          {currentQuestion?.text}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion?.options.map((option: any, i: any) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left border rounded-lg px-4 py-3 transition max-sm:text-sm ${
                answers[currentIndex] === i
                  ? "border-[#605CFF] bg-[#F5F3FF] text-[#605CFF] font-semibold"
                  : "border-gray-300 text-gray-800 hover:border-[#605CFF]"
              }`}
            >
              {option?.text}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentIndex === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
      />
    </div>
  );
}

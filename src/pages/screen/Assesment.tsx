import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useQuestions } from "../../hooks/useQuestions";
import { ToastContainer, toast } from "react-toastify";

// Dummy Questions

// const cheerMessages = [
//   {
//     threshold: 25,
//     message:
//       "🎉 25% Done! You’re off to a great start. Small steps lead to big things.",
//   },
//   {
//     threshold: 50,
//     message:
//       "🚀 50% Done! Keep it going. Make sure you complete all you set your mind to.",
//   },
//   {
//     threshold: 75,
//     message:
//       "💪 75% Done! Inspiration does exist, but it must find you working.",
//   },
//   {
//     threshold: 100,
//     message:
//       "🏁 Cheers 100% Done! You’ve completed the questionnaire. You are resilient.",
//   },
// ];
const cheerMessages = [
  {
    threshold: 25,
    headline: "🎉 25% Done",
    subtitle: "You’re off to a great start. Small steps lead to big things.",
    note: "Let’s keep it moving!",
  },
  {
    threshold: 50,
    headline: "🚀50% Done",
    subtitle: "You’re halfway there. Keep pushing forward!",
    note: "You’ve got this 💪",
  },
  {
    threshold: 75,
    headline: "💪 75% Done",
    subtitle: "Inspiration does exist, but it must find you working.",
    note: "Stay consistent!",
  },
  {
    threshold: 100,
    headline: "🏁 100% Done",
    subtitle: "You’ve completed the questionnaire. You are resilient.",
    note: " Amazing effort!",
  },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading } = useQuestions();
  const [shownMilestones, setShownMilestones] = useState<number[]>([]);
  const [cheerPrompt, setCheerPrompt] = useState<any | null>();
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
      setCheerPrompt(nextMilestone);
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
  if (cheerPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-100 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-lg w-full"
        >
          <h2 className="text-2xl font-bold text-[#605CFF] mx-3">
            {cheerPrompt.headline}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mt-3 mb-3">
            {cheerPrompt.subtitle}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-3 mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#605CFF] to-[#8B59FF] transition-all duration-500"
              style={{ width: `${cheerPrompt.threshold}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-3 mb-3">{cheerPrompt.note}</p>
          <button
            onClick={() => setCheerPrompt(null)}
            className="mt-3 px-5 py-2 text-sm bg-[#605CFF] text-white rounded-full hover:opacity-90"
          >
            Continue Assessment
          </button>
        </motion.div>
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

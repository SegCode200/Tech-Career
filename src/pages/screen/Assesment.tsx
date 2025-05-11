import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy Questions
const questions = [
  {
    id: 1,
    text: "When facing a new challenge, I prefer to:",
    options: [
      "Break it down into steps",
      "Look for patterns",
      "Imagine future possibilities",
      "Consider impact on others",
      "Research what others did",
    ],
  },
  {
    id: 2,
    text: "I would rather work:",
    options: [
      "On one long-term project",
      "On many varied tasks",
      "Collaboratively in teams",
      "Independently",
      "In a hybrid style",
    ],
  },
  // Add more as needed...
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (index:any) => {
    const updated = [...answers];
    updated[currentIndex] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentIndex] === null) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Final submit
      const result = calculateCareerMatch(answers);
      navigate("/results", { state: { result } });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateCareerMatch = (answers:any) => {
    // Replace this with real scoring logic
    return [
      {
        career: "UI/UX Designer",
        match: 90,
        description: "Designs intuitive user interfaces and experiences.",
      },
      {
        career: "Software Developer",
        match: 85,
        description: "Builds functional apps and systems through code.",
      },
      {
        career: "Product Manager",
        match: 78,
        description: "Leads product planning and cross-functional teams.",
      },
    ];
  };

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
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-8">
          {currentQuestion.text}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left border rounded-lg px-4 py-3 transition ${
                answers[currentIndex] === i
                  ? "border-[#605CFF] bg-[#F5F3FF] text-[#605CFF] font-semibold"
                  : "border-gray-300 text-gray-800 hover:border-[#605CFF]"
              }`}
            >
              {option}
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
    </div>
  );
}

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { TraitRadarChart } from "./TraitRadarChart";
import { setResults } from "../../store/assessmentSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useUserResults } from "../../hooks/useQuestions";

export default function ResultsPage() {
  const dispatch = useDispatch();

  const { token } = useParams();
  const { results, isLoading, isError } = useUserResults(token);
  const traitDescriptions = results?.traitDescriptions || {};
  useEffect(() => {
    const saved = localStorage.getItem("career_results");
    if (saved && !results) {
      dispatch(setResults(JSON.parse(saved)));
    }
  }, [dispatch, results]);
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

  if (isError || !results) {
    return (
      <>
      <p className="text-center mt-10 text-red-500">Unable to load results.</p>
          <Link to={"/"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Go Home Back
        </motion.div>
        </Link>
      </>
      
    );
  }
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No results found. Please complete the assessment first.
        </p>
      </div>
    );
  }

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Tech Career Match Results",
        url: window.location.href,
      });
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            👋 Hi {results.name || "there"}!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            You’re curious, driven, and love making things happen. Your answers
            show you think with both heart and logic — a powerful combo for tech
            careers.
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold mt-6 text-[#605CFF]">
            👇 Here are the top roles that match your personality!
          </h3>
        </div>

        <div className="space-y-6">
          {results.careerMatches.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-[#605CFF] flex items-center gap-2">
                  {item.emoji} {item.name}
                </h3>
                <span className="text-sm text-gray-600">
                  {item.score}% match
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3.5 mt-3.5">
                <strong className=" text-gray-700 ">Personality:</strong> “
                {item.personality}”
              </p>
              <div className="text-sm text-gray-700 mb-1 space-y-1">
                {item.description
                  .split(".")
                  .map((sentence: string, i: number) => (
                    <p key={i}>
                      {sentence.trim()}
                      {sentence.endsWith(".") ? "" : "."}
                    </p>
                  ))}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-purple-600 font-medium">
                  Learn more
                </summary>
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    <strong>What it is:</strong> {item.summary}
                  </p>
                  <p className="mt-2">
                    <strong>🚀 First Steps:</strong>
                  </p>
                  <ul className="list-disc ml-6">
                    {item.firstSteps.map((step: string, idx: number) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                  <p className="mt-2">
                    <strong>Key Traits:</strong>
                  </p>
                  <ul className="list-disc ml-6">
                    {traitDescriptions[item.id]?.map((t: any, idx: number) => (
                      <li key={idx}>
                        <strong>{t.traitName}:</strong> {t.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </motion.div>
          ))}
        </div>

        {/* Trait Radar Chart */}
        {results.traits && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
              Your Trait Profile
            </h3>
            <TraitRadarChart
              traits={results.traits}
              traitMap={results.traitMap}
            />
          </div>
        )}

        {/* CTA and Share */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <button
            onClick={shareResults}
            className="inline-block bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Share My Results
          </button>
        </motion.div>
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

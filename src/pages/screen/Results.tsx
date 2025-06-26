import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { TraitRadarChart } from "./TraitRadarChart";
import { setResults } from "../../store/assessmentSlice";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useUserResults } from "../../hooks/useQuestions";

export default function ResultsPage() {
  const dispatch = useDispatch();

  
  const { token } = useParams();
  const { results, isLoading, isError } = useUserResults(token);
  console.log(token)
  console.log("Results:", results);
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
    return <p className="text-center mt-10 text-red-500">Unable to load results.</p>;
  }
  console.log(results);
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
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Your Top Career Matches
        </h2>

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
                  <FaStar className="text-yellow-400" /> {item.name}
                </h3>
                <span className="text-sm text-gray-600">
                  {item.score}% match
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{item.description}</p>
               {/* <p className="text-xs text-gray-500">Key Traits: {item.keyTraits.join(', ')}</p> */}
              {traitDescriptions[item.id] && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Why this matches you:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                    {traitDescriptions[item.id]
                      .slice(0, 3)
                      .map((trait: any, i: number) => (
                        <li key={i}>
                          <strong>{trait.traitName}:</strong>{" "}
                          {trait.description}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
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

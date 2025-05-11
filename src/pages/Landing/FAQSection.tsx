import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "Is the assessment free?",
    answer: "Yes, the core assessment is completely free to take with no sign-up required.",
  },
  {
    question: "Do I need a tech background?",
    answer: "Not at all. The tool is designed to help both beginners and professionals find their fit.",
  },
  {
    question: "How accurate are the results?",
    answer: "The assessment is built using a research-backed trait-to-career mapping system for high relevance.",
  },
  {
    question: "Can I share or save my results?",
    answer: "Yes! You’ll have the option to save your results or share them via a unique link.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import LandingPageLogo from '../components/LandingPageLogo';

const QUESTION_OPTIONS = [
  "What was your first pet's name?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What city were you born in?",
  "What was your childhood nickname?",
  "What is your favorite book?",
  "What was your first car model?",
  "Who was your childhood best friend?",
];

const SecurityQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/register");
    }
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // ek question ko doosri jagah select hone se rokta hai (duplicate na ho)
  const isOptionDisabled = (option, currentIndex) => {
    return questions.some((q, i) => i !== currentIndex && q.question === option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const allFilled = questions.every(
      (q) => q.question.trim() !== "" && q.answer.trim() !== ""
    );

    if (!allFilled) {
      setErrorMsg("Please select all 5 questions and fill every answer");
      return;
    }

    try {
      await axiosInstance.post("/set-security-questions", { userId, questions });
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <LandingPageLogo/>
          </div>
          <h1 className="font-['Fraunces'] text-3xl mb-2">Set up recovery questions</h1>
          <p className="text-[#8B94A0] text-sm">
            Choose 5 questions. These help you get back in if you ever forget your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#131A22] border border-white/10 rounded-sm p-8 space-y-6">
          {errorMsg && (
            <div className="text-sm text-[#e07a5f] bg-[#e07a5f]/10 border border-[#e07a5f]/30 rounded-sm px-4 py-3">
              {errorMsg}
            </div>
          )}

          {questions.map((q, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-xs text-[#8B94A0] tracking-wide">
                Question {index + 1}
              </label>
              <select
                value={q.question}
                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              >
                <option value="">Select a question</option>
                {QUESTION_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={isOptionDisabled(option, index)}
                  >
                    {option}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={q.answer}
                onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                placeholder="Your answer"
                className="w-full bg-[#0B0F14] border border-white/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors"
          >
            Save and continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityQuestions;
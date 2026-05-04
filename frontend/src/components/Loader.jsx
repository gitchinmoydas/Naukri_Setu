import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { GiIndiaGate } from "react-icons/gi";
import { FiClock, FiTrendingUp, FiAward } from "react-icons/fi";
import { FaBrain, FaRocket } from "react-icons/fa";

export default function Loader() {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [funFactIndex, setFunFactIndex] = useState(0);

  const steps = [
    { icon: "📄", text: "Parsing your resume", progress: 20, description: "Analyzing document structure" },
    { icon: "🔍", text: "Extracting skills & experience", progress: 40, description: "Identifying key competencies" },
    { icon: "🎯", text: "Analyzing job market fit", progress: 60, description: "Comparing with industry demands" },
    { icon: "🤖", text: "AI matching algorithms", progress: 80, description: "Finding perfect opportunities" },
    { icon: "✨", text: "Preparing personalized results", progress: 100, description: "Generating insights" }
  ];

  const funFacts = [
    { fact: "Resumes with quantified achievements are 40% more likely to get noticed!", icon: "📊" },
    { fact: "Companies spend only 6-7 seconds reviewing a resume initially.", icon: "⏱️" },
    { fact: "Including 'Soft Skills' increases match rate by 35% in India.", icon: "🇮🇳" },
    { fact: "ATS systems reject up to 75% of resumes before a human sees them.", icon: "🤖" },
    { fact: "Personalized resumes have 3x higher chance of getting interviews.", icon: "✨" },
    { fact: "Indian IT sector alone has over 5 million job openings yearly.", icon: "💻" }
  ];

  useEffect(() => {
    // Rotate fun facts every 5 seconds
    const factInterval = setInterval(() => {
      setFunFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);

    // Animated dots
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Update current step based on progress
    const stepInterval = setInterval(() => {
      const stepIndex = steps.findIndex(step => step.progress > progress);
      if (stepIndex !== -1 && stepIndex !== currentStep) {
        setCurrentStep(stepIndex);
      } else if (progress >= 100 && currentStep !== steps.length - 1) {
        setCurrentStep(steps.length - 1);
      }
    }, 100);

    return () => {
      clearInterval(factInterval);
      clearInterval(dotInterval);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-20 px-4">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform transition-all duration-500 animate-slideUp">
            
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center transform rotate-6 shadow-lg">
                  <GiIndiaGate className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
              AI Analysis in Progress
            </h2>
            
            <p className="text-gray-500 text-center mb-8">
              Please wait while our AI processes your resume{dots}
            </p>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <FaBrain className="w-3 h-3 text-orange-500" />
                  Processing
                </span>
                <span className="font-semibold text-orange-600">{progress}%</span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                    idx <= currentStep 
                      ? "bg-gradient-to-r from-orange-50 to-green-50 transform scale-105 shadow-md" 
                      : "opacity-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    idx < currentStep 
                      ? "bg-green-500 text-white" 
                      : idx === currentStep 
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white animate-pulse" 
                      : "bg-gray-200 text-gray-400"
                  }`}>
                    {idx < currentStep ? "✓" : step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${
                      idx === currentStep ? "text-orange-600" : "text-gray-700"
                    }`}>
                      {step.text}
                    </p>
                    {idx === currentStep && (
                      <p className="text-xs text-gray-500 mt-1 animate-fadeIn">
                        {step.description}
                      </p>
                    )}
                  </div>
                  {idx === currentStep && (
                    <div className="w-5 h-5">
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {idx < currentStep && (
                    <div className="text-green-500 text-sm font-semibold">Done!</div>
                  )}
                </div>
              ))}
            </div>

            {/* Fun Facts Carousel */}
            <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-4 animate-pulse-slow">
              <div className="flex items-start gap-3">
                <div className="text-3xl animate-bounce">{funFacts[funFactIndex].icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
                    <FiTrendingUp className="w-3 h-3 text-orange-500" />
                    Did you know?
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {funFacts[funFactIndex].fact}
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated time and stats */}
            <div className="mt-6 flex justify-between items-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Estimated time: ~{Math.ceil(progress / 20)} seconds
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                <FiAward className="w-3 h-3 text-orange-500" />
                AI Accuracy: 98%
              </div>
            </div>

            {/* Progress Tip */}
            {progress < 100 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400">
                  🚀 Our AI is working hard to find your perfect job matches
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-loadingBar {
          animation: loadingBar 1.5s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
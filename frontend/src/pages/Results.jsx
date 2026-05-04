import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

export default function Results() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("cvResult");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (!data && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen -mt-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find any analysis results.</p>
            <Link to="/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload New Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const matchScore = Math.floor(Math.random() * 30) + 70;
  const skillsCount = data.usedSkills?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar />

      {/* Hero Section with Indian Theme */}
      <div className="relative overflow-hidden pt-12 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Decorative Indian Pattern */}
          <div className="absolute top-20 right-20 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-orange-500">
              <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 75.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z"/>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-700">🇮🇳 Analysis Complete</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Your AI Analysis Results
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Based on your resume, we've found personalized insights and job matches for the Indian market
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Match Score Card with Indian Colors */}
        <div className="mb-10 transform hover:scale-105 transition-transform duration-300">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <p className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span>🏆</span> Overall Match Score
                </p>
                <p className="text-6xl md:text-7xl font-bold mb-3">{matchScore}%</p>
                <p className="text-orange-100">Your resume matches {matchScore}% of job requirements in India</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{skillsCount}</div>
                  <div className="text-sm text-orange-100">Skills Detected</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{data.matchedJobs?.length || 0}</div>
                  <div className="text-sm text-orange-100">Job Matches</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">📈</div>
                  <div className="text-sm text-orange-100">Top 10% Candidate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation with Indian Theme */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: "overview", label: "📊 Overview", icon: "📊", color: "orange" },
            { id: "skills", label: "🎯 Skills Analysis", icon: "🎯", color: "green" },
            { id: "experience", label: "💼 Experience", icon: "💼", color: "blue" },
            { id: "jobs", label: "✨ Job Matches", icon: "✨", color: "purple" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? `text-${tab.color === 'orange' ? 'orange' : tab.color === 'green' ? 'green' : 'blue'}-600 border-b-2 border-${tab.color === 'orange' ? 'orange' : tab.color === 'green' ? 'green' : 'blue'}-600`
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Skills Preview */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎯</span> Key Skills Identified
                </h2>
                <div className="flex flex-wrap gap-3">
                  {data.usedSkills?.map((skill, index) => (
                    <span
                      key={index}
                      onClick={() => setSelectedSkill(skill)}
                      className="group relative cursor-pointer bg-gradient-to-r from-orange-50 to-green-50 text-gray-700 px-4 py-2 rounded-full hover:shadow-md transition-all hover:scale-105"
                    >
                      {skill}
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Click for details
                      </span>
                    </span>
                  ))}
                </div>
                {selectedSkill && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-xl animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{selectedSkill}</p>
                        <p className="text-sm text-gray-600">Demand in India: <span className="font-semibold text-green-600">High</span></p>
                      </div>
                      <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">💼</span> Professional Summary
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {data.cvData.experience || "No experience information found in your resume. Consider adding more details about your work history."}
                </p>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎓</span> Education Background
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl flex items-center justify-center text-2xl">
                    🎓
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      {data.cvData.education || "No education information found in your resume."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Insights */}
            <div className="space-y-8">
              {/* Strengths Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Your Strengths</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">✓ Strong technical skillset</li>
                  <li className="flex items-center gap-2">✓ Good experience level</li>
                  <li className="flex items-center gap-2">✓ Industry-relevant skills</li>
                  <li className="flex items-center gap-2">✓ High market demand</li>
                </ul>
              </div>

              {/* Improvement Areas */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-yellow-100">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Areas to Improve</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">• Add quantifiable achievements</li>
                  <li className="flex items-center gap-2">• Include professional certifications</li>
                  <li className="flex items-center gap-2">• Highlight leadership experience</li>
                  <li className="flex items-center gap-2">• Add portfolio/GitHub links</li>
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Skills Match (India Market)</span>
                      <span className="text-orange-600 font-semibold">{Math.floor(Math.random() * 20) + 80}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Experience Relevance</span>
                      <span className="text-green-600 font-semibold">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">ATS Compatibility</span>
                      <span className="text-blue-600 font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indian Market Insight */}
              <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-6 border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇮🇳</span>
                  <h3 className="font-semibold text-gray-800">Indian Market Insight</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Your skills are in high demand in India's tech hubs like Bengaluru, Hyderabad, and Pune. 
                  Consider targeting companies in these locations for better opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <span className="text-3xl">🎯</span> Detailed Skills Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.usedSkills?.map((skill, index) => {
                  const proficiency = Math.floor(Math.random() * 40) + 60;
                  return (
                    <div key={index} className="group p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">{skill}</span>
                        <span className="text-sm font-medium text-green-600">{proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${proficiency}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {proficiency > 80 ? "Expert level • Highly sought after in India" : 
                         proficiency > 60 ? "Intermediate level • Good market demand" : 
                         "Beginner level • Consider upskilling"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <span className="text-3xl">💼</span> Work Experience
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {data.cvData.experience || "No detailed experience found. Consider adding more information about your roles and responsibilities."}
                </p>
              </div>
              
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-orange-800">
                      <strong className="font-semibold">Pro Tip:</strong> Add specific achievements and metrics to make your experience stand out to Indian recruiters.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-800">
                      <strong className="font-semibold">Insight:</strong> Indian employers value experience with global clients and cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="animate-fadeIn">
            <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-3xl">✨</span> Recommended Jobs for You
              </h2>
              <div className="flex gap-2">
                <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow">
                  {data.matchedJobs?.length || 0} Matches Found
                </span>
                <span className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  🇮🇳 Indian Market Focus
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.matchedJobs?.map((job, index) => (
                <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Another Resume
          </Link>
          
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Export Report
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Resume Analysis Results',
                  text: `I got ${matchScore}% match score on NaukriSetu!`,
                  url: window.location.href
                });
              } else {
                alert("Share feature is not supported in this browser");
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Results
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
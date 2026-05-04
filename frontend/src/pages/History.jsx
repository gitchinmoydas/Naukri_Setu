import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FiClock, FiMapPin, FiBriefcase, FiTrendingUp, FiEye, FiCalendar, FiDownload, FiShare2 } from "react-icons/fi";
import { FaChartLine, FaAward, FaStar } from "react-icons/fa";
import { GiIndiaGate } from "react-icons/gi";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/cv/history");
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "high_match") {
      return item.matchedJobs?.length >= 10;
    }
    if (selectedFilter === "recent") {
      const daysAgo = (new Date() - new Date(item.createdAt)) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7;
    }
    return true;
  }).filter(item => {
    if (!searchTerm) return true;
    return item.usedSkills?.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const stats = {
    total: history.length,
    totalMatches: history.reduce((sum, item) => sum + (item.matchedJobs?.length || 0), 0),
    avgMatches: history.length > 0 
      ? Math.round(history.reduce((sum, item) => sum + (item.matchedJobs?.length || 0), 0) / history.length) 
      : 0,
    topSkill: getTopSkill(history)
  };

  function getTopSkill(historyData) {
    const skillCount = {};
    historyData.forEach(item => {
      item.usedSkills?.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    const topSkill = Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0];
    return topSkill ? topSkill[0] : "N/A";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen -mt-16">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
              <GiIndiaGate className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-semibold text-orange-700">Your Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Resume Analysis History
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your progress and see how your resume improves over time
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FiClock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Analyses</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FiTrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalMatches}</p>
            <p className="text-sm text-gray-500">Total Job Matches</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaChartLine className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.avgMatches}</p>
            <p className="text-sm text-gray-500">Average per Resume</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaStar className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-xl font-bold text-gray-800 truncate">{stats.topSkill}</p>
            <p className="text-sm text-gray-500">Most Common Skill</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === "all"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("recent")}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === "recent"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setSelectedFilter("high_match")}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === "high_match"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                High Match (10+)
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search by skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:border-orange-400 focus:outline-none transition-all"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <FiClock className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No History Found</h2>
            <p className="text-gray-500 mb-6">You haven't analyzed any resumes yet.</p>
            <Link to="/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all">
              <FiUpload className="w-5 h-5" />
              Upload Your First Resume
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {filteredHistory.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Header with Date and Actions */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <FiCalendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                    <FiDownload className="w-4 h-4" />
                  </button>
                  <Link to={`/results/${item._id}`} className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                    <FiEye className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {/* Skills */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FaAward className="w-4 h-4 text-orange-500" />
                    Skills Identified
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.usedSkills?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-orange-50 to-green-50 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <GiIndiaGate className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      <strong className="font-semibold">Country:</strong> {item.filters.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      <strong className="font-semibold">Location:</strong> {item.filters.location || "Any"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiBriefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      <strong className="font-semibold">Experience:</strong> {item.filters.experience}
                    </span>
                  </div>
                </div>

                {/* Job Matches */}
                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FiTrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{item.matchedJobs?.length || 0}</p>
                      <p className="text-xs text-gray-500">Jobs Matched</p>
                    </div>
                  </div>
                  <Link
                    to={`/results/${item._id}`}
                    className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Section */}
        {history.length > 0 && (
          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all group">
              <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Export All History
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
      `}</style>
    </div>
  );
}
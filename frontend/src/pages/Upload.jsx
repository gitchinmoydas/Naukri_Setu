import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [country, setCountry] = useState("IN");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("fresher");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("country", country);
      formData.append("location", location);
      formData.append("experience", experience);

      const res = await API.post("/cv/upload", formData);
      localStorage.setItem("cvResult", JSON.stringify(res.data));
      navigate("/results");
    } catch (error) {
      alert(error.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸", color: "blue" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧", color: "red" },
    { code: "IN", name: "India", flag: "🇮🇳", color: "orange" },
    { code: "CA", name: "Canada", flag: "🇨🇦", color: "red" },
    { code: "AU", name: "Australia", flag: "🇦🇺", color: "blue" },
    { code: "DE", name: "Germany", flag: "🇩🇪", color: "yellow" },
    { code: "FR", name: "France", flag: "🇫🇷", color: "blue" },
    { code: "JP", name: "Japan", flag: "🇯🇵", color: "red" },
    { code: "AE", name: "UAE", flag: "🇦🇪", color: "green" },
    { code: "SG", name: "Singapore", flag: "🇸🇬", color: "red" }
  ];

  const experienceLevels = [
    { value: "fresher", label: "🎓 Fresher", desc: "0-1 years experience", icon: "🌱", color: "green" },
    { value: "junior", label: "⭐ Junior", desc: "1-3 years experience", icon: "📘", color: "blue" },
    { value: "mid", label: "⚡ Mid Level", desc: "3-6 years experience", icon: "🚀", color: "purple" },
    { value: "senior", label: "🏆 Senior", desc: "6+ years experience", icon: "👑", color: "orange" }
  ];

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

        <div className="relative text-center px-4">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-sm font-semibold text-orange-700">🇮🇳 Step 1 of 2</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI analyze your skills and find the perfect job matches in India & abroad
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-shadow duration-300">
          {/* Progress Bar with Indian Colors */}
          <div className="h-2 bg-gray-100">
            <div className="h-full w-1/2 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full"></div>
          </div>

          <div className="p-8 md:p-10">
            {/* File Upload Area */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📄</span> Resume File
                <span className="text-sm font-normal text-gray-500">(PDF only)</span>
              </label>
              
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-orange-500 bg-orange-50 scale-105"
                    : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-orange-400 hover:bg-orange-50/30"
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                <input {...getInputProps()} />
                
                {file ? (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{fileName}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFileName("");
                      }}
                      className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 mx-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove File
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
                      <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      Drag & drop your resume here
                    </p>
                    <p className="text-gray-500 mb-4">
                      or click to browse
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                      <span>📄</span> PDF only • Max 5MB
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Country Selection - India Highlighted */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span> Preferred Country
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCountry(c.code)}
                    className={`group p-3 rounded-xl border-2 transition-all duration-300 ${
                      country === c.code
                        ? `border-${c.color === 'orange' ? 'orange' : c.color === 'green' ? 'green' : 'blue'}-500 bg-${c.color === 'orange' ? 'orange' : c.color === 'green' ? 'green' : 'blue'}-50 shadow-md transform scale-105`
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <div className="text-3xl mb-1 transform group-hover:scale-110 transition-transform">{c.flag}</div>
                    <div className="text-sm font-medium text-gray-700">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.code}</div>
                    {country === c.code && c.code === "IN" && (
                      <div className="mt-1 text-[10px] text-orange-600 font-semibold">🇮🇹 Recommended</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Input */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📍</span> Specific Location (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, Bangalore, Hyderabad..."
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 pl-12 outline-none focus:border-orange-400 focus:shadow-lg transition-all duration-300"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mt-2">Enter your preferred city or region for targeted job matches</p>
            </div>

            {/* Experience Level */}
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💼</span> Experience Level
              </label>
              <div className="grid md:grid-cols-4 gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setExperience(level.value)}
                    className={`group p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      experience === level.value
                        ? `border-${level.color}-500 bg-${level.color}-50 shadow-md transform scale-105`
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{level.icon}</div>
                    <div className="font-semibold text-gray-800 mb-1">
                      {level.label}
                    </div>
                    <div className="text-xs text-gray-500">{level.desc}</div>
                    {experience === level.value && (
                      <div className="mt-2 text-xs text-green-600 font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                onClick={handleUpload}
                disabled={!file}
                className={`relative w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  file
                    ? "bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 text-white hover:shadow-2xl hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {file ? "Analyze My Resume with AI" : "Select a Resume to Begin"}
                </span>
                {file && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-green-700 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>

              {file && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 animate-fadeIn">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Ready to analyze! Click the button above
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section with Indian Context */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Pro Tips for Best Results</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">✓ Use a standard PDF format for optimal parsing</li>
                  <li className="flex items-center gap-2">✓ Keep your resume to 1-2 pages for best analysis</li>
                  <li className="flex items-center gap-2">✓ Include relevant keywords for your target role</li>
                  <li className="flex items-center gap-2">✓ Make sure your contact information is up to date</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🇮🇳</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Indian Job Market Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">• Highlight Aadhaar/PAN for verification ready</li>
                  <li className="flex items-center gap-2">• Mention languages known (Hindi, English, Regional)</li>
                  <li className="flex items-center gap-2">• Include CGPA/Percentage for academic roles</li>
                  <li className="flex items-center gap-2">• Add LinkedIn & GitHub profiles if available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">256-bit SSL Encrypted</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-gray-600">GDPR Compliant</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">⭐ 4.9/5 Rating</span>
            </div>
          </div>
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
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
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
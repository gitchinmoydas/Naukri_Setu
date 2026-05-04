import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  FiCpu, 
  FiShield, 
  FiTrendingUp, 
  FiUsers, 
  FiCheckCircle,
  FiHeart,
  FiGlobe,
  FiClock,
  FiAward,
  FiZap,
  FiTarget,
  FiEye
} from "react-icons/fi";
import { 
  FaBrain, 
  FaChartLine, 
  FaUserTie, 
  FaHandshake,
  FaRocket,
  FaShieldAlt,
  FaLaptopCode,
  FaRegLightbulb
} from "react-icons/fa";
import { 
  GiIndiaGate, 
  GiArtificialIntelligence, 
  GiMagnifyingGlass,
  GiProgression
} from "react-icons/gi";
import { MdOutlineAnalytics, MdSecurity } from "react-icons/md";

export default function About() {
  const features = [
    {
      icon: <GiArtificialIntelligence className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms parse your resume with 98% accuracy, identifying key skills, experience, and education.",
      color: "orange"
    },
    {
      icon: <GiMagnifyingGlass className="w-8 h-8" />,
      title: "Smart Job Matching",
      description: "Our AI matches your profile with relevant job opportunities from top companies across India.",
      color: "green"
    },
    {
      icon: <MdOutlineAnalytics className="w-8 h-8" />,
      title: "Real-time Insights",
      description: "Get instant feedback on your resume strength and areas for improvement.",
      color: "blue"
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is encrypted and never shared without your consent. Bank-level security.",
      color: "purple"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users", icon: <FiUsers className="w-6 h-6" />, color: "orange" },
    { number: "98%", label: "Match Accuracy", icon: <FiTrendingUp className="w-6 h-6" />, color: "green" },
    { number: "100K+", label: "Jobs Posted", icon: <FiGlobe className="w-6 h-6" />, color: "blue" },
    { number: "24/7", label: "AI Support", icon: <FiClock className="w-6 h-6" />, color: "purple" }
  ];

  const benefits = [
    "Save 10+ hours weekly on job searching",
    "Get personalized resume improvement tips",
    "Access to exclusive job opportunities",
    "Track your application progress",
    "Compare your skills with industry standards",
    "Receive interview preparation guidance"
  ];

  const teamValues = [
    { icon: <FaRegLightbulb className="w-5 h-5" />, text: "Innovation First" },
    { icon: <FiHeart className="w-5 h-5" />, text: "User-Centric" },
    { icon: <FaShieldAlt className="w-5 h-5" />, text: "Trust & Security" },
    { icon: <FiTarget className="w-5 h-5" />, text: "Result-Driven" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-16">
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
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
              <GiIndiaGate className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-semibold text-orange-700">Making a Difference</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Transforming Careers Across India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              NaukriSetu is on a mission to bridge the gap between talented professionals and 
              their dream jobs using cutting-edge AI technology.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="relative text-center">
            <div className="text-6xl mb-4 animate-bounce">🇮🇳</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto">
              To empower every job seeker in India with AI-driven insights, personalized job matches, 
              and the tools they need to build successful careers.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center group transform hover:scale-105 transition-all duration-300">
              <div className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-${stat.color}-600`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
            <FaRocket className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-700">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to accelerate your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform text-${feature.color}-600`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className={`mt-4 w-12 h-1 bg-${feature.color}-500 rounded-full group-hover:w-full transition-all duration-300`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
              <FiTarget className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-semibold text-orange-700">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Makes NaukriSetu Different?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Unlike traditional job portals, we use advanced AI to understand your unique skills 
              and match you with opportunities where you'll truly excel.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Team Values */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                {teamValues.map((value, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                    <span className="text-orange-500">{value.icon}</span>
                    <span className="text-sm text-gray-600">{value.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="bg-gradient-to-r from-orange-500 to-green-500 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative">
                <div className="text-6xl mb-4 animate-float">🎯</div>
                <h3 className="text-2xl font-bold mb-3">Success Rate</h3>
                <p className="text-4xl font-bold mb-2">95%</p>
                <p className="text-orange-100 mb-4">of our users find relevant job matches within 2 weeks</p>
                <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                  <div className="bg-white h-2 rounded-full animate-progress" style={{ width: "95%" }}></div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiHeart className="animate-pulse" />
                  <span>Based on 10,000+ successful placements</span>
                </div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 animate-float">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-800">Trusted & Secure</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 animate-float animation-delay-2000">
              <div className="flex items-center gap-2">
                <FiAward className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-gray-800">Award Winning AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <FaLaptopCode className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-700">Technology Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Built with Cutting-Edge Technology
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our platform leverages the latest advancements in AI and machine learning to deliver 
            accurate and meaningful results for job seekers across India.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <FaBrain className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700">GPT-4 Integration</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <FiCpu className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <GiArtificialIntelligence className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">NLP Processing</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <FaChartLine className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700">Predictive Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="relative z-10">
            <div className="text-7xl mb-6 animate-bounce">🇮🇳</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ successful job seekers who found their dream jobs through NaukriSetu
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              Get Started Free
              <FiZap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-orange-100 text-sm">No credit card required • Free forever plan</p>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 95%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-out;
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
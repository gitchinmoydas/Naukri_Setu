import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState("");
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fullText = "नौकरी सेतु";
  const taglineText = "Your Bridge to Success";
  
  const features = [
    { icon: "🇮🇳", title: "98% Accuracy", desc: "State-of-the-art AI parsing technology", color: "orange" },
    { icon: "⚡", title: "Instant Matching", desc: "Real-time job recommendations", color: "blue" },
    { icon: "🔒", title: "Privacy First", desc: "Your data is always encrypted", color: "green" },
    { icon: "🌍", title: "Global Jobs", desc: "Connect with top companies worldwide", color: "purple" }
  ];

  const indianTestimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Microsoft",
      image: "PS",
      text: "नौकरी सेतु ने मेरे करियर की दिशा बदल दी! AI मैचिंग ने मुझे सही जॉब दिलाने में मदद की।",
      rating: 5,
      location: "Bengaluru"
    },
    {
      name: "Rajesh Kumar",
      role: "Product Manager at Amazon",
      image: "RK",
      text: "Best career platform I've used in India. The resume analysis is spot-on and very accurate!",
      rating: 5,
      location: "Mumbai"
    },
    {
      name: "Anjali Desai",
      role: "Data Scientist",
      image: "AD",
      text: "Finally an AI tool that understands the Indian job market perfectly. Highly recommended!",
      rating: 5,
      location: "Pune"
    }
  ];

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);
    
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Handle CTA button click
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  // Handle Try AI Demo button click
  const handleTryDemo = () => {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Typing animation for Hindi text
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white to-green-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated Background with Indian Colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Decorative Indian Patterns */}
          <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-orange-500">
              <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 75.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-sm font-semibold text-orange-700">🇮🇳 India's AI Platform</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {typedText}
                    <span className="animate-blink">|</span>
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-4xl lg:text-5xl">
                    {taglineText}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Transform your job search with cutting-edge AI technology designed for the Indian job market. 
                  Get personalized matches, instant feedback, and land your dream job faster.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Conditional CTA Button */}
                <button
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoggedIn ? "Upload Your Resume →" : "Start Free Trial →"}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                
                <Link
                  to="/about"
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </Link>
              </div>

              {/* Conditional Message for Logged-in Users */}
              {isLoggedIn && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold">Welcome back!</p>
                    <p className="text-sm text-green-600">Ready to upload your resume for AI analysis?</p>
                  </div>
                </div>
              )}

              {/* Social Proof with Indian Touch */}
              <div className="pt-8 flex items-center gap-8">
                <div className="flex -space-x-2">
                  {[
                    "https://randomuser.me/api/portraits/women/1.jpg",
                    "https://randomuser.me/api/portraits/men/2.jpg",
                    "https://randomuser.me/api/portraits/women/3.jpg",
                    "https://randomuser.me/api/portraits/men/4.jpg"
                  ].map((img, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      <img src={img} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 50,000+ Indian job seekers</p>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive 3D Card */}
            <div className="relative">
              <div 
                className="relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:rotate-1"
                style={{
                  transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight/2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.01}deg)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-500 rounded-3xl opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-6 shadow-lg animate-float">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">AI Demo Experience</h3>
                    <p className="text-gray-600 mt-2">See how our AI analyzes your resume</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: "📄", title: "Upload Resume", desc: "PDF, DOCX, or TXT format", active: true },
                      { icon: "🤖", title: "AI Analysis", desc: "Skills & experience extraction", active: false },
                      { icon: "🎯", title: "Get Matches", desc: "Personalized job recommendations", active: false }
                    ].map((step, idx) => (
                      <div key={idx} className={`bg-gray-50 rounded-xl p-4 transition-all duration-300 ${step.active ? 'hover:bg-orange-50 cursor-pointer transform hover:scale-105' : 'opacity-60'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${step.active ? 'bg-orange-100' : 'bg-gray-200'}`}>
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{step.title}</p>
                            <p className="text-sm text-gray-500">{step.desc}</p>
                          </div>
                          {step.active && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Try Demo Button with Conditional Routing */}
                  <button
                    onClick={handleTryDemo}
                    className="group relative w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Try AI Demo Now
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Floating Stats with Indian Theme */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <p className="font-bold text-gray-800">#1 AI Tool</p>
                    <p className="text-sm text-gray-500">in India 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <p className="font-bold text-gray-800">4.9/5</p>
                    <p className="text-sm text-gray-500">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Indian Colors */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-700 font-semibold text-sm">🇮🇳 Why Choose NaukriSetu</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Powerful Features for Indian Job Seekers
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Everything you need to accelerate your career journey in India and abroad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                id={`feature-${idx}`}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll cursor-pointer ${
                  isVisible[`feature-${idx}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-green-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Indian Flag Colors */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-white to-green-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Users", icon: "👥", color: "orange" },
              { number: "98%", label: "Success Rate", icon: "📈", color: "green" },
              { number: "100K+", label: "Jobs Posted", icon: "💼", color: "blue" },
              { number: "24/7", label: "AI Support", icon: "🤖", color: "purple" }
            ].map((stat, idx) => (
              <div key={idx} className="group transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Indian Users */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <span className="text-green-700 font-semibold text-sm">Success Stories 🇮🇳</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What Our Indian Users Say
            </h2>
            <p className="text-xl text-gray-600 mt-4">Join thousands of successful job seekers across India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {indianTestimonials.map((testimonial, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-orange-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <span>📍</span> {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"{testimonial.text}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified User
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-10"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse animation-delay-2000"></div>
            
            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-bounce">🇮🇳</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {isLoggedIn ? "Ready to Upload Your Resume?" : "Ready to Transform Your Career?"}
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                {isLoggedIn 
                  ? "Upload your resume now and let our AI find your perfect job match"
                  : "Join 50,000+ successful Indian job seekers who found their dream jobs through NaukriSetu"}
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                {isLoggedIn ? "Upload Resume Now" : "Get Started Free"}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              {!isLoggedIn && (
                <p className="mt-6 text-orange-100 text-sm">No credit card required • Free forever plan</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
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
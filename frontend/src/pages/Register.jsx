import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUserPlus, FiShield, FiCheckCircle } from "react-icons/fi";
import { GiIndiaGate } from "react-icons/gi";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    // Check password strength
    if (e.target.name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    if (passwordStrength < 3) {
      alert("Please use a stronger password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userId", res.data._id);

      navigate("/upload");

    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navbar />

      <div className="flex justify-center items-center py-16 px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all duration-500 animate-slideUp">
          
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 transform rotate-6">
                <GiIndiaGate className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Join NaukriSetu</h1>
              <p className="text-green-100 text-sm">Start your career journey today</p>
            </div>
          </div>

          <div className="p-8">
            {/* Social Registration Options */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-300 group">
                <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-300 group">
                <FaLinkedin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">Sign up with LinkedIn</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className={`text-xs ${
                      passwordStrength <= 2 ? "text-red-500" : 
                      passwordStrength <= 4 ? "text-yellow-500" : "text-green-500"
                    }`}>
                      Password strength: {getPasswordStrengthText()}
                    </p>
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div className="text-xs text-gray-500 space-y-1">
                <p className="font-medium mb-1">Password requirements:</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className={`w-3 h-3 ${formData.password.length >= 6 ? "text-green-500" : "text-gray-300"}`} />
                    <span>At least 6 characters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-300"}`} />
                    <span>One uppercase letter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className={`w-3 h-3 ${/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-300"}`} />
                    <span>One number</span>
                  </li>
                </ul>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="w-5 h-5" />
                      Create Account
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FiCheckCircle className="w-3 h-3 text-green-500" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiShield className="w-3 h-3 text-green-500" />
                  <span>Secure data</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3 text-green-500" />
                  <span>10K+ users</span>
                </div>
              </div>
            </div>
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
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
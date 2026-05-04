import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FiHome, 
  FiInfo, 
  FiUpload, 
  FiClock, 
  FiUser, 
  FiLogOut,
  FiChevronDown,
  FiBell
} from "react-icons/fi";
import { 
  HiOutlineLogin, 
  HiOutlineUserAdd 
} from "react-icons/hi";
import { 
  FaAward,
  FaShieldAlt
} from "react-icons/fa";
import { 
  GiIndiaGate,
  GiBurningDot
} from "react-icons/gi";
import { BiHelpCircle } from "react-icons/bi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
    setIsDropdownOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "नौ";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-slate-900/98 via-slate-900/95 to-slate-900/98 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-3 relative"
            >
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full blur-sm animate-pulse"></div>
              </div>
              
              {/* Logo Icon with Animation */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <GiIndiaGate className="w-6 h-6 text-white" />
              </div>
              
              {/* Brand Name */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    NaukriSetu
                  </span>
                  <span className="text-sm font-medium text-orange-300/60 hidden sm:inline">
                    नौकरी सेतु
                  </span>
                  <div className="relative">
                    <GiBurningDot className="w-3 h-3 text-green-500 animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5"></span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 tracking-wide hidden sm:block">
                  AI-Powered Career Bridge
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink to="/" icon={<FiHome className="w-4 h-4" />}>Home</NavLink>
              <NavLink to="/about" icon={<FiInfo className="w-4 h-4" />}>About</NavLink>

              {token && (
                <>
                  <NavLink to="/upload" icon={<FiUpload className="w-4 h-4" />}>Upload CV</NavLink>
                  <NavLink to="/history" icon={<FiClock className="w-4 h-4" />}>History</NavLink>

                  {/* User Menu */}
                  <div className="relative ml-6">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-3 focus:outline-none group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-green-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-all duration-300">
                          {getInitials(userName)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      </div>
                      <div className="text-left hidden lg:block">
                        <p className="text-sm font-medium text-white">{userName?.split(" ")[0] || "User"}</p>
                        <p className="text-xs text-orange-300">Active</p>
                      </div>
                      <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transform transition-all duration-300 animate-slideDown">
                          {/* Gradient Header */}
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full"></div>
                            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/20 rounded-full"></div>
                            <div className="relative flex items-center space-x-4">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl backdrop-blur-sm">
                                {getInitials(userName)}
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-semibold text-xl">{userName}</p>
                                <p className="text-orange-100 text-sm flex items-center gap-1">
                                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                  Active Account
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <FaAward className="w-3 h-3 text-yellow-300" />
                                  <span className="text-xs text-orange-100">Verified Member</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Menu Items */}
                          <div className="py-2">
                            <DropdownItem 
                              icon={<FiUser className="w-4 h-4" />}
                              label="Your Profile"
                              onClick={() => {
                                setIsDropdownOpen(false);
                                navigate("/profile");
                              }}
                              color="orange"
                            />
                            
                            <div className="border-t border-gray-100 my-2"></div>
                            
                            <DropdownItem 
                              icon={<FiLogOut className="w-4 h-4" />}
                              label="Sign Out"
                              onClick={handleLogout}
                              color="red"
                              isLogout
                            />
                          </div>
                          
                          {/* Footer */}
                          <div className="bg-gradient-to-r from-orange-50 to-green-50 px-6 py-3 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-600">
                                नौकरी सेतु - आपका करियर, हमारा सेतु
                              </p>
                              <FaShieldAlt className="w-3 h-3 text-green-600" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {!token && (
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    to="/login"
                    className="px-5 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full flex items-center gap-2 group"
                  >
                    <HiOutlineLogin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="relative group px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden flex items-center gap-2"
                  >
                    <HiOutlineUserAdd className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-all duration-300 group"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
              <svg className="w-6 h-6 relative z-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md animate-fadeIn" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl p-6 transform transition-all duration-500 animate-slideInRight">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="mb-8 pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GiIndiaGate className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">NaukriSetu</p>
                    <p className="text-orange-300 text-xs">नौकरी सेतु</p>
                  </div>
                </div>
              </div>
              
              {token && (
                <div className="pb-4 border-b border-slate-700 mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(userName)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{userName}</p>
                      <p className="text-orange-300 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Active Account
                      </p>
                    </div>
                    <FiBell className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}
              
              <div className="flex-1 space-y-1">
                <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)} icon={<FiHome />}>Home</MobileNavLink>
                <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} icon={<FiInfo />}>About</MobileNavLink>
                {token && (
                  <>
                    <MobileNavLink to="/upload" onClick={() => setIsMobileMenuOpen(false)} icon={<FiUpload />}>Upload CV</MobileNavLink>
                    <MobileNavLink to="/history" onClick={() => setIsMobileMenuOpen(false)} icon={<FiClock />}>History</MobileNavLink>
                    <MobileNavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)} icon={<FiUser />}>Profile</MobileNavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition flex items-center space-x-3 group"
                    >
                      <FiLogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Sign Out</span>
                    </button>
                  </>
                )}
                {!token && (
                  <>
                    <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} icon={<HiOutlineLogin />}>Login</MobileNavLink>
                    <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)} icon={<HiOutlineUserAdd />}>Register</MobileNavLink>
                  </>
                )}
              </div>
              
              {/* Mobile Menu Footer */}
              <div className="pt-4 mt-4 border-t border-slate-700 space-y-2">
                <p className="text-center text-xs text-gray-500">
                  नौकरी सेतु © 2024<br />
                  आपका करियर, हमारा सेतु
                </p>
                <div className="flex justify-center gap-4">
                  <BiHelpCircle className="w-4 h-4 text-gray-500 hover:text-orange-400 cursor-pointer transition" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16 lg:h-20" />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Helper component for desktop nav links
function NavLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-full transition-all duration-300 text-sm font-medium flex items-center gap-2 group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      {children}
    </Link>
  );
}

// Helper component for mobile nav links with icons
function MobileNavLink({ to, onClick, icon, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-300 group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}

// Dropdown Item Component
function DropdownItem({ icon, label, onClick, color, isLogout }) {
  const colorClasses = {
    orange: "hover:bg-orange-50 group-hover:text-orange-600",
    red: "hover:bg-red-50 group-hover:text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition group ${colorClasses[color]} ${isLogout ? 'text-red-600' : ''}`}
    >
      <div className={`w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-${color === 'orange' ? 'orange' : 'red'}-100 transition`}>
        <span className={`text-gray-500 group-hover:text-${color}-600`}>{icon}</span>
      </div>
      <span className="group-hover:scale-105 transition-transform duration-200">{label}</span>
    </button>
  );
}
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CanaaniteIcons } from "../icons/CanaaniteIcons";
import { Menu, X, Globe } from "lucide-react";

// Updated navigation items to match design
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Coast",
    href: "/coast",
    icon: (
      <img src="https://i.ibb.co/7dVFt3F5/ripple.png" alt="Coast" className="w-5 h-5" loading="lazy" draggable={false} />
    ),
  },
  {
    name: "Harbour",
    href: "#",
    icon: (
      <img src="https://i.ibb.co/cXC4TypY/lighthouse.png" alt="Harbour" className="w-5 h-5" loading="lazy" draggable={false} />
    ),
  },
  {
    name: "Azure",
    href: "#",
    icon: (
      <img src="https://i.ibb.co/k23gWvX3/cloud.png" alt="Azure" className="w-5 h-5" loading="lazy" draggable={false} />
    ),
  },
  {
    name: "Hawsh",
    href: "#",
    icon: (
      <img src="https://i.ibb.co/zhjcF2p3/leaf.png" alt="Hawsh" className="w-5 h-5" loading="lazy" draggable={false} />
    ),
  },
  {
    name: "More",
    href: "#",
    icon: (
      <img src="https://i.ibb.co/PvBmtB64/dots-vertical.png" alt="More" className="w-5 h-5" loading="lazy" draggable={false} />
    ),
  },
];

const actionItems = [
  { name: "Join Collective", href: "#" },
  { name: "Send Gift", href: "#" },
  { name: "Share Story", href: "#" },
  { name: "Login", href: "#" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle language change
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };
  
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "linear-gradient(180deg, #171717 0%, #171717 0.75%, rgba(23, 23, 23, 0.99763) 2.92%, rgba(23, 23, 23, 0.992) 6.37%, rgba(23, 23, 23, 0.981037) 10.97%, rgba(23, 23, 23, 0.962963) 16.59%, rgba(23, 23, 23, 0.936) 23.1%, rgba(23, 23, 23, 0.89837) 30.37%, rgba(23, 23, 23, 0.848296) 38.27%, rgba(23, 23, 23, 0.784) 46.66%, rgba(23, 23, 23, 0.703704) 55.41%, rgba(23, 23, 23, 0.60563) 64.39%, rgba(23, 23, 23, 0.488) 73.47%, rgba(23, 23, 23, 0.349037) 82.52%, rgba(23, 23, 23, 0.186963) 91.41%, rgba(23, 23, 23, 0) 100%)",
      }}
    >
      
      <div className="w-full px-4 xs:px-5 md:px-8 relative z-10">
        <div className="flex items-center h-14 sm:h-16">
          {/* Mobile menu button - only visible on mobile */}
          <div className="md:hidden flex items-center">
            <button 
              className="flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Left navigation */}
          <nav className="flex-1 hidden md:flex items-center space-x-6 justify-start pl-4">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-[#A3A3A3] hover:text-white transition-all duration-200 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black"
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
                aria-label={`Navigate to ${item.name}`}
              >
                <span className="relative z-10 font-medium flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Center logo - simplified */}
          <div className="hidden md:flex justify-center">
            <Link to="/" className="flex items-center">
              <img src="https://i.ibb.co/6cRjBNZJ/Logo.png" alt="Logo" className="h-8 w-auto object-contain" loading="lazy" draggable={false} />
            </Link>
          </div>
          
          {/* Right action items */}
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-4 pr-2 sm:pr-4">
            {actionItems.slice(0,3).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hidden md:block text-[#A3A3A3] hover:text-white transition-colors duration-200 text-sm px-2 py-2 rounded-lg"
                aria-label={`${item.name} page`}
              >
                {item.name}
              </Link>
            ))}
            <div className="hidden md:block h-4 w-px bg-white/20 mx-2" />
            <Link
              to="/login"
              className="hidden md:block text-white/90 hover:text-white transition-colors text-sm px-2 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="group relative bg-[#C9A96E] hover:bg-[#bf9a59] text-black px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            >
              <span className="relative z-10">Sign up</span>
            </Link>
            <button className="hidden md:inline-flex items-center justify-center w-8 h-8 bg-[#333333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/40">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation - improved implementation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/95 pt-20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-start p-4 space-y-6 overflow-y-auto max-h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className="flex flex-col items-center text-white/90 hover:text-white py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 mb-2 flex items-center justify-center">
                      {React.cloneElement(item.icon as React.ReactElement, { width: "32", height: "32" })}
                    </div>
                    <span className="text-xl">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Language selector for mobile */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/20 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
              >
                <div className="flex justify-center space-x-4">
                  {["en", "ar", "fr", "es"].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        language === lang ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                      }`}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "Hawsh", 
    href: "#", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "Azure", 
    href: "#", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21L19 15H5L3 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 6L1 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 6L23 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "Haven", 
    href: "#", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "More", 
    href: "#", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
        <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
        <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
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
  
  // Scroll animation setup
  const { scrollY } = useScroll();
  
  // Enhanced background transformations with stronger gradient - starting completely transparent
  const backgroundOpacity = useTransform(scrollY, [0, 100, 300, 500], [0, 0.2, 0.6, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100, 300], [0, 3, 8]);
  
  // New dark gradient background that intensifies after morphing - starting completely transparent
  const gradientOpacity = useTransform(scrollY, [0, 200, 300, 500], [0, 0.2, 0.7, 1]);
  
  // Refined morphing animations with smoother transitions
  const navItemsOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const navItemsScale = useTransform(scrollY, [0, 200], [1, 0.9]);
  const navItemsTranslateY = useTransform(scrollY, [0, 300], [0, -10]);
  
  const controlsOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
  const controlsTranslateY = useTransform(scrollY, [0, 300], [0, -10]);
  
  // Logo and title transformations with enhanced motion - keeping position stable
  const logoScale = useTransform(scrollY, [0, 300, 500], [1, 1.05, 1.15]);
  const titleOpacity = useTransform(scrollY, [0, 300, 500], [1, 1, 1]);
  const titleScale = useTransform(scrollY, [0, 300, 500], [1, 1.05, 1.15]);
  
  // Border animation - starting completely invisible
  const borderOpacity = useTransform(scrollY, [0, 200, 300, 500], [0, 0.1, 0.3, 0.6]);
  const borderGlow = useTransform(scrollY, [0, 300, 500], [0, 1, 3]);
  
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: useTransform(
          scrollY,
          [0, 100, 300, 500],
          [
            "rgba(18, 18, 18, 0)", // Completely transparent at start
            "rgba(18, 18, 18, 0.3)", // Slightly visible when starting to scroll
            "linear-gradient(to bottom, rgba(10, 10, 10, 0.85), rgba(18, 18, 18, 0.75))", // Medium dark when partially scrolled
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(10, 10, 10, 0.9))" // Very dark after fully morphed
          ]
        ),
        backdropFilter: `blur(${navbarBlur}px)`,
        WebkitBackdropFilter: `blur(${navbarBlur}px)`,
      }}
    >
      {/* Enhanced dark gradient overlay for better readability when morphed - starting completely transparent */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"
        style={{ opacity: gradientOpacity }}
      />
      
      {/* An animated Canaanite-inspired decorative border with enhanced glow - starting invisible */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ 
          opacity: borderOpacity,
          boxShadow: `0 0 ${borderGlow}px rgba(255, 255, 255, 0.5)`,
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 80%, transparent)"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center h-16 md:h-20">
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
                className="relative text-white/80 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black"
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
                aria-label={`Navigate to ${item.name}`}
              >
                <span className="relative z-10 font-medium flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                {hoveredNav === item.name && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#d4a574] rounded-full"
                    layoutId="navIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Center logo - simplified */}
          <div className="hidden md:flex justify-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/bwdY3iU.png" 
                alt="Logo" 
                className="w-8 h-8 mr-2"
              />
            </Link>
          </div>
          
          {/* Right action items */}
          <div className="flex-1 flex items-center justify-end space-x-4 pr-4">
            {actionItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hidden md:block text-white/80 hover:text-white transition-all duration-300 text-sm px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black font-medium"
                aria-label={`${item.name} page`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/signup"
              className="group relative bg-[#d4a574] hover:bg-[#c49660] text-black px-6 py-2 rounded-full transition-all duration-300 text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-[#d4a574]/20 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            >
              <span className="relative z-10">Sign up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c49660] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
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
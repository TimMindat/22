import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexagonalCard } from './HexagonalCard';

interface CarouselItem {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
}

interface NetflixCarouselProps {
  items: CarouselItem[];
}

export const NetflixCarousel: React.FC<NetflixCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dynamic text content based on hexagon selection
  const textContent = {
    "Gaza Resilience": {
      title: "Gaza Resilience:",
      subtitle: "Stories of Survival",
      description: "Discover powerful narratives of strength and hope from Gaza's coastal communities"
    },
    "Jerusalem Heritage": {
      title: "Jerusalem Heritage:",
      subtitle: "Sacred Narratives", 
      description: "Explore the rich cultural tapestry and historical significance of Jerusalem"
    },
    "Olive Groves": {
      title: "Olive Groves:",
      subtitle: "Agricultural Legacy",
      description: "Experience the traditional farming wisdom passed down through generations"
    },
    "Cultural Arts": {
      title: "Cultural Arts:",
      subtitle: "Creative Expressions",
      description: "Immerse yourself in the vibrant artistic traditions and contemporary creativity"
    },
    "Traditional Music": {
      title: "Traditional Music:",
      subtitle: "Melodic Heritage",
      description: "Listen to the rhythms and melodies that connect communities across time"
    },
    "Ancient Stories": {
      title: "Ancient Stories:",
      subtitle: "Timeless Wisdom",
      description: "Uncover the legends and folklore that shape cultural identity"
    },
    "Modern Hope": {
      title: "Modern Hope:",
      subtitle: "Future Visions",
      description: "Witness contemporary efforts to build bridges and create positive change"
    }
  };

  const currentContent = textContent[items[currentIndex]?.title] || {
    title: "Shoreline Narratives:",
    subtitle: "Community Voices",
    description: "Discover stories from Palestine through immersive visual narratives"
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          setIsAutoPlaying(false);
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          setIsAutoPlaying(false);
          break;
        case 'Home':
          event.preventDefault();
          setCurrentIndex(0);
          setIsAutoPlaying(false);
          break;
        case 'End':
          event.preventDefault();
          setCurrentIndex(items.length - 1);
          setIsAutoPlaying(false);
          break;
        case ' ':
          event.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleMouseEnter = () => {
    setShowNavigation(true);
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setShowNavigation(false);
    setIsAutoPlaying(true);
  };

  const getVisibleItems = () => {
    const visibleCount = 5;
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i - 2 + items.length) % items.length;
      result.push({
        ...items[index],
        position: i - 2,
        isActive: i === 2,
      });
    }
    return result;
  };

  return (
    <section className="relative h-[90vh] min-h-[800px] overflow-hidden bg-[#171717]">
      {/* Background media layer matching active hexagon */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url(${items[currentIndex]?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(70%)',
          }}
        />
        {/* Grain top edge and dual gradients to match reference */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #171717 0%, rgba(23, 23, 23, 0.9) 6%, rgba(23, 23, 23, 0.8) 12%, rgba(23, 23, 23, 0.7) 24%, rgba(23, 23, 23, 0.55) 48%, rgba(23, 23, 23, 0.3) 100%)',
            opacity: 0.7
          }}
        />
        {/* Shadow / Vertical (match figma spec) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.06) 8%, rgba(23, 23, 23, 0.12) 16%, rgba(23, 23, 23, 0.2) 32%, rgba(23, 23, 23, 0.3) 50%, rgba(23, 23, 23, 0.45) 70%, #171717 100%)',
            opacity: 0.85
          }}
        />
        {/* Noise strip at the very top */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{
          backgroundImage: 'url(/gradient-to-body.svg)',
          backgroundSize: 'cover',
          opacity: 0.45
        }} />
      </div>
      
      {/* Hero Title Overlay */}
      <div className="absolute top-16 md:top-20 left-6 md:left-12 z-20 max-w-sm md:max-w-lg">
        <motion.div
          className="backdrop-blur-sm bg-black/20 rounded-2xl p-6 md:p-8 border border-white/10"
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0.9, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.1,
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            key={currentContent.title}
          >
            {currentContent.title}<br />
            <span className="text-[#C9A96E]">{currentContent.subtitle}</span>
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0.9, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            key={currentContent.description}
          >
            {currentContent.description}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0.95, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button 
              className="group relative bg-[#C9A96E] hover:bg-[#bf9a59] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#C9A96E]/25 focus:outline-none focus:ring-4 focus:ring-[#C9A96E]/50 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
              whileHover={{ 
                scale: 1.01,
                y: -1,
                transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
              }}
              whileTap={{ 
                scale: 0.99,
                transition: { duration: 0.1 }
              }}
              aria-label="View content"
            >
              <span className="relative z-10 flex items-center">
                View content
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.25 }}
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#bf9a59] to-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="absolute inset-0 flex items-end justify-center pb-20 sm:pb-24 overflow-hidden z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Navigation Arrows */}
        <AnimatePresence>
          {showNavigation && (
            <>
              <motion.button
                className="absolute left-8 z-30 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                onClick={prevSlide}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              
              <motion.button
                className="absolute right-8 z-30 w-14 h-14 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                onClick={nextSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Hexagonal Carousel Items */}
            <motion.div 
          className="flex items-center justify-center gap-4 md:gap-6 w-full px-4"
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          {getVisibleItems().map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="relative cursor-pointer group hero-hexagon-wrapper"
              initial={{ opacity: 0.9, y: 8 }}
              animate={{ 
                opacity: item.position === 0 ? 1 : 0.85,
                y: 0,
                x: item.position * 8,
                scale: 1.0,
                zIndex: item.position === 0 ? 20 : 10,
                rotateY: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.23, 1, 0.32, 1], // Smoother easing
                delay: 0,
                opacity: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
                x: { duration: 0.9, ease: [0.23, 1, 0.32, 1] }
              }}
              style={{
                filter: item.position === 0 ? 'none' : 'brightness(0.88) saturate(0.96)',
              }}
              whileHover={{}}
              onClick={() => {
                setCurrentIndex((currentIndex + item.position + items.length) % items.length);
                // Haptic feedback for supported devices
                if ('vibrate' in navigator) {
                  navigator.vibrate(50);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentIndex((currentIndex + item.position + items.length) % items.length);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select ${item.title} story. ${item.isActive ? 'Currently active' : ''}`}
            >
              {/* Active indicator */}
              {item.position === 0 && (
                <motion.div
                  className="absolute -inset-1 rounded-full border border-[#d4a574]/30 z-0"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#d4a574]/50"
                    initial={{ scale: 0.99 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.div>
              )}

              {/* Hexagon with enhanced interactions */}
              <div className="relative z-10">
                <HexagonalCard
                  title={item.title}
                  variant="hero"
                  backgroundImage={item.image}
                  className="hero-hexagon"
                />
              </div>

              {/* Position labels for accessibility */}
              <span className="sr-only">
                {item.position === 0 ? 'Active story' : 
                 item.position === -1 ? 'Previous story' :
                 item.position === 1 ? 'Next story' : 
                 'Story option'}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Keyboard navigation hint */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30">
          <motion.div
            className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: showNavigation ? 0.8 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="flex items-center gap-2">
              <span>Use</span>
              <kbd className="bg-white/15 px-2 py-1 rounded text-xs">←</kbd>
              <kbd className="bg-white/15 px-2 py-1 rounded text-xs">→</kbd>
              <span>or click to navigate</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-[#d4a574]/30 to-transparent rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Enhanced Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-3 border border-white/10">
          <div className="flex items-center gap-3">
            {/* Auto-play toggle */}
            <motion.button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isAutoPlaying ? 'bg-[#d4a574] text-black' : 'bg-white/20 text-white'
              }`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isAutoPlaying ? 'Pause' : 'Play'} auto-navigation`}
            >
              {isAutoPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
              )}
            </motion.button>

            {/* Divider */}
            <div className="w-px h-4 bg-white/20"></div>

            {/* Progress dots with animated SVG ring */}
            <div className="flex gap-2">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black ${
                    index === currentIndex ? 'bg-[#d4a574]' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to ${item.title} story`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute -inset-1 rounded-full"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Animated progress ring when autoplay is on */}
                      {isAutoPlaying && (
                        <svg className="absolute inset-0" viewBox="0 0 24 24">
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="#d4a574"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 4, ease: 'linear' }}
                          />
                        </svg>
                      )}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Story counter */}
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-white/60 text-xs font-medium min-w-max">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetflixCarousel;
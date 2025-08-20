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
  } as const;

  const currentContent = textContent[items[currentIndex]?.title as keyof typeof textContent] || {
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
    const result = [] as Array<CarouselItem & { position: number; isActive: boolean }>;
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
    <section className="relative h-[100dvh] xs:h-[110dvh] sm:h-[100dvh] md:h-[90vh] max-h-screen overflow-hidden bg-[#171717] content-visibility-auto touch-pan-y safe-area-top safe-area-bottom">
      {/* Mobile-optimized background media layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-50 xs:opacity-60"
          style={{
            backgroundImage: `url(${items[currentIndex]?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(70%) brightness(0.8)',
            transform: 'scale(1.05)', // Slight zoom to prevent edge artifacts on mobile
          }}
        />
        {/* Mobile-optimized gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #171717 0%, rgba(23, 23, 23, 0.95) 4%, rgba(23, 23, 23, 0.9) 8%, rgba(23, 23, 23, 0.8) 16%, rgba(23, 23, 23, 0.6) 40%, rgba(23, 23, 23, 0.4) 100%)',
            opacity: 0.85
          }}
        />
        {/* Stronger vertical gradient for mobile readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(23, 23, 23, 0.2) 0%, rgba(23, 23, 23, 0.1) 5%, rgba(23, 23, 23, 0.15) 10%, rgba(23, 23, 23, 0.25) 25%, rgba(23, 23, 23, 0.4) 45%, rgba(23, 23, 23, 0.6) 65%, rgba(23, 23, 23, 0.8) 85%, #171717 100%)',
            opacity: 0.9
          }}
        />
        {/* Mobile-safe noise strip */}
        <div className="absolute top-0 left-0 right-0 h-12 xs:h-16 pointer-events-none" style={{
          backgroundImage: 'url(/gradient-to-body.svg)',
          backgroundSize: 'cover',
          opacity: 0.3
        }} />
      </div>
      
      {/* Mobile-centered Hero Title Overlay */}
      <div className="absolute inset-x-4 xs:inset-x-6 sm:inset-x-8 top-1/2 -translate-y-1/2 md:top-20 md:translate-y-0 md:left-12 md:right-auto md:max-w-lg z-20 flex items-center justify-center md:block">
        <motion.div
          className="backdrop-blur-md bg-black/40 xs:bg-black/35 sm:bg-black/30 rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 border border-white/20 mobile-text-optimize max-w-sm xs:max-w-md sm:max-w-lg md:max-w-none w-full"
          initial={{ opacity: 0.8, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.h1 
            className="hero-title text-white mb-2 xs:mb-3 sm:mb-4 leading-tight font-bold text-center md:text-left"
            style={{ 
              fontSize: 'clamp(1.25rem, 5vw, 3.5rem)',
              lineHeight: 'clamp(1.1, 1.2, 1.3)'
            }}
            initial={{ opacity: 0.9, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.1,
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            key={currentContent.title}
          >
            {currentContent.title}<br />
            <span className="text-[#C9A96E]">{currentContent.subtitle}</span>
          </motion.h1>
          <motion.p 
            className="text-gray-300 mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-relaxed text-center md:text-left"
            style={{ 
              fontSize: 'clamp(0.8rem, 3vw, 1.125rem)',
              lineHeight: '1.4'
            }}
            initial={{ opacity: 0.9, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            key={currentContent.description}
          >
            {currentContent.description}
          </motion.p>
          <motion.div
            className="flex flex-col xs:flex-row gap-2 xs:gap-3 justify-center md:justify-start"
            initial={{ opacity: 0.95, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button 
              className="group relative bg-[#C9A96E] hover:bg-[#bf9a59] active:bg-[#b8935a] text-black font-bold py-2.5 xs:py-3 sm:py-4 px-5 xs:px-6 sm:px-8 rounded-lg xs:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#C9A96E]/20 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/50 focus:ring-offset-1 focus:ring-offset-black overflow-hidden w-full xs:w-auto min-h-[44px] mobile-touch-target"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              aria-label="View content"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.95rem)' }}>View content</span>
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-1.5"
                  whileHover={{ x: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#bf9a59] to-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </motion.button>
            <motion.button 
              className="group relative bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-semibold py-2.5 xs:py-3 sm:py-4 px-5 xs:px-6 sm:px-8 rounded-lg xs:rounded-xl transition-all duration-200 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-1 focus:ring-offset-black overflow-hidden w-full xs:w-auto min-h-[44px] mobile-touch-target"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              aria-label="Learn more"
            >
              <span className="relative z-10" style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.95rem)' }}>Learn more</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile-optimized Carousel Container */}
      <div 
        ref={carouselRef}
        className="absolute inset-0 flex items-end justify-center pb-8 xs:pb-12 sm:pb-16 md:pb-24 overflow-hidden z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Mobile-hidden Navigation Arrows (desktop only) */}
        <AnimatePresence>
          {showNavigation && (
            <>
              <motion.button
                className="hidden md:flex absolute left-6 lg:left-8 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center backdrop-blur-sm border border-white/20 mobile-touch-target"
                onClick={prevSlide}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous story"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              
              <motion.button
                className="hidden md:flex absolute right-6 lg:right-8 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center backdrop-blur-sm border border-white/20 mobile-touch-target"
                onClick={nextSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next story"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Mobile-optimized Hexagonal Carousel Items */}
        <motion.div 
          className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 w-full px-2 xs:px-3 sm:px-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide"
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          {getVisibleItems().map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="relative cursor-pointer group hero-hexagon-wrapper shrink-0 snap-center mobile-touch-target"
              initial={{ opacity: 0.9, y: 8 }}
              animate={{ 
                opacity: item.position === 0 ? 1 : 0.8,
                y: 0,
                x: item.position * 2,
                scale: item.position === 0 ? 1.0 : 0.9,
                zIndex: item.position === 0 ? 20 : 10,
              }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                x: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              style={{
                filter: item.position === 0 ? 'none' : 'brightness(0.85) saturate(0.9)',
                minWidth: 'clamp(80px, 20vw, 120px)', // Ensure minimum touch target
              }}
              whileTap={{ scale: item.position === 0 ? 0.95 : 0.85 }}
              onClick={() => {
                setCurrentIndex((currentIndex + item.position + items.length) % items.length);
                // Enhanced haptic feedback for mobile
                if ('vibrate' in navigator) {
                  navigator.vibrate([30, 10, 30]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentIndex((currentIndex + item.position + items.length) % items.length);
                  if ('vibrate' in navigator) {
                    navigator.vibrate([30, 10, 30]);
                  }
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select ${item.title} story. ${item.isActive ? 'Currently active' : ''}`}
            >
              {/* Enhanced active indicator for mobile */}
              {item.position === 0 && (
                <motion.div
                  className="absolute -inset-1 xs:-inset-2 rounded-full border-2 border-[#d4a574]/40 z-0"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#d4a574]/60"
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  {/* Pulsing glow effect for mobile */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#d4a574]/20"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}

              {/* Mobile-optimized hexagon */}
              <div className="relative z-10">
                <HexagonalCard
                  title={item.title}
                  variant="hero"
                  backgroundImage={item.image}
                  className="hero-hexagon mobile-hex-scale"
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

        {/* Desktop-only keyboard navigation hint */}
        <div className="hidden md:block absolute bottom-28 left-1/2 transform -translate-x-1/2 z-30">
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

        {/* Mobile swipe hint */}
        <div className="md:hidden absolute bottom-20 xs:bottom-24 left-1/2 transform -translate-x-1/2 z-30">
          <motion.div
            className="bg-black/40 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full border border-white/15"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Swipe or tap to explore</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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

      {/* Mobile-optimized Progress Indicator */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 xs:bg-black/40 backdrop-blur-sm rounded-full px-3 xs:px-4 py-2 xs:py-3 border border-white/15">
          <div className="flex items-center gap-2 xs:gap-3">
            {/* Mobile-optimized auto-play toggle */}
            <motion.button
              className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center transition-all duration-300 mobile-touch-target ${
                isAutoPlaying ? 'bg-[#d4a574] text-black' : 'bg-white/25 text-white'
              }`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isAutoPlaying ? 'Pause' : 'Play'} auto-navigation`}
            >
              {isAutoPlaying ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
              )}
            </motion.button>

            {/* Divider */}
            <div className="w-px h-3 xs:h-4 bg-white/25"></div>

            {/* Mobile-optimized progress dots */}
            <div className="flex gap-1.5 xs:gap-2 overflow-x-auto scrollbar-hide max-w-[200px] xs:max-w-none">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  className={`relative w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black shrink-0 mobile-touch-target ${
                    index === currentIndex ? 'bg-[#d4a574]' : 'bg-white/40 hover:bg-white/60 active:bg-white/70'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    // Haptic feedback
                    if ('vibrate' in navigator) {
                      navigator.vibrate(25);
                    }
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to ${item.title} story`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                  style={{ minWidth: '20px', minHeight: '20px' }} // Ensure touch target
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
                        <svg className="absolute inset-0 w-5 h-5 xs:w-6 xs:h-6" viewBox="0 0 24 24">
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="9"
                            fill="none"
                            stroke="#d4a574"
                            strokeWidth="1.5"
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

            {/* Mobile-optimized story counter */}
            <div className="w-px h-3 xs:h-4 bg-white/25"></div>
            <span className="text-white/70 text-xs font-medium min-w-max" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>
              {currentIndex + 1}/{items.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetflixCarousel;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Simplified content mapping for better performance
  const getContent = useCallback((title: string) => {
    const contentMap: Record<string, { title: string; subtitle: string; description: string }> = {
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
    
    return contentMap[title] || {
      title: "Shoreline Narratives:",
      subtitle: "Community Voices",
      description: "Discover stories from Palestine through immersive visual narratives"
    };
  }, []);

  const currentContent = getContent(items[currentIndex]?.title || "");

  // Optimized auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Increased interval for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, items.length]);

  // Simplified navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  // Touch/swipe handling for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    touchEndX.current = e.touches[0].clientX;
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(30);
      }
    }
    
    setIsDragging(false);
  }, [isDragging, nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) return; // Only handle when not in input
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, isAutoPlaying]);

  return (
    <section 
      className="relative h-[100dvh] overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] gpu-accelerated"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Enhanced Background with Smooth Transitions */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        key={currentIndex}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 1, 
          ease: [0.25, 0.1, 0.25, 1],
          scale: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center gpu-accelerated"
          style={{
            backgroundImage: `url(${items[currentIndex]?.image})`,
            filter: 'brightness(0.35) saturate(1.3) contrast(1.1)',
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.02 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
        
        {/* Enhanced gradient overlays with smooth transitions */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        
        {/* Subtle animated overlay for depth */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/5 via-transparent to-blue-500/5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      {/* Enhanced Fluent Content Card with Smooth Animations */}
      <div className="absolute inset-x-4 xs:inset-x-5 sm:inset-x-6 top-1/2 -translate-y-1/2 md:left-12 md:right-auto md:max-w-2xl z-20">
        <motion.div
          className="backdrop-blur-xl bg-black/25 xs:bg-black/20 rounded-2xl xs:rounded-3xl p-5 xs:p-6 md:p-8 border border-white/15 shadow-2xl gpu-accelerated"
          key={currentIndex}
          initial={{ opacity: 0, y: 30, scale: 0.92, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95, rotateX: -5 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.1, 0.25, 1],
            scale: { duration: 0.6 },
            rotateX: { duration: 0.8 }
          }}
        >
          <motion.h1 
            className="text-white mb-3 xs:mb-4 font-bold leading-tight"
            style={{ fontSize: 'clamp(1.25rem, 4vw, 2.75rem)' }}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.15, 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
          >
            <motion.span
              key={currentContent.title}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {currentContent.title}
            </motion.span>
            <br />
            <motion.span 
              className="text-[#d4a574]"
              key={currentContent.subtitle}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {currentContent.subtitle}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 mb-5 xs:mb-6 leading-relaxed"
            style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.125rem)' }}
            key={currentContent.description}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.25, 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
          >
            {currentContent.description}
          </motion.p>
          
          <motion.div
            className="flex flex-col xs:flex-row gap-3 xs:gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.35, 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
          >
            <motion.button 
              className="btn-smooth bg-[#d4a574] hover:bg-[#c49660] text-black px-5 xs:px-6 py-3 xs:py-3.5 rounded-full font-semibold mobile-touch-target shadow-lg hover:shadow-xl hover:shadow-[#d4a574]/25"
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                transition: { duration: 0.1 }
              }}
              style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}
            >
              <span className="flex items-center gap-2">
                View Content
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </span>
            </motion.button>
            
            <motion.button 
              className="btn-smooth bg-white/15 hover:bg-white/25 text-white px-5 xs:px-6 py-3 xs:py-3.5 rounded-full font-semibold border border-white/25 hover:border-white/35 mobile-touch-target"
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                transition: { duration: 0.1 }
              }}
              style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile-First Large Navigation Bar */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg px-3">
        <motion.div 
          className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 px-5 xs:px-6 sm:px-7 py-4 xs:py-5 sm:py-6 md:py-4 backdrop-blur-xl bg-black/40 xs:bg-black/35 sm:bg-black/30 md:bg-black/20 rounded-3xl xs:rounded-[1.5rem] border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Navigation Arrow - Previous (Larger Mobile) */}
          <motion.button
            onClick={prevSlide}
            className="flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center text-white border border-white/15 mobile-touch-target gpu-accelerated shadow-lg"
            aria-label="Previous story"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileTap={{ 
              scale: 0.9,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              transition: { duration: 0.1 }
            }}
            onTap={() => {
              // Enhanced haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate(50);
              }
            }}
          >
            <motion.svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-6 md:h-6"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>

          {/* Compact Hexagon Carousel Items for Large Mobile Bar */}
          <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide px-1">
            {items.map((item, index) => {
              const isActive = index === currentIndex;
              const distance = Math.abs(index - currentIndex);
              const isVisible = distance <= 2; // Show 5 items max (current + 2 on each side)
              
              if (!isVisible) return null;
              
              return (
                <motion.div
                  key={item.id}
                  className="cursor-pointer flex-shrink-0 relative"
                  onClick={() => {
                    goToSlide(index);
                    // Enhanced haptic feedback for hexagon selection
                    if ('vibrate' in navigator) {
                      navigator.vibrate([60, 15, 40]);
                    }
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.1 : 1.2,
                    y: isActive ? -3 : -4,
                    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  whileTap={{ 
                    scale: isActive ? 0.9 : 0.8,
                    transition: { duration: 0.15 }
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.7,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.1, 0.25, 1],
                    scale: { duration: 0.35 },
                    opacity: { duration: 0.3 },
                    y: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  style={{ minWidth: '48px', minHeight: '48px' }} // Larger touch target for mobile
                >
                  {/* Enhanced active indicator ring */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 xs:-inset-2.5 sm:-inset-3 rounded-full border-2 xs:border-[3px] border-[#d4a574]/70 z-0 shadow-lg shadow-[#d4a574]/30"
                      initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.7, opacity: 0, rotate: 15 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.3 }
                      }}
                    >
                      {/* Enhanced pulsing glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#d4a574]/25 blur-md"
                        animate={{ 
                          scale: [1, 1.15, 1],
                          opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                  
                  <div className="relative z-10">
                    <HexagonalCard
                      title={item.title}
                      variant="hero"
                      backgroundImage={item.image}
                      compact
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 gpu-accelerated shadow-lg"
                    />
                  </div>
                  
                  {/* Accessibility label */}
                  <span className="sr-only">
                    {isActive ? `Currently viewing ${item.title}` : `Switch to ${item.title}`}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrow - Next (Larger Mobile) */}
          <motion.button
            onClick={nextSlide}
            className="flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center text-white border border-white/15 mobile-touch-target gpu-accelerated shadow-lg"
            aria-label="Next story"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileTap={{ 
              scale: 0.9,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              transition: { duration: 0.1 }
            }}
            onTap={() => {
              // Enhanced haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate(50);
              }
            }}
          >
            <motion.svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-6 md:h-6"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile-Optimized Autoplay Indicator */}
      <motion.div 
        className="absolute top-4 xs:top-5 sm:top-6 right-4 xs:right-5 sm:right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.button
          onClick={() => {
            setIsAutoPlaying(!isAutoPlaying);
            // Haptic feedback for autoplay toggle
            if ('vibrate' in navigator) {
              navigator.vibrate(25);
            }
          }}
          className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center mobile-touch-target backdrop-blur-md border gpu-accelerated ${
            isAutoPlaying 
              ? 'bg-[#d4a574]/25 text-[#d4a574] border-[#d4a574]/30 shadow-lg shadow-[#d4a574]/20' 
              : 'bg-white/15 text-white/70 border-white/20 hover:bg-white/25 hover:text-white/90'
          }`}
          aria-label={`${isAutoPlaying ? 'Pause' : 'Play'} auto-navigation`}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
          }}
          whileTap={{ 
            scale: 0.92,
            transition: { duration: 0.1 }
          }}
        >
          <motion.div
            key={isAutoPlaying ? 'pause' : 'play'}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {isAutoPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 ml-0.5">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
              </svg>
            )}
          </motion.div>
          
          {/* Autoplay progress ring */}
          {isAutoPlaying && (
            <motion.svg 
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 44 44"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="#d4a574"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 5, // Match autoplay interval
                  ease: 'linear',
                  repeat: Infinity
                }}
              />
            </motion.svg>
          )}
        </motion.button>
      </motion.div>

      {/* Mobile-Optimized Progress Indicator */}
      <motion.div 
        className="absolute top-4 xs:top-5 sm:top-6 left-4 xs:left-5 sm:left-6 z-20"
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="backdrop-blur-md bg-black/25 rounded-full px-3 xs:px-4 py-2 xs:py-2.5 border border-white/15 shadow-lg">
          <motion.div 
            className="text-white/80 font-medium"
            style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}
            key={currentIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {currentIndex + 1} / {items.length}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NetflixCarousel;
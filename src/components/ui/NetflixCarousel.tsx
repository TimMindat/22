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

      {/* Revamped Navigation Bar - Perfect Hexagon Integration */}
      <div className="fixed bottom-4 xs:bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 md:px-6 pointer-events-none">
        <motion.div 
          className="relative flex items-center justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-7 lg:gap-9 px-5 xs:px-6 sm:px-7 md:px-9 lg:px-11 py-5 xs:py-6 sm:py-7 md:py-6 lg:py-7 backdrop-blur-3xl bg-gradient-to-r from-black/60 via-black/50 to-black/60 xs:from-black/55 xs:via-black/45 xs:to-black/55 md:from-black/45 md:via-black/35 md:to-black/45 rounded-[1.75rem] xs:rounded-[2.25rem] md:rounded-[2.5rem] border border-white/35 xs:border-white/30 md:border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ultra-smooth-scroll no-scroll-jitter pointer-events-auto overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.7, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ 
            delay: 0.4, 
            duration: 1.0, 
            ease: [0.25, 0.1, 0.25, 1],
            scale: { duration: 0.9 },
            rotateX: { duration: 1.1 }
          }}
          whileHover={{
            scale: 1.015,
            y: -4,
            boxShadow: "0 30px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(212, 165, 116, 0.15)",
            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
          }}
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            contain: 'layout style paint'
          }}
        >
          {/* Premium Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/8 via-transparent to-[#d4a574]/8 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-[1.75rem] xs:rounded-[2.25rem] md:rounded-[2.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
          {/* Premium Navigation Arrow - Previous */}
          <motion.button
            onClick={prevSlide}
            className="relative flex-shrink-0 w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full bg-gradient-to-br from-white/30 via-white/25 to-white/20 hover:from-white/40 hover:via-white/35 hover:to-white/30 active:from-white/50 active:via-white/45 active:to-white/40 flex items-center justify-center text-white border border-white/30 hover:border-white/40 mobile-touch-target gpu-accelerated shadow-[0_8px_25px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-hidden"
            aria-label="Previous story"
            whileHover={{ 
              scale: 1.08,
              y: -3,
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.1)",
              transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileTap={{ 
              scale: 0.92,
              y: -1,
              transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }
            }}
            onTap={() => {
              // Premium haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate([80, 20, 50]);
              }
            }}
            style={{
              willChange: 'transform, box-shadow',
              backfaceVisibility: 'hidden',
              contain: 'layout style paint',
              touchAction: 'manipulation'
            }}
          >
            {/* Button Inner Glow */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6"
              whileHover={{ x: -1.5, scale: 1.06 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform' }}
            >
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>

          {/* Optimized Hexagon Integration - Smaller Perfect Fit */}
          <div className="relative flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-4.5 overflow-hidden px-1.5 xs:px-2 md:px-2.5 ultra-smooth-scroll">
            {/* Hexagon Container Background */}
            <div className="absolute inset-y-0.5 left-0.5 right-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-40 pointer-events-none" />
            
            {items.map((item, index) => {
              const isActive = index === currentIndex;
              const distance = Math.abs(index - currentIndex);
              const isVisible = distance <= 2; // Show 5 items max (current + 2 on each side)
              
              if (!isVisible) return null;
              
              return (
                <motion.div
                  key={item.id}
                  className="cursor-pointer flex-shrink-0 relative mobile-touch-target group"
                  onClick={() => {
                    goToSlide(index);
                    // Premium haptic feedback pattern
                    if ('vibrate' in navigator) {
                      navigator.vibrate([90, 30, 70, 20, 50]);
                    }
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.2 : 1.3,
                    y: isActive ? -3 : -4,
                    rotateY: isActive ? 0 : 2,
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  whileTap={{ 
                    scale: isActive ? 0.85 : 0.75,
                    rotateY: 0,
                    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  animate={{
                    scale: isActive ? 1.15 : 0.9,
                    opacity: isActive ? 1 : 0.85,
                    y: isActive ? -4 : 0,
                    rotateY: isActive ? 0 : 1,
                  }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.25, 0.1, 0.25, 1],
                    scale: { duration: 0.5 },
                    opacity: { duration: 0.45 },
                    y: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
                    rotateY: { duration: 0.5 }
                  }}
                  style={{ 
                    minWidth: '32px', 
                    minHeight: '32px',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    contain: 'layout style paint',
                    touchAction: 'manipulation'
                  }}
                >
                  {/* Adjusted Active Indicator Ring - Smaller Hexagons */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-1 xs:-inset-1.5 sm:-inset-1.5 md:-inset-2 lg:-inset-2.5 xl:-inset-3 rounded-full border-[1.5px] xs:border-2 md:border-[2.5px] border-[#d4a574]/80 z-0 shadow-[0_0_15px_rgba(212,165,116,0.4)] backdrop-blur-sm"
                      initial={{ scale: 0.8, opacity: 0, rotate: -12 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotate: 12 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.4 }
                      }}
                    >
                      {/* Premium Pulsing Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4a574]/30 via-[#d4a574]/20 to-[#d4a574]/30 blur-sm"
                        animate={{ 
                          scale: [1, 1.12, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Inner Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#d4a574]/10 to-transparent" />
                    </motion.div>
                  )}
                  
                  {/* Much Smaller Hexagon Sizing - Perfect Fit */}
                  <div className="relative z-10 group-hover:z-20">
                    <HexagonalCard
                      title={item.title}
                      variant="hero"
                      backgroundImage={item.image}
                      compact
                      className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 gpu-accelerated shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
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

          {/* Premium Navigation Arrow - Next */}
          <motion.button
            onClick={nextSlide}
            className="relative flex-shrink-0 w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full bg-gradient-to-br from-white/30 via-white/25 to-white/20 hover:from-white/40 hover:via-white/35 hover:to-white/30 active:from-white/50 active:via-white/45 active:to-white/40 flex items-center justify-center text-white border border-white/30 hover:border-white/40 mobile-touch-target gpu-accelerated shadow-[0_8px_25px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-hidden"
            aria-label="Next story"
            whileHover={{ 
              scale: 1.08,
              y: -3,
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.1)",
              transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileTap={{ 
              scale: 0.92,
              y: -1,
              transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }
            }}
            onTap={() => {
              // Premium haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate([80, 20, 50]);
              }
            }}
            style={{
              willChange: 'transform, box-shadow',
              backfaceVisibility: 'hidden',
              contain: 'layout style paint',
              touchAction: 'manipulation'
            }}
          >
            {/* Button Inner Glow */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6"
              whileHover={{ x: 1.5, scale: 1.06 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform' }}
            >
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Repositioned Autoplay Indicator - Below Navbar */}
      <motion.div 
        className="absolute top-16 xs:top-18 sm:top-20 md:top-16 lg:top-18 right-4 xs:right-5 sm:right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.button
          onClick={() => {
            setIsAutoPlaying(!isAutoPlaying);
            // Enhanced haptic feedback for premium feel
            if ('vibrate' in navigator) {
              navigator.vibrate(35);
            }
          }}
          className={`relative w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mobile-touch-target backdrop-blur-xl border gpu-accelerated shadow-[0_8px_25px_rgba(0,0,0,0.3)] overflow-hidden ${
            isAutoPlaying 
              ? 'bg-gradient-to-br from-[#d4a574]/30 via-[#d4a574]/25 to-[#d4a574]/20 text-[#d4a574] border-[#d4a574]/40 shadow-[0_0_25px_rgba(212,165,116,0.3)]' 
              : 'bg-gradient-to-br from-white/25 via-white/20 to-white/15 text-white/80 border-white/30 hover:from-white/35 hover:via-white/30 hover:to-white/25 hover:text-white/95'
          }`}
          aria-label={`${isAutoPlaying ? 'Pause' : 'Play'} auto-navigation`}
          whileHover={{ 
            scale: 1.08,
            y: -2,
            boxShadow: isAutoPlaying 
              ? "0 12px 35px rgba(212, 165, 116, 0.4), 0 0 30px rgba(212, 165, 116, 0.2)"
              : "0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)",
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
          }}
          whileTap={{ 
            scale: 0.94,
            y: 0,
            transition: { duration: 0.15 }
          }}
        >
          {/* Button Inner Glow */}
          <motion.div 
            className={`absolute inset-0 rounded-full opacity-0 ${
              isAutoPlaying 
                ? 'bg-gradient-to-br from-[#d4a574]/20 to-transparent'
                : 'bg-gradient-to-br from-white/15 to-transparent'
            }`}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
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

      {/* Repositioned Progress Indicator - Below Navbar */}
      <motion.div 
        className="absolute top-16 xs:top-18 sm:top-20 md:top-16 lg:top-18 left-4 xs:left-5 sm:left-6 z-20"
        initial={{ opacity: 0, scale: 0.8, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="backdrop-blur-xl bg-gradient-to-r from-black/35 via-black/30 to-black/25 rounded-full px-4 xs:px-5 py-2.5 xs:py-3 border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.3)] overflow-hidden relative">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 rounded-full pointer-events-none" />
          
          <motion.div 
            className="relative z-10 text-white/85 font-semibold tracking-wide"
            style={{ fontSize: 'clamp(13px, 2.8vw, 15px)' }}
            key={currentIndex}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[#d4a574]">{currentIndex + 1}</span>
            <span className="text-white/60 mx-1">/</span>
            <span className="text-white/75">{items.length}</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NetflixCarousel;
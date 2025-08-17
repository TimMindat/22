import React from 'react';
import { motion } from 'framer-motion';

interface HexagonalCardProps {
  title?: string;
  author?: string;
  date?: string;
  edition?: string;
  articles?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'default' | 'tall' | 'hero'; // New hero variant
  backgroundImage?: string; // New prop for background images
  ghost?: boolean; // decorative, non-interactive, low-emphasis card for edge dummies
}

export const HexagonalCard: React.FC<HexagonalCardProps> = ({
  title = "Insert card title here",
  author,
  date,
  edition = "Edition",
  articles,
  className = "",
  onClick,
  children,
  variant = 'default',
  backgroundImage,
  ghost = false
}) => {
  return (
    <motion.div
      className={`hexagonal-card relative shrink-0 snap-center ${ghost ? 'pointer-events-none select-none' : 'cursor-pointer'} group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a574]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl ${className}`}
      onClick={ghost ? undefined : onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick && !ghost ? 0 : -1}
      role={onClick && !ghost ? "button" : undefined}
      aria-label={onClick && !ghost ? `Select ${title}` : undefined}
    >
      {/* Hexagonal shape using clip-path */}
      <div className={`hexagon-container relative mx-auto ${
          variant === 'tall'
            ? 'w-[160px] h-[268px] xs:w-[180px] xs:h-[300px] sm:w-[200px] sm:h-[330px] md:w-[220px] md:h-[360px]'
            : (variant === 'hero' || className?.includes('hero-hexagon'))
              ? 'w-[184px] h-[196px] xs:w-[200px] xs:h-[213px] sm:w-[232px] sm:h-[247px] md:w-[264px] md:h-[281px]'
              : 'w-[176px] h-[188px] xs:w-[200px] xs:h-[214px] sm:w-[240px] sm:h-[256px] md:w-[276px] md:h-[294px]'
        }`}>
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className={`absolute inset-0 w-full h-full ${ghost ? 'opacity-10' : 'opacity-100'}`}
            style={{
              clipPath: variant === 'tall' 
                ? 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)' 
                : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* Text readability overlay (bottom gradient) for all variants when image exists */}
        {backgroundImage && !ghost && (
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: '116px',
                background: 'linear-gradient(180deg, rgba(23,23,23,0) 0%, rgba(23,23,23,0.55) 48%, rgba(23,23,23,0.86) 100%)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>
        )}
        
        <div 
          className={`hexagon-shape w-full h-full flex items-center justify-center relative transition-colors duration-300 ${
            ghost
              ? 'bg-black/40 shadow-md'
              : 'shadow-lg hover:shadow-xl'
          }`}
          style={{
            clipPath: variant === 'tall' 
              ? 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)' // Much taller hexagon
              : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // Standard hexagon
            background: backgroundImage 
              ? 'transparent'
              : variant === 'tall' 
                ? 'linear-gradient(145deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
                : 'linear-gradient(145deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            boxShadow: `${variant === 'tall' 
              ? '0 15px 35px -5px rgba(51, 65, 85, 0.15), 0 8px 15px -3px rgba(51, 65, 85, 0.1)'
              : '0 12px 30px -5px rgba(51, 65, 85, 0.15), 0 6px 12px -3px rgba(51, 65, 85, 0.1)'}${ghost 
              ? ', inset 0 0 0 1px rgba(255,255,255,0.10)'
              : ', inset 0 0 0 1px rgba(201,169,110,0.24)'}`
          }}
        >
          

          {/* Top decorative icon (subtle) */}
          {!ghost && (
            <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent" />
              <div className="absolute inset-0 border border-white/20 rounded-md" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 m-auto text-white/80"
              >
                <path d="M12 6l2 2-2 2-2-2 2-2Zm0 6l2 2-2 2-2-2 2-2Zm6-6l2 2-2 2-2-2 2-2Zm-12 0l2 2-2 2-2-2 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          )}

          {/* Content inside hexagon */}
          <div className={`hexagon-content text-center max-w-[85%] relative ${
            variant === 'hero' || className?.includes('hero-hexagon')
              ? 'z-30 p-0 h-full flex items-end justify-center overflow-hidden'
              : 'z-10'
          } ${
            variant === 'tall'
              ? 'p-6 xs:p-8 sm:p-10'
              : variant !== 'hero' && !className?.includes('hero-hexagon')
                ? 'p-6 xs:p-8 sm:p-10'
                : ''
          }`}>
            {ghost ? null : children ? children : variant === 'hero' || className?.includes('hero-hexagon') ? (
              <div className="relative w-full flex flex-col items-center justify-end pb-16 px-6 z-20">
                <h3 
                  className="text-white font-medium leading-tight text-lg md:text-xl text-center"
                  style={{
                    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.24)'
                  }}
                >
                  {title}
                </h3>
              </div>
            ) : (
              <>
                <h3 className={`${backgroundImage ? 'text-white' : 'text-slate-900'} font-medium leading-tight mb-3 ${variant === 'tall' ? 'text-xl' : 'text-lg'}`} style={{ textShadow: backgroundImage ? '0px 1px 2px rgba(0, 0, 0, 0.24)' : 'none' }}>
                  {title}
                </h3>
                {(author || date) && (
                  <div className="flex items-center justify-center space-x-3 text-sm mb-3">
                    {author && (
                      <div className="flex items-center bg-white/15 text-white/90 rounded-full px-2 py-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#C9A96E] mr-1.5"></span>
                        <span>Author</span>
                      </div>
                    )}
                    {date && (
                      <div className="flex items-center bg-white/15 text-white/90 rounded-full px-2 py-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
                          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <span>Date</span>
                      </div>
                    )}
                  </div>
                )}
                {(edition || articles) && (
                  <div className={`text-white ${variant === 'tall' ? 'text-sm' : 'text-xs'} bg-black/60 border border-white/16 rounded-md px-3 py-1 inline-block`}>
                    {articles ? articles : edition}
                  </div>
                )}
              </>
            )}
          </div>
          
          {          /* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0"
            style={{
              clipPath: variant === 'tall' 
                ? 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)' 
                : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
            whileHover={{ opacity: ghost ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Subtle glow for hero hexagons (no scaling) */}
          {(variant === 'hero' || className?.includes('hero-hexagon')) && !ghost && (
            <>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-[#d4a574]/8 via-[#d4a574]/3 to-transparent rounded-full opacity-0 blur-lg"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.div
                className="absolute -inset-px bg-gradient-to-br from-[#d4a574]/15 via-[#d4a574]/8 to-transparent rounded-full opacity-0 blur-sm"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.02 }}
              />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HexagonalCard;
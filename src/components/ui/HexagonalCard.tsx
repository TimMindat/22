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
  backgroundImage
}) => {
  return (
    <motion.div
      className={`hexagonal-card relative cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a574]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl ${className}`}
      whileHover={
        className?.includes('hero-hexagon') 
          ? { 
              y: -1, 
              scale: 1.005,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          : { 
              y: -4, 
              scale: 1.015,
              transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
            }
      }
      whileTap={
        className?.includes('hero-hexagon')
          ? {
              scale: 0.998,
              transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          : {
              scale: 0.985,
              transition: { duration: 0.1 }
            }
      }
      transition={{ 
        duration: className?.includes('hero-hexagon') ? 0.3 : 0.25, 
        ease: className?.includes('hero-hexagon') ? [0.25, 0.46, 0.45, 0.94] : [0.25, 0.1, 0.25, 1]
      }}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `Select ${title}` : undefined}
    >
      {/* Hexagonal shape using clip-path */}
      <div className={`hexagon-container relative mx-auto ${variant === 'tall' ? 'aspect-[3/5] max-w-[350px] w-full' : variant === 'hero' || className?.includes('hero-hexagon') ? 'w-[264px] h-[281px]' : 'aspect-square max-w-[350px] w-full'}`}>
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className={`absolute inset-0 w-full h-full ${variant === 'hero' || className?.includes('hero-hexagon') ? 'opacity-20' : 'opacity-30'}`}
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
        
        {/* Text Readability Overlay for Hero Hexagons */}
        {(variant === 'hero' || className?.includes('hero-hexagon')) && backgroundImage && (
          <div 
            className="absolute inset-0 w-full h-full bg-white/40"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        )}
        
        <div 
          className="hexagon-shape w-full h-full bg-gradient-to-br from-slate-50/90 via-white/95 to-slate-100/90 hover:from-blue-50/90 hover:via-indigo-50/95 hover:to-purple-50/90 flex items-center justify-center relative border border-slate-200/60 hover:border-indigo-300/60 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
          style={{
            clipPath: variant === 'tall' 
              ? 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)' // Much taller hexagon
              : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // Standard hexagon
            background: backgroundImage 
              ? 'linear-gradient(145deg, rgba(248, 250, 252, 0.85) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(241, 245, 249, 0.85) 100%)'
              : variant === 'tall' 
                ? 'linear-gradient(145deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
                : 'linear-gradient(145deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            boxShadow: variant === 'tall'
              ? '0 15px 35px -5px rgba(51, 65, 85, 0.15), 0 8px 15px -3px rgba(51, 65, 85, 0.1)'
              : '0 12px 30px -5px rgba(51, 65, 85, 0.15), 0 6px 12px -3px rgba(51, 65, 85, 0.1)'
          }}
        >
          {/* Content inside hexagon */}
          <div className={`hexagon-content text-center max-w-[85%] relative ${variant === 'hero' || className?.includes('hero-hexagon') ? 'z-30 p-8 h-full flex items-center justify-center overflow-hidden' : 'z-10 p-12'} ${variant === 'tall' ? 'p-12' : variant !== 'hero' && !className?.includes('hero-hexagon') ? 'p-10' : ''}`}>
            {children ? children : variant === 'hero' || className?.includes('hero-hexagon') ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Title - always visible, clean display */}
                <div className="flex items-center justify-center px-6 z-20">
                  <h3 
                    className="text-slate-900 font-bold leading-tight text-lg md:text-xl text-center max-w-full"
                    style={{
                      textShadow: '0 2px 6px rgba(255, 255, 255, 0.9), 0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <span className="bg-white/85 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl border border-white/50 inline-block max-w-full transition-all duration-400 hover:bg-white/88 hover:shadow-2xl hover:scale-[1.008] ease-[0.25,0.46,0.45,0.94]">
                      {title}
                    </span>
                  </h3>
                </div>
              </div>
            ) : (
              <>
                <h3 className={`text-slate-900 font-bold leading-tight mb-4 ${variant === 'tall' ? 'text-xl' : 'text-lg'} ${backgroundImage ? 'text-shadow-sm' : ''}`}>
                  {title}
                </h3>
                {(author || date) && (
                  <div className="flex items-center justify-center space-x-3 text-sm text-slate-600 mb-4">
                    {author && (
                      <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-1.5"></div>
                        <span className="font-semibold">Author</span>
                      </div>
                    )}
                    {date && (
                      <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-rose-400 rounded-full mr-1.5"></div>
                        <span className="font-semibold">Date</span>
                      </div>
                    )}
                  </div>
                )}
                {(edition || articles) && (
                  <div className={`font-bold text-slate-800 ${variant === 'tall' ? 'text-lg' : 'text-base'} ${backgroundImage ? 'bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 inline-block' : ''}`}>
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
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Enhanced glow effect for hero hexagons */}
          {(variant === 'hero' || className?.includes('hero-hexagon')) && (
            <>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-[#d4a574]/8 via-[#d4a574]/3 to-transparent rounded-full opacity-0 blur-lg"
                whileHover={{ opacity: 0.7, scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.div
                className="absolute -inset-px bg-gradient-to-br from-[#d4a574]/15 via-[#d4a574]/8 to-transparent rounded-full opacity-0 blur-sm"
                whileHover={{ opacity: 0.8, scale: 1.015 }}
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
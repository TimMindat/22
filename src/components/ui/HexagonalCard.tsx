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
      className={`hexagonal-card relative ${ghost ? 'pointer-events-none select-none' : 'cursor-pointer'} group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a574]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl ${className}`}
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
            ? 'w-[200px] h-[330px] md:w-[220px] md:h-[360px]'
            : (variant === 'hero' || className?.includes('hero-hexagon'))
              ? 'w-[264px] h-[281px]'
              : 'w-[190px] h-[210px] sm:w-[200px] sm:h-[220px] md:w-[220px] md:h-[240px]'
        }`}>
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className={`absolute inset-0 w-full h-full ${ghost ? 'opacity-10' : (variant === 'hero' || className?.includes('hero-hexagon') ? 'opacity-20' : 'opacity-30')}`}
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
        
        {/* Text readability overlay for Hero Hexagons (match mockup: dark bottom gradient) */}
        {(variant === 'hero' || className?.includes('hero-hexagon')) && backgroundImage && !ghost && (
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
                background: 'linear-gradient(180deg, rgba(23,23,23,0) 0%, rgba(23,23,23,0.64) 50%, rgba(23,23,23,0.88) 100%)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </div>
        )}
        
        <div 
          className={`hexagon-shape w-full h-full flex items-center justify-center relative transition-all duration-300 backdrop-blur-sm ${
            ghost
              ? 'bg-gradient-to-br from-white/50 via-white/60 to-white/50 border border-white/20 shadow-md'
              : 'bg-gradient-to-br from-slate-50/92 via-white/96 to-slate-100/92 border border-slate-300/60 hover:border-slate-400/70 shadow-lg hover:shadow-xl'
          }`}
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
          {/* Subtle gold stroke overlay clipped to hexagon */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded"
            initial={{ opacity: ghost ? 0.08 : 0.14 }}
            whileHover={{ opacity: ghost ? 0.08 : 0.28 }}
            transition={{ duration: 0.25 }}
            style={{
              clipPath: variant === 'tall'
                ? 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)'
                : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(201,169,110,0.35), rgba(201,169,110,0.12), rgba(201,169,110,0.35))',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor' as any,
              mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              maskComposite: 'exclude' as any,
            }}
          />

          {/* Content inside hexagon */}
          <div className={`hexagon-content text-center max-w-[85%] relative ${variant === 'hero' || className?.includes('hero-hexagon') ? 'z-30 p-0 h-full flex items-end justify-center overflow-hidden' : 'z-10 p-12'} ${variant === 'tall' ? 'p-12' : variant !== 'hero' && !className?.includes('hero-hexagon') ? 'p-10' : ''}`}>
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
            whileHover={{ opacity: ghost ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Enhanced glow effect for hero hexagons */}
          {(variant === 'hero' || className?.includes('hero-hexagon')) && !ghost && (
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
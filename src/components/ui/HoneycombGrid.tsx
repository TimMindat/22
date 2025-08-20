import React from 'react';
import HexagonalCard from './HexagonalCard';

export interface HoneyItem {
  title?: string;
  backgroundImage?: string;
  author?: boolean | string;
  date?: boolean | string;
  articles?: string;
  variant?: 'default' | 'tall' | 'hero';
}

interface HoneycombGridProps {
  rows: HoneyItem[][]; // Expect two rows: first then second
  ariaLabelRow1?: string;
  ariaLabelRow2?: string;
}

/**
 * HoneycombGrid renders optimized honeycomb layout for both Feature and Latest sections.
 * - Mobile (xxs-xs): 100% optimized 3×2 grid with perfect spacing and touch targets
 * - Small (sm): 2×2 grid for better readability on small tablets  
 * - Medium+ (md+): honeycomb flex rows with ghost edges and row offset
 */
export const HoneycombGrid: React.FC<HoneycombGridProps> = ({ rows, ariaLabelRow1, ariaLabelRow2 }) => {
  const [row1 = [], row2 = []] = rows;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mobile-first optimized layout (xxs to sm) */}
      <div className="md:hidden">
        {/* Ultra-small screens: 3×2 grid with optimal spacing */}
        <div className="xxs:block xs:block sm:hidden">
          <div className="mobile-hex-container container mx-auto">
            {/* Row 1: 3 hexagons */}
            <div 
              className="mobile-hex-grid grid grid-cols-3 justify-items-center"
              aria-label={ariaLabelRow1 || 'Feature content row 1 (mobile)'}
            >
              {row1.slice(0, 3).map((item, idx) => (
                <HexagonalCard 
                  key={`mobile-r1-${idx}`} 
                  compact 
                  backgroundImage={item.backgroundImage} 
                  title={item.title} 
                  author={item.author ? 'true' : undefined} 
                  date={item.date ? 'true' : undefined}
                  className="honeycomb-mobile w-full max-w-[100px] xxs:max-w-[110px] mx-auto"
                />
              ))}
            </div>
            
            {/* Row 2: 2 hexagons centered */}
            <div 
              className="mobile-hex-grid grid grid-cols-2 justify-items-center max-w-[260px] mx-auto mt-4"
              aria-label={ariaLabelRow2 || 'Feature content row 2 (mobile)'}
            >
              {row2.slice(0, 2).map((item, idx) => (
                <HexagonalCard 
                  key={`mobile-r2-${idx}`} 
                  compact 
                  backgroundImage={item.backgroundImage} 
                  title={item.title} 
                  author={item.author ? 'true' : undefined} 
                  date={item.date ? 'true' : undefined}
                  className="honeycomb-mobile w-full max-w-[110px] xxs:max-w-[120px] mx-auto"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Small tablets: 2×2 grid for better readability */}
        <div className="hidden sm:block md:hidden">
          <div className="container mx-auto px-6 space-y-4">
            <div 
              className="grid grid-cols-2 gap-4 justify-items-center max-w-md mx-auto"
              aria-label={ariaLabelRow1 || 'Feature content row 1 (tablet)'}
            >
              {row1.slice(0, 2).map((item, idx) => (
                <HexagonalCard 
                  key={`tablet-r1-${idx}`} 
                  backgroundImage={item.backgroundImage} 
                  title={item.title} 
                  author={item.author ? 'true' : undefined} 
                  date={item.date ? 'true' : undefined}
                  className="w-full max-w-[160px] mx-auto"
                />
              ))}
            </div>
            
            <div 
              className="grid grid-cols-2 gap-4 justify-items-center max-w-md mx-auto"
              aria-label={ariaLabelRow2 || 'Feature content row 2 (tablet)'}
            >
              {row2.slice(0, 2).map((item, idx) => (
                <HexagonalCard 
                  key={`tablet-r2-${idx}`} 
                  backgroundImage={item.backgroundImage} 
                  title={item.title} 
                  author={item.author ? 'true' : undefined} 
                  date={item.date ? 'true' : undefined}
                  className="w-full max-w-[160px] mx-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout: honeycomb rows with ghost edges (md+) */}
      <div className="hidden md:block">
        <div className="relative px-4 lg:px-8 overflow-hidden">
          {/* Row 1: 5 hexagons with ghost edges */}
          <div 
            className="flex justify-center items-center gap-3 lg:gap-5 mb-6 lg:mb-8 mx-[-60px] lg:mx-[-100px] overflow-x-auto lg:overflow-visible snap-x scroll-smooth" 
            aria-label={ariaLabelRow1 || 'Feature content row 1'}
          >
            <HexagonalCard ghost className="opacity-30 shrink-0" />
            {row1.map((item, idx) => (
              <HexagonalCard 
                key={`desktop-r1-${idx}`} 
                backgroundImage={item.backgroundImage} 
                title={item.title} 
                author={item.author ? 'true' : undefined} 
                date={item.date ? 'true' : undefined}
                className="shrink-0 snap-center"
              />
            ))}
            <HexagonalCard ghost className="opacity-30 shrink-0" />
          </div>
          
          {/* Row 2: 4 hexagons with offset and ghost edges */}
          <div 
            className="flex justify-center items-center gap-3 lg:gap-5 translate-x-8 lg:translate-x-12 mx-[-60px] lg:mx-[-100px] overflow-x-auto lg:overflow-visible snap-x scroll-smooth" 
            aria-label={ariaLabelRow2 || 'Feature content row 2'}
          >
            <HexagonalCard ghost className="opacity-30 shrink-0" />
            {row2.map((item, idx) => (
              <HexagonalCard 
                key={`desktop-r2-${idx}`} 
                backgroundImage={item.backgroundImage} 
                title={item.title} 
                author={item.author ? 'true' : undefined} 
                date={item.date ? 'true' : undefined}
                className="shrink-0 snap-center"
              />
            ))}
            <HexagonalCard ghost className="opacity-30 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoneycombGrid;



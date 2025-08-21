import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import HexagonalCard from "../../components/ui/HexagonalCard";

export const Home2 = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Perfect hexagonal card matching your exact image
  const HexCard = ({ hasContent = false, hasArticles = false }: { hasContent?: boolean, hasArticles?: boolean }) => (
    <div 
      className="hexagon-container"
      style={{
        width: '200px',
        height: '173px', // sqrt(3)/2 * width for perfect hexagon proportions
        margin: '0 5px -43px 5px', // Negative bottom margin for tessellation
        position: 'relative',
      }}
    >
      {/* Perfect hexagon shape */}
      <div 
        className="hexagon"
        style={{
          width: '200px',
          height: '173px',
          position: 'relative',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: hasContent ? `url(/imgS.png)` : '#404040',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid #333333',
        }}
      />
      
      {/* Content overlay for hexagons with content */}
      {hasContent && (
        <div 
          className="absolute inset-0 flex flex-col justify-end items-center p-4"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {/* Dark gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />
          
          <div className="relative z-10 text-center text-white">
            {/* Card title */}
            <h3 
              className="text-white font-medium mb-2"
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: '16px',
                lineHeight: '1.2',
                textShadow: '0px 1px 2px rgba(0, 0, 0, 0.7)',
              }}
            >
              Insert card title here
            </h3>
            
            {/* 12 articles label */}
            {hasArticles && (
              <div 
                className="inline-block px-3 py-1 text-xs text-white"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  fontWeight: '500',
                }}
              >
                12 articles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const rows = useMemo(() => Array.from({ length: 10 }).map((_, i) => i), []);
  const hexesPerRowMd = 5; // md+ screens
  const hexesPerRowLg = 6; // lg+ screens

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white overflow-x-hidden">
      {/* Top bar matching design */}
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background:
            "linear-gradient(180deg, #171717 0%, #171717 1%, rgba(23,23,23,0.98) 6%, rgba(23,23,23,0.92) 12%, rgba(23,23,23,0.84) 20%, rgba(23,23,23,0.72) 30%, rgba(23,23,23,0.55) 42%, rgba(23,23,23,0.32) 58%, rgba(23,23,23,0.12) 78%, rgba(23,23,23,0) 100%)",
        }}
      >
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-3 items-center h-14 sm:h-16">
            {/* Left: logo and name */}
            <div className="flex items-center gap-2">
              <img src="https://i.ibb.co/6cRjBNZJ/Logo.png" alt="Logo" className="h-6 w-auto object-contain" />
              <span className="hidden sm:block text-sm text-white/90">Trace of The Tide</span>
            </div>
            {/* Middle: action icons */}
            <nav className="hidden md:flex items-center justify-center gap-5 text-[13px] text-[#A3A3A3]">
              <Link to="#" className="hover:text-white transition-colors">Fields</Link>
              <Link to="#" className="hover:text-white transition-colors">Join Collective</Link>
              <Link to="#" className="hover:text-white transition-colors">Send Gift</Link>
              <Link to="#" className="hover:text-white transition-colors">Share Story</Link>
              <Link to="#" className="hover:text-white transition-colors">Search</Link>
              <button className="hover:text-white transition-colors" aria-label="Language">
                EN
              </button>
            </nav>
            {/* Right: auth */}
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <Link to="/login" className="hidden sm:block text-white/80 hover:text-white text-sm px-2 py-1">
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center bg-[#C9A96E] hover:bg-[#bf9a59] active:bg-[#b38f4c] text-black text-sm font-medium rounded px-3 py-1.5"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO with left text and honeycomb background */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-24">
        <div className="relative container mx-auto px-4 z-20">
          <div className="max-w-xl">
            <h1 className="text-[clamp(24px,4vw,36px)] font-semibold mb-3">Home page title</h1>
            <p className="text-white/70 text-sm sm:text-base md:text-[15px] leading-relaxed max-w-md mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh.
            </p>
            <Link
              to="#"
              className="inline-flex items-center justify-center bg-[#C9A96E] hover:bg-[#bf9a59] active:bg-[#b38f4c] text-black text-sm font-medium rounded-md px-4 py-2 transition-colors"
            >
              Call to Action
            </Link>
          </div>
        </div>

        {/* Perfect Honeycomb Background - EXACTLY like your image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="honeycomb-grid" style={{ paddingTop: '50px' }}>
            {/* Row 1 */}
            <div className="hex-row">
              <HexCard />
              <HexCard />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard />
              <HexCard />
            </div>
            
            {/* Row 2 - offset */}
            <div className="hex-row hex-row-offset">
              <HexCard />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard />
            </div>
            
            {/* Row 3 */}
            <div className="hex-row">
              <HexCard />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard />
            </div>
            
            {/* Row 4 - offset */}
            <div className="hex-row hex-row-offset">
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard hasContent hasArticles />
              <HexCard />
            </div>
            
            {/* Row 5 */}
            <div className="hex-row">
              <HexCard />
              <HexCard />
              <HexCard />
              <HexCard />
              <HexCard />
              <HexCard />
            </div>
            
            {/* Row 6 - offset */}
            <div className="hex-row hex-row-offset">
              <HexCard />
              <HexCard />
              <HexCard />
              <HexCard />
            </div>
          </div>
          
          {/* Bottom fade effect */}
          <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '300px',
              background: 'linear-gradient(to top, #171717 0%, rgba(23, 23, 23, 0.9) 30%, rgba(23, 23, 23, 0.5) 60%, transparent 100%)',
            }}
          />
        </div>
        
        {/* Add the necessary CSS for perfect honeycomb tessellation */}
        <style jsx>{`
          .honeycomb-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .hex-row {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .hex-row-offset {
            margin-left: 105px; /* Half hexagon width + margin */
          }
        `}</style>
      </section>

      {/* Share your story */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="w-14 h-14 bg-white/5 rounded-xl mx-auto mb-6 flex items-center justify-center border border-white/10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2"/>
              <path d="M6.5 2H20v20L13 17H6.5a2.5 2.5 0 010-5" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Share your story</h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Every story matters. Help us preserve the collective memory by contributing your personal experiences, testimonies, or knowledge of historical events.
          </p>
          <Link to="/contribute" className="inline-flex items-center justify-center bg-[#C9A96E] hover:bg-[#bf9a59] text-black font-medium rounded-md px-5 py-2">
            Contribute Now!
          </Link>
        </div>
        {/* Decorative floating hexes */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-10 h-10 border border-white/10"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${12 + (Math.floor(i / 7) * 12)}%`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer (reusing current site's footer layout) */}
      <footer className="bg-[#0a0a0a] text-white/70 py-16 mt-4 border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and description */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <img 
                  src="https://i.imgur.com/bwdY3iU.png" 
                  alt="Trace of the Tides Logo" 
                  className="w-12 h-12 mr-3"
                />
                <h3 className="text-2xl font-['Sora',Helvetica] text-white">Trace of the Tides</h3>
              </Link>
              <p className="text-base text-white/70 mb-8 leading-relaxed max-w-xs">
                Preserving our collective memory through stories, testimonies, and cultural artifacts that connect us across time and space.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3A10.9 10.9 0 0 1 20.1 4.3A4.48 4.48 0 0 0 22.46 2A9 9 0 0 1 19.36 3.48A4.5 4.5 0 0 0 12.93 8V9A10.7 10.7 0 0 1 3 4S-1 13 8 17A11.64 11.64 0 0 1 1 19C10 24 21 19 21 9A4.5 4.5 0 0 0 20.85 7.5A7.72 7.72 0 0 0 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 21L12 17L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Programs */}
            <div className="col-span-1">
              <h4 className="text-white font-bold mb-6 text-lg">Programs</h4>
              <ul className="space-y-4">
                <li><Link to="/coast" className="hover:text-white transition-colors">Coast</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Harbour</Link></li>
                <li><Link to="/programs/azure" className="hover:text-white transition-colors">Azure</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Hawsh</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h4 className="text-white font-bold mb-6 text-lg">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/symbols" className="hover:text-white transition-colors">Symbols</Link></li>
                <li><Link to="/archives" className="hover:text-white transition-colors">Archives</Link></li>
                <li><Link to="/contribute" className="hover:text-white transition-colors">Contribute</Link></li>
                <li><Link to="/maps" className="hover:text-white transition-colors">Maps</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1">
              <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#d4a574]">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm">info@traceofthetides.org</span>
                </li>
                <li className="flex items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#d4a574]">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 12 1A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="text-sm">Palestine</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/50 mb-4 md:mb-0">
              © {new Date().getFullYear()} Trace of the Tides. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-white/50 hover:text-[#d4a574] text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/50 hover:text-[#d4a574] text-sm transition-colors">Terms of Service</Link>
              <Link to="#" className="text-white/50 hover:text-[#d4a574] text-sm transition-colors">GDPR</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home2;



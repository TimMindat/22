import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { collections } from "../../data/collections";

export const Home2 = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();
  // Perfect hexagonal card matching your exact image
  const HexCard = ({ hasContent = false, hasArticles = false, idx }: { hasContent?: boolean, hasArticles?: boolean, idx?: number }) => (
    <div 
      className="hexagon-container"
      style={{
        width: 'var(--hex-w)',
        height: 'var(--hex-h)',
        margin: '0 var(--hex-gap) calc(var(--hex-h) * -0.18) var(--hex-gap)',
        position: 'relative',
        cursor: hasContent ? 'pointer' : 'default',
      }}
      onClick={() => { 
        if (hasContent && typeof idx === 'number' && collections[idx]) {
          navigate(`/collections/${collections[idx].slug}`);
        }
      }}
      onKeyDown={(e) => { 
        if (hasContent && typeof idx === 'number' && collections[idx] && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          navigate(`/collections/${collections[idx].slug}`);
        }
      }}
      role={hasContent && typeof idx === 'number' && collections[idx] ? 'button' : undefined}
      tabIndex={hasContent && typeof idx === 'number' && collections[idx] ? 0 : -1}
      aria-label={hasContent && typeof idx === 'number' && collections[idx] ? `Open ${collections[idx].title} collection` : undefined}
    >
      {/* Perfect hexagon shape */}
      <div
        className="hexagon"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: hasContent ? `url(${(typeof idx === 'number' && collections[idx]) ? collections[idx].imageUrl : '/imgS.png'})` : '#404040',
          filter: hasContent ? 'grayscale(1) contrast(1.05) brightness(0.9) blur(0.5px)' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '3px solid #080808',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 0 1.5px rgba(255,255,255,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, filter, box-shadow',
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
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)',
            }}
          />
          
          <div className="relative z-10 text-center text-white px-3 pb-4 pt-2" style={{ transform: 'translateY(10px)' }}>
            {/* Card title */}
            <h3
              className="text-white font-semibold mb-2.5 leading-tight"
              style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '17px',
                lineHeight: '1.25',
                letterSpacing: '-0.01em',
                textShadow: '0px 2px 6px rgba(0, 0, 0, 0.9)'
              }}
            >
              {typeof idx === 'number' && collections[idx] ? collections[idx].title : 'Insert card title here'}
            </h3>

            {/* articles label */}
            {hasArticles && (
              <div
                className="inline-block px-3.5 py-1 text-xs text-white/95"
                style={{
                  background: 'rgba(25, 25, 25, 0.6)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500 as any,
                  letterSpacing: '0.01em',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {typeof idx === 'number' && collections[idx] ? `${collections[idx].articles.length} articles` : '12 articles'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Grid is now static for pixel-perfect matching

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] via-[#111111] to-[#0B0B0B] text-white overflow-x-hidden">
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
                className="inline-flex items-center bg-[#D4A05B] hover:bg-[#c49650] active:bg-[#b38645] text-black text-sm font-medium rounded px-3 py-1.5"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO with honeycomb background */}
      <section className="hero-hex-vars relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[2fr_3fr] gap-x-8 lg:gap-x-16 items-start">
            
            {/* Left Column: Hero Text */}
            <div className="relative z-10 pt-8 md:pt-16 text-center md:text-left">
              {/* Ghost Hexagon Anchor for Desktop */}
              <div className="hidden md:block absolute top-1/2 -left-48 lg:-left-56 -translate-y-1/2 opacity-15">
                <div 
                  style={{
                    width: 'var(--hex-w)',
                    height: 'var(--hex-h)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    background: '#404040',
                    transform: 'scale(1.5)',
                  }}
                />
              </div>
              <h1 className="text-[clamp(2.2rem,5vw,3rem)] font-semibold mb-4 leading-tight whitespace-nowrap">Home page title</h1>
              <p className="text-white/70 text-[15px] sm:text-base md:text-[16px] leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh.
              </p>
              <Link
                to="#"
                className="inline-flex items-center justify-center bg-[#D4A05B] hover:bg-[#c49650] active:bg-[#b38645] text-black text-sm font-medium rounded-md px-5 py-2.5 transition-colors"
              >
                Call to Action
              </Link>
            </div>

            {/* Right Column: Honeycomb Grid */}
            <div className="relative honeycomb-layer mt-12 md:mt-0 lg:full-bleed-right">
              {/* Top Blur Effect */}
              <div 
                className="absolute top-0 left-0 right-0 h-[150px] z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, #0B0B0B 20%, rgba(11,11,11,0.8) 50%, rgba(11,11,11,0) 100%)',
                  backdropFilter: 'blur(4px)',
                }}
              />

              <div className="honeycomb-grid">
                {/* Row 1 */}
                <div className="hex-row" style={{ marginLeft: 'calc(var(--hex-w) * 1)'}}>
                  <HexCard />
                  <HexCard hasContent hasArticles idx={0} />
                  <HexCard hasContent hasArticles idx={1} />
                </div>
                
                {/* Row 2 - offset */}
                <div className="hex-row hex-row-offset">
                  <HexCard />
                  <HexCard hasContent hasArticles idx={2} />
                  <HexCard hasContent hasArticles idx={3} />
                  <HexCard hasContent hasArticles idx={4} />
                </div>
                
                {/* Row 3 */}
                <div className="hex-row">
                  <HexCard hasContent hasArticles idx={5} />
                  <HexCard hasContent hasArticles idx={6} />
                  <HexCard hasContent hasArticles idx={7} />
                  <HexCard hasContent hasArticles idx={8} />
                </div>
                
                {/* Row 4 - offset */}
                <div className="hex-row hex-row-offset">
                  <HexCard hasContent hasArticles idx={9} />
                  <HexCard hasContent hasArticles idx={10} />
                  <HexCard hasContent hasArticles idx={11} />
                  <HexCard />
                </div>
                
                {/* Row 5 */}
                <div className="hex-row" style={{ marginLeft: 'calc(var(--hex-w) * 1)'}}>
                    <HexCard />
                    <HexCard />
                    <HexCard />
                </div>
              </div>

              {/* Bottom volumetric beams */}
              <div className="absolute left-0 right-0 -bottom-32 h-[350px] pointer-events-none z-10">
                <div className="beam" style={{ position: 'absolute', left: 'calc(50% - var(--hex-w) * 1.6)', width: 'var(--hex-w)', height: '100%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 75%)', filter: 'blur(25px)', opacity: 0.7 }} />
                <div className="beam" style={{ position: 'absolute', left: 'calc(50% - var(--hex-w) * 0.5)', width: 'var(--hex-w)', height: '100%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0) 75%)', filter: 'blur(28px)', opacity: 0.8 }} />
                <div className="beam" style={{ position: 'absolute', left: 'calc(50% + var(--hex-w) * 0.6)', width: 'var(--hex-w)', height: '100%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 75%)', filter: 'blur(25px)', opacity: 0.7 }} />
              </div>
              
              {/* Bottom fade effect */}
              <div 
                className="absolute -bottom-80 left-0 right-0 pointer-events-none"
                style={{
                  height: '550px',
                  background: 'linear-gradient(to top, #0B0B0B 40%, rgba(11,11,11,0.98) 60%, rgba(11,11,11,0.7) 85%, rgba(11,11,11,0) 100%)',
                  backdropFilter: 'blur(12px)',
                }}
              />
            </div>
          </div>
        </div>
      </section>
 
      {/* CSS for tessellation and responsiveness */}
      <style>{`
        /* Hex sizing variables on the hero container */
        .hero-hex-vars { 
          --hex-w: clamp(140px, 16vw, 190px); 
          --hex-h: calc(var(--hex-w) * 0.92); 
          --hex-gap: 4px;
        }
        @media (min-width: 1024px) {
          .hero-hex-vars {
            --hex-w: clamp(220px, 20vw, 320px); /* Further increased hexagon size */
            --hex-gap: 10px; /* Adjusted gap to maintain proportion */
          }
        }

        .honeycomb-grid {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Align grid to the left of its container */
          margin-left: calc(var(--hex-w) * -0.25);
          margin-top: -50px;
          transform: translateX(calc(var(--hex-w) * -0.1));
        }

        .hex-row {
          display: flex;
          justify-content: center;
          animation: fadeInHexRow 0.8s ease-out forwards;
        }
        
        .hex-row-offset {
          margin-left: calc(var(--hex-w) * 0.5 + var(--hex-gap));
        }
        
        .hexagon-container { 
          opacity: 0; 
          animation: fadeInHex 0.6s ease-out forwards; 
        }
        
        .hex-row:nth-child(1) { animation-delay: 0.08s; }
        .hex-row:nth-child(2) { animation-delay: 0.18s; }
        .hex-row:nth-child(3) { animation-delay: 0.28s; }
        .hex-row:nth-child(4) { animation-delay: 0.38s; }
        .hex-row:nth-child(5) { animation-delay: 0.48s; }

        @keyframes fadeInHexRow { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; translateY(0); } }
        @keyframes fadeInHex { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        .hexagon-container:hover .hexagon { 
          transform: scale(1.05); 
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255,255,255,0.2) !important; 
          filter: brightness(1.1) contrast(1.05) !important; 
        }
        .hexagon-container:hover { 
          z-index: 20; 
        }
        .hexagon-container:focus-visible {
          outline: none;
        }
        .hexagon-container:focus-visible .hexagon {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 0 2px rgba(255,255,255,0.4) !important;
          transform: scale(1.05);
        }

        /* Responsive stacking */
        @media (max-width: 1023px) {
            .full-bleed-right {
                width: auto;
            }
        }
        @media (max-width: 767px) {
          .hero-hex-vars {
            padding-bottom: 2rem;
          }
          
          /* Disable the two-column grid layout */
          .grid.md\:grid-cols-\[2fr_3fr\] {
            display: block;
          }

          /* Reset desktop-specific positioning */
          .honeycomb-layer {
            margin-top: 3rem;
          }
          .honeycomb-grid {
            margin-left: 0;
            margin-top: 0;
            transform: none;
            align-items: center;
          }

          /* Hide decorative ghost hexagon on mobile */
          .hidden.md\:block {
            display: none;
          }
          
          /* Stack the hexagon rows into a single column */
          .hex-row, .hex-row-offset {
            flex-direction: column;
            margin-left: 0 !important; /* Important to override inline styles */
            gap: 1rem;
            width: 100%;
            align-items: center;
          }
          .hex-row + .hex-row {
            margin-top: 1rem;
          }
           .hexagon-container {
             margin: 0 !important; /* Disable vertical overlap for a clean stack */
           }

          /* Hide empty hexagons that are only for desktop shaping */
          .hexagon-container:not([role="button"]) {
            display: none;
          }

          /* Adapt blur effects for the vertical layout */
          .full-width-blur-top {
            height: 150px; /* Soft fade from the top */
          }
          .full-width-blur-bottom {
            height: 400px; /* Large fog at the bottom of the section */
            bottom: -150px; /* Pull it down to cover the transition to the next section */
          }
        }

        /* Full Bleed Utility for Desktop */
        @media (min-width: 1024px) {
          .full-bleed-right {
            --container-padding: calc((100vw - 1024px) / 2); /* Approximates Tailwind's container padding */
            width: calc(100% + var(--container-padding));
          }
        }
        @media (min-width: 1280px) {
          .full-bleed-right {
            --container-padding: calc((100vw - 1280px) / 2);
            width: calc(100% + var(--container-padding));
          }
        }
      `}</style>
      
      {/* Share your story (after 12 collections) */}
      <section className="py-20 text-center relative overflow-hidden" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 52px'
      }}>
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
          <Link to="/contribute" className="inline-flex items-center justify-center bg-[#D4A05B] hover:bg-[#c49650] text-black font-medium rounded-md px-5 py-2">
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
      <footer className="bg-[#0D0D0D] text-[#A0A0A0] py-16 mt-4 border-t border-white/10 relative overflow-hidden">
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



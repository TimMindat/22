import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import HexagonalCard from "../../components/ui/HexagonalCard";
import NetflixCarousel from "../../components/ui/NetflixCarousel";

// Component data can be added here as needed

export const MainHomepage = (): JSX.Element => {
  // Carousel items data
  const carouselItems = [
  {
    id: 1,
      title: "Gaza Resilience",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
      title: "Jerusalem Heritage",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
      title: "Olive Groves",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg/960px-Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg"
    },
    {
      id: 4,
      title: "Cultural Arts",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Traditional Music",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Ancient Stories",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Modern Hope",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Netflix-Style Hero Carousel */}
      <NetflixCarousel items={carouselItems} />





      {/* CTA trio under hero (no section header) */}
      <section className="py-12 sm:py-14 md:py-16 relative bg-black/20 overflow-hidden content-visibility-auto">
        <div className="container mx-auto px-4 sm:px-5 text-center relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Join Collective */}
            <div className="group relative">
              <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#d4a574]/30 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-[#d4a574] to-[#c49660] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#d4a574] transition-colors duration-300">Join Collective</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                <button className="group/btn relative bg-[#d4a574] hover:bg-[#c49660] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black overflow-hidden">
                  <span className="relative z-10">Join now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c49660] to-[#d4a574] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Send Gift */}
            <div className="group relative">
              <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#d4a574]/30 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-[#d4a574] to-[#c49660] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="8" width="18" height="4" rx="1" stroke="white" strokeWidth="2"/>
                    <path d="M12 8V21" stroke="white" strokeWidth="2"/>
                    <path d="M19 12V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-8" stroke="white" strokeWidth="2"/>
                    <path d="M7.5 8a2.5 2.5 0 010-5C11 3 12 7 12 7s1-4 4.5-4a2.5 2.5 0 010 5" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#d4a574] transition-colors duration-300">Send Gift</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                <button className="group/btn relative bg-[#d4a574] hover:bg-[#c49660] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black overflow-hidden">
                  <span className="relative z-10">Send now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c49660] to-[#d4a574] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
                    
            {/* Share Story */}
            <div className="group relative">
              <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#d4a574]/30 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-[#d4a574] to-[#c49660] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2"/>
                    <path d="M6.5 2H20v20L13 17H6.5a2.5 2.5 0 010-5" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#d4a574] transition-colors duration-300">Share Story</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                <button className="group/btn relative bg-[#d4a574] hover:bg-[#c49660] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black overflow-hidden">
                  <span className="relative z-10">Share with us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c49660] to-[#d4a574] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Content Section */}
      <section className="py-12 sm:py-14 md:py-16 relative bg-black/10 content-visibility-auto">
        <div className="container mx-auto px-4 sm:px-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Feature content</h2>
            <Link to="#" className="text-[#d4a574] hover:text-[#c49660] flex items-center">
              View more
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
            </Link>
          </div>
          <p className="text-gray-400 mb-6 sm:mb-10 md:mb-12">Lorem ipsum dolor sit amet adipiscing elit.</p>
          
          {/* Grid to match mockup: honeycomb 5 then 4 with row offset (full-bleed) */}
          <div className="relative full-bleed px-2 sm:px-4 md:px-8 overflow-hidden">
            {/* Row 1: 5 hexagons with edge ghosts bleeding out */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-3 lg:gap-5 mb-4 sm:mb-6 lg:mb-8 mx-[-64px] sm:mx-[-120px] md:mx-[-140px] overflow-x-auto sm:overflow-visible snap-x">
              <HexagonalCard ghost className="opacity-30" />
              <HexagonalCard 
                title="Old City Jerusalem" 
                author="true" 
                date="true" 
                backgroundImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg/960px-Dome_of_the_Rock_seen_from_the_Mount_of_Olives_%2812395649153%29_%28cropped%29.jpg"
              />
              <HexagonalCard 
                title="Olive Trees Heritage" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1566737236500-c8ac43014a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Traditional Arts" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Cultural Stories" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Seafaring Memory" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard ghost className="opacity-30" />
            </div>

            {/* Row 2: 4 hexagons, horizontally offset for honeycomb with edge ghosts */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-3 lg:gap-5 md:translate-x-14 sm:translate-x-10 translate-x-6 sm:translate-x-8 mx-[-64px] sm:mx-[-120px] md:mx-[-140px] overflow-x-auto sm:overflow-visible snap-x">
              <HexagonalCard ghost className="opacity-30" />
              <HexagonalCard 
                title="Historic Architecture" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Mediterranean Coast" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Desert Landscapes" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard 
                title="Ancient Paths" 
                author="true" 
                date="true" 
                backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <HexagonalCard ghost className="opacity-30" />
            </div>
            
          </div>
          </div>
        </section>

      {/* Collections Section */}
      <section className="py-12 sm:py-14 md:py-16 relative bg-black/20 content-visibility-auto">
        <div className="container mx-auto px-4 sm:px-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Collections</h2>
            <Link to="#" className="text-[#d4a574] hover:text-[#c49660] flex items-center">
              View more
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <p className="text-gray-400 mb-6 sm:mb-10 md:mb-12">Lorem ipsum dolor sit amet adipiscing elit.</p>
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex justify-start items-center gap-4 sm:gap-6 md:gap-8 flex-nowrap overflow-x-auto hide-scrollbar px-1 snap-x">
              <HexagonalCard articles="12 articles" variant="tall" backgroundImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard articles="24 articles" variant="tall" backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard articles="8 articles" variant="tall" backgroundImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard articles="6 articles" variant="tall" backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard articles="16 articles" variant="tall" backgroundImage="https://images.unsplash.com/photo-1566737236500-c8ac43014a8f?auto=format&fit=crop&w=800&q=80" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Section - 5-5-5-5-5-5 honeycomb with alternating offsets */}
      <section className="py-16 relative bg-black/30 content-visibility-auto">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Latest content</h2>
            <Link to="#" className="text-[#d4a574] hover:text-[#c49660] flex items-center">
              View more
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
            </Link>
              </div>
          <p className="text-gray-400 mb-12">Lorem ipsum dolor sit amet adipiscing elit.</p>
          
          {/* Modern Latest Content Grid (two rows: 5 then 4) */}
          <div className="relative full-bleed px-4 md:px-8 overflow-hidden">
            {/* Row 1: 5 hexagons with edge ghosts */}
            <div className="flex justify-center items-center gap-4 lg:gap-5 mb-8 lg:mb-10 mx-[-110px] sm:mx-[-120px] md:mx-[-140px]">
              <HexagonalCard ghost className="opacity-30" />
              <HexagonalCard title="Gaza Seashore Stories" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Bethlehem Artisans" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Ramallah Youth" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Nablus Heritage" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Al-Quds Stories" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard ghost className="opacity-30" />
            </div>

            {/* Row 2: 4 hexagons, offset with edge ghosts */}
            <div className="flex justify-center items-center gap-4 lg:gap-5 md:translate-x-14 sm:translate-x-10 translate-x-8 mx-[-110px] sm:mx-[-120px] md:mx-[-140px]">
              <HexagonalCard ghost className="opacity-30" />
              <HexagonalCard title="Hebron Glasswork" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Jericho Oasis" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1566737236500-c8ac43014a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard title="Jerusalem Quarters" author="true" date="true" backgroundImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" />
              <HexagonalCard ghost className="opacity-30" />
            </div>
          </div>
          </div>
        </section>

        {/* Share Your Story Section - simplified */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2"/>
                <path d="M6.5 2H20v20L13 17H6.5a2.5 2.5 0 010-5" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Share your story</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Every story matters. Help us preserve the collective memory by contributing your personal experiences, testimonies, or knowledge of historical events.</p>
            <button className="group relative bg-[#d4a574] hover:bg-[#c49660] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 focus:ring-offset-black overflow-hidden">
              <span className="relative z-10">Contribute Now!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c49660] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </section>
        
        {/* Footer Section */}
        <footer className="bg-[#0a0a0a] text-white/70 py-16 mt-20 border-t border-white/10 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#d4a574] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#d4a574] rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo and description */}
              <div className="col-span-1 md:col-span-1 group">
                <Link to="/" className="flex items-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://i.imgur.com/bwdY3iU.png" 
                    alt="Trace of the Tides Logo" 
                    className="w-12 h-12 mr-3 group-hover:rotate-12 transition-transform duration-500"
                  />
                  <h3 className="text-2xl font-['Sora',Helvetica] text-white group-hover:text-[#d4a574] transition-colors duration-300">Trace of the Tides</h3>
                </Link>
                <p className="text-base text-white/70 mb-8 leading-relaxed">
                  Preserving our collective memory through stories, testimonies, and cultural artifacts that connect us across time and space.
                </p>
                
                {/* Enhanced social links */}
                <div className="flex space-x-6">
                  <a href="#" className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300 hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300 hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                      <path d="M23 3A10.9 10.9 0 0 1 20.1 4.3A4.48 4.48 0 0 0 22.46 2A9 9 0 0 1 19.36 3.48A4.5 4.5 0 0 0 12.93 8V9A10.7 10.7 0 0 1 3 4S-1 13 8 17A11.64 11.64 0 0 1 1 19C10 24 21 19 21 9A4.5 4.5 0 0 0 20.85 7.5A7.72 7.72 0 0 0 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="#" className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-all duration-300 hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 21L12 17L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Programs */}
              <div className="col-span-1">
                <h4 className="text-white font-bold mb-6 text-lg relative">
                  Programs
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#d4a574] mt-2"></div>
                </h4>
                <ul className="space-y-4">
                  <li><Link to="/coast" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Coast
                  </Link></li>
                  <li><Link to="/programs/boat" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Boat
                  </Link></li>
                  <li><Link to="/programs/azure" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Azure
                  </Link></li>
                  <li><Link to="/programs/commons" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Commons
                  </Link></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div className="col-span-1">
                <h4 className="text-white font-bold mb-6 text-lg relative">
                  Resources
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#d4a574] mt-2"></div>
                </h4>
                <ul className="space-y-4">
                  <li><Link to="/symbols" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Symbols
                  </Link></li>
                  <li><Link to="/archives" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Archives
                  </Link></li>
                  <li><Link to="/contribute" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Contribute
                  </Link></li>
                  <li><Link to="/maps" className="group flex items-center hover:text-white transition-all duration-300 hover:translate-x-2">
                    <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full mr-3 group-hover:bg-[#d4a574] transition-colors duration-300"></span>
                    Maps
                  </Link></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div className="col-span-1">
                <h4 className="text-white font-bold mb-6 text-lg relative">
                  Contact
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#d4a574] mt-2"></div>
                </h4>
                <ul className="space-y-4 mb-8">
                  <li className="group flex items-center hover:text-white transition-colors duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#d4a574] group-hover:scale-110 transition-transform duration-300">
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm">info@traceofthetides.org</span>
                  </li>
                  <li className="group flex items-center hover:text-white transition-colors duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#d4a574] group-hover:scale-110 transition-transform duration-300">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 12 1A9 9 0 0 1 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span className="text-sm">Palestine</span>
                  </li>
                </ul>
                
                <div className="space-y-4">
                  <button className="w-full group bg-white/10 hover:bg-[#d4a574] text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg">
                    <span className="flex items-center justify-center">
                      Subscribe to Newsletter
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white/50 mb-4 md:mb-0">
                © {new Date().getFullYear()} Trace of the Tides. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-white/50 hover:text-[#d4a574] text-sm transition-colors duration-300 relative group">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/terms" className="text-white/50 hover:text-[#d4a574] text-sm transition-colors duration-300 relative group">
                  Terms of Service
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4a574] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
};
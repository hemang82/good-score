export default function Cta() {
  return (
    <section id="download" className="relative py-8 md:py-12 bg-bg-light overflow-hidden">
      
      {/* Background Magic */}
      <div className="absolute inset-0 bg-dark-green mix-blend-multiply opacity-[0.02]" />
      <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -left-40 -top-40 w-[500px] h-[500px] bg-[#2F9E44]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center lg:text-left reveal">
          <span className="inline-flex items-center gap-2 bg-white text-dark-green border border-border-light text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-green"></span>
            </span>
            Available Now
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-green tracking-tight mb-6 leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-green to-dark-green">Improve Your Score?</span>
          </h2>
          
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
            Join 100,000+ users who are actively boosting their credit scores, managing debts smarter, and unlocking premium financial opportunities with UPSCORE.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-4">
              <img className="w-12 h-12 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="User" />
              <img className="w-12 h-12 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="User" />
              <img className="w-12 h-12 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="User" />
              <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-dark-green font-bold text-xs flex items-center justify-center shadow-sm">
                10k+
              </div>
            </div>
            <div className="text-left text-sm">
              <div className="flex gap-1 text-[#FFA825] text-lg">★★★★★</div>
              <span className="font-bold text-dark-green">4.9/5 Rating</span> from users
            </div>
          </div>
        </div>

        {/* Right Side: Download Card */}
        <div className="flex-1 w-full max-w-md reveal perspective-1000">
          <div className="bg-dark-green rounded-[32px] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(1,68,33,0.4)] relative overflow-hidden transform lg:rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-700">
            
            {/* Glowing orb behind the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-[#A3D129] flex items-center justify-center mb-8 shadow-lg shadow-primary/30 animate-float-1">
                <span className="text-3xl font-black text-dark-green">GS</span>
              </div>
              
              <h4 className="text-2xl font-black text-white mb-3">Download UPSCORE</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-10">Get instant, free access to your credit report, personalized task lists, and daily score updates.</p>
              
              <div className="flex flex-col gap-4 w-full">
                {/* App Store Button */}
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105 w-full flex justify-center">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-14 w-auto" />
                </a>

                {/* Google Play Button */}
                <a href="#" className="transition-transform duration-300 hover:scale-105 w-full flex justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[4.2rem] w-auto -mt-1" />
                </a>
                .
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

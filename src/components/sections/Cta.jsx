export default function Cta() {
  return (
    <section id="download" className="relative py-20 md:py-32 bg-bg-light overflow-hidden">
      
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
                <a href="#" className="group bg-white/10 hover:bg-white text-white hover:text-dark-green flex items-center justify-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white w-full">
                  <svg className="h-8 w-8 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.57 2.98-1.41z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Download on the</p>
                    <p className="text-lg font-black -mt-1">App Store</p>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="group bg-white/10 hover:bg-white text-white hover:text-dark-green flex items-center justify-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white w-full">
                  <svg className="h-8 w-8 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M5 3.25c-.28 0-.5.22-.5.5v16.5c0 .28.22.5.5.5.12 0 .23-.04.33-.12L12.5 14.3l-2.44-2.44-5.06-5.06L5.33 3.37c-.1-.08-.21-.12-.33-.12m9-.05l-2.88 2.88 5.13 5.13L19.5 9.1c.33-.33.33-.88 0-1.21l-5.5-5.5c-.22-.22-.44-.33-.7-.33-.1 0-.2.02-.3.05M5.63 21.05l7.7-7.7 2.88 2.88-9.25 9.25c-.27.27-.72.27-.99 0-.22-.22-.34-.52-.34-.82v-3.61zM14.5 12l5 5-2.88 2.88-5-5L14.5 12z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Get it on</p>
                    <p className="text-lg font-black -mt-1">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

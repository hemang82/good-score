export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 lg:py-12 flex flex-col lg:flex-row items-center gap-12 overflow-visible">
      
      {/* Hero Left Side */}
      <div className="flex-1 text-center lg:text-left reveal active">
        <div className="inline-flex items-center gap-2 bg-[#E1F7B5] border border-[#BDEB70] px-4 py-1.5 rounded-full text-xs font-bold text-dark-green tracking-wide mb-6 uppercase shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-green" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          #1 Credit Score Improvement App
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-dark-green leading-[1.1] mb-6 tracking-tight">
          Improve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-green to-dark-green">Credit Score</span> Smarter & Faster
        </h1>

        <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
          Monitor your credit health, receive personalized improvement plans, download detailed reports, and unlock better financial opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a href="#download" className="w-full sm:w-auto bg-dark-green hover:bg-[#023118] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-center">
            Check My Score
          </a>
          <a href="#download" className="w-full sm:w-auto text-center border-2 border-border-light bg-white text-dark-green hover:border-dark-green font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1">
            Download App
          </a>
        </div>
      </div>

      {/* Hero Right Side: Dynamic Mobile Mockups */}
      <div className="flex-1 relative w-full flex justify-center items-center py-12 lg:py-0 min-h-[450px] md:min-h-[550px] reveal active perspective-1000">

        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 blur-[100px] z-0 animate-pulse" />

        {/* Main Phone Mockup */}
        <div className="relative z-10 w-[240px] md:w-[280px] aspect-[9/18.5] bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border-8 border-dark-green overflow-hidden transform -rotate-6 translate-x-4 md:translate-x-8 hover:rotate-0 transition-transform duration-500">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-dark-green rounded-b-xl z-20 flex items-center justify-center">
            <div className="w-10 h-1.5 bg-[#ffffff30] rounded-full" />
          </div>

          <div className="w-full h-full bg-bg-light pt-6 flex flex-col">
            <div className="px-4 py-3 flex items-center justify-between border-b border-border-light bg-white">
              <span className="text-sm font-black text-dark-green tracking-wider uppercase">UPSCORE</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-secondary-green rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
              </div>
            </div>

            <div className="p-4 bg-white m-4 rounded-[20px] border border-border-light shadow-sm flex flex-col items-center">
              <span className="text-[10px] text-text-secondary font-bold tracking-widest uppercase">Your Credit Score</span>

              <div className="relative w-32 h-20 mt-3 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E5E5" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#hero-gauge-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset="15" className="animate-[dash_2s_ease-out_forwards]" />
                  <defs>
                    <linearGradient id="hero-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5D5D" />
                      <stop offset="50%" stopColor="#FFA825" />
                      <stop offset="100%" stopColor="#2F9E44" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-1 flex flex-col items-center">
                  <span className="text-3xl font-black text-dark-green leading-none">812</span>
                  <span className="text-[9px] text-secondary-green font-bold uppercase tracking-wider bg-secondary-green/10 px-2 py-0.5 rounded-full mt-1">Excellent</span>
                </div>
              </div>
            </div>

            <div className="mx-4 p-4 bg-white rounded-[20px] border border-border-light shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-dark-green flex items-center gap-2"><span className="text-lg">💳</span> HDFC Card</span>
                <span className="bg-[#EAF9EC] text-secondary-green text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Active</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-text-secondary font-medium">
                  <span>Utilization</span>
                  <span className="font-bold text-dark-green">35.7%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-green rounded-full" style={{width: '35.7%'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute left-[-20px] top-[40px] md:top-[60px] z-30 bg-white shadow-xl border border-border-light rounded-[16px] p-4 flex items-center gap-3 animate-float-1">
          <div className="w-12 h-12 rounded-full bg-[#EBFCE6] flex items-center justify-center text-secondary-green font-bold text-lg">
            ✓
          </div>
          <div>
            <h4 className="text-sm font-bold text-dark-green">Credit Score 812</h4>
            <p className="text-xs text-text-secondary">Excellent Rating</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default function ExpertGuidance() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 reveal">
      <div className="bg-dark-green rounded-[32px] p-8 md:p-12 lg:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
        
        {/* Abstract Background Shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-[80px] top-[-100px] right-[-100px] pointer-events-none" />
        <div className="absolute w-80 h-80 rounded-full bg-[#2F9E44]/30 blur-[80px] bottom-[-100px] left-[-100px] pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        {/* Copy Column */}
        <div className="flex-[1.2] space-y-6 text-center lg:text-left relative z-10">
          <span className="inline-block bg-primary/10 text-primary border border-primary/30 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Direct Advisor Support
          </span>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Need Expert <span className="text-primary">Guidance?</span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Connect with UPSCORE certified experts and get professional, 1-on-1 assistance to resolve deep credit issues, clean complex histories, and rapidly improve your overall credit profile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button className="bg-primary hover:bg-white text-dark-green font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(199,240,65,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1">
              Start Live Chat
            </button>
            <button className="border-2 border-white/20 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
              Book Consultation
            </button>
          </div>
        </div>

        {/* Mockup Advisor Badge */}
        <div className="flex-1 w-full flex justify-center relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[24px] p-8 w-full max-w-sm flex flex-col items-center gap-5 text-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500">

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary-green rounded-full blur-md opacity-50 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full border-4 border-primary bg-bg-light overflow-hidden flex items-center justify-center">
                <span className="text-5xl">👨‍💼</span>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary-green border-2 border-dark-green rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-xl">Rahul Sharma</h4>
              <p className="text-primary text-xs uppercase font-black tracking-widest mt-1">Senior Credit Advisor</p>
            </div>

            <div className="flex gap-2 text-xs text-primary font-bold bg-black/30 px-4 py-2 rounded-full border border-white/10">
              <span className="text-primary tracking-widest text-sm">★★★★★</span>
              <span className="text-white">4.9/5</span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed italic border-t border-white/10 pt-5 mt-2">
              "We have successfully helped over 10,000+ users identify duplicate loan files and dispute wrong bureau records."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

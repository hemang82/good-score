export default function Testimonials() {
  const testimonials = [
    {
      initials: "AM",
      name: "Ananya Mishra",
      sub: "Score Improved by 130 pts",
      text: "My credit score increased from 640 to 770 in just 4 months. Following the action tasks checklist worked exactly as promised. Absolute game-changer!"
    },
    {
      initials: "VP",
      name: "Vikram Patel",
      sub: "Dispute Resolved successfully",
      text: "The credit report audit flagged a duplicate auto loan account I didn't recognize. Using the draft dispute generator, I had it removed, saving my score."
    },
    {
      initials: "RN",
      name: "Rohan Nair",
      sub: "Score Improved to 812",
      text: "Personalized plan structures are extremely clear and doable. It pointed out my high credit utilization details that standard bank apps never showed."
    }
  ];

  return (
    <section className="bg-white py-8 md:py-12 border-y border-border-light relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-bg-light text-dark-green font-bold text-xs tracking-wider uppercase mb-4 border border-border-light">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
            What Our Users Say
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Read real stories from people who took back control of their financial profile through UPSCORE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border-2 border-border-light rounded-[24px] p-8 flex flex-col justify-between gap-8 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 relative group">
              
              <div className="absolute top-0 right-8 transform -translate-y-1/2 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ”
              </div>

              <div className="space-y-6">
                <div className="text-primary text-xl font-black tracking-widest">★★★★★</div>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-border-light pt-6">
                <div className="w-12 h-12 rounded-full bg-dark-green flex items-center justify-center font-bold text-white text-sm shadow-inner group-hover:bg-secondary-green transition-colors">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-base font-black text-dark-green">{t.name}</h4>
                  <p className="text-xs text-secondary-green font-bold tracking-wide uppercase mt-0.5">{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

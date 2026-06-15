export default function HowItWorks() {
  const steps = [
    {
      title: "Check Your Score",
      desc: "Initialize your UPSCORE profile. We pull your latest files from top bureaus securely without impacting your score.",
      icon: "1"
    },
    {
      title: "Get Personalized Plan",
      desc: "Our AI engine checks your historical limits, debts, and errors to structure a custom score improvement guide.",
      icon: "2"
    },
    {
      title: "Complete Recommended Tasks",
      desc: "Log into the app daily and check off items like clearing high utilization values or correcting reporting errors.",
      icon: "3"
    },
    {
      title: "Track Progress",
      desc: "Review live charts showing score increases, limit improvements, active cards, and clean payment tracks.",
      icon: "4"
    },
    {
      title: "Increase Credit Score",
      desc: "Reach your target score of 750+ or higher, opening access to high-tier premium rewards credit cards and low rates.",
      icon: "5"
    }
  ];

  return (
    <section id="how-it-works" className="bg-bg-light py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-secondary-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-secondary-green font-bold text-xs tracking-wider uppercase mb-4 border border-border-light shadow-sm">Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Improving your score is a structured process. Here is the step-by-step journey we take you through to guarantee results.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto reveal">
          {/* Animated center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary-green to-primary opacity-30 transform md:-translate-x-1/2 rounded-full" />

          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 group`}>
              
              {/* Left Content (or empty for alternating) */}
              <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left md:order-3'} relative`}>
                <div className={`bg-white p-6 md:p-8 rounded-[24px] border border-border-light shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 relative ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  {/* Small connector line to the dot */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-px bg-border-light group-hover:bg-secondary-green transition-colors ${idx % 2 === 0 ? '-right-8' : '-left-8'}`} />
                  
                  <h3 className="text-xl md:text-2xl font-bold text-dark-green mb-3 group-hover:text-secondary-green transition-colors">
                    Step {step.icon}: {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className={`absolute left-0 md:left-1/2 top-6 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-primary flex items-center justify-center font-black text-xl text-dark-green z-10 group-hover:bg-primary group-hover:scale-110 group-hover:text-secondary-green transition-all duration-300 shadow-md ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                {step.icon}
              </div>

              {/* Empty Space for alignment */}
              <div className={`hidden md:block w-[45%] ${idx % 2 !== 0 ? 'md:order-1' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

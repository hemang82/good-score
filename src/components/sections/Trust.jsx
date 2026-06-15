export default function Trust() {
  const stats = [
    { target: "100,000+", label: "Active App Users", suffix: "" },
    { target: "50,000+", label: "Reports Generated", suffix: "" },
    { target: "4.8", label: "App Rating (Play/iOS)", icon: "★", highlight: true },
    { target: "99%", label: "User Satisfaction", suffix: "" }
  ];

  return (
    <section className="bg-bg-light py-12 md:py-20 border-y border-border-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-xs font-black uppercase tracking-widest text-secondary-green mb-12 reveal flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-border-light" />
          Trusted By Thousands Of Users
          <span className="w-12 h-px bg-border-light" />
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 reveal">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-8 rounded-[24px] bg-white border border-border-light shadow-sm hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-black text-dark-green mb-3 flex items-center justify-center group-hover:text-secondary-green transition-colors">
                <span>{stat.target}</span>
                {stat.icon && <span className="text-primary text-3xl ml-1">{stat.icon}</span>}
              </div>
              <span className="text-xs md:text-sm text-text-secondary font-bold tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

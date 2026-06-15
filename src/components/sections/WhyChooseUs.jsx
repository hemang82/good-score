export default function WhyChooseUs() {
  const comparisons = [
    {
      feature: "Monitoring Updates",
      without: "Manual checks once a year (often costs money)",
      with: "Real-time daily alerts, absolutely free"
    },
    {
      feature: "Personalized Reports",
      without: "Hard-to-read PDF text tables and sheets",
      with: "Interactive charts and dynamic card categories"
    },
    {
      feature: "Dispute Filing",
      without: "Write manual complaint letters to bureaus",
      with: "One-click draft generators, automated submissions"
    },
    {
      feature: "Expert Guidance",
      without: "Costly advisors or confusing forum checks",
      with: "On-demand chats with certified credit advisors"
    },
    {
      feature: "Improvement Progress",
      without: "No tracking or checklist guidelines",
      with: "Dynamic interactive task tracks and live indicators"
    }
  ];

  return (
    <section className="bg-white max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-green/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="text-center max-w-2xl mx-auto mb-16 reveal">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-dark-green font-bold text-xs tracking-wider uppercase mb-4 border border-primary/30">The Advantage</span>
        <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
          Why Choose UPSCORE?
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          See exactly how managing your finances with UPSCORE makes a massive difference compared to standard manual checks.
        </p>
      </div>

      <div className="overflow-hidden rounded-[24px] border-2 border-border-light shadow-xl bg-white reveal max-w-5xl mx-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="p-6 md:p-8 text-sm font-bold text-dark-green uppercase tracking-wider w-1/3 bg-bg-light border-b-2 border-border-light">Feature Details</th>
              <th className="p-6 md:p-8 text-sm font-bold text-[#EA5E5E] uppercase tracking-wider w-1/3 bg-red-50/50 border-b-2 border-red-100 border-l border-border-light">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-lg">✕</span>
                  Without UPSCORE
                </div>
              </th>
              <th className="p-6 md:p-8 text-sm font-bold text-secondary-green uppercase tracking-wider w-1/3 bg-primary/10 border-b-2 border-primary/30 border-l border-border-light">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-secondary-green flex items-center justify-center text-white text-lg">✓</span>
                  With UPSCORE
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light text-sm md:text-base text-text-primary">
            {comparisons.map((row, idx) => (
              <tr key={idx} className="hover:bg-bg-light/50 transition-colors">
                <td className="p-6 md:px-8 md:py-6 font-bold text-dark-green">
                  {row.feature}
                </td>
                <td className="p-6 md:px-8 md:py-6 text-text-secondary bg-red-50/30 border-l border-border-light">
                  {row.without}
                </td>
                <td className="p-6 md:px-8 md:py-6 font-bold text-secondary-green bg-primary/5 border-l border-border-light">
                  {row.with}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function BillPayments() {
  const bills = [
    { name: "Mobile Prepaid", icon: "📱" },
    { name: "Broadband", icon: "🌐" },
    { name: "Cable TV", icon: "📺" },
    { name: "Credit Card", icon: "💳" },
    { name: "DTH", icon: "📡" },
    { name: "Echallan", icon: "🧾" },
    { name: "Education Fee", icon: "🎓" },
    { name: "Electricity", icon: "⚡" },
    { name: "EV Recharge", icon: "🔋" },
    { name: "FASTag", icon: "🚗" },
    { name: "Gas Line", icon: "🔥" },
    { name: "Insurance", icon: "🛡️" },
    { name: "Loan Repay", icon: "🏦" },
    { name: "LPG Gas", icon: "🛢️" },
    { name: "Water Bill", icon: "💧" }
  ];

  return (
    <section id="bill-payments" className="bg-white max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-green/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto mb-16 reveal">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-dark-green font-bold text-xs tracking-wider uppercase mb-4 border border-primary/30">Utility Management</span>
        <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
          Pay Bills & Protect Your Score
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          Paying your utility bills on time is the single easiest way to construct a perfect payment record. Pay directly through UPSCORE to guarantee credit boosts.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 reveal">
        {bills.map((bill, idx) => (
          <a key={idx} href="#download" className="group relative bg-white p-6 rounded-[24px] border border-border-light shadow-sm hover:shadow-xl hover:border-secondary-green/50 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center gap-4 overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="w-14 h-14 rounded-full bg-bg-light text-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 z-10">
              {bill.icon}
            </div>
            
            <span className="text-sm font-bold text-dark-green text-center leading-tight z-10 group-hover:text-secondary-green transition-colors">
              {bill.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

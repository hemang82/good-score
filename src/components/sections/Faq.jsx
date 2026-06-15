"use client";
import React, { useState } from 'react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is UPSCORE?",
      a: "UPSCORE is a premium credit management and score improvement platform. We securely analyze your credit histories, flag bureau reporting errors, and compile personalized step plans to build your financial standing rapidly."
    },
    {
      q: "How often can I check my score?",
      a: "You can check your score as many times as you like. We pull your logs as a \"soft inquiry,\" meaning it has absolutely zero negative impact on your actual score calculation."
    },
    {
      q: "How does score improvement work?",
      a: "Our AI analyzes critical score criteria—such as payment records, age of accounts, and utilization percentages. We then list specific actionable tasks like adjusting bill schedules or filing error corrections to boost your rating step by step."
    },
    {
      q: "Can I raise disputes directly?",
      a: "Yes! UPSCORE provides smart template drafts that sync directly with Credit Bureaus, making filing error reports simple, fast, and completely error-free."
    },
    {
      q: "Is my data secure on UPSCORE?",
      a: "Absolutely. We utilize bank-grade 256-bit AES encryption alongside strict OAuth authorization models, ensuring your financial information remains fully private, encrypted, and protected at all times."
    }
  ];

  return (
    <section className="bg-bg-light py-20 md:py-24 border-y border-border-light relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-dark-green font-bold text-xs tracking-wider uppercase mb-4 border border-border-light shadow-sm">Help Center</span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the product, billing, security, and how we help you reach a 750+ score.
          </p>
        </div>

        <div className="space-y-4 reveal">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm ${openIdx === idx ? 'border-secondary-green ring-4 ring-primary/20' : 'border-border-light hover:border-primary'}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <span className={`font-bold text-base md:text-lg transition-colors ${openIdx === idx ? 'text-secondary-green' : 'text-dark-green'}`}>
                  {faq.q}
                </span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0 ${openIdx === idx ? 'bg-secondary-green text-white rotate-180 shadow-md' : 'bg-bg-light text-text-secondary'}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIdx === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-0 text-text-secondary text-sm md:text-base leading-relaxed border-t border-border-light/50 mt-2">
                  <p className="pt-4">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            Still have questions? <a href="#" className="font-bold text-secondary-green hover:underline">Chat with our support team</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

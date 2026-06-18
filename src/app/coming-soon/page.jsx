"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(300);

  // Animate the credit score counting up on load
  useEffect(() => {
    const endScore = 812;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function outQuad
      const easedProgress = progress * (2 - progress);
      const currentScore = Math.floor(300 + easedProgress * (endScore - 300));
      
      setScore(currentScore);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const previewFeatures = [
    {
      title: "Real-time Bureau Sync",
      desc: "Instant daily refreshes connecting with prime credit bureaus to monitor alerts.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
        </svg>
      )
    },
    {
      title: "AI Dispute Auto-Filing",
      desc: "Intelligently draft and file error corrections to credit bureaus in seconds.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Smart Credit Warnings",
      desc: "Smart alerts keeping your credit utilization safely under the 30% limit rule.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Expert Consulting",
      desc: "One-on-one instant chats with certified advisors to resolve complicated histories.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-bg-light text-text-primary overflow-hidden flex flex-col justify-between py-12 px-6">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] aspect-square rounded-full bg-secondary-green/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />

      {/* Header Logo */}
      <header className="max-w-7xl mx-auto w-full flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-dark-green transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <span className="text-xl font-black text-dark-green tracking-wider uppercase">UPSCORE</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 my-auto z-10">
        
        {/* Left Side: Text and Form */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-dark-green font-bold text-xs tracking-wider uppercase border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-secondary-green animate-ping" />
            Mobile App Coming Soon
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-green leading-[1.15] tracking-tight">
            Elevate Your Credit <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-green to-dark-green">On The Go.</span>
          </h1>
          
          <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
            We are wrapping up the official release of our premium mobile application. Join the early-access VIP list to track reports, auto-file disputes, and build a 750+ score.
          </p>

          {/* Early Access Form */}
          <div className="max-w-md mx-auto lg:mx-0 pt-4">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="flex-1 px-5 py-4 rounded-full border border-border-light bg-white focus:outline-none focus:border-dark-green focus:ring-4 focus:ring-dark-green/10 transition-all text-sm placeholder:text-text-secondary/60"
                />
                <button 
                  type="submit" 
                  className="bg-dark-green hover:bg-[#023118] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center text-sm cursor-pointer whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </form>
            ) : (
              <div className="bg-primary/20 border border-primary/30 rounded-2xl p-5 text-left flex items-start gap-4 animate-fade-in-up">
                <div className="w-10 h-10 rounded-full bg-secondary-green text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-dark-green text-sm md:text-base">You're on the list!</h4>
                  <p className="text-xs text-text-secondary mt-1">Thank you for registering. We'll send your exclusive invite link as soon as we launch.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Animated Credit Score Dial */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-md">
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-[40px] bg-white border border-border-light shadow-2xl p-8 flex flex-col justify-between items-center relative overflow-hidden">
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <span className="text-[10px] text-text-secondary font-black tracking-widest uppercase z-10">YOUR SCORE UPGRADE</span>
            
            {/* Score Ring Graphic */}
            <div className="relative w-44 h-44 flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Track Circle */}
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  stroke="#E5E5E5" 
                  strokeWidth="10" 
                  fill="transparent" 
                  strokeDasharray="465"
                  strokeDashoffset="116" // Half-circle (gauge) look
                  strokeLinecap="round"
                />
                {/* Foreground Active Circle */}
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  stroke="#2F9E44" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray="465"
                  // Mapping 300-900 onto the gauge
                  strokeDashoffset={465 - (349 * ((score - 300) / 600))}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-out"
                />
              </svg>
              {/* Score Display Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-dark-green leading-none">{score}</span>
                <span className="text-[10px] text-secondary-green font-bold uppercase tracking-wider bg-secondary-green/10 px-2.5 py-0.5 rounded-full mt-2">
                  Excellent
                </span>
              </div>
            </div>

            <div className="text-center space-y-1 z-10">
              <h4 className="font-bold text-dark-green text-sm">UPSCORE Mobile Dashboard</h4>
              <p className="text-[11px] text-text-secondary">Simulated early interface build v0.8.2</p>
            </div>
          </div>
        </div>

      </main>

      {/* Feature Preview Section */}
      <section className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-8 z-10">
        {previewFeatures.map((feat, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-border-light/60 hover:border-primary/50 hover:shadow-premium transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 text-dark-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h4 className="font-bold text-dark-green text-sm mb-2">{feat.title}</h4>
            <p className="text-text-secondary text-xs leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-text-secondary mt-8">
        © 2026 UPSCORE Technologies Pvt. Ltd. All rights reserved. Secure bank-grade 256-bit AES encryption.
      </footer>
    </div>
  );
}

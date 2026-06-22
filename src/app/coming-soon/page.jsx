"use client";

import React from 'react';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-bg-light text-text-primary flex flex-col items-center justify-center py-12 px-6">

      {/* Soft Decorative Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-green/5 blur-[120px] pointer-events-none -z-10" />

      {/* Main Card */}
      <div className="max-w-md w-full bg-white border border-border-light rounded-premium p-8 md:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Animated Feature Icon */}
        <div className="w-20 h-20 rounded-3xl bg-primary/20 text-dark-green flex items-center justify-center mx-auto shadow-md">
          <svg className="w-10 h-10 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ animationDuration: '8s' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-dark-green font-bold text-[10px] tracking-widest uppercase border border-primary/30">
            Work in Progress
          </span>
          <h1 className="text-3xl font-black text-dark-green tracking-tight">
            Feature Coming Soon
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm mx-auto">
            We're working on this feature right now to make it awesome for you! It'll be ready in our next update .
          </p>
        </div>

      </div>

      {/* Footer Text */}
      <footer className="text-center text-[11px] text-text-secondary mt-8 max-w-xs leading-relaxed">
        © 2026 Tracewave Transparency PVT LTD. All rights reserved.
      </footer>

    </div>
  );
}

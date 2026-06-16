"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav py-3" : "bg-transparent border-b border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center focus:outline-none">
            <img src="/upscore-logo.png" alt="UPSCORE" className="h-6 md:h-8 w-auto" />
          </Link>

          {/* Desktop Nav Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-text-primary">
            <a href="/" className="nav-link transition-colors hover:text-dark-green py-2">Home</a>
            <a href="/#features" className="nav-link transition-colors hover:text-dark-green py-2">Features</a>
            <a href="/#how-it-works" className="nav-link transition-colors hover:text-dark-green py-2">How It Works</a>
            <a href="/#credit-report" className="nav-link transition-colors hover:text-dark-green py-2">Credit Report</a>
            <a href="/#bill-payments" className="nav-link transition-colors hover:text-dark-green py-2">Bill Payments</a>
            <a href="/#improvement-plan" className="nav-link transition-colors hover:text-dark-green py-2">Improvement Plan</a>
          </nav>

          {/* Header CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a href="/#download" className="bg-primary hover:bg-opacity-95 text-dark-green font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 pulse-button-ring shadow-md hover:scale-[1.02] active:scale-[0.98] text-center">
              Download App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-dark-green p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border-light shadow-xl py-6 px-8 flex flex-col gap-5 text-base font-semibold text-text-primary transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <a href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Home</a>
          <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Features</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">How It Works</a>
          <a href="/#credit-report" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Credit Report</a>
          <a href="/#bill-payments" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Bill Payments</a>
          <a href="/#improvement-plan" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Improvement Plan</a>
          <a href="/#download" onClick={() => setMobileMenuOpen(false)} className="w-full bg-primary hover:bg-opacity-95 text-dark-green font-bold text-center py-3.5 rounded-full transition-all duration-300 mt-2 block">
            Download App
          </a>
        </div>
      </header>

      {/* Padding to prevent content clip under sticky header */}
      <div className="h-24"></div>
    </>
  );
}

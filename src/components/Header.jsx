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
            <svg className="h-12 w-auto" viewBox="0 0 400 75" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="45" y="46" fontFamily="'Playfair Display', 'Georgia', serif" fontSize="34" fontWeight="900" fill="#0C2340" letterSpacing="1">GOOD</text>
              <g transform="translate(20, 0)">
                <path d="M 152 46 A 28 28 0 0 1 180 18 L 180 26 A 20 20 0 0 0 160 46 Z" fill="#1b5e3a" />
                <path d="M 180 18 A 28 28 0 0 1 208 46 L 200 46 A 20 20 0 0 0 180 26 Z" fill="#2f9e44" />
                <circle cx="180" cy="43" r="4.5" fill="#1b5e3a" />
                <path d="M 178 44 L 199 21 L 182.5 40 Z" fill="#0C2340" />
              </g>
              <text x="245" y="46" fontFamily="'Playfair Display', 'Georgia', serif" fontSize="34" fontWeight="900" fill="#0C2340" letterSpacing="1">SCORE</text>
              <text x="200" y="66" fontFamily="'Inter', sans-serif" fontSize="9.5" fontWeight="600" fill="#5A6A80" textAnchor="middle" letterSpacing="0.5">Personal Finance Indicator</text>
            </svg>
          </Link>

          {/* Desktop Nav Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-text-primary">
            <Link href="/" className="nav-link transition-colors hover:text-dark-green py-2">Home</Link>
            <Link href="/#features" className="nav-link transition-colors hover:text-dark-green py-2">Features</Link>
            <Link href="/#credit-report" className="nav-link transition-colors hover:text-dark-green py-2">Credit Report</Link>
            <Link href="/#improvement-plan" className="nav-link transition-colors hover:text-dark-green py-2">Improvement Plan</Link>
            <Link href="/#bill-payments" className="nav-link transition-colors hover:text-dark-green py-2">Bill Payments</Link>
          </nav>

          {/* Header CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/#download" className="bg-primary hover:bg-opacity-95 text-dark-green font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 pulse-button-ring shadow-md hover:scale-[1.02] active:scale-[0.98] text-center">
              Download App
            </Link>
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
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Home</Link>
          <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Features</Link>
          <Link href="/#credit-report" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Credit Report</Link>
          <Link href="/#improvement-plan" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Improvement Plan</Link>
          <Link href="/#bill-payments" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link hover:text-dark-green transition-colors py-1">Bill Payments</Link>
          <Link href="/#download" onClick={() => setMobileMenuOpen(false)} className="w-full bg-primary hover:bg-opacity-95 text-dark-green font-bold text-center py-3.5 rounded-full transition-all duration-300 mt-2 block">
            Download App
          </Link>
        </div>
      </header>

      {/* Padding to prevent content clip under sticky header */}
      <div className="h-24"></div>
    </>
  );
}

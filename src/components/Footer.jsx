import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-light py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        {/* Top Section: Logo, Nav, Socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center focus:outline-none shrink-0">
            <svg className="h-10 w-auto" viewBox="0 0 400 75" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          {/* Center Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs md:text-sm font-semibold text-text-primary">
            <Link href="/" className="hover:text-dark-green transition-colors">Home</Link>
            <Link href="/#features" className="hover:text-dark-green transition-colors">Features</Link>
            <Link href="/#credit-report" className="hover:text-dark-green transition-colors">Credit Report</Link>
            <Link href="/#improvement-plan" className="hover:text-dark-green transition-colors">Improvement Plan</Link>
            <Link href="/#bill-payments" className="hover:text-dark-green transition-colors">Bill Payments</Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-3 shrink-0">
            <a href="#" aria-label="X (formerly Twitter)" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full border-t border-border-light"></div>

        {/* Bottom Section: Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <span>© 2026 GoodScore. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link href="/faq" className="hover:text-dark-green transition-colors">FAQ</Link>
            <Link href="/contact-us" className="hover:text-dark-green transition-colors">Contact Us</Link>
            <Link href="/privacy-policy" className="hover:text-dark-green transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-dark-green transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

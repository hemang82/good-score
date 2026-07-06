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
            <img src="/upscore-logo.png" alt="UPSCORE" className="h-8 w-auto" />
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
            <a href="https://www.facebook.com/profile.php?id=61591698565691" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/upscorecreditscore/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@upscore-b2z" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-secondary hover:border-dark-green hover:text-dark-green hover:bg-gray-50 transition-all duration-200">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full border-t border-border-light"></div>

        {/* Bottom Section: Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <span>© 2026 Tracewave Transparency PVT LTD. All rights reserved.</span>
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

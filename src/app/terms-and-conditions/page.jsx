"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Page() {


  return (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-16">
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      
      {/*  Left Sidebar: Section Index Links (Sticky)  */}
      <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 space-y-4 bg-white border border-border-light rounded-premium p-6 shadow-sm">
        <h3 className="text-sm font-black text-dark-green uppercase tracking-wider mb-4">Contents</h3>
        <nav className="flex flex-col gap-3.5 text-xs md:text-sm font-semibold text-text-secondary">
          <a href="#acceptance" className="hover:text-dark-green transition-colors">1. Acceptance of Terms</a>
          <a href="#eligibility" className="hover:text-dark-green transition-colors">2. User Eligibility</a>
          <a href="#bureau-authorization" className="hover:text-dark-green transition-colors">3. Bureau Authorization</a>
          <a href="#user-obligations" className="hover:text-dark-green transition-colors">4. User Obligations</a>
          <a href="#refund-policy" className="hover:text-dark-green transition-colors">5. Refund & Cancellation</a>
          <a href="#intellectual-property" className="hover:text-dark-green transition-colors">6. Intellectual Property</a>
          <a href="#limitations" className="hover:text-dark-green transition-colors">7. Limitations of Liability</a>
          <a href="#dispute-resolution" className="hover:text-dark-green transition-colors">8. Dispute Resolution</a>
        </nav>
      </aside>

      {/*  Right Panel: Terms Details  */}
      <section className="flex-1 bg-white border border-border-light rounded-premium p-8 md:p-12 shadow-premium space-y-10">
        
        <div className="border-b border-border-light pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-2">Terms & Conditions</h1>
          <p className="text-xs text-text-secondary">Last Updated: June 12, 2026</p>
        </div>

        {/*  Section 1  */}
        <div id="acceptance" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">1. Acceptance of Terms</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            By accessing or using the GoodScore mobile application, website, or associated services, you agree to comply with and be fully bound by these Terms & Conditions. If you do not agree to these terms in their entirety, please do not use our platform.
          </p>
        </div>

        {/*  Section 2  */}
        <div id="eligibility" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">2. User Eligibility</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            You must be at least 18 years of age and a resident of India with a valid Permanent Account Number (PAN) to use the services offered by GoodScore. By using this service, you legally represent and warrant that you meet these eligibility criteria.
          </p>
        </div>

        {/*  Section 3  */}
        <div id="bureau-authorization" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">3. Bureau Authorization</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-3">
            By requesting a credit score check, you explicitly appoint GoodScore as your authorized representative to interact with partner credit bureaus (including CIBIL, Experian, and Equifax) to:
          </p>
          <ul className="space-y-2 text-xs md:text-sm text-text-secondary list-inside">
            <li className="flex items-start gap-2.5">
              <span className="text-secondary-green font-bold">✓</span>
              <span>Query and fetch your credit score and history reports continuously (soft inquiries).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-secondary-green font-bold">✓</span>
              <span>Display active loan lines and credit card utilization records in your app dashboard.</span>
            </li>
          </ul>
        </div>

        {/*  Section 4  */}
        <div id="user-obligations" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">4. User Obligations</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            You agree to provide true, accurate, current, and complete information about yourself as prompted by our registration forms. GoodScore reserves the right to suspend or terminate your account if any information provided is found to be false, fraudulent, or impersonating another individual.
          </p>
        </div>

        {/*  Section 5  */}
        <div id="refund-policy" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">5. Refund & Cancellation</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            While basic credit checks are free, GoodScore offers premium subscription plans. Subscriptions can be canceled at any time. Refunds for premium plans are only processed if requested within 7 days of the initial transaction, provided no premium dispute templates or personalized advisor sessions were utilized.
          </p>
        </div>

        {/*  Section 6  */}
        <div id="intellectual-property" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">6. Intellectual Property</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            All content, brand names, custom UI layouts, graphics, and underlying software code are the exclusive intellectual property of GoodScore. You are strictly prohibited from copying, reverse engineering, modifying, or using these assets for commercial purposes without explicit written permission.
          </p>
        </div>

        {/*  Section 7  */}
        <div id="limitations" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">7. Limitations of Liability</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            GoodScore compiles credit scores directly from rating bureau databases. We act as a technology bridge and do not guarantee the absolute accuracy of bureau records. We are not liable for any credit decisions, loan rejections, or errors reported by third-party financial institutions.
          </p>
        </div>

        {/*  Section 8  */}
        <div id="dispute-resolution" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">8. Dispute Resolution & Governing Law</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of our services shall first be attempted to be resolved via mutual mediation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.
          </p>
        </div>
      </section>
    </div>
  </main>
    </>
  );
}

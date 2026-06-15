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
          <a href="#introduction" className="hover:text-dark-green transition-colors">1. Introduction</a>
          <a href="#information-collection" className="hover:text-dark-green transition-colors">2. Information Collection</a>
          <a href="#data-usage" className="hover:text-dark-green transition-colors">3. How We Use Data</a>
          <a href="#data-sharing" className="hover:text-dark-green transition-colors">4. Data Sharing & Security</a>
          <a href="#cookies" className="hover:text-dark-green transition-colors">5. Cookies & Tracking</a>
          <a href="#user-rights" className="hover:text-dark-green transition-colors">6. Your Data Rights</a>
          <a href="#policy-changes" className="hover:text-dark-green transition-colors">7. Policy Changes</a>
        </nav>
      </aside>

      {/*  Right Panel: Policy Details  */}
      <section className="flex-1 bg-white border border-border-light rounded-premium p-8 md:p-12 shadow-premium space-y-10">
        
        <div className="border-b border-border-light pb-6">
          <h1 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-xs text-text-secondary">Last Updated: June 12, 2026</p>
        </div>

        {/*  Section 1  */}
        <div id="introduction" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">1. Introduction</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            Welcome to GoodScore. We are strongly committed to protecting the privacy, safety, and security of our users' personal and financial information. This Privacy Policy details precisely how we collect, store, secure, process, and manage your credit score profiles and identity registers when you use our website or mobile application.
          </p>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            By accessing GoodScore, you explicitly agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </div>

        {/*  Section 2  */}
        <div id="information-collection" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">2. Information Collection</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-3">
            In order to accurately retrieve your bureau records and generate comprehensive credit dashboards, we collect the following profiles:
          </p>
          <ul className="space-y-2 text-xs md:text-sm text-text-secondary list-inside">
            <li className="flex items-start gap-2.5">
              <span className="text-secondary-green font-bold">✓</span>
              <span><strong>Identity Registers:</strong> Name, Email Address, Phone Number, Date of Birth.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-secondary-green font-bold">✓</span>
              <span><strong>Financial Identifiers:</strong> Permanent Account Number (PAN Card details) necessary exclusively to securely fetch official credit reports from authorized bureaus.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-secondary-green font-bold">✓</span>
              <span><strong>Device Logs:</strong> IP address, device types, browser version, and application usage patterns to improve platform stability.</span>
            </li>
          </ul>
        </div>

        {/*  Section 3  */}
        <div id="data-usage" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">3. How We Use Data</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            The data collected is utilized strictly for the operational functionality of GoodScore. We use your data to:
          </p>
          <ul className="space-y-2 text-xs md:text-sm text-text-secondary list-disc pl-5">
            <li>Fetch, decrypt, and display your CIBIL, Experian, and Equifax credit scores.</li>
            <li>Generate personalized task checklists to help you improve credit utilization.</li>
            <li>Provide automated templates for disputing unauthorized inquiries or incorrect database logs.</li>
            <li>Send critical transactional notifications regarding credit score changes or due dates.</li>
          </ul>
        </div>

        {/*  Section 4  */}
        <div id="data-sharing" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">4. Data Sharing & Security</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            <strong>We do NOT sell, lease, or distribute your financial profiles to marketing companies, loan agents, or unverified third parties under any circumstances.</strong>
          </p>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            Data is shared exclusively with verified credit rating bureaus to query your score indexes. To guarantee absolute security, all transmissions are secured with bank-grade <strong>256-bit AES cryptographic protocols</strong>. Furthermore, all database storage runs on heavily encrypted, access-restricted cloud servers compliant with global data protection standards.
          </p>
        </div>

        {/*  Section 5  */}
        <div id="cookies" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">5. Cookies & Tracking</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            GoodScore uses cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept essential session cookies, you may not be able to use certain secure portions of our Service.
          </p>
        </div>

        {/*  Section 6  */}
        <div id="user-rights" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">6. Your Data Rights</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            You maintain full control of your credit logs. You have the right to request access to the logs we store, update incorrect parameters, or request complete profile deletion. Upon account deletion, your details will be instantly and permanently wiped from our database servers, halting all future bureau queries.
          </p>
        </div>

        {/*  Section 7  */}
        <div id="policy-changes" className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-dark-green">7. Policy Changes</h2>
          <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
            We reserve the right to update this Privacy Policy from time to time to align with new rating agency protocols and legal regulations. We will notify you of any major changes by sending an email or prominently posting a notice on our platform prior to the change becoming effective.
          </p>
        </div>
      </section>
    </div>
  </main>
    </>
  );
}

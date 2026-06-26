"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function AndroidPrivacyPolicyContent() {
  const searchParams = useSearchParams();
  const isApp = searchParams.get('app') === 'true';
  const deleteAccountUrl = isApp ? '/delete-account?app=true' : '/delete-account';

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Sidebar: Section Index Links (Sticky) */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 space-y-4 bg-white border border-border-light rounded-premium p-6 shadow-sm">
          <h3 className="text-sm font-black text-dark-green uppercase tracking-wider mb-4">Contents</h3>
          <nav className="flex flex-col gap-3.5 text-xs md:text-sm font-semibold text-text-secondary">
            <a href="#introduction" className="hover:text-dark-green transition-colors">Introduction</a>
            <a href="#information-collection" className="hover:text-dark-green transition-colors">1. Information We Collect</a>
            <a href="#data-usage" className="hover:text-dark-green transition-colors">2. How We Use Data</a>
            <a href="#data-sharing" className="hover:text-dark-green transition-colors">3. Data Sharing & Third Parties</a>
            <a href="#data-security" className="hover:text-dark-green transition-colors">4. Data Security</a>
            <a href="#data-retention" className="hover:text-dark-green transition-colors">5. Data Retention</a>
            <a href="#user-rights" className="hover:text-dark-green transition-colors">6. User Rights & Data Deletion</a>
            <a href="#contact-us" className="hover:text-dark-green transition-colors">7. Contact Us</a>
            <a href="#disclaimer" className="hover:text-dark-green transition-colors">Disclaimer</a>
          </nav>
        </aside>

        {/* Right Panel: Policy Details */}
        <section className="flex-1 bg-white border border-border-light rounded-premium p-8 md:p-12 shadow-premium space-y-10">
          
          <div className="border-b border-border-light pb-6">
            <h1 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-xs text-text-secondary">Last Updated: Jun 19, 2026</p>
          </div>

          {/* Introduction */}
          <div id="introduction" className="space-y-4">
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              At UPSCORE ("App", "we", "our", or "us"), we respect your privacy and are strongly committed to protecting your personal and financial data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
            </p>
          </div>

          {/* Section 1 */}
          <div id="information-collection" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">1. Information We Collect</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              We only collect information that is strictly necessary to provide you with comprehensive credit dashboards, payment features, and personalized financial insights.
            </p>
            
            <div className="space-y-3.5 pt-2">
              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Account Setup & Authentication</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  We offer a secure login process using your Mobile Number and OTP and verify OTPs securely.
                </p>
              </div>

              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Mandatory Profile & Financial Data</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  To set up your account and retrieve your credit reports, we require your First Name, Last Name, Date of birth (18+ must), Email, Gender, Address, State, Pin Code, and PanCard. Your PAN Card is used exclusively to fetch official credit reports from authorized bureaus.
                </p>
              </div>

              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Payment & Card Information</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  To facilitate bill payments and mobile recharges, our app can display your list of Credit Cards and allows you to Add New Credit Cards.
                </p>
              </div>

              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Contact List (READ_CONTACTS Permission)</h4>
                <p className="text-text-secondary text-xs leading-relaxed font-medium text-dark-green">
                  Our app requests permission to read your device's contact list. This access is used strictly locally on your device to enhance your user experience (e.g., to easily select a phone number for mobile recharges or payments). We DO NOT collect, transmit, sync, store, or share your contact data on our servers, APIs, or with any third parties. All contact information remains strictly and securely on your local device at all times.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="data-usage" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">2. How We Use Your Information</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-3">
              We use the collected data strictly for running the core features of the app, including:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary list-inside">
              <li className="flex items-start gap-2.5">
                <span className="text-secondary-green font-bold">✓</span>
                <span>To fetch and display your credit score and provide a list of tasks to improve your score.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-secondary-green font-bold">✓</span>
                <span>To display all active and closed cards and loans as per the app interface.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-secondary-green font-bold">✓</span>
                <span>To maintain your transaction history and process refund requests.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="data-sharing" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">3. Data Sharing & Third Parties</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed font-bold text-dark-green">
              WE DO NOT SELL, LEASE, OR DISTRIBUTE YOUR FINANCIAL PROFILES TO MARKETING COMPANIES, LOAN AGENTS, OR UNVERIFIED THIRD PARTIES UNDER ANY CIRCUMSTANCES.
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Credit Bureaus</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  The App may use trusted third-party service providers, credit bureaus, payment processors, analytics providers, and technical infrastructure partners solely for providing the services offered within the App.
                </p>
              </div>
              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Analytics & Crashlytics</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  The App may use services such as Firebase Analytics and Firebase Crashlytics to improve app performance, diagnose crashes, and enhance user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="data-security" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">4. Data Security</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              Your financial data is highly sensitive. We implement industry-standard security measures to protect your information, including SSL/TLS encryption and access-controlled cloud infrastructure.
            </p>
          </div>

          {/* Section 5 */}
          <div id="data-retention" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">5. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-2 text-text-secondary text-xs md:text-sm leading-relaxed">
              <li>
                We retain your personal, financial, and account-related information only for as long as necessary to provide the services offered by the App, including credit score retrieval, financial insights, transaction history, payment services, and account management.
              </li>
              <li>
                Account information, profile details, and financial records remain stored while your account is active.
              </li>
              <li>
                If you delete your account through the App or submit a data deletion request through our web-based deletion portal, your personal information, profile details, and associated account records will be permanently deleted from our active systems within 30 days of the deletion request, unless a longer retention period is required by applicable law, regulatory obligations, fraud prevention requirements, dispute resolution, or financial compliance requirements.
              </li>
              <li>
                We do not retain personal or financial information for advertising, marketing, or sale to third parties.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div id="user-rights" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">6. User Rights & Data Deletion</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              You retain absolute ownership and control over your data:
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Edit Profile</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  You can review, edit, or modify your profile details at any time directly through the app interface.
                </p>
              </div>

              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Account and Data Deletion (Via App)</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  If you wish to stop using the app, you can permanently delete your account by navigating to the side navigation menu and selecting "Delete Account". Upon receiving this request, all your personal information, profile details, and associated account records will be permanently and irreversibly deleted from our active systems within 30 days, except where retention is required by law.
                </p>
              </div>

              <div className="bg-bg-light/60 rounded-xl p-4 border border-border-light/50">
                <h4 className="font-bold text-xs md:text-sm text-dark-green mb-1">Web-Based Data Deletion Request</h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  In compliance with Google's Data Deletion Policy, users who have uninstalled the app can request complete data deletion by visiting our secure web portal at{' '}
                  <Link href={deleteAccountUrl} className="text-secondary-green font-bold hover:underline">
                    Delete Account Request Form
                  </Link>
                  . Upon deletion, your details will be permanently and irreversibly deleted from our active systems within 30 days, except where retention is required by law.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="contact-us" className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-dark-green">7. Contact Us</h2>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              For any privacy-related queries or to request data assistance, please contact us:
            </p>
            <p className="text-dark-green font-bold text-xs md:text-sm pt-1">
              Email:{' '}
              <a href="mailto:info@tracewavetransparency.com" className="hover:underline text-secondary-green">
                info@tracewavetransparency.com
              </a>
            </p>
          </div>

          {/* Disclaimer */}
          <div id="disclaimer" className="border-t border-border-light pt-6 space-y-3">
            <h4 className="font-bold text-xs md:text-sm text-dark-green uppercase tracking-wide">Disclaimer</h4>
            <p className="text-text-secondary text-[11px] md:text-xs leading-relaxed">
              The insights, EMI calculations, and score improvement tasks provided by UPSCORE are for informational purposes. The credit scores and active/closed loan reports displayed are directly fetched from authorized bureaus. UPSCORE does not manually alter your credit scores.
            </p>
          </div>

        </section>
        
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<main className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center text-text-secondary">Loading Privacy Policy...</main>}>
      <AndroidPrivacyPolicyContent />
    </Suspense>
  );
}

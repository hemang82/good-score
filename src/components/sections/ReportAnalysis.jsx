"use client";
import React, { useState } from 'react';

export default function ReportAnalysis() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState('high-usage');

  const accounts = [
    { id: 1, type: 'cards', title: 'HDFC Bank Credit Card', details: 'XXXX 3999 • Issued 24 Sep 2023', status: 'Active', balance: '₹1,49,921', util: 91.06, subCategory: 'high-usage' },
    { id: 2, type: 'cards', title: 'ICICI Bank Credit Card', details: 'XXXX 1022 • Issued 10 May 2022', status: 'Active', subCategory: 'other' },
    { id: 3, type: 'cards', title: 'SBI Credit Card', details: 'XXXX 4552 • Issued 15 Dec 2021', status: 'Active', subCategory: 'other' },
    { id: 4, type: 'loans', title: 'HDFC Home Loan', details: 'Acct #229988 • Issued 02 Jan 2024', status: 'Active', subCategory: 'other' },
    { id: 5, type: 'loans', title: 'Axis Car Loan', details: 'Acct #114422 • Issued 12 Jun 2023', status: 'Active', subCategory: 'other' },
    { id: 6, type: 'loans', title: 'SBI Personal Loan', details: 'Acct #100223 • Closed 14 Jan 2025', status: 'Closed', subCategory: 'closed' },
    { id: 7, type: 'cards', title: 'Amex Gold Card', details: 'XXXX 5592 • Closed 10 Feb 2025', status: 'Closed', subCategory: 'closed' }
  ];

  const filteredAccounts = accounts.filter(acc => {
    const typeMatch = activeTab === 'all' || acc.type === activeTab;
    const subMatch = acc.subCategory === activeSubTab;
    return typeMatch && subMatch;
  });

  return (
    <section id="credit-report" className="bg-white max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Copy Block Left */}
        <div className="flex-1 reveal relative">
          <div className="absolute -left-10 top-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -z-10" />
          
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-dark-green font-bold text-xs tracking-wider uppercase mb-4 border border-primary/30">Analytics Dashboard</span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-green tracking-tight mb-6">
            Premium Credit Report Analysis
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10">
            Get a visual, buttery-smooth breakdown of your debt lines, card histories, open loans, and active accounts. No more scrolling through complicated, boring bank sheets.
          </p>

          {/* Bullet Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: '💳', text: 'Card Utilization Track' },
              { icon: '📁', text: 'Loan Account Audits' },
              { icon: '📝', text: 'Closed Account Records' },
              { icon: '🔒', text: 'Bureau Protected Audits' }
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center gap-4 p-4 rounded-[16px] bg-bg-light border border-border-light hover:border-secondary-green hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span className="text-sm font-bold text-dark-green">{item.text}</span>
              </div>
            ))}
          </div>

          <a href="#download" className="bg-dark-green hover:bg-secondary-green text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2">
            Download Full Report
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Credit Report Mockup Right */}
        <div className="flex-1 w-full flex justify-center reveal perspective-1000">
          <div className="w-full max-w-lg bg-bg-light border-4 border-white rounded-[32px] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-6 transform lg:rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700">

            {/* Mock Header Info */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-dark-green">Credit Report</h3>
              <span className="text-xs font-bold text-[#FFA825] bg-[#FFF8EE] px-3 py-1 rounded-full border border-[#FFE1B5] flex items-center gap-1.5 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFA825]" />
                Updated Monthly
              </span>
            </div>

            {/* Gauge and rating */}
            <div className="bg-white p-5 rounded-[20px] border border-border-light shadow-sm flex items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-secondary-green/5 rounded-bl-full" />
              
              <div className="relative w-36 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E5E5" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#report-gauge-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset="15" className="animate-[dash_2s_ease-out_forwards]" />
                  <defs>
                    <linearGradient id="report-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5D5D" />
                      <stop offset="50%" stopColor="#FFA825" />
                      <stop offset="100%" stopColor="#2F9E44" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-1 flex flex-col items-center">
                  <span className="text-3xl font-black text-dark-green leading-none">812</span>
                  <span className="text-[10px] text-text-secondary font-bold tracking-wider">OF 900</span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-1 z-10">
                <span className="text-lg font-bold text-secondary-green">Excellent Rating</span>
                <p className="text-xs text-text-secondary leading-relaxed">Your payment history and credit utilization profiles look optimal.</p>
              </div>
            </div>

            {/* Main Tabs */}
            <div className="flex gap-2 p-1 bg-white rounded-full border border-border-light">
              {['all', 'loans', 'cards'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-xs font-bold py-2.5 rounded-full transition-all duration-300 capitalize ${activeTab === tab ? 'bg-dark-green text-white shadow-md' : 'text-text-secondary hover:bg-bg-light'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sub Tabs */}
            <div className="flex border-b border-border-light text-xs font-bold px-2">
              {[
                { id: 'high-usage', label: 'High Usage 1' },
                { id: 'other', label: 'Other 4' },
                { id: 'closed', label: 'Closed 2' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex-1 pb-3 text-center border-b-2 transition-all duration-300 ${activeSubTab === tab.id ? 'border-secondary-green text-dark-green' : 'border-transparent text-text-secondary hover:text-dark-green'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="space-y-3 min-h-[200px]">
              {/* Special UI for High Usage */}
              {activeSubTab === 'high-usage' && activeTab !== 'loans' && (
                <div className="p-4 bg-gradient-to-br from-[#FFF8EE] to-white rounded-[16px] border border-[#FFE1B5] flex flex-col gap-3 shadow-sm animate-fade-in">
                  <span className="text-xs font-bold text-[#FFA825] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFA825] animate-ping" />
                    More than 30% credit Utilization
                  </span>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FFA825] to-[#FF5D5D] rounded-full" style={{width: '91.06%'}} />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary font-medium">
                    <span>Used: ₹1,49,921</span>
                    <span>Total: ₹4,20,000</span>
                  </div>
                </div>
              )}

              {/* Cards List */}
              {filteredAccounts.map(acc => (
                <div key={acc.id} className="bg-white p-4 rounded-[16px] border border-border-light shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col gap-3 animate-fade-in group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-lg group-hover:bg-primary/20 transition-colors">
                        {acc.type === 'cards' ? '💳' : acc.title.includes('Home') ? '🏠' : '🚗'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-dark-green">{acc.title}</h4>
                        <p className="text-[11px] text-text-secondary">{acc.details}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${acc.status === 'Active' ? 'bg-[#EAF9EC] text-secondary-green' : 'bg-gray-100 text-text-secondary'}`}>
                      {acc.status}
                    </span>
                  </div>
                  
                  {acc.subCategory === 'high-usage' && (
                    <div className="border-t border-border-light pt-3 mt-1 flex justify-between text-xs text-text-secondary">
                      <span>Balance: {acc.balance}</span>
                      <span>Utilization: <span className="text-red-500 font-bold">{acc.util}%</span></span>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredAccounts.length === 0 && (
                <div className="text-center py-10 text-text-secondary text-sm">
                  No accounts found in this category.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

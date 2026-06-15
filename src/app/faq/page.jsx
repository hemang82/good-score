"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Page() {

  useEffect(() => {
    // --- 6. FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.faq-header');
    
    const handleAccordionClick = (e) => {
      const header = e.currentTarget;
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
      }
    };

    accordionHeaders.forEach(header => {
      header.addEventListener('click', handleAccordionClick);
    });

    return () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', handleAccordionClick);
      });
    };
  }, []);


  return (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-16">
    <div className="flex flex-col items-center mb-12 text-center">
      <h1 className="text-3xl md:text-5xl font-black text-dark-green tracking-tight mb-4">Frequently Asked Questions</h1>
      <p className="text-text-secondary text-sm md:text-base max-w-2xl">Find quick answers to common questions about your credit score, how GoodScore works, and our data security practices.</p>
    </div>

    <div className="max-w-4xl mx-auto space-y-4 md:space-y-5">
      
      {/*  FAQ 1  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>What is GoodScore?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            GoodScore is a comprehensive credit management platform designed to help you analyze, correct, and sustainably build your credit profile. We securely fetch your official credit reports and provide personalized, step-by-step guidance to help you reach a 750+ score.
          </p>
        </div>
      </details>

      {/*  FAQ 2  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>How often can I check my score?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            Yes! Checking your basic credit score (from bureaus like Experian or CIBIL) via GoodScore is 100% free and will never negatively impact your score (it counts as a "soft inquiry"). We do offer premium personalized plans for advanced credit building if you need extra help.
          </p>
        </div>
      </details>

      {/*  FAQ 3  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>How does score improvement work?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            No. When you check your own score through GoodScore, it is classified as a "soft inquiry" by the bureaus. Soft inquiries have absolutely zero impact on your credit score, no matter how many times you check it.
          </p>
        </div>
      </details>

      {/*  FAQ 4  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>Can I raise disputes directly?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            If you spot an unauthorized inquiry, duplicate loan, or incorrect personal detail, you can use our built-in dispute templates. Simply go to the "Credit Report" section, select the erroneous entry, and GoodScore will generate an official dispute request to send to the respective credit bureau.
          </p>
        </div>
      </details>

      {/*  FAQ 5  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>Is my data secure on GoodScore?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            Absolutely. We require your PAN card solely to fetch your official credit report from authorized bureaus. We utilize bank-grade 256-bit AES encryption to transmit your data, and we guarantee that your information is never sold to third-party marketers or loan agents.
          </p>
        </div>
      </details>

      {/*  FAQ 6  */}
      <details className="bg-white border border-border-light rounded-[1.5rem] p-5 md:p-6 shadow-sm group [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
        <summary className="flex items-center justify-between cursor-pointer text-base md:text-lg font-bold text-dark-green outline-none">
          <span>How long does it take for my score to update?</span>
          <span className="transition-transform duration-300 group-open:-rotate-180 opacity-60 ml-4 shrink-0">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12L0 0H14L7 12Z" />
            </svg>
          </span>
        </summary>
        <div className="mt-4 pt-4 border-t border-border-light/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            Credit bureaus generally update their records once every 30 to 45 days, depending on when your banks and lenders report your payment data. If you recently paid off a loan or cleared a credit card bill, please allow up to 45 days for the changes to reflect on your GoodScore dashboard.
          </p>
        </div>
      </details>

    </div>
  </main>
    </>
  );
}

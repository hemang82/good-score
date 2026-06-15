"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // --- 2. Scroll Reveal Observer ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 3. Stats Counter Animation ---
    const statsElements = document.querySelectorAll('.stat-number');
    const countUp = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;
      const isDecimal = el.getAttribute('data-decimal') === 'true';

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = target * easedProgress;

        if (isDecimal) {
          el.textContent = current.toFixed(1) + (el.getAttribute('data-suffix') || '');
        } else {
          el.textContent = Math.floor(current).toLocaleString() + (el.getAttribute('data-suffix') || '');
        }

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
        }
      };
      requestAnimationFrame(animate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsElements.forEach(stat => statsObserver.observe(stat));

    // --- 4. Interactive Credit Report Tabs ---
    const filterTabs = document.querySelectorAll('.report-filter-tab');
    const subTabs = document.querySelectorAll('.report-sub-tab');
    const accountCards = document.querySelectorAll('.account-card');
    const highUtilizationSection = document.getElementById('high-utilization-section');
    const otherActiveSection = document.getElementById('other-active-section');
    const closedAccountsSection = document.getElementById('closed-accounts-section');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => {
          t.classList.remove('bg-primary', 'text-dark-green');
          t.classList.add('bg-white', 'text-text-secondary', 'border', 'border-border-light');
        });
        tab.classList.add('bg-primary', 'text-dark-green');
        tab.classList.remove('bg-white', 'text-text-secondary', 'border', 'border-border-light');

        const filterVal = tab.getAttribute('data-filter');
        accountCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    subTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        subTabs.forEach(t => {
          t.classList.remove('border-dark-green', 'text-dark-green', 'font-semibold');
          t.classList.add('border-transparent', 'text-text-secondary');
        });
        tab.classList.add('border-dark-green', 'text-dark-green', 'font-semibold');
        tab.classList.remove('border-transparent', 'text-text-secondary');

        const tabVal = tab.getAttribute('data-subtab');
        if (tabVal === 'high-usage') {
          if (highUtilizationSection) highUtilizationSection.classList.remove('hidden');
          if (otherActiveSection) otherActiveSection.classList.add('hidden');
          if (closedAccountsSection) closedAccountsSection.classList.add('hidden');
        } else if (tabVal === 'other') {
          if (highUtilizationSection) highUtilizationSection.classList.add('hidden');
          if (otherActiveSection) otherActiveSection.classList.remove('hidden');
          if (closedAccountsSection) closedAccountsSection.classList.add('hidden');
        } else if (tabVal === 'closed') {
          if (highUtilizationSection) highUtilizationSection.classList.add('hidden');
          if (otherActiveSection) otherActiveSection.classList.add('hidden');
          if (closedAccountsSection) closedAccountsSection.classList.remove('hidden');
        }
      });
    });

    // --- 5. Interactive Tasks Manager ---
    const taskButtons = document.querySelectorAll('.task-cta-btn');
    const progressStepsText = document.getElementById('progress-steps-text');
    const progressLine = document.getElementById('progress-line-fill');
    let completedTasksCount = 0;
    const totalTasks = taskButtons.length;

    taskButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const taskCard = btn.closest('.task-card');
        const isDone = btn.getAttribute('data-done') === 'true';

        if (!isDone) {
          btn.setAttribute('data-done', 'true');
          btn.textContent = '✓ Completed';
          btn.classList.remove('bg-primary', 'hover:bg-opacity-90', 'text-dark-green');
          btn.classList.add('bg-dark-green', 'text-white', 'cursor-default');
          
          const checkIcon = taskCard.querySelector('.task-status-icon');
          if (checkIcon) {
            checkIcon.classList.remove('bg-white', 'text-border-light');
            checkIcon.classList.add('bg-secondary-green', 'text-white');
            checkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>`;
          }

          completedTasksCount++;
          if (progressStepsText && progressLine) {
            const formattedCount = completedTasksCount < 10 ? `0${completedTasksCount}` : completedTasksCount;
            progressStepsText.textContent = `${formattedCount} / 04`;
            
            const percentage = (completedTasksCount / totalTasks) * 100;
            progressLine.style.width = `${percentage}%`;

            const timelineSteps = document.querySelectorAll('.progress-timeline-step');
            for (let i = 0; i < completedTasksCount; i++) {
              if (timelineSteps[i]) {
                timelineSteps[i].classList.add('bg-secondary-green', 'text-white');
                timelineSteps[i].classList.remove('bg-gray-200', 'text-gray-400');
                timelineSteps[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>`;
              }
            }
          }
        }
      });
    });
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
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        item.classList.remove('active');
        if (content) content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    };

    accordionHeaders.forEach(header => {
      header.addEventListener('click', handleAccordionClick);
    });

    // Cleanup for FAQ
    const cleanupFaq = () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', handleAccordionClick);
      });
    };

  }, []);

  return (
    <>
      {/*  ====================================================
       2. HERO SECTION
       ====================================================  */}
  <section
    className="relative max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 lg:py-16 flex flex-col lg:flex-row items-center gap-12 overflow-visible">

    {/*  Hero Left Side  */}
    <div className="flex-1 text-center lg:text-left reveal active">

      {/*  Premium Badge  */}
      {/*  <div className="inline-flex items-center gap-2 bg-[#E1F7B5] border border-[#BDEB70] px-4 py-1.5 rounded-full text-xs font-bold text-dark-green tracking-wide mb-6 uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        #1 Credit Score Improvement App
      </div>  */}

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-green leading-[1.1] mb-6 tracking-tight">
        Improve Your <span className="gradient-text-green">Credit Score</span> Smarter & Faster
      </h1>

      <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
        Monitor your credit health, receive personalized improvement plans, download detailed reports, and unlock better
        financial opportunities.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
        <a href="#download"
          className="w-full sm:w-auto bg-dark-green hover:bg-[#023118] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center">
          Check My Score
        </a>
        <a href="#download"
          className="w-full sm:w-auto text-center border-2 border-dark-green text-dark-green hover:bg-dark-green hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300">
          Download App
        </a>
      </div>
    </div>

    {/*  Hero Right Side: Dynamic Mobile Mockups  */}
    <div
      className="flex-1 relative w-full flex justify-center items-center py-8 lg:py-0 min-h-[450px] md:min-h-[550px] reveal active">

      {/*  Visual Background Glow  */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 blur-[100px] z-0"></div>

      {/*  Main Phone Mockup (Credit Report)  */}
      <div
        className="relative z-10 w-[240px] md:w-[280px] aspect-[9/18.5] bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border-8 border-dark-green overflow-hidden transform -rotate-6 translate-x-4 md:translate-x-8">

        {/*  Screen Top Notch  */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-dark-green rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-10 h-1.5 bg-[#ffffff30] rounded-full"></div>
        </div>

        {/*  App Screen Content  */}
        <div className="w-full h-full bg-bg-light pt-6 flex flex-col">

          {/*  Screen Header  */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-border-light bg-white">
            <span className="text-sm font-black text-dark-green tracking-wider uppercase">GoodScore</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-secondary-green rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#C7F041] rounded-full"></span>
            </div>
          </div>

          {/*  Screen Score Panel  */}
          <div
            className="p-3 bg-white m-3 rounded-premium-sm border border-border-light shadow-sm flex flex-col items-center">
            <span className="text-xs text-text-secondary font-medium">YOUR CREDIT SCORE</span>

            {/*  SVG Semi-gauge  */}
            <div className="relative w-28 h-16 mt-1 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E5E5" strokeWidth="8"
                  strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#hero-gauge-grad)" strokeWidth="8"
                  strokeLinecap="round" strokeDasharray="125" strokeDashoffset="15" />
                <defs>
                  <linearGradient id="hero-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF5D5D" />
                    <stop offset="50%" stop-color="#FFA825" />
                    <stop offset="100%" stop-color="#2F9E44" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-1 flex flex-col items-center">
                <span className="text-lg font-black text-dark-green leading-none">812</span>
                <span className="text-[8px] text-secondary-green font-bold uppercase tracking-wider">Excellent</span>
              </div>
            </div>

            <span className="text-[8px] text-text-secondary mt-1">Updated on 10 Mar 2026</span>
          </div>

          {/*  Active HDFC Card Mockup Inside Screen  */}
          <div className="mx-3 p-3 bg-white rounded-premium-sm border border-border-light shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-dark-green">HDFC Credit Card</span>
              <span className="bg-[#EAF9EC] text-secondary-green text-[8px] px-1.5 py-0.5 rounded font-bold">Active</span>
            </div>

            {/*  Utilization Progress  */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-text-secondary">
                <span>Credit Utilization</span>
                <span className="font-bold text-dark-green">35.7%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-green rounded-full" style={{'width': '35.7%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Secondary Phone Mockup (Improvement Tasks)  */}
      <div
        className="absolute z-20 w-[210px] md:w-[245px] aspect-[9/18.5] bg-white rounded-[28px] md:rounded-[36px] shadow-2xl border-8 border-dark-green overflow-hidden transform rotate-6 translate-x-28 md:translate-x-36 -translate-y-6">

        {/*  Screen Notch  */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4.5 bg-dark-green rounded-b-lg z-20">
        </div>

        {/*  App Screen Content  */}
        <div className="w-full h-full bg-bg-light pt-5 flex flex-col text-xs">

          {/*  Screen Header  */}
          <div
            className="px-3 py-1.5 flex items-center justify-between border-b border-border-light bg-white font-bold text-dark-green">
            <span>Score Boost Plan</span>
            <span className="text-secondary-green">00/05 Done</span>
          </div>

          {/*  App Tasks List  */}
          <div className="p-2 space-y-2">

            {/*  Mini Task 1  */}
            <div className="p-2 bg-white rounded-lg border border-border-light shadow-sm flex flex-col gap-1.5">
              <span className="font-bold text-dark-green text-[9px]">Check Credit Report Errors</span>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[7px] text-red-500 font-bold bg-red-50 px-1 rounded">Urgent Action</span>
                <span className="bg-primary text-dark-green font-bold text-[7px] px-2 py-0.5 rounded">Fix Now</span>
              </div>
            </div>

            {/*  Mini Task 2  */}
            <div className="p-2 bg-white rounded-lg border border-border-light shadow-sm flex flex-col gap-1.5">
              <span className="font-bold text-dark-green text-[9px]">Refresh latest Credit Score</span>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[7px] text-text-secondary">Ready to update</span>
                <span className="bg-primary text-dark-green font-bold text-[7px] px-2 py-0.5 rounded">Refresh</span>
              </div>
            </div>

            {/*  Mini Task 3  */}
            <div className="p-2 bg-white rounded-lg border border-border-light shadow-sm flex flex-col gap-1.5">
              <span className="font-bold text-dark-green text-[9px]">Set Bill Payment Reminder</span>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[7px] text-text-secondary">Avoid delays</span>
                <span className="bg-primary text-dark-green font-bold text-[7px] px-2 py-0.5 rounded">Remind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Floating Cards with Hover & Animations  */}
      {/*  Card 1: Score Badge  */}
      <div
        className="absolute left-[-20px] top-[40px] md:top-[60px] z-30 bg-white premium-shadow border border-border-light rounded-premium-sm p-3 flex items-center gap-3 animate-float-1 hover:scale-105 transition-transform duration-300">
        <div
          className="w-10 h-10 rounded-full bg-[#EBFCE6] flex items-center justify-center text-secondary-green font-bold text-sm">
          ✓
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold text-dark-green">Credit Score 812</h4>
          <p className="text-sm text-text-secondary">Excellent Rating</p>
        </div>
      </div>

      {/*  Card 2: Improvement Active  */}
      <div
        className="absolute left-[-10px] bottom-[60px] md:bottom-[90px] z-30 bg-white premium-shadow border border-border-light rounded-premium-sm p-3.5 flex items-center gap-3 animate-float-2 hover:scale-105 transition-transform duration-300">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-dark-green font-black">
          ⚡
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold text-dark-green">Improvement Plan</h4>
          <p className="text-xs text-secondary-green font-bold">Active & Tracking</p>
        </div>
      </div>

      {/*  Card 3: Credit Report Ready  */}
      <div
        className="absolute right-[-20px] bottom-[100px] md:bottom-[130px] z-30 bg-white premium-shadow border border-border-light rounded-premium-sm p-3 flex items-center gap-3 animate-float-1 hover:scale-105 transition-transform duration-300">
        <div className="w-9 h-9 rounded-full bg-[#EBFCE6] flex items-center justify-center text-secondary-green">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold text-dark-green">Credit Report</h4>
          <p className="text-sm text-text-secondary">Ready to Download</p>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       3. TRUST SECTION
       ====================================================  */}
  <section className="bg-white py-8 md:py-16 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">

      <h2 className="text-sm font-black uppercase tracking-widest text-secondary-green mb-10 reveal">
        Trusted By Thousands Of Users
      </h2>

      {/*  Stats Grid  */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 reveal">

        {/*  Stat Item 1  */}
        <div
          className="flex flex-col items-center p-6 rounded-premium border border-[#F0F2F0] hover:border-primary/50 transition-colors duration-300">
          <div className="text-3xl md:text-4xl font-black text-dark-green mb-2 stat-number"
            data-target="100000" data-suffix="+">0</div>
          <span className="text-xs md:text-sm text-text-secondary font-medium">Active App Users</span>
        </div>

        {/*  Stat Item 2  */}
        <div
          className="flex flex-col items-center p-6 rounded-premium border border-[#F0F2F0] hover:border-primary/50 transition-colors duration-300">
          <div className="text-3xl md:text-4xl font-black text-dark-green mb-2 stat-number"
            data-target="50000" data-suffix="+">0</div>
          <span className="text-xs md:text-sm text-text-secondary font-medium">Reports Generated</span>
        </div>

        {/*  Stat Item 3  */}
        <div
          className="flex flex-col items-center p-6 rounded-premium border border-[#F0F2F0] hover:border-primary/50 transition-colors duration-300">
          <div
            className="text-3xl md:text-4xl font-black text-dark-green mb-2 flex items-center justify-center">
            <span className="stat-number" data-target="4.8" data-decimal="true">0</span>
            <span className="text-primary text-2xl ml-1">★</span>
          </div>
          <span className="text-xs md:text-sm text-text-secondary font-medium">App Rating (Play/iOS)</span>
        </div>

        {/*  Stat Item 4  */}
        <div
          className="flex flex-col items-center p-6 rounded-premium border border-[#F0F2F0] hover:border-primary/50 transition-colors duration-300">
          <div className="text-3xl md:text-4xl font-black text-dark-green mb-2 stat-number"
            data-target="99" data-suffix="%">0</div>
          <span className="text-xs md:text-sm text-text-secondary font-medium">User Satisfaction</span>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       4. FEATURES SECTION
       ====================================================  */}
  <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 lg:py-20">
    <div className="text-center max-w-2xl mx-auto mb-16 reveal">
      <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
        Everything You Need To Build A Better Credit Score
      </h2>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
        Access an array of built-in financial features modeled to analyze, correct, and build your credit profile
        sustainably.
      </p>
    </div>

    {/*  Feature Cards Grid  */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">

      {/*  Feature Card 1  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Free Credit Score Check</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Instantly check your updated credit score for free, compiled directly from prime credit bureaus.
        </p>
      </div>

      {/*  Feature Card 2  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Personalized Plans</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Follow a tailor-made roadmap listing specific tasks calculated to increase your score quickly.
        </p>
      </div>

      {/*  Feature Card 3  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Report Downloads</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Download thorough, clean, and interactive credit reports outlining your entire history.
        </p>
      </div>

      {/*  Feature Card 4  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Credit Utilization</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Receive smart warnings and alerts keeping your credit utilization safely under the 30% limit.
        </p>
      </div>

      {/*  Feature Card 5  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Dispute Management</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          File disputes against reporting errors directly from the app dashboard, error-free.
        </p>
      </div>

      {/*  Feature Card 6  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">EMI Calculator</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Quickly simulate dynamic monthly payments for various loans to keep your debt profile lean.
        </p>
      </div>

      {/*  Feature Card 7  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Bill Payments</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Track, schedule, and pay utility bills on time to lock in optimal payment histories.
        </p>
      </div>

      {/*  Feature Card 8  */}
      <div
        className="bg-white rounded-premium p-8 border border-border-light premium-shadow premium-border-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
        <div className="w-12 h-12 rounded-xl bg-primary/20 text-dark-green flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-dark-green mb-3">Credit Expert Support</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          Schedule individual consulting calls with certified professionals to resolve major reports.
        </p>
      </div>
    </div>
  </section>

  {/*  ====================================================
       5. HOW IT WORKS
       ====================================================  */}
  <section id="improvement-plan" className="bg-white py-12 md:py-16 lg:py-20 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-6 md:px-12">

      <div className="text-center max-w-2xl mx-auto mb-20 reveal">
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          Improving your score is a structured process. Here is the step-by-step journey we take you through.
        </p>
      </div>

      {/*  Timeline Container  */}
      <div className="relative timeline-line reveal">

        {/*  Step 1  */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16 md:mb-24 last:mb-0">
          <div className="w-full md:w-[45%] text-center md:text-right order-2 md:order-1 mt-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-dark-green mb-2">Step 1: Check Your Score</h3>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-md md:ml-auto">
              Initialize your GoodScore profile. We pull your latest files from top bureaus securely without impacting
              your score.
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full bg-primary text-dark-green flex items-center justify-center font-bold text-sm z-10 order-1 md:order-2 border-4 border-white shadow-md">
            1
          </div>
          <div className="w-full md:w-[45%] order-3 hidden md:block"></div>
        </div>

        {/*  Step 2  */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16 md:mb-24 last:mb-0">
          <div className="w-full md:w-[45%] order-3 md:order-1 hidden md:block"></div>
          <div
            className="w-10 h-10 rounded-full bg-primary text-dark-green flex items-center justify-center font-bold text-sm z-10 order-1 md:order-2 border-4 border-white shadow-md">
            2
          </div>
          <div className="w-full md:w-[45%] text-center md:text-left order-2 mt-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-dark-green mb-2">Step 2: Get Personalized Plan
            </h3>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-md">
              Our AI engine checks your historical limits, debts, and errors to structure a custom score improvement
              guide.
            </p>
          </div>
        </div>

        {/*  Step 3  */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16 md:mb-24 last:mb-0">
          <div className="w-full md:w-[45%] text-center md:text-right order-2 md:order-1 mt-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-dark-green mb-2">Step 3: Complete Recommended
              Tasks</h3>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-md md:ml-auto">
              Log into the app daily and check off items like clearing high utilization values or correcting reporting
              errors.
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full bg-primary text-dark-green flex items-center justify-center font-bold text-sm z-10 order-1 md:order-2 border-4 border-white shadow-md">
            3
          </div>
          <div className="w-full md:w-[45%] order-3 hidden md:block"></div>
        </div>

        {/*  Step 4  */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between mb-16 md:mb-24 last:mb-0">
          <div className="w-full md:w-[45%] order-3 md:order-1 hidden md:block"></div>
          <div
            className="w-10 h-10 rounded-full bg-primary text-dark-green flex items-center justify-center font-bold text-sm z-10 order-1 md:order-2 border-4 border-white shadow-md">
            4
          </div>
          <div className="w-full md:w-[45%] text-center md:text-left order-2 mt-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-dark-green mb-2">Step 4: Track Progress</h3>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-md">
              Review live charts showing score increases, limit improvements, active cards, and clean payment tracks.
            </p>
          </div>
        </div>

        {/*  Step 5  */}
        <div className="relative flex flex-col md:flex-row items-center md:justify-between last:mb-0">
          <div className="w-full md:w-[45%] text-center md:text-right order-2 md:order-1 mt-4 md:mt-0">
            <h3 className="text-lg md:text-xl font-bold text-dark-green mb-2">Step 5: Increase Credit Score
            </h3>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-md md:ml-auto">
              Reach your target score of 750+ or higher, opening access to high-tier premium rewards credit cards and
              low rates.
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full bg-primary text-dark-green flex items-center justify-center font-bold text-sm z-10 order-1 md:order-2 border-4 border-white shadow-md">
            5
          </div>
          <div className="w-full md:w-[45%] order-3 hidden md:block"></div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       6. SCORE IMPROVEMENT SECTION
       ====================================================  */}
  <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 lg:py-20">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

      {/*  Visual Widget Grid on Left  */}
      <div className="flex-1 w-full relative grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1 reveal">

        {/*  Widget 1: Daily Monitoring  */}
        <div className="bg-white p-6 rounded-premium border border-border-light premium-shadow flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#EAF9EC] text-secondary-green flex items-center justify-center text-lg">
            🔍
          </div>
          <div>
            <h4 className="font-bold text-dark-green mb-1 text-sm">Daily Monitoring</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              We monitor credit bureau updates every 24 hours to keep your plan up to date.
            </p>
          </div>
        </div>

        {/*  Widget 2: Fake Loan Detection  */}
        <div className="bg-white p-6 rounded-premium border border-border-light premium-shadow flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FFF4E5] text-[#FFA825] flex items-center justify-center text-lg">
            ⚠️
          </div>
          <div>
            <h4 className="font-bold text-dark-green mb-1 text-sm">Fake Loan Detection</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Instantly catch reporting errors, duplicate accounts, and unauthorized lines.
            </p>
          </div>
        </div>

        {/*  Widget 3: Credit Analysis  */}
        <div className="bg-white p-6 rounded-premium border border-border-light premium-shadow flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#EBF5FF] text-[#3B82F6] flex items-center justify-center text-lg">
            📊
          </div>
          <div>
            <h4 className="font-bold text-dark-green mb-1 text-sm">Credit Analysis</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Understand parameters like age, payment history, and mix affecting your score.
            </p>
          </div>
        </div>

        {/*  Widget 4: Expert Support & Videos  */}
        <div className="bg-white p-6 rounded-premium border border-border-light premium-shadow flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#F3E5F5] text-[#9C27B0] flex items-center justify-center text-lg">
            🎥
          </div>
          <div>
            <h4 className="font-bold text-dark-green mb-1 text-sm">Video Guidance</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Access byte-sized visual lessons clarifying complex banking terms easily.
            </p>
          </div>
        </div>
      </div>

      {/*  Description Block on Right  */}
      <div className="flex-1 order-1 lg:order-2 reveal">
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-6">
          Increase Your Credit Score To 750+
        </h2>

        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
          Reaching 750 is not an overnight event—it requires systematic coordination of accounts, credit lines, and
          payments. GoodScore guides you automatically, highlighting exactly what to fix.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full bg-[#EAF9EC] text-secondary-green flex items-center justify-center text-xs mt-0.5">✓</span>
            <p className="text-xs md:text-sm text-text-primary"><span className="font-bold text-dark-green">Real-time
                alerts</span> on unauthorized inquiries.</p>
          </div>
          <div className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full bg-[#EAF9EC] text-secondary-green flex items-center justify-center text-xs mt-0.5">✓</span>
            <p className="text-xs md:text-sm text-text-primary"><span
                className="font-bold text-dark-green">Auto-generation</span> of dispute application drafts.</p>
          </div>
          <div className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full bg-[#EAF9EC] text-secondary-green flex items-center justify-center text-xs mt-0.5">✓</span>
            <p className="text-xs md:text-sm text-text-primary"><span className="font-bold text-dark-green">Personalized
                checklists</span> synced directly with banking data.</p>
          </div>
        </div>

        <a href="#download"
          className="bg-dark-green hover:bg-[#023118] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md text-center inline-block">
          Check My Score Now
        </a>
      </div>
    </div>
  </section>

  {/*  ====================================================
       7. CREDIT REPORT SECTION
       ====================================================  */}
  <section id="credit-report" className="bg-white py-12 md:py-16 lg:py-20 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

      {/*  Copy Block Left  */}
      <div className="flex-1 reveal">
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-6">
          Premium Credit Report Analysis
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
          Get a visual breakdown of your debt lines, card histories, open loans, and active accounts. No more scrolling
          through complicated bank sheets.
        </p>

        {/*  Bullet Highlights  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div
            className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F2F0] hover:border-primary/50 transition-colors">
            <span className="text-lg">💳</span>
            <span className="text-xs font-bold text-dark-green">Card Utilization Track</span>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F2F0] hover:border-primary/50 transition-colors">
            <span className="text-lg">📁</span>
            <span className="text-xs font-bold text-dark-green">Loan Account Audits</span>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F2F0] hover:border-primary/50 transition-colors">
            <span className="text-lg">📝</span>
            <span className="text-xs font-bold text-dark-green">Closed Account Records</span>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-lg border border-[#F0F2F0] hover:border-primary/50 transition-colors">
            <span className="text-lg">🔒</span>
            <span className="text-xs font-bold text-dark-green">Bureau Protected Audits</span>
          </div>
        </div>

        <a href="#download"
          className="bg-primary hover:bg-opacity-95 text-dark-green font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md text-center inline-block">
          Download Your Report
        </a>
      </div>

      {/*  Credit Report Mockup Right  */}
      <div className="flex-1 w-full flex justify-center reveal">
        <div
          className="w-full max-w-lg bg-bg-light border border-border-light rounded-premium p-6 md:p-8 shadow-premium flex flex-col gap-6">

          {/*  Mock Header Info  */}
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold text-dark-green">Credit Report</h3>
            <span
              className="text-xs font-bold text-[#FFA825] bg-[#FFF8EE] px-2.5 py-1 rounded-full border border-[#FFE1B5]">Updated
              Monthly</span>
          </div>

          {/*  Gauge and rating  */}
          <div
            className="bg-white p-5 rounded-premium border border-border-light shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

            {/*  SVG Semi-gauge  */}
            <div className="relative w-36 h-20 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                {/*  Outer Arc  */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E5E5" strokeWidth="8"
                  strokeLinecap="round" />
                {/*  Filled Arc  */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#report-gauge-grad)" strokeWidth="8"
                  strokeLinecap="round" strokeDasharray="125" strokeDashoffset="15" />
                <defs>
                  <linearGradient id="report-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF5D5D" />
                    <stop offset="50%" stop-color="#FFA825" />
                    <stop offset="100%" stop-color="#2F9E44" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-1 flex flex-col items-center">
                <span className="text-2xl font-black text-dark-green leading-none">812</span>
                <span className="text-[9px] text-[#A6C0A8] font-bold">OF 900</span>
              </div>
            </div>

            {/*  Score rating text  */}
            <div className="text-center md:text-left flex flex-col justify-center gap-1">
              <span className="text-lg font-bold text-secondary-green">Excellent Rating</span>
              <p className="text-sm text-text-secondary">Your payment history and credit utilization profiles look optimal.
              </p>
            </div>
          </div>

          {/*  Filters tabs (All / Loans / Cards)  */}
          <div className="flex gap-2">
            <button data-filter="all"
              className="report-filter-tab flex-1 bg-primary text-dark-green text-xs font-bold py-2.5 rounded-full transition-all duration-200">
              All
            </button>
            <button data-filter="loans"
              className="report-filter-tab flex-1 bg-white text-text-secondary border border-border-light text-xs font-bold py-2.5 rounded-full transition-all duration-200 hover:bg-gray-50">
              Loans
            </button>
            <button data-filter="cards"
              className="report-filter-tab flex-1 bg-white text-text-secondary border border-border-light text-xs font-bold py-2.5 rounded-full transition-all duration-200 hover:bg-gray-50">
              Cards
            </button>
          </div>

          {/*  Inner Sub Tabs  */}
          <div className="flex border-b border-border-light text-xs font-bold">
            <button data-subtab="high-usage"
              className="report-sub-tab flex-1 pb-3 text-center border-b-2 border-dark-green text-dark-green">
              High Usage 1
            </button>
            <button data-subtab="other"
              className="report-sub-tab flex-1 pb-3 text-center border-b-2 border-transparent text-text-secondary hover:text-dark-green">
              Other 4
            </button>
            <button data-subtab="closed"
              className="report-sub-tab flex-1 pb-3 text-center border-b-2 border-transparent text-text-secondary hover:text-dark-green">
              Closed 2
            </button>
          </div>

          {/*  Section Contents  */}
          <div className="space-y-4">

            {/*  High Usage Content  */}
            <div id="high-utilization-section" className="space-y-4">

              {/*  Utilization Alert  */}
              <div className="p-4 bg-[#FFF8EE] rounded-premium-sm border border-[#FFE1B5] flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#FFA825]">More than 30% credit Utilization</span>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-dark-green rounded-full" style={{'width': '35.7%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-text-secondary font-medium">
                  <span>Limit Used: ₹1,49,921</span>
                  <span>Total Limit: ₹4,20,000</span>
                </div>
              </div>

              {/*  High Usage Account Card  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex flex-col gap-3"
                data-category="cards">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-dark-green">HDFC Bank Credit Card</h4>
                      <p className="text-sm text-text-secondary">XXXX 3999 • Issued 24 Sep 2023</p>
                    </div>
                  </div>
                  <span
                    className="bg-[#EAF9EC] text-secondary-green text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
                </div>
                <div className="border-t border-[#F5F5F5] pt-3 flex justify-between text-sm text-text-secondary">
                  <span>Balance: ₹1,49,921</span>
                  <span>Utilization: <span className="text-red-500 font-bold">91.06%</span></span>
                </div>
              </div>
            </div>

            {/*  Other Active Content (Hidden by default)  */}
            <div id="other-active-section" className="hidden space-y-3">

              {/*  Card 2  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="cards">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">ICICI Bank Credit Card</h4>
                    <p className="text-sm text-text-secondary">XXXX 1022 • Issued 10 May 2022</p>
                  </div>
                </div>
                <span
                  className="bg-[#EAF9EC] text-secondary-green text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>

              {/*  Card 3  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="cards">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">SBI Credit Card</h4>
                    <p className="text-sm text-text-secondary">XXXX 4552 • Issued 15 Dec 2021</p>
                  </div>
                </div>
                <span
                  className="bg-[#EAF9EC] text-secondary-green text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>

              {/*  Loan 1  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="loans">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏠</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">HDFC Home Loan</h4>
                    <p className="text-sm text-text-secondary">Acct #229988 • Issued 02 Jan 2024</p>
                  </div>
                </div>
                <span
                  className="bg-[#EAF9EC] text-secondary-green text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>

              {/*  Loan 2  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="loans">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚗</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">Axis Car Loan</h4>
                    <p className="text-sm text-text-secondary">Acct #114422 • Issued 12 Jun 2023</p>
                  </div>
                </div>
                <span
                  className="bg-[#EAF9EC] text-secondary-green text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>
            </div>

            {/*  Closed Accounts (Hidden by default)  */}
            <div id="closed-accounts-section" className="hidden space-y-3">

              {/*  Closed 1  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="loans">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚗</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">SBI Personal Loan</h4>
                    <p className="text-sm text-text-secondary">Acct #100223 • Closed 14 Jan 2025</p>
                  </div>
                </div>
                <span
                  className="bg-gray-100 text-text-secondary text-xs px-2 py-0.5 rounded font-bold uppercase">Closed</span>
              </div>

              {/*  Closed 2  */}
              <div
                className="account-card bg-white p-4 rounded-premium-sm border border-border-light shadow-sm flex items-center justify-between"
                data-category="cards">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-dark-green">Amex Gold Card</h4>
                    <p className="text-sm text-text-secondary">XXXX 5592 • Closed 10 Feb 2025</p>
                  </div>
                </div>
                <span
                  className="bg-gray-100 text-text-secondary text-xs px-2 py-0.5 rounded font-bold uppercase">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       8. BILL PAYMENT SECTION
       ====================================================  */}
  <section id="bill-payments" className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 lg:py-20">

    <div className="text-center max-w-2xl mx-auto mb-16 reveal">
      <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
        Pay Bills & Protect Your Score
      </h2>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
        Paying your utility bills on time is the single easiest way to construct a perfect payment record. Pay directly
        through GoodScore.
      </p>
    </div>

    {/*  Payments Service Grid  */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 reveal">

      {/*  1. Mobile Prepaid  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Mobile Prepaid</span>
      </a>

      {/*  2. Broadband Postpaid  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5.05 3.636a8.959 8.959 0 0113.9 0M7.757 6.343a5.99 5.99 0 018.486 0M10.586 9.172a3 3 0 014.243 0M12 13v6m-4 0h8" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Broadband Postpaid</span>
      </a>

      {/*  3. Cable TV  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M7 4V2m10 2V2M3 8h18m-2 12H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Cable TV</span>
      </a>

      {/*  4. Credit Card  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Credit Card</span>
      </a>

      {/*  5. DTH  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m8 0h-4M12 3a9 9 0 019 9" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">DTH</span>
      </a>

      {/*  6. Echallan  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM12 9V7" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Echallan</span>
      </a>

      {/*  7. Education Fee  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 11v8a1 1 0 001 1h2a1 1 0 001-1v-8" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Education Fee</span>
      </a>

      {/*  8. Electricity Bill  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Electricity Bill</span>
      </a>

      {/*  9. EV Recharge  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">EV Recharge</span>
      </a>

      {/*  10. FASTag Recharge  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM4 9h16l1 4v4H3v-4l1-4z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">FASTag Recharge</span>
      </a>

      {/*  11. Gas Line  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4h2v2h-2v2l1 1H9l1-1v-2H8v-2h2V5L9 4z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Gas Line</span>
      </a>

      {/*  12. Insurance  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Insurance</span>
      </a>

      {/*  13. Loan Repayment  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Loan Repayment</span>
      </a>

      {/*  14. LPG Gas  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 10a7 7 0 00-14 0v9a2 2 0 002 2h10a2 2 0 002-2v-9zM9 5h6M12 2v3" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">LPG Gas</span>
      </a>

      {/*  15. Water Bill  */}
      <a href="#"
        className="bg-white p-6 rounded-premium border border-border-light flex flex-col items-center gap-4 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300">
        <div
          className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 8-11 8-11s8 6.582 8 11c0 4.418-3.582 8-8 8z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-dark-green text-center leading-tight">Water Bill</span>
      </a>
    </div>
  </section>

  {/*  ====================================================
       9. SCORE IMPROVEMENT TASKS (INTERACTIVE)
       ====================================================  */}
  <section className="bg-white py-12 md:py-16 lg:py-20 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

      {/*  Interactive Checklist Left  */}
      <div className="flex-1 w-full space-y-4 order-2 lg:order-1 reveal">

        <h3 className="text-sm font-black text-secondary-green uppercase tracking-wider mb-6">
          Interactive Task Planner</h3>

        {/*  Task Card 1  */}
        <div
          className="task-card bg-bg-light border border-border-light p-5 rounded-premium flex items-center justify-between gap-4 transition-all duration-300 hover:border-primary">
          <div className="flex items-center gap-4">
            <div
              className="task-status-icon w-8 h-8 rounded-full bg-white text-border-light flex items-center justify-center border border-border-light shrink-0">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-dark-green leading-snug">Check Credit Report Errors</h4>
              <p className="text-xs md:text-xs text-text-secondary">Check for wrong address logs or duplicate account
                flags.</p>
            </div>
          </div>
          <button data-done="false"
            className="task-cta-btn bg-primary hover:bg-opacity-95 text-dark-green font-bold text-xs md:text-xs px-4 py-2.5 rounded-full transition-all duration-200 shrink-0">
            Check Now
          </button>
        </div>

        {/*  Task Card 2  */}
        <div
          className="task-card bg-bg-light border border-border-light p-5 rounded-premium flex items-center justify-between gap-4 transition-all duration-300 hover:border-primary">
          <div className="flex items-center gap-4">
            <div
              className="task-status-icon w-8 h-8 rounded-full bg-white text-border-light flex items-center justify-center border border-border-light shrink-0">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-dark-green leading-snug">Refresh Credit Score</h4>
              <p className="text-xs md:text-xs text-text-secondary">Update score directly from bureaus to review latest
                logs.</p>
            </div>
          </div>
          <button data-done="false"
            className="task-cta-btn bg-primary hover:bg-opacity-95 text-dark-green font-bold text-xs md:text-xs px-4 py-2.5 rounded-full transition-all duration-200 shrink-0">
            Refresh Now
          </button>
        </div>

        {/*  Task Card 3  */}
        <div
          className="task-card bg-bg-light border border-border-light p-5 rounded-premium flex items-center justify-between gap-4 transition-all duration-300 hover:border-primary">
          <div className="flex items-center gap-4">
            <div
              className="task-status-icon w-8 h-8 rounded-full bg-white text-border-light flex items-center justify-center border border-border-light shrink-0">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-dark-green leading-snug">Set Bill Payment Reminder</h4>
              <p className="text-xs md:text-xs text-text-secondary">Never miss another utility billing date. Prevent
                delays.</p>
            </div>
          </div>
          <button data-done="false"
            className="task-cta-btn bg-primary hover:bg-opacity-95 text-dark-green font-bold text-xs md:text-xs px-4 py-2.5 rounded-full transition-all duration-200 shrink-0">
            Set Reminder
          </button>
        </div>

        {/*  Task Card 4  */}
        <div
          className="task-card bg-bg-light border border-border-light p-5 rounded-premium flex items-center justify-between gap-4 transition-all duration-300 hover:border-primary">
          <div className="flex items-center gap-4">
            <div
              className="task-status-icon w-8 h-8 rounded-full bg-white text-border-light flex items-center justify-center border border-border-light shrink-0">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-dark-green leading-snug">Reduce Credit Utilization</h4>
              <p className="text-xs md:text-xs text-text-secondary">Pay credit card dues down to bring utilization under
                30%.</p>
            </div>
          </div>
          <button data-done="false"
            className="task-cta-btn bg-primary hover:bg-opacity-95 text-dark-green font-bold text-xs md:text-xs px-4 py-2.5 rounded-full transition-all duration-200 shrink-0">
            Pay Now
          </button>
        </div>
      </div>

      {/*  Live Dashboard Progress Right  */}
      <div className="flex-1 order-1 lg:order-2 reveal">
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-6">
          Increase your Credit Score to 750+
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
          Try completing the mock checklist items on the left. See how completing steps moves your progress status.
        </p>

        {/*  Mock Plan Card  */}
        <div
          className="bg-bg-light border border-border-light rounded-premium p-6 md:p-8 shadow-premium flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-text-secondary">PLAN PROGRESS STATUS</span>
            <span
              className="font-bold text-dark-green bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider text-xs">Active
              Improvement</span>
          </div>

          {/*  Headline  */}
          <div className="space-y-1.5">
            <h4 className="text-lg md:text-xl font-black text-dark-green leading-tight">Improve credit
              by 30 points!</h4>
            <p className="text-sm text-text-secondary">Completing all 4 actions updates the bureau database registers.</p>
          </div>

          {/*  Progress track  */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-text-secondary">Completed Actions</span>
              <span id="progress-steps-text" className="text-secondary-green">00 / 04</span>
            </div>
            <div className="w-full h-3 bg-white border border-border-light rounded-full overflow-hidden p-0.5">
              <div id="progress-line-fill" className="h-full bg-secondary-green rounded-full transition-all duration-500"
                style={{'width': '0%'}}></div>
            </div>
          </div>

          {/*  Visual Node Timeline  */}
          <div className="flex items-center justify-between relative mt-2 px-1">
            <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-1/2 transform -translate-y-1/2 z-0"></div>

            <div
              className="progress-timeline-step w-7 h-7 rounded-full bg-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center relative z-10 transition-all duration-300">
              1</div>
            <div
              className="progress-timeline-step w-7 h-7 rounded-full bg-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center relative z-10 transition-all duration-300">
              2</div>
            <div
              className="progress-timeline-step w-7 h-7 rounded-full bg-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center relative z-10 transition-all duration-300">
              3</div>
            <div
              className="progress-timeline-step w-7 h-7 rounded-full bg-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center relative z-10 transition-all duration-300">
              4</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       10. GOODSCORE BENEFITS
       ====================================================  */}
  <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 lg:py-20">
    <div className="text-center max-w-2xl mx-auto mb-16 reveal">
      <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
        Why Choose GoodScore?
      </h2>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
        See how managing your finances with GoodScore makes a difference compared to standard manual checks.
      </p>
    </div>

    {/*  Comparison Table  */}
    <div className="overflow-x-auto rounded-premium border border-border-light shadow-premium bg-white reveal">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-bg-light border-b border-border-light">
            <th className="p-6 text-sm font-bold text-dark-green uppercase tracking-wider w-1/3">Feature
              Details</th>
            <th
              className="p-6 text-sm font-bold text-[#EA5E5E] uppercase tracking-wider w-1/3 bg-red-50/20">
              Without GoodScore</th>
            <th
              className="p-6 text-sm font-bold text-secondary-green uppercase tracking-wider w-1/3 bg-emerald-50/20">
              With GoodScore</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light text-xs md:text-sm text-text-primary">
          {/*  Row 1  */}
          <tr>
            <td className="p-6 font-semibold text-dark-green">Monitoring Updates</td>
            <td className="p-6 text-text-secondary bg-red-50/10">Manual checks once a year (often costs money)</td>
            <td className="p-6 font-medium bg-emerald-50/10">Real-time daily alerts, absolutely free</td>
          </tr>
          {/*  Row 2  */}
          <tr>
            <td className="p-6 font-semibold text-dark-green">Personalized Reports</td>
            <td className="p-6 text-text-secondary bg-red-50/10">Hard-to-read PDF text tables and sheets</td>
            <td className="p-6 font-medium bg-emerald-50/10">Interactive charts and card categories</td>
          </tr>
          {/*  Row 3  */}
          <tr>
            <td className="p-6 font-semibold text-dark-green">Dispute Filing</td>
            <td className="p-6 text-text-secondary bg-red-50/10">Write manual complaint letters to bureaus</td>
            <td className="p-6 font-medium bg-emerald-50/10">One-click draft generators, automated submissions</td>
          </tr>
          {/*  Row 4  */}
          <tr>
            <td className="p-6 font-semibold text-dark-green">Expert Guidance</td>
            <td className="p-6 text-text-secondary bg-red-50/10">Costly advisors or confusing forum checks</td>
            <td className="p-6 font-medium bg-emerald-50/10">On-demand chats with certified credit advisors</td>
          </tr>
          {/*  Row 5  */}
          <tr>
            <td className="p-6 font-semibold text-dark-green">Improvement Progress</td>
            <td className="p-6 text-text-secondary bg-red-50/10">No tracking or checklist guidelines</td>
            <td className="p-6 font-medium bg-emerald-50/10">Dynamic interactive task tracks and indicators</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  {/*  ====================================================
       11. EXPERT GUIDANCE SECTION
       ====================================================  */}
  <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 lg:pb-20 reveal">
    <div
      className="bg-dark-green rounded-premium p-8 md:p-12 lg:p-16 text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">

      {/*  Design Circle Elements  */}
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 top-[-50px] right-[-50px] pointer-events-none"></div>
      <div className="absolute w-48 h-48 rounded-full bg-[#2F9E44]/10 bottom-[-50px] left-[-50px] pointer-events-none">
      </div>

      {/*  Copy Column  */}
      <div className="flex-[1.2] space-y-6 text-center lg:text-left">
        <span
          className="inline-block bg-[#05572C] text-primary border border-[#0A733C] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Direct
          Advisor Support</span>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
          Need Expert Guidance?
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
          Connect with GoodScore experts and get professional assistance to resolve deep issues, clean histories, and
          improve your overall credit profile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
          <button
            className="bg-primary hover:bg-opacity-95 text-dark-green font-bold px-8 py-3.5 rounded-full transition-all duration-200">
            Chat Now
          </button>
          <button
            className="border border-white hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200">
            Book Consultation
          </button>
        </div>
      </div>

      {/*  Mockup Advisor badge right  */}
      <div className="flex-1 w-full flex justify-center">
        <div
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-premium p-6 w-full max-w-sm flex flex-col items-center gap-4 text-center">

          {/*  Avatar Icon Profile  */}
          <div
            className="relative w-20 h-20 rounded-full border-4 border-primary bg-bg-light overflow-hidden flex items-center justify-center">
            <span className="text-4xl">👨‍💼</span>
          </div>

          <div>
            <h4 className="font-bold text-white text-base">Rahul Sharma</h4>
            <p className="text-primary text-xs uppercase font-bold tracking-widest mt-0.5">Senior Credit Advisor</p>
          </div>

          <div className="flex gap-1.5 text-xs text-primary font-bold bg-[#045228] px-3.5 py-1.5 rounded-full">
            <span>★★★★★</span>
            <span className="text-white">4.9/5 Rating</span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            "We have helped over 10,000 users identify duplicate loan files and successfully dispute wrong bureau
            records."
          </p>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       12. TESTIMONIALS
       ====================================================  */}
  <section className="bg-white py-12 md:py-16 lg:py-20 border-y border-border-light">
    <div className="max-w-7xl mx-auto px-6 md:px-12">

      <div className="text-center max-w-2xl mx-auto mb-16 reveal">
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
          What Our Users Say
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          Read real stories from people who took back control of their financial profile through GoodScore.
        </p>
      </div>

      {/*  Testimonials Cards Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">

        {/*  Card 1  */}
        <div
          className="bg-bg-light border border-border-light rounded-premium p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
          <div className="space-y-4">
            {/*  Stars  */}
            <div className="text-primary text-lg font-bold">★★★★★</div>
            <p className="text-text-primary text-xs md:text-sm leading-relaxed italic">
              "My credit score increased from 640 to 770 in just 4 months. Following the action tasks checklist worked
              exactly as promised. Absolute game-changer!"
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-border-light pt-4">
            <div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-dark-green text-xs">
              AM
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-dark-green">Ananya Mishra</h4>
              <p className="text-xs text-secondary-green font-bold">Score Improved by 130 pts</p>
            </div>
          </div>
        </div>

        {/*  Card 2  */}
        <div
          className="bg-bg-light border border-border-light rounded-premium p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
          <div className="space-y-4">
            {/*  Stars  */}
            <div className="text-primary text-lg font-bold">★★★★★</div>
            <p className="text-text-primary text-xs md:text-sm leading-relaxed italic">
              "The credit report audit flagged a duplicate auto loan account I didn't recognize. Using the draft dispute
              generator, I had it removed, saving my score."
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-border-light pt-4">
            <div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-dark-green text-xs">
              VP
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-dark-green">Vikram Patel</h4>
              <p className="text-xs text-secondary-green font-bold">Dispute Resolved successfully</p>
            </div>
          </div>
        </div>

        {/*  Card 3  */}
        <div
          className="bg-bg-light border border-border-light rounded-premium p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
          <div className="space-y-4">
            {/*  Stars  */}
            <div className="text-primary text-lg font-bold">★★★★★</div>
            <p className="text-text-primary text-xs md:text-sm leading-relaxed italic">
              "Personalized plan structures are extremely clear and doable. It pointed out my high credit utilization
              details that standard bank apps never showed."
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-border-light pt-4">
            <div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-dark-green text-xs">
              RN
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-dark-green">Rohan Nair</h4>
              <p className="text-xs text-secondary-green font-bold">Score Improved to 812</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       13. FAQ SECTION
       ====================================================  */}
  <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 lg:py-20">

    <div className="text-center mb-16 reveal">
      <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
        Have questions about checks, safety, or scoring? Here are our replies.
      </p>
    </div>

    {/*  Accordion Wrapper  */}
    <div className="space-y-4 reveal">

      {/*  FAQ 1  */}
      <div className="faq-item bg-white border border-border-light rounded-premium overflow-hidden transition-colors">
        <button
          className="faq-header w-full p-6 text-left flex items-center justify-between font-bold text-dark-green text-sm md:text-base focus:outline-none">
          <span>What is GoodScore?</span>
          <span className="faq-icon text-text-secondary transition-transform duration-200">▼</span>
        </button>
        <div className="accordion-content">
          <p className="px-6 pb-6 text-xs md:text-sm text-text-secondary leading-relaxed">
            GoodScore is a premium credit management and score improvement platform. We analyze your credit histories,
            flag bureau reporting errors, and compile personalized step plans to build your financial standing.
          </p>
        </div>
      </div>

      {/*  FAQ 2  */}
      <div className="faq-item bg-white border border-border-light rounded-premium overflow-hidden transition-colors">
        <button
          className="faq-header w-full p-6 text-left flex items-center justify-between font-bold text-dark-green text-sm md:text-base focus:outline-none">
          <span>How often can I check my score?</span>
          <span className="faq-icon text-text-secondary transition-transform duration-200">▼</span>
        </button>
        <div className="accordion-content">
          <p className="px-6 pb-6 text-xs md:text-sm text-text-secondary leading-relaxed">
            You can check your score as many times as you like. We pull your logs as a "soft inquiry," meaning it has
            absolutely zero negative impact on your actual score calculation.
          </p>
        </div>
      </div>

      {/*  FAQ 3  */}
      <div className="faq-item bg-white border border-border-light rounded-premium overflow-hidden transition-colors">
        <button
          className="faq-header w-full p-6 text-left flex items-center justify-between font-bold text-dark-green text-sm md:text-base focus:outline-none">
          <span>How does score improvement work?</span>
          <span className="faq-icon text-text-secondary transition-transform duration-200">▼</span>
        </button>
        <div className="accordion-content">
          <p className="px-6 pb-6 text-xs md:text-sm text-text-secondary leading-relaxed">
            Our app analyzes critical score criteria—such as payment records, age of accounts, and credit utilization
            percentages. We then list specific tasks like adjusting bill schedules or filing error corrections to boost
            your rating step by step.
          </p>
        </div>
      </div>

      {/*  FAQ 4  */}
      <div className="faq-item bg-white border border-border-light rounded-premium overflow-hidden transition-colors">
        <button
          className="faq-header w-full p-6 text-left flex items-center justify-between font-bold text-dark-green text-sm md:text-base focus:outline-none">
          <span>Can I raise disputes directly?</span>
          <span className="faq-icon text-text-secondary transition-transform duration-200">▼</span>
        </button>
        <div className="accordion-content">
          <p className="px-6 pb-6 text-xs md:text-sm text-text-secondary leading-relaxed">
            Yes! GoodScore provides template draft dispute builders that sync directly with the Credit Bureaus, making
            filing error reports simple and fast.
          </p>
        </div>
      </div>

      {/*  FAQ 5  */}
      <div className="faq-item bg-white border border-border-light rounded-premium overflow-hidden transition-colors">
        <button
          className="faq-header w-full p-6 text-left flex items-center justify-between font-bold text-dark-green text-sm md:text-base focus:outline-none">
          <span>Is my data secure on GoodScore?</span>
          <span className="faq-icon text-text-secondary transition-transform duration-200">▼</span>
        </button>
        <div className="accordion-content">
          <p className="px-6 pb-6 text-xs md:text-sm text-text-secondary leading-relaxed">
            Absolutely. We utilize bank-grade 256-bit AES encryption alongside strict OAuth authorization models,
            ensuring your financial information remains fully private and protected at all times.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/*  ====================================================
       14. DOWNLOAD & CONTACT SECTION
       ====================================================  */}
  <section id="contact"
    className="py-12 md:py-24 bg-bg-light text-text-primary border-t border-border-light relative overflow-hidden">
    {/*  Anchor for download link  */}
    <div id="download" className="absolute top-0 left-0"></div>

    {/*  Subtle aura accents matching the page theme  */}
    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none">
    </div>
    <div className="absolute -left-24 -top-24 w-96 h-96 bg-dark-green/5 rounded-full blur-[100px] pointer-events-none">
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

      {/*  Section Header  */}
      <div className="text-center max-w-2xl mx-auto mb-12 reveal">
        <span className="bg-primary/20 text-dark-green border border-primary/30 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-5">Get The App</span>
        <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
          Ready to <span className="text-secondary-green">Improve Your Score?</span>
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          Join 100,000+ users boosting their credit scores with our free app. Download today and take control of your financial future.
        </p>
      </div>

      <div className="flex justify-center reveal">
        {/*  Download App Card  */}
        <div className="bg-dark-green text-white rounded-premium p-8 md:p-10 shadow-lg w-full max-w-md flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 18.5l-6-6m6 6l6-6m-6 6V5.5" />
            </svg>
          </div>
          <h4 className="text-xl font-black mb-3">Download GoodScore</h4>
          <p className="text-white/80 text-sm leading-relaxed mb-8">Get instant access to your credit report, personalized tips, and regular score updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a href="#"
              className="bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border border-white/10 w-full sm:w-auto">
              <svg className="h-6 w-6 fill-white shrink-0" viewBox="0 0 24 24">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.57 2.98-1.41z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Download on the</p>
                <p className="text-sm font-semibold -mt-0.5">App Store</p>
              </div>
            </a>
            <a href="#"
              className="bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border border-white/10 w-full sm:w-auto">
              <svg className="h-6 w-6 fill-white shrink-0" viewBox="0 0 24 24">
                <path
                  d="M5 3.25c-.28 0-.5.22-.5.5v16.5c0 .28.22.5.5.5.12 0 .23-.04.33-.12L12.5 14.3l-2.44-2.44-5.06-5.06L5.33 3.37c-.1-.08-.21-.12-.33-.12m9-.05l-2.88 2.88 5.13 5.13L19.5 9.1c.33-.33.33-.88 0-1.21l-5.5-5.5c-.22-.22-.44-.33-.7-.33-.1 0-.2.02-.3.05M5.63 21.05l7.7-7.7 2.88 2.88-9.25 9.25c-.27.27-.72.27-.99 0-.22-.22-.34-.52-.34-.82v-3.61zM14.5 12l5 5-2.88 2.88-5-5L14.5 12z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Get it on</p>
                <p className="text-sm font-semibold -mt-0.5">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  
    </>
  );
}

"use client";
import React, { useEffect } from 'react';
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import ReportAnalysis from "@/components/sections/ReportAnalysis";
import BillPayments from "@/components/sections/BillPayments";
import TaskPlanner from "@/components/sections/TaskPlanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ExpertGuidance from "@/components/sections/ExpertGuidance";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Trust />
      <Features />
      <HowItWorks />
      <ReportAnalysis />
      <BillPayments />
      <TaskPlanner />
      <WhyChooseUs />
      <ExpertGuidance />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}

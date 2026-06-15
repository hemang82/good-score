"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Page() {

  useEffect(() => {
    // --- 11. Contact Us Form API Integration ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const emailInput = document.getElementById('contact_email');
      const mobileInput = document.getElementById('contact_mobile');
      const emailError = document.getElementById('email-error');
      const mobileError = document.getElementById('mobile-error');
      const submitBtn = document.getElementById('submit-ticket-btn');
      const spinner = document.getElementById('loading-spinner');
      const formMessage = document.getElementById('form-message');

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const mobileRegex = /^\d{10}$/;

      emailInput.addEventListener('input', () => {
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          emailError.classList.remove('hidden');
        } else {
          emailError.classList.add('hidden');
        }
      });

      mobileInput.addEventListener('input', () => {
        if (mobileInput.value && !mobileRegex.test(mobileInput.value)) {
          mobileError.classList.remove('hidden');
        } else {
          mobileError.classList.add('hidden');
        }
      });

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(emailInput.value) || !mobileRegex.test(mobileInput.value)) {
          formMessage.textContent = 'Please fix the validation errors before submitting.';
          formMessage.className = 'rounded-lg p-4 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 mt-4';
          formMessage.classList.remove('hidden');
          return;
        }

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('contact_email', emailInput.value);
        formData.append('contact_mobile', '+91' + mobileInput.value);

        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        spinner.classList.remove('hidden');
        formMessage.classList.add('hidden');

        try {
          const response = await fetch('https://myscore.tracewavetransparency.com/api/base/ticket/contact-us', {
            method: 'POST',
            body: formData
          });

          const responseData = await response.json().catch(() => ({}));

          if (response.status === 200 && responseData.success !== false) {
            formMessage.textContent = responseData.message || 'Ticket created successfully! Our team will contact you shortly.';
            formMessage.className = 'rounded-lg p-4 text-sm font-semibold bg-green-50 text-secondary-green border border-green-200 mt-4';
            formMessage.classList.remove('hidden');
            contactForm.reset();
          } else {
            formMessage.textContent = responseData.message || 'Failed to create ticket. Please try again later.';
            formMessage.className = 'rounded-lg p-4 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 mt-4';
            formMessage.classList.remove('hidden');
          }
        } catch (error) {
          formMessage.textContent = 'Network error. Please check your connection and try again.';
          formMessage.className = 'rounded-lg p-4 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 mt-4';
          formMessage.classList.remove('hidden');
        } finally {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
          spinner.classList.add('hidden');
        }
      };

      contactForm.addEventListener('submit', handleSubmit);

      return () => {
        contactForm.removeEventListener('submit', handleSubmit);
      };
    }
  }, []);


  return (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-16">
    <div className="flex flex-col items-center mb-12 text-center">
      <h1 className="text-3xl md:text-5xl font-black text-dark-green tracking-tight mb-4">Get in Touch</h1>
      <p className="text-text-secondary text-sm md:text-base max-w-2xl">Have a question about your credit report or need help with our app? Our support team is available to assist you Monday through Friday.</p>
    </div>

    <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
      
      {/*  Contact Details  */}
      <div className="w-full lg:w-1/3 space-y-6">
        
        {/*  Address  */}
        <div className="bg-white border border-border-light rounded-premium p-6 shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-dark-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-dark-green">Our Office</h3>
          <p className="text-sm text-text-secondary">
            GoodScore Technologies Pvt. Ltd.<br />
            401, Sapphire Tower, SG Highway<br />
            Ahmedabad, Gujarat 380015, India
          </p>
        </div>

        {/*  Phone & Email  */}
        <div className="bg-white border border-border-light rounded-premium p-6 shadow-sm flex flex-col gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-dark-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-dark-green">Contact Info</h3>
          <div className="text-sm text-text-secondary space-y-1">
            <p><strong>Email:</strong> support@goodscore.in</p>
            <p><strong>Phone:</strong> +91 1800-123-4567</p>
            <p><strong>Hours:</strong> 9:00 AM to 6:00 PM (IST)</p>
          </div>
        </div>
      </div>

      {/*  Contact Form  */}
      <div className="w-full lg:w-2/3 bg-white border border-border-light rounded-premium p-8 shadow-premium">
        <h3 className="text-2xl font-bold text-dark-green mb-6">Send us a message</h3>
        
        <form id="contact-form" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="contact_email" className="text-xs font-semibold text-text-primary uppercase tracking-wide">Email Address</label>
              <input type="email" id="contact_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dark-green focus:ring-4 focus:ring-dark-green/10 transition-all duration-300 bg-bg-light" placeholder="Enter email address" />
              <p className="text-xs text-red-500 hidden mt-1" id="email-error">Please enter a valid email address.</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact_mobile" className="text-xs font-semibold text-text-primary uppercase tracking-wide">Mobile Number</label>
              <input type="text" id="contact_mobile" required pattern="^\d{10}$" maxlength="10" className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dark-green focus:ring-4 focus:ring-dark-green/10 transition-all duration-300 bg-bg-light" placeholder="Enter mobile number" />
              <p className="text-xs text-red-500 hidden mt-1" id="mobile-error">Please enter a valid 10-digit mobile number.</p>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-semibold text-text-primary uppercase tracking-wide">Title</label>
            <input type="text" id="title" required minlength="5" className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dark-green focus:ring-4 focus:ring-dark-green/10 transition-all duration-300 bg-bg-light" placeholder="Enter Title of Your Issue" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-semibold text-text-primary uppercase tracking-wide">Description</label>
            <textarea id="description" rows="5" required minlength="10" className="w-full border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dark-green focus:ring-4 focus:ring-dark-green/10 transition-all duration-300 bg-bg-light resize-none" placeholder="Enter description of your issue"></textarea>
          </div>

          <div id="form-message" className="hidden rounded-lg p-4 text-sm font-semibold"></div>

          <button type="submit" id="submit-ticket-btn" className="w-full bg-dark-green text-white font-bold text-sm px-6 py-4 rounded-premium-sm hover:bg-[#023118] transition-all duration-300 shadow-md flex items-center justify-center gap-2">
            <span>Submit Ticket</span>
            <svg id="loading-spinner" className="animate-spin h-4 w-4 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </button>
        </form>
      </div>
    </div>
  </main>
    </>
  );
}

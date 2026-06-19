"use client";

import React, { useState, useEffect } from 'react';

export default function DeleteAccountPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+91',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [apiMessage, setApiMessage] = useState('');

  // Validate fields in real-time
  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value || value.trim().length < 2) {
        error = 'Please enter your name (at least 2 characters).';
      }
    } else if (name === 'phone') {
      const phoneRegex = /^\+91\d{10}$/;
      if (!value || !phoneRegex.test(value)) {
        error = 'Please enter a valid phone number with 10 digits after +91 (e.g. +919876543210).';
      }
    } else if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value || !emailRegex.test(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (name === 'description') {
      if (!value || value.trim().length < 5) {
        error = 'Please enter a description (at least 5 characters).';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent deleting the +91 prefix from phone
    if (name === 'phone' && !value.startsWith('+91')) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation for all fields
    const newErrors = {};
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setApiMessage('');

    // Prepare API variables
    const apiData = new FormData();
    apiData.append('title', 'Delete Account Request');
    apiData.append('description', `Name: ${formData.name}\n\nRequest: Permanent Account Deletion\nReason: ${formData.description}`);
    apiData.append('contact_email', formData.email);
    apiData.append('contact_mobile', formData.phone);

    try {
      const response = await fetch('https://myscore.tracewavetransparency.com/api/base/ticket/contact-us', {
        method: 'POST',
        body: apiData
      });

      const responseData = await response.json().catch(() => ({}));

      if (response.status === 200 && responseData.success !== false) {
        setSubmitStatus('success');
        setApiMessage(responseData.message || 'Your account deletion request has been submitted successfully.');
        setFormData({
          name: '',
          phone: '+91',
          email: '',
          description: ''
        });
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus('error');
        setApiMessage(responseData.message || 'Failed to submit request. Please try again later.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setApiMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-light text-text-primary flex flex-col justify-between py-12 px-6">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/15 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary-green/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />

      {/* Main Content Form Card */}
      <main className="max-w-xl w-full mx-auto my-auto z-10 space-y-6">
        
        {/* Header Title Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-xs tracking-wider uppercase border border-red-100 shadow-sm">
            Account Security
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight">
            Delete Account Request
          </h1>
          <p className="text-text-secondary text-xs md:text-sm max-w-md leading-relaxed">
            Permanently delete your profile data, transaction history, and credit records. This action is irreversible.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-border-light rounded-premium p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {submitStatus === 'success' ? (
            <div className="text-center py-6 space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-green-50 text-secondary-green flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-dark-green">Request Submitted Successfully</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                  {apiMessage} Our security team will permanently wipe your profile and records from our database servers shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Field 1: Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wide flex items-center gap-0.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter Your Name"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all duration-300 bg-bg-light ${
                    errors.name && touched.name 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-border-light focus:border-dark-green focus:ring-dark-green/10'
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</p>
                )}
              </div>

              {/* Field 2: Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wide flex items-center gap-0.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="+91"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all duration-300 bg-bg-light ${
                    errors.phone && touched.phone 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-border-light focus:border-dark-green focus:ring-dark-green/10'
                  }`}
                />
                {errors.phone && touched.phone && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>
                )}
              </div>

              {/* Field 3: Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wide flex items-center gap-0.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter Your Email"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all duration-300 bg-bg-light ${
                    errors.email && touched.email 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-border-light focus:border-dark-green focus:ring-dark-green/10'
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>
                )}
              </div>

              {/* Field 4: Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wide flex items-center gap-0.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows="4"
                  placeholder="Enter Description"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all duration-300 bg-bg-light resize-none ${
                    errors.description && touched.description 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-border-light focus:border-dark-green focus:ring-dark-green/10'
                  }`}
                />
                {errors.description && touched.description && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">{errors.description}</p>
                )}
              </div>

              {/* API Feedback Alert */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-xs font-semibold">
                  {apiMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-dark-green hover:bg-[#023118] text-white font-bold text-sm px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span>Submitting Request...</span>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </main>

      {/* Footer Text */}
      <footer className="text-center text-[10px] text-text-secondary mt-8 max-w-xs mx-auto leading-relaxed">
        © 2026 UPSCORE Technologies Pvt. Ltd. All rights reserved. Secure bank-grade 256-bit AES encryption.
      </footer>
    </div>
  );
}

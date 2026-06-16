"use client";
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-dark-green text-white rounded-full flex items-center justify-center shadow-premium hover:scale-105 active:scale-95 transition-all duration-300 z-[999] cursor-pointer"
        aria-label="Toggle chatbot"
      >
        {/* Chat Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 absolute transition-all duration-300 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {/* Close Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Chatbot Window */}
      <div 
        className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white border border-border-light rounded-premium shadow-premium-hover flex flex-col overflow-hidden z-[999] transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'}`}
        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      >
        <ChatInterface onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
}

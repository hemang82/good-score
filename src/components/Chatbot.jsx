"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 'initial-msg', role: 'assistant', content: "Hi! I'm the UPSCORE Assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, error]);

  const sendToAI = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    const botMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: botMessageId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId ? { ...msg, content: msg.content + chunkValue } : msg
          )
        );
      }
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendToAI(suggestion);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    sendToAI(inputValue);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-dark-green text-white rounded-full flex items-center justify-center shadow-premium hover:scale-105 active:scale-95 transition-all duration-300 z-[999]"
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
        className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white border border-border-light rounded-premium shadow-premium-hover flex flex-col overflow-hidden z-[999] transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Chat Header */}
        <div className="bg-dark-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-dark-green text-xs font-bold">
              US
            </div>
            <div>
              <h4 className="font-bold text-sm">UPSCORE Assistant</h4>
              <p className="text-[10px] text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                AI Powered • Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-bg-light flex flex-col gap-4 custom-chat-scroll">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
              {msg.role !== 'user' && (
                <div className="w-6 h-6 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
              )}
              <div 
                className={
                  msg.role === 'user' 
                    ? 'bg-dark-green text-white text-sm p-3 rounded-2xl rounded-tr-sm shadow-sm whitespace-pre-wrap' 
                    : 'bg-white border border-border-light text-text-primary text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm markdown-body'
                }
              >
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 last:mb-0" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 last:mb-0" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-dark-green" {...props} />,
                      a: ({node, ...props}) => <a className="text-secondary-green underline hover:text-dark-green" {...props} />
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-6 h-6 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div className="bg-white border border-border-light p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                !
              </div>
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm">
                API Error: {error.message || "Failed to connect to AI server."}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Area */}
        <div className="px-4 py-3 bg-bg-light border-t border-border-light flex gap-2 overflow-x-auto whitespace-nowrap hide-scroll">
          {[
            "How to improve my credit score?", 
            "How does UPSCORE work?", 
            "Can I pay electricity bills?", 
            "What is the Task Planner?",
            "How to fix fake loans?"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="text-xs font-bold bg-white border border-border-light text-dark-green px-4 py-2 rounded-full hover:bg-primary/10 hover:border-primary transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleManualSubmit} className="p-3 bg-white border-t border-border-light flex items-center gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "AI is typing..." : "Type a message..."}
            className="flex-1 bg-bg-light border border-border-light text-sm px-4 py-3 rounded-full outline-none focus:border-secondary-green transition-colors disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 bg-dark-green text-white rounded-full flex items-center justify-center hover:bg-secondary-green transition-colors shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

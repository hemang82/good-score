"use client";

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// --- Contact Form Widget Component ---
const ContactFormWidget = () => {
  const [formData, setFormData] = useState({ title: '', description: '', email: '', mobile: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('contact_email', formData.email);
    data.append('contact_mobile', '+91' + formData.mobile);

    try {
      const response = await fetch('https://myscore.tracewavetransparency.com/api/base/ticket/contact-us', {
        method: 'POST',
        body: data
      });

      const responseData = await response.json().catch(() => ({}));

      if (response.status === 200 && responseData.success !== false) {
        setStatus('success');
        setMessage(responseData.message || 'Ticket created successfully! Our team will contact you shortly.');
      } else {
        setStatus('error');
        setMessage(responseData.message || 'Failed to create ticket. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-green mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-bold text-dark-green">{message}</p>
      </div>
    );
  }

  return (
    <div className="mt-3 bg-bg-light p-3 sm:p-4 rounded-xl border border-border-light">
      <h4 className="text-sm font-bold text-dark-green mb-3">Create a Support Ticket</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Issue Title" 
          required minLength="5"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full border border-border-light rounded-lg px-3 py-2 text-[13px] sm:text-sm outline-none focus:border-dark-green"
        />
        <textarea 
          placeholder="Describe your issue..." 
          required minLength="10" rows="3"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full border border-border-light rounded-lg px-3 py-2 text-[13px] sm:text-sm outline-none focus:border-dark-green resize-none"
        ></textarea>
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="w-full border border-border-light rounded-lg px-3 py-2 text-[13px] sm:text-sm outline-none focus:border-dark-green"
        />
        <input 
          type="text" 
          placeholder="10-digit Mobile Number" 
          required pattern="^\d{10}$" maxLength="10"
          value={formData.mobile}
          onChange={e => setFormData({...formData, mobile: e.target.value})}
          className="w-full border border-border-light rounded-lg px-3 py-2 text-[13px] sm:text-sm outline-none focus:border-dark-green"
        />
        
        {status === 'error' && <p className="text-xs text-red-600 font-semibold">{message}</p>}
        
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-dark-green text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-secondary-green transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-1"
        >
          {status === 'loading' ? (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
};


export default function ChatInterface({ onClose }) {
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
    scrollToBottom();
  }, [messages, error]);

  const sendToAI = async (text) => {
    if (!text.trim() || isLoading) return;

    // --- Special Intercept for 24/7 Support ---
    if (text === "24/7 Support" || text.toLowerCase().includes("contact us")) {
      const userMessage = { id: Date.now().toString(), role: 'user', content: text };
      const botMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'd be happy to connect you with our support team. Please fill out this quick form and they will get back to you:",
        type: 'contact_form' 
      };
      setMessages([...messages, userMessage, botMessage]);
      setInputValue('');
      return;
    }

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
        body: JSON.stringify({ messages: newMessages.filter(m => !m.type) }) // Don't send custom type messages to AI
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
    <div className="flex flex-col h-full w-full bg-white">
      {/* Chat Header */}
      <div className="bg-dark-green text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-dark-green text-xs font-bold">
            US
          </div>
          <div>
            <h4 className="font-bold text-[15px]">UPSCORE Assistant</h4>
            <p className="text-[11px] text-primary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              AI Powered • Online
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-bg-light flex flex-col gap-4 custom-chat-scroll">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 max-w-[85%] sm:max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
            {msg.role !== 'user' && (
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
            )}
            <div 
              className={
                msg.role === 'user' 
                  ? 'bg-dark-green text-white text-sm sm:text-[15px] p-3 sm:p-3.5 rounded-2xl rounded-tr-sm shadow-sm whitespace-pre-wrap' 
                  : 'bg-white border border-border-light text-text-primary text-sm sm:text-[15px] p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-sm markdown-body leading-relaxed w-full'
              }
            >
              {msg.role === 'user' ? (
                msg.content
              ) : (
                <>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 sm:pl-5 mb-2 last:mb-0" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 sm:pl-5 mb-2 last:mb-0" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-dark-green" {...props} />,
                      a: ({node, ...props}) => <a className="text-secondary-green underline hover:text-dark-green" {...props} />
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                  
                  {/* Conditionally render Contact Form Widget */}
                  {msg.type === 'contact_form' && <ContactFormWidget />}
                </>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <div className="bg-white border border-border-light px-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[42px] sm:h-[46px] w-fit">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-dark-green rounded-full animate-typing-bounce" style={{animationDelay: '-0.32s'}}></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-dark-green rounded-full animate-typing-bounce" style={{animationDelay: '-0.16s'}}></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-dark-green rounded-full animate-typing-bounce" style={{animationDelay: '0s'}}></span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1 font-bold text-sm">
              !
            </div>
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm sm:text-[15px] p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-sm">
              API Error: {error.message || "Failed to connect to AI server."}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Area */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-bg-light border-t border-border-light flex gap-2 overflow-x-auto whitespace-nowrap hide-scroll shrink-0">
        {[
          "24/7 Support",
          "How to improve my credit score?", 
          "How does UPSCORE work?", 
          "Can I pay electricity bills?", 
          "What is the Task Planner?"
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading}
            className="text-xs sm:text-[13px] font-bold bg-white border border-border-light text-dark-green px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-primary/10 hover:border-primary transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleManualSubmit} className="p-2.5 sm:p-3 pb-safe bg-white border-t border-border-light flex items-center gap-2 shrink-0">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          placeholder={isLoading ? "AI is typing..." : "Type a message..."}
          className="flex-1 bg-bg-light border border-border-light text-sm sm:text-[15px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-full outline-none focus:border-secondary-green transition-colors disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-dark-green text-white rounded-full flex items-center justify-center hover:bg-secondary-green transition-colors shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

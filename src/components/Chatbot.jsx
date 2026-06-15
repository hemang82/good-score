"use client";
import React, { useState, useEffect, useRef } from 'react';

const faqRules = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "kem cho", "namaste", "hola", "helo", "hiii", "heyy"],
    response: "Hello there! Welcome to GoodScore. How can I help you improve your credit score today?"
  },
  {
    keywords: ["thanks", "thank you", "ok", "okay", "thx", "tq", "dhanyavad", "aabhar", "kk", "okkk"],
    response: "You're welcome! Let me know if you need help with anything else."
  },
  {
    keywords: ["how are you", "hw r u", "kaise ho", "kem cho"],
    response: "I'm just a chatbot, but I'm doing great! Ready to help you with your credit score. What do you need?"
  },
  {
    keywords: ["what is goodscore", "about goodscore", "who are you", "what do you do", "su che goodscore", "goodscore kya hai", "goodscor", "godscore", "good score"],
    response: "GoodScore is a premium credit management platform designed to help you analyze, correct, and build your credit profile sustainably. We help you reach a 750+ score!"
  },
  {
    keywords: ["how it works", "how to use", "process", "work", "kevi rite kam kare", "kaise kaam karta hai", "kam", "workk", "prosess"],
    response: "It's simple: 1) Check your score for free. 2) Follow our personalized tasks (like reducing utilization or paying bills). 3) Dispute any errors. 4) Watch your score grow!"
  },
  {
    keywords: ["check score", "check my score", "free score", "know my score", "cibil", "sibil", "score check", "scor check", "chek score", "scoor", "scre", "experian", "equifax"],
    response: "You can check your CIBIL and Experian score for free instantly! Just click the 'Check Your Score Free' button at the top of the page."
  },
  {
    keywords: ["is it accurate", "real score", "saacho score", "sachu", "genuine", "acurate", "acurat"],
    response: "Yes! We fetch your credit report directly from top credit bureaus like CIBIL, Experian, and Equifax. It's 100% accurate and official."
  },
  {
    keywords: ["dispute", "error", "wrong", "mistake", "fix score", "bhul", "galat", "wrong entry", "fake loan", "fraud loan", "duplicat", "duplicate", "disput", "frod"],
    response: "Found a fake loan or wrong entry? We provide dispute templates directly in our app to help you report it to the bureaus and get it removed quickly."
  },
  {
    keywords: ["how much time to fix", "ketlo time", "kitna time", "update time", "score update"],
    response: "Bureau updates and dispute resolutions typically take anywhere from 30 to 45 days to reflect on your official credit report."
  },
  {
    keywords: ["pricing", "cost", "fee", "free", "how much", "ketla rupiya", "paisa", "paise", "price", "charg", "charge", "subscription", "plan"],
    response: "Checking your basic credit score is 100% FREE! We also offer premium personalized plans if you want advanced, step-by-step guidance to reach 750+ faster."
  },
  {
    keywords: ["safe", "security", "privacy", "secure", "data", "scam", "safe che", "safe hai", "secur", "privcy", "hacked", "leak"],
    response: "Your data is completely safe. We use bank-grade 256-bit AES encryption. We NEVER sell your data to third parties or spam you with loan calls."
  },
  {
    keywords: ["pan card", "pancard", "pan number", "pan details"],
    response: "We need your PAN card number securely just once to fetch your official credit report from the bureaus. It is fully encrypted and safe."
  },
  {
    keywords: ["contact", "support", "help", "email", "phone", "call", "customer care", "number", "helpline", "madad", "suport"],
    response: "You can reach our support team by scrolling to the Contact section at the bottom, or emailing us directly at support@goodscore.in. We reply within 24 hours!"
  },
  {
    keywords: ["download", "app", "play store", "app store", "install", "apk", "ios", "android", "dwnlod", "downlod", "mobile app"],
    response: "You can download the GoodScore app from the Apple App Store or Google Play Store. You'll find the download links in the footer or the Contact section!"
  }
];

const defaultResponse = "I didn't quite catch that. Try asking about checking your score, our pricing, how to dispute errors, or app security!";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the GoodScore Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), text, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");

    // Determine bot response
    const lowerText = text.toLowerCase();
    let botResponse = defaultResponse;

    for (const rule of faqRules) {
      if (rule.keywords.some(keyword => lowerText.includes(keyword))) {
        botResponse = rule.response;
        break;
      }
    }

    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
    }, 600);
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
        className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[550px] max-h-[80vh] bg-white border border-border-light rounded-premium shadow-premium-hover flex flex-col overflow-hidden z-[999] transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Chat Header */}
        <div className="bg-dark-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-dark-green text-xs font-bold">
              GS
            </div>
            <div>
              <h4 className="font-bold text-sm">GoodScore Assistant</h4>
              <p className="text-[10px] text-primary">Online • Rule-based</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-bg-light flex flex-col gap-3 custom-chat-scroll">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : ''}`}>
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
              )}
              <div className={msg.sender === 'user' ? 'bg-dark-green text-white text-sm p-3 rounded-2xl rounded-tr-sm shadow-sm' : 'bg-white border border-border-light text-text-primary text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm'}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Area */}
        <div className="px-4 py-2 bg-bg-light border-t border-border-light flex gap-2 overflow-x-auto whitespace-nowrap hide-scroll">
          {["What is GoodScore?", "Check Score", "Dispute Error", "Pricing"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              className="text-xs bg-white border border-border-light text-dark-green px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary transition-colors shrink-0"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-border-light flex items-center gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Type a message..."
            className="flex-1 bg-bg-light border border-border-light text-sm px-4 py-2.5 rounded-full outline-none focus:border-secondary-green transition-colors"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            className="w-10 h-10 bg-dark-green text-white rounded-full flex items-center justify-center hover:bg-secondary-green transition-colors shrink-0 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

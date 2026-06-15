document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Blur and shadow on scroll ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('glass-nav', 'premium-shadow');
      header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      header.classList.remove('glass-nav', 'premium-shadow');
      header.classList.add('bg-transparent', 'border-transparent');
    }
  });

  // --- 2. Scroll Reveal Observer ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // --- 3. Stats Counter Animation ---
  const statsElements = document.querySelectorAll('.stat-number');
  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    const isDecimal = el.getAttribute('data-decimal') === 'true';

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
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
  }, {
    threshold: 0.5
  });

  statsElements.forEach(stat => statsObserver.observe(stat));

  // --- 4. Interactive Credit Report Tabs ---
  const filterTabs = document.querySelectorAll('.report-filter-tab');
  const subTabs = document.querySelectorAll('.report-sub-tab');
  const accountCards = document.querySelectorAll('.account-card');
  const highUtilizationSection = document.getElementById('high-utilization-section');
  const otherActiveSection = document.getElementById('other-active-section');
  const closedAccountsSection = document.getElementById('closed-accounts-section');

  // Main Tabs (All, Loans, Cards)
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

  // Sub Tabs (High Usage, Other, Closed)
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
        highUtilizationSection.classList.remove('hidden');
        otherActiveSection.classList.add('hidden');
        closedAccountsSection.classList.add('hidden');
      } else if (tabVal === 'other') {
        highUtilizationSection.classList.add('hidden');
        otherActiveSection.classList.remove('hidden');
        closedAccountsSection.classList.add('hidden');
      } else if (tabVal === 'closed') {
        highUtilizationSection.classList.add('hidden');
        otherActiveSection.classList.add('hidden');
        closedAccountsSection.classList.remove('hidden');
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
        // Mark as completed
        btn.setAttribute('data-done', 'true');
        btn.textContent = '✓ Completed';
        btn.classList.remove('bg-primary', 'hover:bg-opacity-90', 'text-dark-green');
        btn.classList.add('bg-dark-green', 'text-white', 'cursor-default');
        
        // Update checkmark state icon in the card
        const checkIcon = taskCard.querySelector('.task-status-icon');
        if (checkIcon) {
          checkIcon.classList.remove('bg-white', 'text-border-light');
          checkIcon.classList.add('bg-secondary-green', 'text-white');
          checkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        }

        completedTasksCount++;
        updateProgress();
      }
    });
  });

  function updateProgress() {
    if (progressStepsText && progressLine) {
      const formattedCount = completedTasksCount < 10 ? `0${completedTasksCount}` : completedTasksCount;
      progressStepsText.textContent = `${formattedCount} / 04`;
      
      const percentage = (completedTasksCount / totalTasks) * 100;
      progressLine.style.width = `${percentage}%`;

      // Visual steps indicator on timeline (the check circles)
      const timelineSteps = document.querySelectorAll('.progress-timeline-step');
      for (let i = 0; i < completedTasksCount; i++) {
        if (timelineSteps[i]) {
          timelineSteps[i].classList.add('bg-secondary-green', 'text-white');
          timelineSteps[i].classList.remove('bg-gray-200', 'text-gray-400');
          timelineSteps[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        }
      }
    }
  }

  // --- 6. FAQ Accordion ---
  const accordionHeaders = document.querySelectorAll('.faq-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');
      const isOpen = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
          otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
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
    });
  });



  // --- 8. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>`;
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>`;
      });
    });
  }

  // --- 9. Custom Rule-Based Chatbot Logic ---
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotIconChat = document.getElementById('chatbot-icon-chat');
  const chatbotIconClose = document.getElementById('chatbot-icon-close');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const suggestionChips = document.querySelectorAll('.chat-suggestion');

  // FAQ Dictionary Mapping
  const faqRules = [
    // Greetings & Politeness
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
    
    // About GoodScore
    {
      keywords: ["what is goodscore", "about goodscore", "who are you", "what do you do", "su che goodscore", "goodscore kya hai", "goodscor", "godscore", "good score"],
      response: "GoodScore is a premium credit management platform designed to help you analyze, correct, and build your credit profile sustainably. We help you reach a 750+ score!"
    },
    {
      keywords: ["how it works", "how to use", "process", "work", "kevi rite kam kare", "kaise kaam karta hai", "kam", "workk", "prosess"],
      response: "It's simple: 1) Check your score for free. 2) Follow our personalized tasks (like reducing utilization or paying bills). 3) Dispute any errors. 4) Watch your score grow!"
    },

    // Checking Score (CIBIL/Experian)
    {
      keywords: ["check score", "check my score", "free score", "know my score", "cibil", "sibil", "score check", "scor check", "chek score", "scoor", "scre", "experian", "equifax"],
      response: "You can check your CIBIL and Experian score for free instantly! Just click the 'Check Your Score Free' button at the top of the page."
    },
    {
      keywords: ["is it accurate", "real score", "saacho score", "sachu", "genuine", "acurate", "acurat"],
      response: "Yes! We fetch your credit report directly from top credit bureaus like CIBIL, Experian, and Equifax. It's 100% accurate and official."
    },

    // Disputes & Errors
    {
      keywords: ["dispute", "error", "wrong", "mistake", "fix score", "bhul", "galat", "wrong entry", "fake loan", "fraud loan", "duplicat", "duplicate", "disput", "frod"],
      response: "Found a fake loan or wrong entry? We provide dispute templates directly in our app to help you report it to the bureaus and get it removed quickly."
    },
    {
      keywords: ["how much time to fix", "ketlo time", "kitna time", "update time", "score update"],
      response: "Bureau updates and dispute resolutions typically take anywhere from 30 to 45 days to reflect on your official credit report."
    },

    // Pricing & Plans
    {
      keywords: ["pricing", "cost", "fee", "free", "how much", "ketla rupiya", "paisa", "paise", "price", "charg", "charge", "subscription", "plan"],
      response: "Checking your basic credit score is 100% FREE! We also offer premium personalized plans if you want advanced, step-by-step guidance to reach 750+ faster."
    },

    // Security & Privacy
    {
      keywords: ["safe", "security", "privacy", "secure", "data", "scam", "safe che", "safe hai", "secur", "privcy", "hacked", "leak"],
      response: "Your data is completely safe. We use bank-grade 256-bit AES encryption. We NEVER sell your data to third parties or spam you with loan calls."
    },
    {
      keywords: ["pan card", "pancard", "pan number", "pan details"],
      response: "We need your PAN card number securely just once to fetch your official credit report from the bureaus. It is fully encrypted and safe."
    },

    // Contact & Support
    {
      keywords: ["contact", "support", "help", "email", "phone", "call", "customer care", "number", "helpline", "madad", "suport"],
      response: "You can reach our support team by scrolling to the Contact section at the bottom, or emailing us directly at support@goodscore.com. We reply within 24 hours!"
    },
    {
      keywords: ["address", "location", "office", "kya aavelu che", "kaha hai"],
      response: "Our headquarters are located at GoodScore Tower, Tech Park, Mumbai, India."
    },

    // App Download
    {
      keywords: ["download", "app", "play store", "app store", "install", "apk", "ios", "android", "dwnlod", "downlod", "mobile app"],
      response: "You can download the GoodScore app from the Apple App Store or Google Play Store. You'll find the download links in the footer or the Contact section!"
    },

    // Specific Feature Questions
    {
      keywords: ["utilization", "credit limit", "limit", "30%", "use limit"],
      response: "Keeping your credit card utilization below 30% of your total limit is crucial for a good score. We help you track this easily!"
    },
    {
      keywords: ["late payment", "missed payment", "baki", "due", "emi", "bill pay"],
      response: "A single late payment can drop your score significantly. Use our 'Set Bill Payment Reminder' feature so you never miss a due date again."
    }
  ];

  const defaultResponse = "I didn't quite catch that. Try asking about checking your score, our pricing, how to dispute errors, or app security!";

  // Toggle Chat Window
  function openChat() {
    chatbotWindow.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
    chatbotWindow.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
    if(chatbotIconChat) {
      chatbotIconChat.classList.add('opacity-0', 'scale-50');
      chatbotIconChat.classList.remove('opacity-100', 'scale-100');
    }
    if(chatbotIconClose) {
      chatbotIconClose.classList.remove('opacity-0', 'scale-50', 'hidden');
      chatbotIconClose.classList.add('opacity-100', 'scale-100');
    }
  };

  const closeChat = () => {
    chatbotWindow.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
    chatbotWindow.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
    if(chatbotIconChat) {
      chatbotIconChat.classList.remove('opacity-0', 'scale-50');
      chatbotIconChat.classList.add('opacity-100', 'scale-100');
    }
    if(chatbotIconClose) {
      chatbotIconClose.classList.add('opacity-0', 'scale-50');
      chatbotIconClose.classList.remove('opacity-100', 'scale-100');
    }
  };

  if (chatbotToggle && chatbotWindow && chatbotClose) {
    chatbotToggle.addEventListener('click', () => {
      if (chatbotWindow.classList.contains('scale-100')) {
        closeChat();
      } else {
        openChat();
      }
    });
    chatbotClose.addEventListener('click', closeChat);
  }

  // Add a message to the UI
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'flex items-start gap-2 max-w-[85%] self-end flex-row-reverse' : 'flex items-start gap-2 max-w-[85%]';
    
    let avatarHTML = '';
    let bubbleClass = '';

    if (sender === 'user') {
      bubbleClass = 'bg-dark-green text-white text-sm p-3 rounded-2xl rounded-tr-sm shadow-sm';
      avatarHTML = ''; // No avatar for user to save space and look cleaner
    } else {
      bubbleClass = 'bg-white border border-border-light text-text-primary text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm';
      avatarHTML = `
        <div class="w-6 h-6 bg-dark-green text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" /></svg>
        </div>
      `;
    }

    messageDiv.innerHTML = `
      ${avatarHTML}
      <div class="${bubbleClass}">
        ${text}
      </div>
    `;

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto scroll
  }

  // Process User Input
  function processInput(text) {
    if (!text.trim()) return;

    // 1. Show user message
    addMessage(text, 'user');
    chatbotInput.value = '';

    // 2. Determine bot response
    const lowerText = text.toLowerCase();
    let botResponse = defaultResponse;

    for (const rule of faqRules) {
      // Check if any keyword matches the user input
      if (rule.keywords.some(keyword => lowerText.includes(keyword))) {
        botResponse = rule.response;
        break;
      }
    }

    // 3. Simulate short typing delay then show bot message
    setTimeout(() => {
      addMessage(botResponse, 'bot');
    }, 600);
  }

  // Event Listeners for Input
  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', () => {
      processInput(chatbotInput.value);
    });

    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        processInput(chatbotInput.value);
      }
    });
  }

  // Event Listeners for Suggestion Chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      processInput(chip.textContent);
    });
  });

  // --- 10. WebView Integration (?app=true) ---
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('app') === 'true') {
    // Hide Header and Footer globally
    const style = document.createElement('style');
    style.innerHTML = `
      header, footer, #chatbot-toggle, #chatbot-window { display: none !important; }
      body { padding-top: 0 !important; }
      /* Adjust top padding for main content sections since header is gone */
      main, .pt-32, .pt-24 { padding-top: 2rem !important; }
    `;
    document.head.appendChild(style);
  }

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

    // Validation Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;

    // Real-time validation
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

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Final validation check
      if (!emailRegex.test(emailInput.value) || !mobileRegex.test(mobileInput.value)) {
        formMessage.textContent = 'Please fix the validation errors before submitting.';
        formMessage.className = 'rounded-lg p-4 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 mt-4';
        formMessage.classList.remove('hidden');
        return;
      }

      // Prepare payload as FormData
      const formData = new FormData();
      formData.append('title', document.getElementById('title').value);
      formData.append('description', document.getElementById('description').value);
      formData.append('contact_email', emailInput.value);
      formData.append('contact_mobile', '+91' + mobileInput.value);

      // UI Loading State
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      spinner.classList.remove('hidden');
      formMessage.classList.add('hidden');

      try {
        // API Endpoint with base URL
        const response = await fetch('https://myscore.tracewavetransparency.com/api/base/ticket/contact-us', {
          method: 'POST',
          headers: {
            // 'Authorization': 'Bearer YOUR_TOKEN' // Uncomment and add your token here if required
            // Note: Do NOT set Content-Type header when sending FormData. Browser automatically sets it with boundary.
          },
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
        // Restore UI state
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        spinner.classList.add('hidden');
      }
    });
  }

});

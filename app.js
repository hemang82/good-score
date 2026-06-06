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
});

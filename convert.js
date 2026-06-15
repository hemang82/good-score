const fs = require('fs');

const html = fs.readFileSync('legacy_html/index.html', 'utf8');

// Extract the body content between the hero section and the footer
let startIndex = html.indexOf('<!-- ====================================================');
startIndex = html.indexOf('2. HERO SECTION', startIndex);
startIndex = html.lastIndexOf('<!--', startIndex);

let endIndex = html.indexOf('15. FOOTER');
endIndex = html.lastIndexOf('<!--', endIndex);

let bodyHtml = html.substring(startIndex, endIndex);

// Convert HTML to JSX
bodyHtml = bodyHtml
  .replace(/class=/g, 'className=')
  .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
  .replace(/stroke-width/g, 'strokeWidth')
  .replace(/stroke-linecap/g, 'strokeLinecap')
  .replace(/stroke-linejoin/g, 'strokeLinejoin')
  .replace(/stroke-dasharray/g, 'strokeDasharray')
  .replace(/stroke-dashoffset/g, 'strokeDashoffset')
  .replace(/fill-rule/g, 'fillRule')
  .replace(/clip-rule/g, 'clipRule')
  .replace(/font-family/g, 'fontFamily')
  .replace(/font-size/g, 'fontSize')
  .replace(/font-weight/g, 'fontWeight')
  .replace(/text-anchor/g, 'textAnchor')
  .replace(/letter-spacing/g, 'letterSpacing')
  .replace(/style="([^"]+)"/g, (match, p1) => {
    // Basic inline style to object converter for style="width: 35.7%;"
    const styleObj = {};
    p1.split(';').forEach(rule => {
      const parts = rule.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        const value = parts[1].trim();
        styleObj[key] = value;
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

// Fix unclosed tags (simplified for known tags in this HTML)
bodyHtml = bodyHtml.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
bodyHtml = bodyHtml.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
bodyHtml = bodyHtml.replace(/<br>/g, '<br />');
bodyHtml = bodyHtml.replace(/<hr>/g, '<hr />');

// Remove SVG errors where xmlns:xlink is used but not defined or unsupported attributes
// N/A for this file.

const pageComponent = `"use client";
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
            checkIcon.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>\`;
          }

          completedTasksCount++;
          if (progressStepsText && progressLine) {
            const formattedCount = completedTasksCount < 10 ? \`0\${completedTasksCount}\` : completedTasksCount;
            progressStepsText.textContent = \`\${formattedCount} / 04\`;
            
            const percentage = (completedTasksCount / totalTasks) * 100;
            progressLine.style.width = \`\${percentage}%\`;

            const timelineSteps = document.querySelectorAll('.progress-timeline-step');
            for (let i = 0; i < completedTasksCount; i++) {
              if (timelineSteps[i]) {
                timelineSteps[i].classList.add('bg-secondary-green', 'text-white');
                timelineSteps[i].classList.remove('bg-gray-200', 'text-gray-400');
                timelineSteps[i].innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>\`;
              }
            }
          }
        }
      });
    });
  }, []);

  return (
    <>
      ${bodyHtml}
    </>
  );
}
\`;

fs.writeFileSync('src/app/page.jsx', pageComponent);
console.log('Conversion completed successfully!');

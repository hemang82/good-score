"use client";
import React, { useState, useEffect } from 'react';

export default function TaskPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Check Credit Report Errors', desc: 'Check for wrong address logs or duplicate account flags.', done: false },
    { id: 2, title: 'Refresh Credit Score', desc: 'Update score directly from bureaus to review latest logs.', done: false },
    { id: 3, title: 'Set Bill Payment Reminder', desc: 'Never miss another utility billing date. Prevent delays.', done: false },
    { id: 4, title: 'Reduce Credit Utilization', desc: 'Pay credit card dues down to bring utilization under 30%.', done: false }
  ]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completed = tasks.filter(t => t.done).length;
    setProgress((completed / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <section id="improvement-plan" className="bg-bg-light py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Interactive Checklist Left */}
        <div className="flex-1 w-full space-y-5 order-2 lg:order-1 reveal">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-secondary-green font-bold text-xs tracking-wider uppercase mb-4 border border-border-light shadow-sm">Gamified Experience</span>
            <h2 className="text-3xl md:text-4xl font-black text-dark-green tracking-tight mb-4">
              Interactive Task Planner
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Knock out these high-priority tasks to see an immediate boost in your credit profile. Watch your progress grow in real time.
            </p>
          </div>

          <div className="space-y-4 relative">
            {/* Connecting line behind tasks */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-border-light -z-10" />

            {tasks.map((task) => (
              <div key={task.id} className={`bg-white border p-5 rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-500 shadow-sm hover:shadow-md ${task.done ? 'border-secondary-green/30 bg-[#F4FCF5]' : 'border-border-light hover:border-primary'}`}>
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-all duration-500 ${task.done ? 'bg-secondary-green border-secondary-green/20 text-white shadow-[0_0_15px_rgba(47,158,68,0.4)]' : 'bg-white border-bg-light text-border-light'}`}>
                    {task.done ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-[bounce_0.5s_ease-out]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm md:text-base font-bold transition-colors duration-300 ${task.done ? 'text-secondary-green line-through opacity-70' : 'text-dark-green'}`}>{task.title}</h4>
                    <p className={`text-xs md:text-sm transition-opacity duration-300 ${task.done ? 'text-secondary-green/70' : 'text-text-secondary'}`}>{task.desc}</p>
                  </div>
                </div>

                <button 
                  onClick={() => !task.done && toggleTask(task.id)}
                  className={`shrink-0 font-bold text-xs md:text-sm px-6 py-3 rounded-full transition-all duration-300 ${task.done ? 'bg-secondary-green/10 text-secondary-green cursor-default' : 'bg-dark-green text-white hover:bg-secondary-green hover:shadow-lg hover:-translate-y-0.5'}`}
                >
                  {task.done ? 'Completed ✓' : 'Do It Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Dashboard Progress Right */}
        <div className="flex-1 w-full order-1 lg:order-2 reveal relative perspective-1000">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />

          <div className="bg-white border-4 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[32px] p-8 flex flex-col items-center justify-center transform lg:rotate-y-[5deg] hover:rotate-y-0 transition-transform duration-700">
            
            <h4 className="font-black text-dark-green text-lg mb-8 text-center uppercase tracking-wider">Plan Progress</h4>

            {/* Circular Progress Bar */}
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F0F2F0" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progress-gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} className="transition-all duration-1000 ease-out" />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C7F041" />
                    <stop offset="100%" stopColor="#2F9E44" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-dark-green tabular-nums transition-all duration-500">{Math.round(progress)}%</span>
                <span className="text-[10px] text-text-secondary font-bold tracking-wider uppercase">Completed</span>
              </div>
            </div>

            <div className="w-full bg-bg-light rounded-[16px] p-4 flex justify-between items-center border border-border-light">
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary font-medium">Tasks Done</span>
                <span className="font-black text-dark-green text-xl tabular-nums">{completedCount} / {tasks.length}</span>
              </div>
              <div className="h-8 w-px bg-border-light" />
              <div className="flex flex-col text-right">
                <span className="text-xs text-text-secondary font-medium">Score Boost</span>
                <span className="font-black text-secondary-green text-xl tabular-nums">+{completedCount * 12} pts</span>
              </div>
            </div>
            
            {progress === 100 && (
              <div className="mt-6 w-full p-4 bg-gradient-to-r from-secondary-green to-dark-green text-white rounded-xl text-center font-bold text-sm animate-fade-in shadow-lg">
                🎉 Awesome! You've completed your daily goals.
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

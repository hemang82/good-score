"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  // We want to hide header, footer, and floating chatbot on the standalone mobile chat page
  const isMobileChat = pathname === '/mobile-chat';

  return (
    <>
      {!isMobileChat && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isMobileChat && <Footer />}
      {!isMobileChat && <Chatbot />}
    </>
  );
}

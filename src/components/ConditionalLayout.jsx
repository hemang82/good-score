"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

function LayoutContent({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAppMode, setIsAppMode] = useState(false);

  useEffect(() => {
    setIsAppMode(searchParams.get('app') === 'true');
  }, [searchParams, pathname]);

  const isMobileChat = pathname === '/mobile-chat';
  const isAdminRoute = pathname?.startsWith('/admin-chats') || pathname?.startsWith('/admin');
  const shouldHideLayout = isMobileChat || isAppMode || isAdminRoute;

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!shouldHideLayout && <Footer />}
      {!shouldHideLayout && <Chatbot />}
    </>
  );
}

export default function ConditionalLayout({ children }) {
  return (
    <Suspense fallback={<main className="flex-1">{children}</main>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}

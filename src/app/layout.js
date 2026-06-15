import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "GoodScore - Improve Your Credit Score & Download Credit Reports",
  description: "Check your credit score for free, improve your credit health, track reports, and receive personalized improvement plans with GoodScore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-bg-light text-text-primary selection:bg-primary selection:text-dark-green relative w-full">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

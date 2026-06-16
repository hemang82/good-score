// Trigger Vercel deploy: SEO & Chatbot Updates
import { Lato } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  title: "UPSCORE - Improve Your Credit Score & Download Credit Reports",
  description: "Check your credit score for free, improve your credit health, track reports, and receive personalized improvement plans with UPSCORE.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UPSCORE",
              "url": "https://upscore.in",
              "logo": "https://upscore.in/upscore-logo.png",
              "description": "Improve your credit score, download reports, track utilization, and receive personalized plans with UPSCORE.",
              "sameAs": []
            })
          }}
        />
      </head>
      <body className={`${lato.className} min-h-full flex flex-col bg-bg-light text-text-primary relative w-full`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}


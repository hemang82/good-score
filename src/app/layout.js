import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata = {
  title: "UPSCORE - Improve Your Credit Score & Download Credit Reports",
  description: "Check your credit score for free, improve your credit health, track reports, and receive personalized improvement plans with UPSCORE.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-bg-light text-text-primary selection:bg-primary selection:text-dark-green relative w-full">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}

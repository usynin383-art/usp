import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uptime Status Page", 
  description: "B2B SaaS Monitoring Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className='flex flex-1'>
            <Sidebar />
            <main className="flex-1 p-6 md:pl-72 transition-all duration-200"> 
              <div className="mx-auto max-w-5xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

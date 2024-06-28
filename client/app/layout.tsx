import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recents",
  description: "An AI app to provide latest news summaries.",
  metadataBase: new URL('https://recents-news.vercel.app'),
  openGraph: {
    title: "Recents • Your daily news. Summarized with Generative-AI",
    description: "Get latest news & news summaries with the power of AI.",
    url: "https://recents-news.vercel.app",
    images: {
      url: "/opengraph-image.png",
      width: 1920,
      height: 960,
      alt: "Recents | News summaries generated with AI",
    },
    siteName: "Recent's news."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <AuthProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster />
          </body>
        </AuthProvider>
      </html>
    </ClerkProvider>
  );
}


"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import HomeBg from "@/components/HomeBg";
import "animate.css/animate.min.css";
import Snow from "@/components/snow";
import { createContext, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

interface GlobalContextType {
  themeRef: React.RefObject<HTMLDivElement | null>;
}

export const GlobalContext = createContext<GlobalContextType>({
  themeRef: { current: null },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeRef = useRef<HTMLDivElement | null>(null);

  return (
    <html lang="en">
      <body className={`${inter.className} "overflow-hidden min-h-screen"`}>
        <GlobalContext.Provider value={{ themeRef }}>
          <HomeBg>
            <Snow></Snow>
            <Navbar />
            <div ref={themeRef} className="w-full h-[90vh] z-50">
              {children}
            </div>
          </HomeBg>
        </GlobalContext.Provider>
      </body>
    </html>
  );
}

"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import queryClient from "./queryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
            <QueryClientProvider client={queryClient}>
                  <div className="h-screen w-screen">
                    {children}
                  </div>
            </QueryClientProvider>
      </body>
    </html>
  );
};
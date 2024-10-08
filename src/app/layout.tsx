import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartProvider";
import { CategoryProvider } from "@/context/CategoryProvide";
import { FilterProductProvider } from "@/context/FilterProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <FilterProductProvider>
        <CategoryProvider>
          <CartProvider>
            <html lang="en">
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                <div className="">
                  <Navbar />
                </div>
                <main>
                  {children}
                  <Toaster />
                </main>
              </body>
            </html>
          </CartProvider>
        </CategoryProvider>
      </FilterProductProvider>
    </AuthProvider>
  );
}

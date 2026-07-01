import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import CartDrawer from "./components/CartDrawer";
import LayloPopup from "./components/LayloPopup";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "TGBEAM",
  description: "Official site for TGBEAM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hero-poster.jpg" />
        <link
          rel="preload"
          as="video"
          href="/videos/hero-night-shift-pc.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/hero-night-shift-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
      </head>
      <body
        className="min-h-screen bg-white text-black font-sans antialiased"
      >
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-white text-zinc-900">
            <Navigation />
            <main className="flex-1">{children}</main>
            <footer className="w-full py-6 border-t border-zinc-200">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-600">
                © {currentYear} TGBEAM. All rights reserved.
              </div>
            </footer>
          </div>
          <CartDrawer />
          <LayloPopup />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}

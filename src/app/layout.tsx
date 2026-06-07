import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "The Rustic Spoon | Premium Farm-to-Table Dining in Napa Valley",
  description: "Experience The Rustic Spoon, Napa Valley's premier farm-to-table restaurant. Enjoy wood-fired cuisine, local seasonal ingredients, and an exclusive private dining experience.",
  keywords: ["Napa Valley restaurant", "farm to table", "premium dining", "private dining", "fine dining Napa", "wood fired cuisine"],
  openGraph: {
    title: "The Rustic Spoon | Farm to Table Dining",
    description: "Authentic premium farm-to-table dining experience in Napa Valley.",
    url: "https://therusticspoon.com",
    siteName: "The Rustic Spoon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "The Rustic Spoon Dining Room",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rustic Spoon | Premium Dining",
    description: "Napa Valley's premier farm-to-table restaurant.",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥄</text></svg>" />
      </head>
      <body className={`${lato.variable} ${playfair.variable} antialiased`} style={{ cursor: 'none' }}>
        {/* Custom cursor — hidden on touch / mobile devices */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        {/* Restore normal cursor on mobile */}
        <style>{`@media (max-width: 767px) { * { cursor: auto !important; } }`}</style>
        {children}
      </body>
    </html>
  );
}

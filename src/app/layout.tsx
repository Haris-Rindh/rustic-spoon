import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "The Rustic Spoon | Farm to Table",
  description: "The Rustic Spoon - Authentic farm-to-table dining experience in Napa Valley. Wood-fired cuisine, local ingredients, and warm hospitality.",
  openGraph: {
    title: "The Rustic Spoon | Farm to Table",
    description: "The Rustic Spoon - Authentic farm-to-table dining experience in Napa Valley. Wood-fired cuisine, local ingredients, and warm hospitality.",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  }
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
        <script src="https://unpkg.com/lucide@latest" defer></script>
      </head>
      <body className={`${lato.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

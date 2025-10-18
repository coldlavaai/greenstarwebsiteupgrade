import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { draftMode } from 'next/headers';
import { VisualEditing } from '@/components/VisualEditing';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Greenstar Solar - Premium Solar Panel & Battery Storage Solutions UK",
  description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses. Get your free survey today. MCS certified installers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = draftMode().isEnabled

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}

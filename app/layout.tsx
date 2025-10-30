import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { draftMode } from 'next/headers';
import { VisualEditing } from '@/components/VisualEditing';
import { ThemeProvider } from '@/components/ThemeProvider';
import VapiTextChat from '@/components/VapiTextChat';

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
  description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses. Get your free survey today.",
  openGraph: {
    title: "Greenstar Solar - Premium Solar Solutions",
    description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses.",
    url: "https://greenstarwebsiteupgrade.vercel.app",
    siteName: "Greenstar Solar",
    images: [
      {
        url: "https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png",
        width: 1200,
        height: 630,
        alt: "Greenstar Solar - Premium Solar Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenstar Solar - Premium Solar Solutions",
    description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses.",
    images: ["https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"],
  },
  themeColor: "#000000",
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
        <ThemeProvider>
          {children}
          {isDraftMode && <VisualEditing />}
          <VapiTextChat />
        </ThemeProvider>
      </body>
    </html>
  );
}

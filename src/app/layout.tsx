import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import RedirectWrapper from "@/components/RedirectWrapper";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Microsoft Innovation Club | VIT Chennai - Official Website",
  description:
    "Explore innovation, technology, and entrepreneurship with the Microsoft Innovation Club at VIT Chennai. Join us for hackathons, workshops, and projects that shape the future.",
  keywords: [
    "Microsoft Innovation Club",
    "VIT Chennai",
    "VITC",
    "student club",
    "hackathons",
    "workshops",
    "tech community",
    "entrepreneurship",
    "innovation",
    "coding club",
  ],
  authors: [{ name: "Microsoft Innovation Club VIT Chennai" }],
  creator: "Microsoft Innovation Club VIT Chennai",
  publisher: "Microsoft Innovation Club VIT Chennai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.microsoftinnovations.club",
    title: "Microsoft Innovation Club | VIT Chennai",
    description:
      "Official website of the Microsoft Innovation Club at VIT Chennai. Discover events, hackathons, and opportunities to innovate with us.",
    siteName: "MIC VIT Chennai",
    images: [
      {
        url: "https://www.microsoftinnovations.club/images/mic-logo.png",
        width: 512,
        height: 512,
        alt: "Microsoft Innovation Club VIT Chennai Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.microsoftinnovations.club",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} antialiased`}>
        <RedirectWrapper>
          {children}
          <ConditionalNavbar />
        </RedirectWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { Toaster } from "@/components/ui/toaster";
import { insuranceAgencySchema } from "@/lib/schema";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://clearforkinsurance.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  title: {
    default:
      "SIG Clearfork Insurance Group | Insurance Agency in Benbrook, TX",
    template: "%s | SIG Clearfork Insurance Group",
  },
  description:
    "Your trusted insurance partner with 90 years of combined experience. Home, auto, commercial, life, cyber insurance and bonds in Benbrook, TX.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "SIG Clearfork Insurance Group",
    title: "SIG Clearfork Insurance Group | Insurance Agency in Benbrook, TX",
    description:
      "Your trusted insurance partner with 90 years of combined experience. Home, auto, commercial, life, cyber insurance and bonds in Benbrook, TX.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIG Clearfork Insurance Group",
    description:
      "Trusted insurance agency in Benbrook, TX with 90 years of combined experience.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(insuranceAgencySchema()),
          }}
        />
      </head>
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <Chatbot />
        {RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

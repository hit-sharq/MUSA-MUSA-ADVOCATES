import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Musa & Musa Advocates - Experienced Legal Representation",
    template: "%s | Musa & Musa Advocates",
  },
  description: "Premier law firm in Nairobi, Kenya. Comprehensive legal services with integrity, professionalism, and dedication to justice.",
  keywords: "law firm, lawyers, advocates, Nairobi, Kenya, legal services, civil litigation, criminal defense, family law, corporate law",
  authors: [{ name: "Musa & Musa Advocates" }],
  creator: "Musa & Musa Advocates",
  publisher: "Musa & Musa Advocates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.musadvocates.co.ke"),
  alternates: {
    canonical: "https://www.musadvocates.co.ke",
  },
  openGraph: {
    title: "Musa & Musa Advocates - Premier Law Firm in Nairobi, Kenya",
    description: "Experienced legal representation in Nairobi, Kenya. Specializing in civil litigation, criminal defense, family law, corporate law, and more.",
    url: "https://www.musadvocates.co.ke",
    siteName: "Musa & Musa Advocates",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa & Musa Advocates - Premier Law Firm in Nairobi, Kenya",
    description: "Experienced legal representation in Nairobi, Kenya. Specializing in civil litigation, criminal defense, family law, corporate law, and more.",
    creator: "@musa_mutuku",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Musa & Musa Advocates",
    description: "Premier law firm in Nairobi, Kenya providing comprehensive legal services.",
    url: "https://www.musadvocates.co.ke",
    logo: "https://www.musadvocates.co.ke/logo.png",
    image: "https://www.musadvocates.co.ke/og-image.jpg",
    telephone: "+254758251399",
    email: "officialmutuku@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6076 Rhapta Road",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-14:00",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    sameAs: [
      "https://facebook.com/mutukumoses",
      "https://x.com/musa_mutuku",
      "https://www.linkedin.com/in/musa-mutuku-b4b3a6201/",
      "https://www.instagram.com/mwanamutuku/",
    ],
  }

  return (
<html lang="en" suppressHydrationWarning={true}>
  <head>
    <link rel="icon" href="/favicon.ico" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  </head>
  <body className={inter.className} suppressHydrationWarning>
    <ClerkProvider>{children}</ClerkProvider>
  </body>
</html>
  )
}

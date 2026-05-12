import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Musa & Musa Advocates | Premier Law Firm in Nairobi, Kenya",
  description: "A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and unwavering dedication to justice. Expert litigation, corporate, and family law services in Nairobi.",
  keywords: "law firm Nairobi, advocates Kenya, legal services, civil litigation, criminal defense, family law, corporate law, Musa & Musa",
  openGraph: {
    title: "Musa & Musa Advocates | Premier Law Firm in Nairobi",
    description: "Premier law firm delivering exceptional legal services with integrity and professionalism. Trusted legal expertise in Kenya.",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Musa & Musa Advocates",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

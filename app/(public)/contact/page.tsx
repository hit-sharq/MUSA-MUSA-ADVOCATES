import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us | Musa & Musa Advocates - Free Consultation",
  description: "Contact Musa & Musa Advocates in Nairobi, Kenya. Schedule your free consultation today. Call +254 758 251 399 or email officialmutuku@gmail.com.",
  keywords: "contact, law firm, Nairobi, Kenya, legal consultation, lawyers, advocates",
  openGraph: {
    title: "Contact Us - Musa & Musa Advocates",
    description: "Contact Musa & Musa Advocates in Nairobi, Kenya. Schedule your free consultation today.",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
  },
robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.musadvocates.co.ke/contact",
  },
}

export default function ContactPage() {
  return <ContactClient />
}


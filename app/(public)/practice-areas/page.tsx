import type { Metadata } from "next"
import PracticeAreasClient from "./PracticeAreasClient"

export const metadata: Metadata = {
  title: "Practice Areas | Musa & Musa Advocates - Legal Services in Nairobi",
  description: "Explore our comprehensive legal services in Nairobi, Kenya. Specializing in civil litigation, criminal defense, family law, corporate law, property law, and more.",
  keywords: "practice areas, legal services, Nairobi, Kenya, civil litigation, criminal defense, family law, corporate law, property law, lawyers, advocates",
  alternates: {
    canonical: "https://www.musadvocates.co.ke/practice-areas",
  },
  openGraph: {
    title: "Practice Areas - Musa & Musa Advocates",
    description: "Explore our comprehensive legal services in Nairobi, Kenya.",
    url: "https://www.musadvocates.co.ke/practice-areas",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Areas - Musa & Musa Advocates",
    description: "Explore our comprehensive legal services in Nairobi, Kenya.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PracticeAreasPage() {
  return <PracticeAreasClient />
}


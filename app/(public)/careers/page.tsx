import type { Metadata } from "next"
import CareersClient from "./CareersClient"

export const metadata: Metadata = {
  title: "Careers | Musa & Musa Advocates - Join Our Legal Team",
  description: "Join Musa & Musa Advocates. Explore career opportunities for legal professionals in Nairobi, Kenya. We offer growth, development, and challenging work.",
keywords: "careers, jobs, legal jobs, Nairobi, Kenya, law firm careers, attorney positions",
  alternates: {
    canonical: "https://www.musadvocates.co.ke/careers",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CareersPage() {
  return <CareersClient />
}


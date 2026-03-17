import type { Metadata } from "next"
import TeamClient from "./TeamClient"

export const metadata: Metadata = {
title: "Our Team | Musa & Musa Advocates",
  description: "Meet the experienced attorneys and legal professionals at Musa & Musa Advocates in Nairobi, Kenya. Our team is dedicated to providing exceptional legal representation.",
  keywords: "our team, attorneys, lawyers, advocates, Nairobi, Kenya, legal professionals, Musa Musa",
  openGraph: {
    title: "Our Team - Musa & Musa Advocates",
    description: "Meet the experienced attorneys and legal professionals at Musa & Musa Advocates.",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TeamPage() {
  return <TeamClient />
}


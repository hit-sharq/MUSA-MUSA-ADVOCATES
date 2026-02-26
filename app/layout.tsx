import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Musa & Musa Advocates - Experienced Legal Representation",
  description: "Premier law firm in Nairobi, Kenya. Comprehensive legal services with integrity, professionalism, and dedication to justice.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en" suppressHydrationWarning={true}>
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body className={inter.className} suppressHydrationWarning>
    <ClerkProvider>{children}</ClerkProvider>
  </body>
</html>
  )
}

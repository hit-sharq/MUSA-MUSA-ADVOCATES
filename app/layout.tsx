import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Musa Mutuku - Experienced Legal Representation",
  description: "Professional legal services with experienced representation you can trust.",
    generator: 'v0.dev'
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
  <body className={inter.className}>
    <ClerkProvider>{children}</ClerkProvider>
  </body>
</html>
  )
}

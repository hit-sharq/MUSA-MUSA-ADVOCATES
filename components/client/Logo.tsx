"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <Shield className="w-5 h-5 text-navy" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-navy leading-none">
          Musa & Musa
        </span>
        <span className="text-xs font-semibold text-brand-800 tracking-wider leading-none mt-0.5">
          ADVOCATES
        </span>
      </div>
    </Link>
  )
}
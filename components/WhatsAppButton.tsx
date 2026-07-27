"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function WhatsAppButton({
  phoneNumber = "254757833787",
  message = "Hello, Musa & Musa Advocates. I need legal assistance.",
  className = "",
  size = "md",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  }

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl bg-green-600 text-white font-semibold shadow-lg shadow-green-600/30 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-0.5 ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className={iconSizes[size]} />
      <span>WhatsApp Us</span>
    </Link>
  )
}
"use client"

import { motion } from "framer-motion"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      className={`skeleton ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

// Team Member Skeleton Card
export function TeamMemberSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-brand/10">
      <Skeleton className="h-72 w-full" />
      <div className="p-6 -mt-16 relative">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-brand/10">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  )
}

// Practice Area Skeleton Card
export function PracticeAreaSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-brand/10">
      <Skeleton className="h-12 w-12 rounded-xl mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

// Blog Post Skeleton Card
export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-brand/10">
      <Skeleton className="h-56 w-full" />
      <div className="p-6">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-4/5 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

// Testimonial Skeleton
export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-brand/10">
      <Skeleton className="h-12 w-12 rounded-full mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  )
}

// Stat Skeleton
export function StatSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-12 w-16 mx-auto mb-2" />
      <Skeleton className="h-3 w-24 mx-auto" />
    </div>
  )
}

// Generic Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-brand/10">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

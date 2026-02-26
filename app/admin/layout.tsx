import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
  if (!adminIds.includes(userId)) {
    redirect("/")
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  )
}

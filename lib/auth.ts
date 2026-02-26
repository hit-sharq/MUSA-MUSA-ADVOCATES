import { auth } from "@clerk/nextjs/server"

export async function isAdmin() {
  const { userId } = await auth()

  if (!userId) return false

  const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
  return adminIds.includes(userId)
}

export async function requireAdmin() {
  const isAdminUser = await isAdmin()
  if (!isAdminUser) {
    throw new Error("Unauthorized: Admin access required")
  }
}

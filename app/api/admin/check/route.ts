import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ isAdmin: false })
    }

    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
    const isAdmin = adminIds.includes(userId)

    return NextResponse.json({ isAdmin })
  } catch (error) {
    return NextResponse.json({ isAdmin: false })
  }
}

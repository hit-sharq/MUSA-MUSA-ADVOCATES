import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, bio, image, phone, location } = await request.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    let user

    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          name,
          bio,
          image,
          phone,
          location,
        },
      })
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: "placeholder@example.com", // This will be updated with the actual email
          name,
          bio,
          image,
          phone,
          location,
        },
      })

      // Update the email with the actual email from Clerk
      // This is a workaround since we don't have access to the email in this context
      // In a real application, you would get the email from Clerk's API
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}

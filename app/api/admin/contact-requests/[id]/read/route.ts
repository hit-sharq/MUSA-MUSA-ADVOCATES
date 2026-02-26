import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const contactRequest = await prisma.contactRequest.update({
      where: { id: params.id },
      data: { read: true },
    })

    return NextResponse.json(contactRequest)
  } catch (error) {
    console.error("Error marking contact request as read:", error)
    return NextResponse.json({ error: "Failed to mark contact request as read" }, { status: 500 })
  }
}

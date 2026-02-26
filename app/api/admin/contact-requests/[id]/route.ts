import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id: params.id },
    })

    if (!contactRequest) {
      return NextResponse.json({ error: "Contact request not found" }, { status: 404 })
    }

    return NextResponse.json(contactRequest)
  } catch (error) {
    console.error("Error fetching contact request:", error)
    return NextResponse.json({ error: "Failed to fetch contact request" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    await prisma.contactRequest.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Contact request deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact request:", error)
    return NextResponse.json({ error: "Failed to delete contact request" }, { status: 500 })
  }
}

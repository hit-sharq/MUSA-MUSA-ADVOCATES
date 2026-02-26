import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const contactRequests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(contactRequests)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

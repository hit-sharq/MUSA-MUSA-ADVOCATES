import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(careers)
  } catch (error) {
    console.error("Error fetching careers:", error)
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const practiceAreas = await prisma.practiceArea.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(practiceAreas)
  } catch (error) {
    console.error("Error fetching practice areas:", error)
    return NextResponse.json({ error: "Failed to fetch practice areas" }, { status: 500 })
  }
}


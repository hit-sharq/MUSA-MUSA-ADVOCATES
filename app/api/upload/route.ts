import { type NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const imageUrl = await uploadImage(file)

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

import { v2 as cloudinary } from "cloudinary"

// Check for required environment variables and throw error if missing
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("Missing environment variable: CLOUDINARY_CLOUD_NAME")
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Missing environment variable: CLOUDINARY_API_KEY")
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Missing environment variable: CLOUDINARY_API_SECRET")
}

// Configure cloudinary unconditionally (server side only code)
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "mutuku-moses-law",
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result!.secure_url)
          }
        },
      )
      .end(buffer)
  })
}

export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export default cloudinary

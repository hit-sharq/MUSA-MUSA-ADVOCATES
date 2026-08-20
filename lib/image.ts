/**
 * Build an optimized Cloudinary delivery URL by injecting on-the-fly
 * transformations (auto format + auto quality + width/height caps).
 *
 * The app uses `images.unoptimized: true`, so next/image cannot resize
 * remote images itself — we let Cloudinary do it instead. This keeps the
 * same asset but delivers a much smaller, faster-loading file.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  options: { width?: number; height?: number } = {},
): string {
  const fallback = "/placeholder.svg"
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url || fallback
  }

  const { width = 1200, height } = options
  const transforms = height
    ? `f_auto,q_auto,c_fill,w_${width},h_${height}`
    : `f_auto,q_auto,c_limit,w_${width}`

  return url.replace("/upload/", `/upload/${transforms}/`)
}

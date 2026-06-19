import { NextResponse } from "next/server"
import { writeFileSync, mkdirSync } from "fs"
import { join, extname } from "path"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP, GIF, or SVG." }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 })
  }

  const ext = extname(file.name) || ".jpg"
  const safeName = file.name
    .replace(ext, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
  const filename = `${safeName}-${Date.now()}${ext}`

  const uploadDir = join(process.cwd(), "public", "images", "projects")
  mkdirSync(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  writeFileSync(join(uploadDir, filename), buffer)

  return NextResponse.json({ path: `/images/projects/${filename}` })
}

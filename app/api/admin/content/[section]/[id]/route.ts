import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getData, setData } from "@/lib/data"
import { cookies } from "next/headers"

async function requireAuth() {
  const c = await cookies()
  if (!c.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const { section, id } = await params
  const authError = await requireAuth()
  if (authError) return authError

  const body = await req.json()
  const items = getData<Record<string, unknown>[]>(section)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }
  items[index] = { ...body, id }
  setData(section, items)
  revalidatePath("/")
  return NextResponse.json(items[index])
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const { section, id } = await params
  const authError = await requireAuth()
  if (authError) return authError

  const items = getData<Record<string, unknown>[]>(section)
  const filtered = items.filter((item) => item.id !== id)
  if (filtered.length === items.length) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }
  setData(section, filtered)
  revalidatePath("/")
  return NextResponse.json({ success: true })
}

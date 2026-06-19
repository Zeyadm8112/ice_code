import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getData, setData, generateId } from "@/lib/data"
import { cookies } from "next/headers"

const SINGLE_SECTIONS = ["contact", "hero"]

function requireAuth() {
  return cookies().then((c) => {
    if (!c.get("admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return null
  })
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  try {
    const data = getData(section)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Section not found" }, { status: 404 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const authError = await requireAuth()
  if (authError) return authError

  if (SINGLE_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Use PUT for single-object sections" }, { status: 400 })
  }

  const body = await req.json()
  const items = getData<Record<string, unknown>[]>(section)
  const newItem = { ...body, id: generateId() }
  items.push(newItem)
  setData(section, items)
  revalidatePath("/")
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const authError = await requireAuth()
  if (authError) return authError

  if (!SINGLE_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Use /[id] route for array sections" }, { status: 400 })
  }

  const body = await req.json()
  setData(section, body)
  revalidatePath("/")
  return NextResponse.json(body)
}

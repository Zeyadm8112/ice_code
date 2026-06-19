"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TechItem {
  id: string
  name: string
}

export default function TechStackPage() {
  const [items, setItems] = useState<TechItem[]>([])
  const [newName, setNewName] = useState("")

  const load = async () => {
    const res = await fetch("/api/admin/content/tech-stack")
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    const res = await fetch("/api/admin/content/tech-stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    })
    if (res.ok) { toast.success("Added!"); setNewName(""); load() }
    else toast.error("Failed to add")
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/tech-stack/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#07223F]">Tech Stack</h1>
        <p className="text-muted-foreground mt-1">Manage the technologies displayed on the landing page</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Technology name (e.g. React, Go, Kubernetes)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]"
          />
          <Button type="submit" className="bg-[#1877F2] hover:bg-[#1560C4]">
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-2 bg-[#F5F9FF] border border-border text-[#07223F] px-4 py-2 rounded-full text-sm font-medium"
            >
              {item.name}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-muted-foreground hover:text-red-500 transition-colors ml-1"
                aria-label={`Remove ${item.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          {items.length === 0 && (
            <p className="text-muted-foreground text-sm">No technologies added yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

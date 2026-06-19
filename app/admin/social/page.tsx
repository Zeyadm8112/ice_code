"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConfirmDelete } from "@/components/admin/confirm-delete"

const schema = z.object({
  platform: z.string().min(1),
  href: z.string().min(1),
  icon: z.string().min(1),
})
type FormData = z.infer<typeof schema>

interface SocialItem {
  id: string
  platform: string
  href: string
  icon: string
}

export default function SocialPage() {
  const [items, setItems] = useState<SocialItem[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<SocialItem | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const load = async () => {
    const res = await fetch("/api/admin/content/social")
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); reset({}); setOpen(true) }
  const openEdit = (item: SocialItem) => { setEditing(item); reset(item); setOpen(true) }

  const onSubmit = async (data: FormData) => {
    const url = editing ? `/api/admin/content/social/${editing.id}` : "/api/admin/content/social"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (res.ok) { toast.success(editing ? "Updated!" : "Added!"); setOpen(false); load() }
    else toast.error("Something went wrong")
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/social/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#07223F]">Social Links</h1>
          <p className="text-muted-foreground mt-1">Manage social media links in the footer</p>
        </div>
        <Button onClick={openAdd} className="bg-[#1877F2] hover:bg-[#1560C4]">
          <Plus className="w-4 h-4 mr-2" /> Add Link
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Icon (Lucide)</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">URL</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-[#07223F]">{item.platform}</td>
                <td className="px-6 py-4"><code className="text-sm text-muted-foreground">{item.icon}</code></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.href}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <ConfirmDelete onConfirm={() => onDelete(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Platform Name</label>
              <input {...register("platform")} placeholder="LinkedIn" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
              {errors.platform && <p className="text-xs text-red-500 mt-1">{errors.platform.message}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Icon Name (Lucide)</label>
              <input {...register("icon")} placeholder="Linkedin, Twitter, Instagram, Facebook" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
              {errors.icon && <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">URL</label>
              <input {...register("href")} placeholder="https://linkedin.com/company/icecode" dir="ltr" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
              {errors.href && <p className="text-xs text-red-500 mt-1">{errors.href.message}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#1877F2] hover:bg-[#1560C4]">{editing ? "Update" : "Add"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

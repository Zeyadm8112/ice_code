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
  icon: z.string().min(1),
  color: z.string().min(1),
  en_title: z.string().min(1),
  ar_title: z.string().min(1),
  en_description: z.string().min(1),
  ar_description: z.string().min(1),
})
type FormData = z.infer<typeof schema>

interface ServiceItem {
  id: string
  icon: string
  color: string
  en_title: string
  ar_title: string
  en_description: string
  ar_description: string
}

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceItem | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const load = async () => {
    const res = await fetch("/api/admin/content/services")
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); reset({}); setOpen(true) }
  const openEdit = (item: ServiceItem) => { setEditing(item); reset(item); setOpen(true) }

  const onSubmit = async (data: FormData) => {
    const url = editing ? `/api/admin/content/services/${editing.id}` : "/api/admin/content/services"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (res.ok) { toast.success(editing ? "Updated!" : "Added!"); setOpen(false); load() }
    else toast.error("Something went wrong")
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/services/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#07223F]">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the services section</p>
        </div>
        <Button onClick={openAdd} className="bg-[#1877F2] hover:bg-[#1560C4]">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Icon</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">English Title</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Arabic Title</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <code className="text-sm text-muted-foreground">{item.icon}</code>
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-[#07223F]">{item.en_title}</td>
                <td className="px-6 py-4" dir="rtl">{item.ar_title}</td>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Icon Name (Lucide)</label>
                <input {...register("icon")} placeholder="Globe, Smartphone, Brain…" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.icon && <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Color (hex)</label>
                <input {...register("color")} placeholder="#1877F2" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Title</label>
                <input {...register("en_title")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.en_title && <p className="text-xs text-red-500 mt-1">{errors.en_title.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Title</label>
                <input {...register("ar_title")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.ar_title && <p className="text-xs text-red-500 mt-1">{errors.ar_title.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Description</label>
                <textarea {...register("en_description")} rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.en_description && <p className="text-xs text-red-500 mt-1">{errors.en_description.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Description</label>
                <textarea {...register("ar_description")} dir="rtl" rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.ar_description && <p className="text-xs text-red-500 mt-1">{errors.ar_description.message}</p>}
              </div>
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

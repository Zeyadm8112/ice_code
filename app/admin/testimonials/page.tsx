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
  en_initials: z.string().min(1).max(4),
  ar_initials: z.string().min(1).max(4),
  avatarColor: z.string().min(1),
  en_quote: z.string().min(1),
  ar_quote: z.string().min(1),
  en_author: z.string().min(1),
  ar_author: z.string().min(1),
  en_role: z.string().min(1),
  ar_role: z.string().min(1),
})
type FormData = z.infer<typeof schema>

interface TestimonialItem {
  id: string
  en_initials: string
  ar_initials: string
  avatarColor: string
  en_quote: string
  ar_quote: string
  en_author: string
  ar_author: string
  en_role: string
  ar_role: string
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<TestimonialItem | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const load = async () => {
    const res = await fetch("/api/admin/content/testimonials")
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); reset({}); setOpen(true) }
  const openEdit = (item: TestimonialItem) => { setEditing(item); reset(item); setOpen(true) }

  const onSubmit = async (data: FormData) => {
    const url = editing ? `/api/admin/content/testimonials/${editing.id}` : "/api/admin/content/testimonials"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (res.ok) { toast.success(editing ? "Updated!" : "Added!"); setOpen(false); load() }
    else toast.error("Something went wrong")
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/testimonials/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#07223F]">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>
        </div>
        <Button onClick={openAdd} className="bg-[#1877F2] hover:bg-[#1560C4]">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border p-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${item.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {item.en_initials}
              </div>
              <div>
                <p className="font-bold text-[#07223F]">{item.en_author} <span className="text-muted-foreground font-normal">— {item.en_role}</span></p>
                <p className="text-sm text-muted-foreground mt-1 italic line-clamp-2">&ldquo;{item.en_quote}&rdquo;</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <ConfirmDelete onConfirm={() => onDelete(item.id)} />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">EN Initials</label>
                <input {...register("en_initials")} placeholder="AK" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.en_initials && <p className="text-xs text-red-500 mt-1">{errors.en_initials.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">AR Initials</label>
                <input {...register("ar_initials")} dir="rtl" placeholder="أخ" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.ar_initials && <p className="text-xs text-red-500 mt-1">{errors.ar_initials.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Avatar Color (Tailwind)</label>
                <input {...register("avatarColor")} placeholder="bg-[#1877F2]" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.avatarColor && <p className="text-xs text-red-500 mt-1">{errors.avatarColor.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Author</label>
                <input {...register("en_author")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.en_author && <p className="text-xs text-red-500 mt-1">{errors.en_author.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Author</label>
                <input {...register("ar_author")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.ar_author && <p className="text-xs text-red-500 mt-1">{errors.ar_author.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Role</label>
                <input {...register("en_role")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.en_role && <p className="text-xs text-red-500 mt-1">{errors.en_role.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Role</label>
                <input {...register("ar_role")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.ar_role && <p className="text-xs text-red-500 mt-1">{errors.ar_role.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Quote</label>
                <textarea {...register("en_quote")} rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.en_quote && <p className="text-xs text-red-500 mt-1">{errors.en_quote.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Quote</label>
                <textarea {...register("ar_quote")} dir="rtl" rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.ar_quote && <p className="text-xs text-red-500 mt-1">{errors.ar_quote.message}</p>}
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

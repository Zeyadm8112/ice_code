"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Pencil, Plus, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConfirmDelete } from "@/components/admin/confirm-delete"

const schema = z.object({
  icon: z.string().min(1),
  featured: z.boolean(),
  en_name: z.string().min(1),
  ar_name: z.string().min(1),
  en_badge: z.string().min(1),
  ar_badge: z.string().min(1),
  en_description: z.string().min(1),
  ar_description: z.string().min(1),
  en_features: z.array(z.object({ value: z.string().min(1) })).min(1),
  ar_features: z.array(z.object({ value: z.string().min(1) })).min(1),
  en_details: z.string().optional().default(""),
  ar_details: z.string().optional().default(""),
  video_url: z.string().optional().default(""),
})
type FormData = z.infer<typeof schema>

interface ProductItem {
  id: string
  icon: string
  featured: boolean
  en_name: string
  ar_name: string
  en_badge: string
  ar_badge: string
  en_description: string
  ar_description: string
  en_features: string[]
  ar_features: string[]
  en_details?: string
  ar_details?: string
  video_url?: string
}

function toFieldArray(arr: string[]) {
  return arr.map((v) => ({ value: v }))
}
function fromFieldArray(arr: { value: string }[]) {
  return arr.map((f) => f.value)
}

export default function ProductsPage() {
  const [items, setItems] = useState<ProductItem[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<ProductItem | null>(null)

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { en_features: [{ value: "" }], ar_features: [{ value: "" }], featured: false } })

  const enFeatures = useFieldArray({ control, name: "en_features" })
  const arFeatures = useFieldArray({ control, name: "ar_features" })

  const load = async () => {
    const res = await fetch("/api/admin/content/products")
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const openAdd = () => {
    setEditing(null)
    reset({ icon: "", featured: false, en_name: "", ar_name: "", en_badge: "", ar_badge: "", en_description: "", ar_description: "", en_features: [{ value: "" }], ar_features: [{ value: "" }], en_details: "", ar_details: "", video_url: "" })
    setOpen(true)
  }
  const openEdit = (item: ProductItem) => {
    setEditing(item)
    reset({ ...item, en_features: toFieldArray(item.en_features), ar_features: toFieldArray(item.ar_features), en_details: item.en_details ?? "", ar_details: item.ar_details ?? "", video_url: item.video_url ?? "" })
    setOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = { ...data, en_features: fromFieldArray(data.en_features), ar_features: fromFieldArray(data.ar_features) }
    const url = editing ? `/api/admin/content/products/${editing.id}` : "/api/admin/content/products"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (res.ok) { toast.success(editing ? "Updated!" : "Added!"); setOpen(false); load() }
    else toast.error("Something went wrong")
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/products/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#07223F]">Products</h1>
          <p className="text-muted-foreground mt-1">Manage ICE CODE product offerings</p>
        </div>
        <Button onClick={openAdd} className="bg-[#1877F2] hover:bg-[#1560C4]">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border p-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#1877F2] font-mono text-xs">{item.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[#07223F]">{item.en_name}</h3>
                  {item.featured && (
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.en_badge}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.en_description}</p>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Icon (Lucide)</label>
                <input {...register("icon")} placeholder="Layers, Truck, Bot" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.icon && <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Badge</label>
                <input {...register("en_badge")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Badge</label>
                <input {...register("ar_badge")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" {...register("featured")} className="w-4 h-4 accent-[#1877F2]" />
              <label htmlFor="featured" className="text-sm font-medium text-[#07223F]">Featured product (displayed as full-width card)</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Name</label>
                <input {...register("en_name")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.en_name && <p className="text-xs text-red-500 mt-1">{errors.en_name.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Name</label>
                <input {...register("ar_name")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.ar_name && <p className="text-xs text-red-500 mt-1">{errors.ar_name.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">English Description</label>
                <textarea {...register("en_description")} rows={3} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.en_description && <p className="text-xs text-red-500 mt-1">{errors.en_description.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Description</label>
                <textarea {...register("ar_description")} dir="rtl" rows={3} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.ar_description && <p className="text-xs text-red-500 mt-1">{errors.ar_description.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">English Features</label>
                <div className="space-y-2">
                  {enFeatures.fields.map((field, i) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`en_features.${i}.value`)} placeholder={`Feature ${i + 1}`} className="flex-1 px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
                      {enFeatures.fields.length > 1 && (
                        <button type="button" onClick={() => enFeatures.remove(i)} className="text-red-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => enFeatures.append({ value: "" })} className="text-[#1877F2] text-sm font-medium hover:underline">
                    + Add feature
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Arabic Features</label>
                <div className="space-y-2">
                  {arFeatures.fields.map((field, i) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`ar_features.${i}.value`)} dir="rtl" placeholder={`الميزة ${i + 1}`} className="flex-1 px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
                      {arFeatures.fields.length > 1 && (
                        <button type="button" onClick={() => arFeatures.remove(i)} className="text-red-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => arFeatures.append({ value: "" })} className="text-[#1877F2] text-sm font-medium hover:underline">
                    + إضافة ميزة
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Extra Details — English <span className="normal-case font-normal">(optional)</span></label>
                <textarea {...register("en_details")} rows={3} placeholder="More information shown in the detail panel..." className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Extra Details — Arabic <span className="normal-case font-normal">(اختياري)</span></label>
                <textarea {...register("ar_details")} dir="rtl" rows={3} placeholder="معلومات إضافية تظهر في لوحة التفاصيل..." className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">YouTube Video URL <span className="normal-case font-normal">(optional)</span></label>
              <input {...register("video_url")} placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
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

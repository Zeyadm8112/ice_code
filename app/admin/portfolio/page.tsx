"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Pencil, Plus, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConfirmDelete } from "@/components/admin/confirm-delete"

const schema = z.object({
  image: z.string().min(1, "Image is required"),
  tags: z.string().min(1, "At least one tag is required"),
  gradient: z.string().min(1, "Gradient is required"),
  en_name: z.string().min(1, "English name is required"),
  ar_name: z.string().min(1, "Arabic name is required"),
  en_description: z.string().min(1, "English description is required"),
  ar_description: z.string().min(1, "Arabic description is required"),
  en_details: z.string().optional().default(""),
  ar_details: z.string().optional().default(""),
  video_url: z.string().optional().default(""),
})
type FormData = z.infer<typeof schema>

interface PortfolioItem {
  id: string
  image: string
  tags: string[]
  gradient: string
  en_name: string
  ar_name: string
  en_description: string
  ar_description: string
  en_details?: string
  ar_details?: string
  video_url?: string
}

function ImageUploader({
  value,
  onChange,
}: {
  value: string
  onChange: (path: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
    setUploading(false)
    if (res.ok) {
      const { path } = await res.json()
      onChange(path)
      toast.success("Image uploaded!")
    } else {
      const { error } = await res.json()
      toast.error(error || "Upload failed")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {value && (
        <div className="relative h-40 rounded-xl overflow-hidden border border-border bg-gray-100">
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/20 flex items-end p-3">
            <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">{value}</span>
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
          uploading
            ? "border-[#1877F2] bg-[#1877F2]/5"
            : "border-border hover:border-[#1877F2]/50 hover:bg-gray-50"
        }`}
      >
        {uploading ? (
          <>
            <div className="w-8 h-8 border-2 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading…</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium text-[#07223F]">Click or drag & drop to upload</p>
            <p className="text-xs text-muted-foreground">JPG, PNG, WebP, SVG — max 5MB</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { image: "", tags: "", gradient: "", en_name: "", ar_name: "", en_description: "", ar_description: "" },
  })
  const imageValue = watch("image")

  const load = async () => {
    const res = await fetch("/api/admin/content/portfolio")
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
  }
  useEffect(() => { load() }, [])

  const openAdd = () => {
    setEditing(null)
    reset({ image: "", tags: "", gradient: "from-[#1877F2] to-[#07223F]", en_name: "", ar_name: "", en_description: "", ar_description: "", en_details: "", ar_details: "", video_url: "" })
    setOpen(true)
  }
  const openEdit = (item: PortfolioItem) => {
    setEditing(item)
    reset({ ...item, tags: item.tags.join(", "), en_details: item.en_details ?? "", ar_details: item.ar_details ?? "", video_url: item.video_url ?? "" })
    setOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    const payload = { ...data, tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean) }
    const url = editing ? `/api/admin/content/portfolio/${editing.id}` : "/api/admin/content/portfolio"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (res.ok) { toast.success(editing ? "Updated!" : "Added!"); setOpen(false); load() }
    else toast.error("Something went wrong")
  }

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/admin/content/portfolio/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Deleted"); load() }
    else toast.error("Failed to delete")
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#07223F]">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio projects</p>
        </div>
        <Button onClick={openAdd} className="bg-[#1877F2] hover:bg-[#1560C4]">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tags</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {item.image && item.image.startsWith("/") ? (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={item.image} alt={item.en_name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-16 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-[#07223F]">{item.en_name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-[#1877F2]/10 text-[#1877F2] text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </td>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Hidden image field driven by uploader */}
            <input type="hidden" {...register("image")} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Project Image</label>
              <ImageUploader value={imageValue} onChange={(path) => setValue("image", path, { shouldValidate: true })} />
              {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Tags (comma-separated)</label>
                <input {...register("tags")} placeholder="Desktop, Web, Mobile" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.tags && <p className="text-xs text-red-500 mt-1">{errors.tags.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Gradient (Tailwind)</label>
                <input {...register("gradient")} placeholder="from-[#1877F2] to-[#07223F]" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2]" />
                {errors.gradient && <p className="text-xs text-red-500 mt-1">{errors.gradient.message}</p>}
              </div>
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
                <textarea {...register("en_description")} rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.en_description && <p className="text-xs text-red-500 mt-1">{errors.en_description.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Arabic Description</label>
                <textarea {...register("ar_description")} dir="rtl" rows={4} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
                {errors.ar_description && <p className="text-xs text-red-500 mt-1">{errors.ar_description.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Extra Details — English <span className="normal-case font-normal">(optional, shown in detail panel)</span></label>
                <textarea {...register("en_details")} rows={3} placeholder="More information about the project..." className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Extra Details — Arabic <span className="normal-case font-normal">(اختياري)</span></label>
                <textarea {...register("ar_details")} dir="rtl" rows={3} placeholder="معلومات إضافية عن المشروع..." className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none" />
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

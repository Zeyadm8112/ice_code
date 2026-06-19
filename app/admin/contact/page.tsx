"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  en_location: z.string().min(1),
  ar_location: z.string().min(1),
  en_hours: z.string().min(1),
  ar_hours: z.string().min(1),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    fetch("/api/admin/content/contact").then((r) => r.json()).then((data) => reset(data))
  }, [reset])

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/admin/content/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) { toast.success("Contact info updated!"); reset(data) }
    else toast.error("Failed to save")
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#07223F]">Contact Info</h1>
        <p className="text-muted-foreground mt-1">Edit the contact information displayed on the landing page</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-border p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Email</label>
            <input {...register("email")} type="email" dir="ltr" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Phone</label>
            <input {...register("phone")} dir="ltr" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Location (English)</label>
            <input {...register("en_location")} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.en_location && <p className="text-xs text-red-500 mt-1">{errors.en_location.message}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Location (Arabic)</label>
            <input {...register("ar_location")} dir="rtl" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.ar_location && <p className="text-xs text-red-500 mt-1">{errors.ar_location.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Working Hours (English)</label>
            <input {...register("en_hours")} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.en_hours && <p className="text-xs text-red-500 mt-1">{errors.en_hours.message}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Working Hours (Arabic)</label>
            <input {...register("ar_hours")} dir="rtl" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#1877F2] text-[#07223F]" />
            {errors.ar_hours && <p className="text-xs text-red-500 mt-1">{errors.ar_hours.message}</p>}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={!isDirty} className="bg-[#1877F2] hover:bg-[#1560C4] px-8">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

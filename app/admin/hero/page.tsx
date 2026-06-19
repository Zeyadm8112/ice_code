"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const schema = z.object({
  en_badge: z.string().min(1),
  ar_badge: z.string().min(1),
  en_title1: z.string().min(1),
  ar_title1: z.string().min(1),
  en_title2: z.string().min(1),
  ar_title2: z.string().min(1),
  en_title3: z.string().min(1),
  ar_title3: z.string().min(1),
  en_slogan: z.string().min(1),
  ar_slogan: z.string().min(1),
  en_description: z.string().min(1),
  ar_description: z.string().min(1),
  en_cta1: z.string().min(1),
  ar_cta1: z.string().min(1),
  en_cta2: z.string().min(1),
  ar_cta2: z.string().min(1),
  stat1_value: z.string().min(1),
  en_stat1_label: z.string().min(1),
  ar_stat1_label: z.string().min(1),
  en_stat1_sublabel: z.string().min(1),
  ar_stat1_sublabel: z.string().min(1),
  stat2_value: z.string().min(1),
  en_stat2_label: z.string().min(1),
  ar_stat2_label: z.string().min(1),
  en_stat2_sublabel: z.string().min(1),
  ar_stat2_sublabel: z.string().min(1),
})
type FormData = z.infer<typeof schema>

function BilRow({ label, enName, arName, register, errors, textarea = false }: {
  label: string
  enName: keyof FormData
  arName: keyof FormData
  register: ReturnType<typeof useForm<FormData>>["register"]
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"]
  textarea?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">{label} (EN)</label>
        {textarea ? (
          <textarea {...register(enName)} rows={3} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none text-sm" />
        ) : (
          <input {...register(enName)} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
        )}
        {errors[enName] && <p className="text-xs text-red-500 mt-1">{errors[enName]?.message as string}</p>}
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">{label} (AR)</label>
        {textarea ? (
          <textarea {...register(arName)} dir="rtl" rows={3} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] resize-none text-sm" />
        ) : (
          <input {...register(arName)} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
        )}
        {errors[arName] && <p className="text-xs text-red-500 mt-1">{errors[arName]?.message as string}</p>}
      </div>
    </div>
  )
}

export default function HeroPage() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) })
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = form

  useEffect(() => {
    fetch("/api/admin/content/hero").then((r) => r.json()).then((data) => reset(data))
  }, [reset])

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/admin/content/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) { toast.success("Hero section updated!"); reset(data) }
    else toast.error("Failed to save")
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#07223F]">Hero Section</h1>
        <p className="text-muted-foreground mt-1">Edit the main hero content (bilingual)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-border p-8 space-y-6">
        <div className="pb-4 border-b border-border">
          <h3 className="text-sm font-bold text-[#07223F] mb-4">Badge & Title</h3>
          <div className="space-y-4">
            <BilRow label="Badge" enName="en_badge" arName="ar_badge" register={register} errors={errors} />
            <BilRow label="Title Part 1" enName="en_title1" arName="ar_title1" register={register} errors={errors} />
            <BilRow label="Title Part 2 (highlighted)" enName="en_title2" arName="ar_title2" register={register} errors={errors} />
            <BilRow label="Title Part 3" enName="en_title3" arName="ar_title3" register={register} errors={errors} />
          </div>
        </div>

        <div className="pb-4 border-b border-border">
          <h3 className="text-sm font-bold text-[#07223F] mb-4">Slogan & Description</h3>
          <div className="space-y-4">
            <BilRow label="Slogan" enName="en_slogan" arName="ar_slogan" register={register} errors={errors} />
            <BilRow label="Description" enName="en_description" arName="ar_description" register={register} errors={errors} textarea />
          </div>
        </div>

        <div className="pb-4 border-b border-border">
          <h3 className="text-sm font-bold text-[#07223F] mb-4">CTA Buttons</h3>
          <div className="space-y-4">
            <BilRow label="CTA Primary" enName="en_cta1" arName="ar_cta1" register={register} errors={errors} />
            <BilRow label="CTA Secondary" enName="en_cta2" arName="ar_cta2" register={register} errors={errors} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#07223F] mb-4">Floating Stats Cards</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 1 Value</label>
                <input {...register("stat1_value")} placeholder="150+" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 1 Label (EN)</label>
                <input {...register("en_stat1_label")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 1 Label (AR)</label>
                <input {...register("ar_stat1_label")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BilRow label="Stat 1 Sublabel" enName="en_stat1_sublabel" arName="ar_stat1_sublabel" register={register} errors={errors} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 2 Value</label>
                <input {...register("stat2_value")} placeholder="5.0" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 2 Label (EN)</label>
                <input {...register("en_stat2_label")} className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stat 2 Label (AR)</label>
                <input {...register("ar_stat2_label")} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-border outline-none focus:border-[#1877F2] text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BilRow label="Stat 2 Sublabel" enName="en_stat2_sublabel" arName="ar_stat2_sublabel" register={register} errors={errors} />
            </div>
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

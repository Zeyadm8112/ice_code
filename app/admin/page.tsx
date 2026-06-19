import Link from "next/link"
import { getData } from "@/lib/data"
import {
  BarChart3, Layers, Package, FolderOpen, MessageSquare,
  Cpu, GitMerge, Phone, Share2, Sparkles,
} from "lucide-react"

const sections = [
  { key: "hero", label: "Hero Section", icon: Sparkles, href: "/admin/hero", single: true },
  { key: "stats", label: "Stats", icon: BarChart3, href: "/admin/stats" },
  { key: "services", label: "Services", icon: Layers, href: "/admin/services" },
  { key: "products", label: "Products", icon: Package, href: "/admin/products" },
  { key: "portfolio", label: "Portfolio", icon: FolderOpen, href: "/admin/portfolio" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
  { key: "tech-stack", label: "Tech Stack", icon: Cpu, href: "/admin/tech-stack" },
  { key: "process", label: "Process Steps", icon: GitMerge, href: "/admin/process" },
  { key: "contact", label: "Contact Info", icon: Phone, href: "/admin/contact", single: true },
  { key: "social", label: "Social Links", icon: Share2, href: "/admin/social" },
]

export default function AdminDashboard() {
  const counts = sections.map((s) => {
    try {
      const data = getData(s.key)
      const count = Array.isArray(data) ? data.length : null
      return { ...s, count }
    } catch {
      return { ...s, count: 0 }
    }
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#07223F]">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage all ICE CODE landing page content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {counts.map(({ key, label, icon: Icon, href, single, count }) => (
          <Link
            key={key}
            href={href}
            className="bg-white rounded-2xl p-6 border border-border hover:border-[#1877F2]/30 hover:shadow-lg hover:shadow-[#1877F2]/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1877F2] transition-colors">
                <Icon className="w-6 h-6 text-[#1877F2] group-hover:text-white transition-colors" />
              </div>
              {!single && (
                <span className="text-2xl font-bold text-[#07223F]">{count}</span>
              )}
            </div>
            <h3 className="font-semibold text-[#07223F]">{label}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {single ? "Edit content" : `${count} item${count !== 1 ? "s" : ""}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

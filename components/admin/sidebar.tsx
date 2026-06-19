"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Layers,
  Package,
  FolderOpen,
  MessageSquare,
  Cpu,
  GitMerge,
  Phone,
  Share2,
  Sparkles,
  LogOut,
  ExternalLink,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero Section", icon: Sparkles },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Cpu },
  { href: "/admin/process", label: "Process", icon: GitMerge },
  { href: "/admin/contact", label: "Contact Info", icon: Phone },
  { href: "/admin/social", label: "Social Links", icon: Share2 },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-[#07223F] text-white flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin Panel</p>
        <h1 className="text-lg font-bold text-white">ICE CODE</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href) && href !== "/admin"
          const active = exact ? pathname === href : isActive
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-[#1877F2] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}

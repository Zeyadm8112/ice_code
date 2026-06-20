import type { Metadata } from 'next'
import { AdminSidebar } from "@/components/admin/sidebar"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  // Login page is inside this layout but must render without the sidebar
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

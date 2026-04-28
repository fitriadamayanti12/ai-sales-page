import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex bg-[#f5f6f8] dark:bg-gray-950">
      <Sidebar userEmail={user?.email || ""} />
      {/* Margin responsive: lg: 64px/80px collapsed, mobile: 0 */}
      <div className="flex-1 flex flex-col lg:ml-20 ml-0 transition-all duration-300">
        <TopBar userEmail={user?.email || ""} />
        <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
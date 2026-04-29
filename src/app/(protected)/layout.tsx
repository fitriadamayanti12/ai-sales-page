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
    <div className="min-h-screen bg-[#f5f6f8] dark:bg-gray-950">
      <Sidebar userEmail={user?.email || ""} />
      
      <div className="lg:ml-64 transition-all duration-300 flex flex-col min-h-screen">
        <TopBar userEmail={user?.email || ""} />
        <div className="topbar-offset flex-1 p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
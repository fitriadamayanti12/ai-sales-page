"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  History,
  LogOut,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { logout } from "@/actions/auth"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Generate", href: "/generate", icon: Wand2 },
  { label: "History", href: "/history", icon: History },
]

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl shadow-lg"
      >
        <PanelLeftOpen className="w-5 h-5 text-slate-700 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out shadow-xl shadow-slate-200/50 dark:shadow-black/30
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo + Collapse Button */}
        <div className={`p-6 border-b border-slate-100 dark:border-gray-800 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/dashboard" className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <img src="/logo.svg" alt="SalesAI" className="w-10 h-10 flex-shrink-0" />
            {!collapsed && (
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                SalesAI
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  collapsed ? "justify-center px-3" : ""
                } ${
                  isActive
                    ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700/30"
                    : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-slate-400 dark:text-gray-500 group-hover:text-slate-600 dark:group-hover:text-gray-300"
                  }`}
                />
                {!collapsed && item.label}
                {isActive && !collapsed && (
                  <ChevronRight className="w-4 h-4 ml-auto text-yellow-500 dark:text-yellow-400" />
                )}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
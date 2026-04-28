"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Search,
  Sparkles,
  Moon,
  Sun,
  User,
  Settings,
  HelpCircle,
  X,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

export default function TopBar({ userEmail }: { userEmail: string }) {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-30 shadow-md shadow-slate-200/50 dark:shadow-black/20">
      {/* Left - Search (hidden on mobile, shown on lg) */}
      <div className="flex items-center gap-6 flex-1">
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages, templates..."
            className="pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl text-sm text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 focus:ring-4 focus:ring-yellow-50 dark:focus:ring-yellow-900/20 w-64 lg:w-80 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition"
            >
              <X className="w-3 h-3 text-slate-400 dark:text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Search Icon (Mobile/Tablet) */}
        <button className="lg:hidden p-2 md:p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition">
          <Search className="w-4 md:w-5 h-4 md:h-5 text-slate-500 dark:text-gray-400" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 md:p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="w-4 md:w-5 h-4 md:h-5 text-slate-500" />
          ) : (
            <Sun className="w-4 md:w-5 h-4 md:h-5 text-yellow-500" />
          )}
        </button>

        {/* Help */}
        <a
          href="mailto:support@salesai.com"
          className="hidden sm:flex p-2 md:p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition"
          title="Contact Support"
        >
          <HelpCircle className="w-4 md:w-5 h-4 md:h-5 text-slate-500 dark:text-gray-400" />
        </a>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 md:p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition"
          >
            <Bell className="w-4 md:w-5 h-4 md:h-5 text-slate-500 dark:text-gray-400" />
            <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 md:w-2.5 h-2 md:h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 p-2 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-gray-800">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Notifications
                </h3>
                <span className="text-xs px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium">
                  2 New
                </span>
              </div>
              <div className="py-2">
                {[
                  {
                    title: "Sales page generated",
                    desc: "Your 'Product Launch' page is ready",
                    time: "2 min ago",
                    dot: true,
                  },
                  {
                    title: "Weekly report",
                    desc: "Your AI usage report is available",
                    time: "1 hour ago",
                    dot: true,
                  },
                  {
                    title: "System update",
                    desc: "New Luxe template available",
                    time: "1 day ago",
                    dot: false,
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-xl transition cursor-pointer"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        notif.dot ? "bg-red-500" : "bg-slate-300 dark:bg-gray-600"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {notif.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                        {notif.desc}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-gray-500 flex-shrink-0">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 dark:border-gray-800 px-4 py-3">
                <button className="w-full text-center text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-semibold transition">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Credits Badge (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-2xl px-3 md:px-4 py-2 md:py-2.5 shadow-sm shadow-yellow-100/50 dark:shadow-yellow-900/10">
          <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-xs md:text-sm font-bold text-yellow-700 dark:text-yellow-300 whitespace-nowrap">
            2,450 credits
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 md:gap-3 p-1.5 pr-2 md:pr-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-800 transition border border-slate-200 dark:border-gray-700 ml-1 md:ml-2"
          >
            <div className="w-7 md:w-9 h-7 md:h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-sm">
              {userEmail[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-gray-300 hidden sm:block">
              {userEmail?.split("@")[0] || "User"}
            </span>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-52 md:w-56 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-xl p-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {userEmail?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                  {userEmail}
                </p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: "Profile" },
                  { icon: Settings, label: "Settings" },
                  { icon: HelpCircle, label: "Help & Support" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
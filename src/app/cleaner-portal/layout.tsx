"use client"

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Leaf, Home, Calendar, MessageCircle, DollarSign, User, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/cleaner-portal", label: "Today", icon: Home },
  { href: "/cleaner-portal/schedule", label: "Schedule", icon: Calendar },
  { href: "/cleaner-portal/messages", label: "Messages", icon: MessageCircle },
  { href: "/cleaner-portal/earnings", label: "Earnings", icon: DollarSign },
  { href: "/cleaner-portal/profile", label: "Profile", icon: User },
]

const emptySubscribe = () => () => {}

export default function CleanerPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?role=cleaner")
    }
  }, [status, router])

  // Show loading while checking session
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#1B4332]/70 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render the portal if not authenticated
  if (!session) {
    return null
  }

  const getActiveTab = () => {
    if (pathname === "/cleaner-portal") return 0
    if (pathname === "/cleaner-portal/schedule") return 1
    if (pathname.startsWith("/cleaner-portal/messages")) return 2
    if (pathname === "/cleaner-portal/earnings") return 3
    if (pathname === "/cleaner-portal/profile") return 4
    if (pathname.startsWith("/cleaner-portal/job")) return 0
    return -1
  }

  const activeTab = getActiveTab()

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col items-center">
      <div className="w-full max-w-lg min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#1B4332] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <Link href="/cleaner-portal" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#95D5B2] rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#1B4332]" />
            </div>
            <span className="text-lg font-bold tracking-tight">CleanInstead</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#95D5B2] rounded-full border-2 border-[#1B4332]" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#95D5B2] flex items-center justify-center text-[#1B4332] font-semibold text-sm">
                MS
              </div>
              <span className="text-sm font-medium hidden sm:inline">{session.user?.name || "Maria Santos"}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-20 overflow-x-hidden">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-white border-t border-[#e5e7eb] shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around h-16 px-1">
            {navItems.map((item, index) => {
              const isActive = activeTab === index
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-all duration-200",
                    isActive ? "text-[#1B4332]" : "text-[#9ca3af] hover:text-[#1B4332]/70"
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#1B4332] rounded-full" />
                  )}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200",
                      isActive ? "bg-[#1B4332]/10" : ""
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive ? "text-[#1B4332]" : "text-[#9ca3af]"
                      )}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-all duration-200",
                      isActive ? "text-[#1B4332]" : "text-[#9ca3af]"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

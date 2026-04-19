"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import {
  Leaf,
  LayoutDashboard,
  Calendar,
  Gift,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", href: "/my-account", icon: LayoutDashboard },
  { label: "Bookings", href: "/my-account/bookings", icon: Calendar },
  { label: "Refer a Friend", href: "/my-account/referral", icon: Gift },
  { label: "Eco Impact", href: "/my-account/eco-impact", icon: Leaf },
  { label: "Feedback", href: "/my-account/feedback", icon: MessageSquare },
  { label: "Settings", href: "/my-account/settings", icon: Settings },
];

function getBreadcrumb(pathname: string): string {
  const map: Record<string, string> = {
    "/my-account": "Dashboard",
    "/my-account/bookings": "Bookings",
    "/my-account/referral": "Refer a Friend",
    "/my-account/eco-impact": "Eco Impact",
    "/my-account/feedback": "Feedback",
    "/my-account/settings": "Settings",
  };
  return map[pathname] || "Dashboard";
}

function SidebarContent({
  pathname,
  userName,
  userEmail,
  initials,
  onCloseMobile,
  onSignOut,
}: {
  pathname: string;
  userName: string;
  userEmail: string;
  initials: string;
  onCloseMobile: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 bg-[#1B4332] rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-[#95D5B2]" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          CleanInstead
        </span>
      </div>

      <Separator className="bg-white/10" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/my-account"
              ? pathname === "/my-account"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-[#1B4332] text-[#95D5B2] border-l-[3px] border-[#95D5B2]"
                  : "text-white/70 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent"
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] ${
                  isActive
                    ? "text-[#95D5B2]"
                    : "text-white/50 group-hover:text-white/80"
                }`}
              />
              {item.label}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-[#95D5B2]/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-white/10" />

      {/* User Info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 bg-[#1B4332] border border-[#95D5B2]/30">
            <AvatarFallback className="text-[#95D5B2] text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {userName}
            </p>
            <p className="text-white/50 text-xs truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-3 pb-4">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-all duration-150"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  React.useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/auth/signin?role=customer";
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user?.name || "Customer";
  const userEmail = user?.email || "";

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/auth/signin?role=customer";
  };
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0 w-64 bg-[#0f2419] flex-col sticky top-0 h-screen">
        <SidebarContent
          pathname={pathname}
          userName={userName}
          userEmail={userEmail}
          initials={initials}
          onCloseMobile={() => setMobileOpen(false)}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f2419] transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent
          pathname={pathname}
          userName={userName}
          userEmail={userEmail}
          initials={initials}
          onCloseMobile={() => setMobileOpen(false)}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <Link
                href="/my-account"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                My Account
              </Link>
              {breadcrumb !== "Dashboard" && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  <span className="text-[#1B4332] font-medium">
                    {breadcrumb}
                  </span>
                </>
              )}
            </nav>

            {/* Greeting on desktop */}
            <div className="hidden sm:flex ml-auto items-center gap-2">
              <span className="text-sm text-gray-500">
                Hi,{" "}
                <span className="font-medium text-gray-700">
                  {userName.split(" ")[0]}
                </span>
              </span>
              <Avatar className="w-7 h-7 bg-[#1B4332]">
                <AvatarFallback className="text-[#95D5B2] text-[10px] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

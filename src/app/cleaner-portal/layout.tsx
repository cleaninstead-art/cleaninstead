"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  MessageCircle,
  DollarSign,
  User,
  Menu,
  Bell,
  LogOut,
  Settings,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/cleaner-portal" },
  { label: "Today's Jobs", icon: CalendarDays, href: "/cleaner-portal" },
  { label: "Schedule", icon: Calendar, href: "/cleaner-portal/schedule" },
  { label: "Messages", icon: MessageCircle, href: "/cleaner-portal/messages" },
  { label: "Earnings", icon: DollarSign, href: "/cleaner-portal/earnings" },
  { label: "Profile", icon: User, href: "/cleaner-portal/profile" },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-[#95D5B2] flex items-center justify-center text-[#0f2419] font-bold text-lg shrink-0">
          CI
        </div>
        <span className="hidden md:block text-white font-semibold text-lg overflow-hidden whitespace-nowrap">
          CleanInstead
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/cleaner-portal"
              ? pathname === "/cleaner-portal" || pathname.startsWith("/cleaner-portal/job")
              : pathname.startsWith(item.href);
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#95D5B2]/20 text-[#95D5B2]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive
                    ? "text-[#95D5B2]"
                    : "text-white/50 group-hover:text-white"
                )}
              />
              <span className="hidden md:block overflow-hidden whitespace-nowrap">
                {item.label}
              </span>
              {isActive && (
                <ChevronRight className="hidden md:block w-4 h-4 ml-auto text-[#95D5B2]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/cleaner-portal/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="hidden md:block overflow-hidden whitespace-nowrap">
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function CleanerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/auth/signin?role=cleaner";
  };

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/auth/signin?role=cleaner";
    }
  }, [user, loading]);

  // Close mobile sheet on route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sheet on route change - handled by Sheet key={pathname}

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-[#0f2419] transition-all duration-300 ease-in-out",
          sidebarExpanded ? "w-60" : "w-16"
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet key={pathname} open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-[#0f2419] border-none">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          "md:ml-16"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>

              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                  Cleaner Portal
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  CleanInstead Cleaner Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Notification Bell */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-[10px] border-2 border-white">
                      2
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                    <span className="text-sm font-medium">
                      New job assigned
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Deep clean at 456 Oak Ave, Today 12:00 PM
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                    <span className="text-sm font-medium">
                      Schedule updated
                    </span>
                    <span className="text-xs text-muted-foreground">
                      New booking added for Wednesday
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-sm text-[#1B4332] font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pl-2 pr-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#1B4332] text-white text-sm font-medium">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase() || "CL"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium text-gray-700">
                      {user?.name || "Cleaner"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/cleaner-portal/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

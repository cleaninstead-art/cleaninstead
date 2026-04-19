"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  Circle,
  Sparkles,
  Droplets,
  Leaf,
  Wrench,
  ChevronRight,
  CalendarDays,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/useAuth"

interface TodayJob {
  id: string
  bookingNumber?: number
  customerName: string
  customerInitials: string
  customerPhone?: string
  time: string
  endTime: string
  serviceType: string
  address: string
  amount: number
  status: "upcoming" | "completed" | "in_progress"
  progress?: number
  specialInstructions?: string
  accessInfo?: string
  notes?: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
}

function getServiceIcon(serviceType: string) {
  switch (serviceType) {
    case "Deep Clean":
      return { icon: Droplets, iconColor: "text-[#0f766e]", iconBg: "bg-[#0f766e]/10" }
    case "Eco Clean":
      return { icon: Leaf, iconColor: "text-[#15803d]", iconBg: "bg-[#15803d]/10" }
    case "Move In Clean":
    case "Move Out Clean":
      return { icon: Wrench, iconColor: "text-[#b45309]", iconBg: "bg-[#b45309]/10" }
    default:
      return { icon: Sparkles, iconColor: "text-[#1B4332]", iconBg: "bg-[#1B4332]/10" }
  }
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

export default function TodayJobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<TodayJob[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [dateStr, setDateStr] = useState("")
  const [loading, setLoading] = useState(true)
  const [completedJobs, setCompletedJobs] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/cleaner/today")
        const data = await res.json()
        setDateStr(data.date || "")

        const mappedJobs: TodayJob[] = (data.jobs || []).map((job: any) => {
          const svc = getServiceIcon(job.serviceType)
          const initials = job.customerName
            ? job.customerName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
            : "??"
          return {
            ...job,
            customerInitials: job.customerInitials || initials,
            icon: svc.icon,
            iconColor: svc.iconColor,
            iconBg: svc.iconBg,
          }
        })

        setJobs(mappedJobs)
        setSummary(data.summary)
        const completed = new Set(
          mappedJobs.filter((j) => j.status === "completed").map((j) => j.id)
        )
        setCompletedJobs(completed)
      } catch {
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const completedCount = completedJobs.size
  const totalJobs = summary?.totalJobs || jobs.length
  const upcomingCount = totalJobs - completedCount

  const handleMarkComplete = (jobId: string) => {
    setCompletedJobs((prev) => {
      const next = new Set(prev)
      next.add(jobId)
      return next
    })
  }

  const handleGetDirections = (address: string) => {
    const encoded = encodeURIComponent(address)
    window.open(`https://maps.google.com/?q=${encoded}`, "_blank")
  }

  const userName = user?.name || "Cleaner"

  if (loading) {
    return (
      <div className="px-4 py-5 space-y-5 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting Section */}
      <section className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1B4332]">
          {getGreeting()}, {userName.split(" ")[0]}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <CalendarDays className="w-4 h-4" />
          <span>{dateStr}</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-[#1B4332] text-white">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold">{totalJobs}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#95D5B2] font-medium mt-0.5">Total Jobs</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-[#1B4332]">{upcomingCount}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] font-medium mt-0.5">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-[#15803d]">{completedCount}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] font-medium mt-0.5">Completed</p>
          </CardContent>
        </Card>
      </section>

      {/* Daily Progress */}
      {totalJobs > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#6b7280]">Today&apos;s Progress</span>
            <span className="text-xs font-bold text-[#1B4332]">
              {completedCount} of {totalJobs} done
            </span>
          </div>
          <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1B4332] to-[#95D5B2] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${totalJobs > 0 ? (completedCount / totalJobs) * 100 : 0}%` }}
            />
          </div>
          {summary && (
            <p className="text-xs text-[#6b7280] mt-1">
              Earned: <span className="font-semibold text-[#1B4332]">${summary.completedEarnings || 0}</span> of ${summary.totalEarnings || 0}
            </p>
          )}
        </section>
      )}

      {/* Jobs List */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#1B4332] uppercase tracking-wider">
          Today&apos;s Jobs
        </h2>

        {jobs.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-8 text-center">
              <CalendarDays className="w-10 h-10 text-[#95D5B2] mx-auto mb-3" />
              <p className="text-sm font-medium text-[#1B4332]">No jobs scheduled for today</p>
              <p className="text-xs text-[#6b7280] mt-1">Enjoy your day off!</p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => {
            const isCompleted = completedJobs.has(job.id)
            const IconComponent = job.icon

            return (
              <Card
                key={job.id}
                className={`border-0 shadow-sm overflow-hidden transition-all duration-300 ${
                  isCompleted ? "bg-[#f0fdf4] opacity-90" : "bg-white"
                }`}
              >
                <CardContent className="p-0">
                  {/* Job Header */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${job.iconBg}`}
                      >
                        <IconComponent className={`w-5 h-5 ${job.iconColor}`} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`font-semibold text-[15px] truncate ${
                              isCompleted ? "text-[#6b7280] line-through" : "text-[#1B4332]"
                            }`}
                          >
                            {job.customerName}
                          </h3>
                          <span className="text-base font-bold text-[#1B4332] shrink-0">
                            ${job.amount}
                          </span>
                        </div>

                        {/* Service Type Badge */}
                        <Badge
                          variant="secondary"
                          className={`mt-1.5 text-[11px] font-medium ${
                            job.serviceType === "Eco Clean"
                              ? "bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20"
                              : job.serviceType === "Deep Clean"
                              ? "bg-[#0f766e]/10 text-[#0f766e] border-[#0f766e]/20"
                              : "bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20"
                          }`}
                        >
                          {job.serviceType}
                        </Badge>

                        {/* Time & Address */}
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {job.time} - {job.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{job.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="mt-4 flex items-center gap-2">
                      {isCompleted ? (
                        <>
                          <div className="flex items-center gap-1.5 text-[#15803d] bg-[#15803d]/10 rounded-full px-3 py-1.5 text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Completed</span>
                          </div>
                          <Link href={`/cleaner-portal/job/${job.id}`} className="ml-auto">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#1B4332] hover:bg-[#1B4332]/10 text-xs font-medium"
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-0.5" />
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5 text-[#d97706] bg-[#d97706]/10 rounded-full px-3 py-1.5 text-xs font-medium">
                            <Circle className="w-3 h-3 fill-[#d97706]" />
                            <span>Upcoming</span>
                          </div>
                          <div className="ml-auto flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGetDirections(job.address)}
                              className="text-[#1B4332] border-[#1B4332]/20 hover:bg-[#1B4332]/10 text-xs font-medium"
                            >
                              <Navigation className="w-3.5 h-3.5 mr-1" />
                              Directions
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleMarkComplete(job.id)}
                              className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white text-xs font-medium"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Complete
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </section>

      {/* Quick Actions */}
      <section className="space-y-3 pb-4">
        <h2 className="text-sm font-semibold text-[#1B4332] uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/cleaner-portal/schedule">
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center group-hover:bg-[#1B4332]/20 transition-colors">
                  <CalendarDays className="w-5 h-5 text-[#1B4332]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B4332]">Schedule</p>
                  <p className="text-[11px] text-[#9ca3af]">View this week</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/cleaner-portal/messages">
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center group-hover:bg-[#1B4332]/20 transition-colors">
                  <Wrench className="w-5 h-5 text-[#1B4332]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B4332]">Support</p>
                  <p className="text-[11px] text-[#9ca3af]">Get help</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}

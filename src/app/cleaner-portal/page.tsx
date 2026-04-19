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

interface TodayJob {
  id: string
  customerName: string
  customerInitials: string
  time: string
  endTime: string
  serviceType: string
  address: string
  amount: number
  status: "upcoming" | "completed" | "in-progress"
  icon: React.ElementType
  iconColor: string
  iconBg: string
}

const jobs: TodayJob[] = [
  {
    id: "job-1",
    customerName: "Amanda Johnson",
    customerInitials: "AJ",
    time: "9:00 AM",
    endTime: "11:00 AM",
    serviceType: "Regular Clean",
    address: "123 Elm Street, Surrey",
    amount: 120,
    status: "upcoming",
    icon: Sparkles,
    iconColor: "text-[#1B4332]",
    iconBg: "bg-[#1B4332]/10",
  },
  {
    id: "job-2",
    customerName: "Bob Martinez",
    customerInitials: "BM",
    time: "12:00 PM",
    endTime: "2:00 PM",
    serviceType: "Deep Clean",
    address: "456 Oak Avenue, Vancouver",
    amount: 180,
    status: "upcoming",
    icon: Droplets,
    iconColor: "text-[#0f766e]",
    iconBg: "bg-[#0f766e]/10",
  },
  {
    id: "job-3",
    customerName: "Carol Williams",
    customerInitials: "CW",
    time: "3:00 PM",
    endTime: "4:30 PM",
    serviceType: "Eco Clean",
    address: "789 Pine Road, Burnaby",
    amount: 95,
    status: "completed",
    icon: Leaf,
    iconColor: "text-[#15803d]",
    iconBg: "bg-[#15803d]/10",
  },
]

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

function getFormattedDate(): string {
  const today = new Date()
  return today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function TodayJobsPage() {
  const [completedJobs, setCompletedJobs] = useState<Set<string>>(new Set(["job-3"]))
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const completedCount = completedJobs.size
  const totalJobs = jobs.length
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

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting Section */}
      <section className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1B4332]">
          {getGreeting()}, Maria 👋
        </h1>
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <CalendarDays className="w-4 h-4" />
          <span>{getFormattedDate()}</span>
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
            style={{ width: `${(completedCount / totalJobs) * 100}%` }}
          />
        </div>
      </section>

      {/* Jobs List */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[#1B4332] uppercase tracking-wider">
          Today&apos;s Jobs
        </h2>

        {jobs.map((job) => {
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
        })}
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

"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  Droplets,
  Leaf,
  CheckCircle2,
  Circle,
  Wrench,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScheduleJob {
  id: string
  customerName: string
  time: string
  endTime: string
  serviceType: string
  address: string
  status: "scheduled" | "completed" | "cancelled"
  icon: React.ElementType
}

interface DaySchedule {
  date: Date
  dayName: string
  dayNum: string
  month: string
  isToday: boolean
  jobs: ScheduleJob[]
}

function getServiceIcon(type: string): React.ElementType {
  switch (type) {
    case "Deep Clean":
      return Droplets
    case "Eco Clean":
      return Leaf
    case "Move In/Out":
      return Wrench
    default:
      return Sparkles
  }
}

function getServiceBadgeStyle(type: string) {
  switch (type) {
    case "Deep Clean":
      return "bg-[#0f766e]/10 text-[#0f766e] border-[#0f766e]/20"
    case "Eco Clean":
      return "bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20"
    case "Move In/Out":
      return "bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20"
    default:
      return "bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20"
  }
}

function generateWeekData(weekOffset: number): DaySchedule[] {
  const today = new Date()
  const currentDay = today.getDay()
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset + weekOffset * 7)

  const days: DaySchedule[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    const dayData: DaySchedule = {
      date,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate().toString(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      isToday,
      jobs: [],
    }

    // Assign mock jobs based on day index (relative to week)
    const weekDayIndex = weekOffset === 0 ? i : i
    if (weekOffset === 0) {
      // Current week
      if (i === 0) {
        // Monday - already past
        dayData.jobs = [
          {
            id: "w0-1",
            customerName: "Sarah Lee",
            time: "8:00 AM",
            endTime: "9:30 AM",
            serviceType: "Regular Clean",
            address: "321 Cedar Blvd, Vancouver",
            status: "completed",
            icon: Sparkles,
          },
          {
            id: "w0-2",
            customerName: "Tom Baker",
            time: "11:00 AM",
            endTime: "1:00 PM",
            serviceType: "Deep Clean",
            address: "654 Maple Lane, Burnaby",
            status: "completed",
            icon: Droplets,
          },
        ]
      } else if (i === 1) {
        // Tuesday - today
        dayData.jobs = [
          {
            id: "w0-3",
            customerName: "Amanda Johnson",
            time: "9:00 AM",
            endTime: "11:00 AM",
            serviceType: "Regular Clean",
            address: "123 Elm Street, Surrey",
            status: "scheduled",
            icon: Sparkles,
          },
          {
            id: "w0-4",
            customerName: "Bob Martinez",
            time: "12:00 PM",
            endTime: "2:00 PM",
            serviceType: "Deep Clean",
            address: "456 Oak Avenue, Vancouver",
            status: "scheduled",
            icon: Droplets,
          },
          {
            id: "w0-5",
            customerName: "Carol Williams",
            time: "3:00 PM",
            endTime: "4:30 PM",
            serviceType: "Eco Clean",
            address: "789 Pine Road, Burnaby",
            status: "scheduled",
            icon: Leaf,
          },
        ]
      } else if (i === 2) {
        // Wednesday
        dayData.jobs = [
          {
            id: "w0-6",
            customerName: "David Thompson",
            time: "10:00 AM",
            endTime: "12:00 PM",
            serviceType: "Regular Clean",
            address: "101 Birch Way, Richmond",
            status: "scheduled",
            icon: Sparkles,
          },
        ]
      } else if (i === 3) {
        // Thursday
        dayData.jobs = [
          {
            id: "w0-7",
            customerName: "Emma Davis",
            time: "9:00 AM",
            endTime: "11:30 AM",
            serviceType: "Move In/Out",
            address: "222 Spruce Court, Vancouver",
            status: "scheduled",
            icon: Wrench,
          },
          {
            id: "w0-8",
            customerName: "Frank Miller",
            time: "1:00 PM",
            endTime: "2:30 PM",
            serviceType: "Eco Clean",
            address: "555 Willow St, Surrey",
            status: "scheduled",
            icon: Leaf,
          },
        ]
      } else if (i === 4) {
        // Friday
        dayData.jobs = [
          {
            id: "w0-9",
            customerName: "Grace Kim",
            time: "10:00 AM",
            endTime: "12:00 PM",
            serviceType: "Deep Clean",
            address: "888 Aspen Drive, Burnaby",
            status: "scheduled",
            icon: Droplets,
          },
        ]
      }
      // Saturday and Sunday - no jobs
    } else if (weekOffset === 1) {
      // Next week
      if (i === 0) {
        dayData.jobs = [
          {
            id: "w1-1",
            customerName: "Hannah Brown",
            time: "9:00 AM",
            endTime: "11:00 AM",
            serviceType: "Regular Clean",
            address: "444 Poplar Ave, Vancouver",
            status: "scheduled",
            icon: Sparkles,
          },
          {
            id: "w1-2",
            customerName: "Ivan Chen",
            time: "1:00 PM",
            endTime: "3:30 PM",
            serviceType: "Deep Clean",
            address: "777 Juniper St, Surrey",
            status: "scheduled",
            icon: Droplets,
          },
        ]
      } else if (i === 2) {
        dayData.jobs = [
          {
            id: "w1-3",
            customerName: "Julia Park",
            time: "10:00 AM",
            endTime: "11:30 AM",
            serviceType: "Eco Clean",
            address: "333 Hickory Lane, Richmond",
            status: "scheduled",
            icon: Leaf,
          },
        ]
      } else if (i === 4) {
        dayData.jobs = [
          {
            id: "w1-4",
            customerName: "Kevin White",
            time: "8:00 AM",
            endTime: "12:00 PM",
            serviceType: "Move In/Out",
            address: "999 Redwood Rd, Burnaby",
            status: "scheduled",
            icon: Wrench,
          },
        ]
      }
    } else if (weekOffset === -1) {
      // Previous week
      if (i === 0) {
        dayData.jobs = [
          {
            id: "wm1-1",
            customerName: "Laura Scott",
            time: "9:00 AM",
            endTime: "11:00 AM",
            serviceType: "Regular Clean",
            address: "111 Chestnut Pl, Vancouver",
            status: "completed",
            icon: Sparkles,
          },
        ]
      } else if (i === 1) {
        dayData.jobs = [
          {
            id: "wm1-2",
            customerName: "Mike Adams",
            time: "10:00 AM",
            endTime: "1:00 PM",
            serviceType: "Deep Clean",
            address: "222 Sycamore Dr, Surrey",
            status: "completed",
            icon: Droplets,
          },
          {
            id: "wm1-3",
            customerName: "Nancy Lee",
            time: "2:00 PM",
            endTime: "3:30 PM",
            serviceType: "Eco Clean",
            address: "333 Walnut Ct, Burnaby",
            status: "completed",
            icon: Leaf,
          },
        ]
      } else if (i === 3) {
        dayData.jobs = [
          {
            id: "wm1-4",
            customerName: "Olivia Grant",
            time: "9:30 AM",
            endTime: "11:30 AM",
            serviceType: "Regular Clean",
            address: "444 Beech Blvd, Richmond",
            status: "completed",
            icon: Sparkles,
          },
        ]
      } else if (i === 4) {
        dayData.jobs = [
          {
            id: "wm1-5",
            customerName: "Peter Hall",
            time: "10:00 AM",
            endTime: "12:00 PM",
            serviceType: "Move In/Out",
            address: "555 Alder St, Vancouver",
            status: "completed",
            icon: Wrench,
          },
        ]
      }
    }

    days.push(dayData)
  }

  return days
}

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const weekData = useMemo(() => generateWeekData(weekOffset), [weekOffset])

  const totalJobsThisWeek = weekData.reduce((sum, day) => sum + day.jobs.length, 0)
  const completedJobsThisWeek = weekData.reduce(
    (sum, day) => sum + day.jobs.filter((j) => j.status === "completed").length,
    0
  )

  const getWeekLabel = () => {
    if (weekOffset === 0) return "This Week"
    if (weekOffset === 1) return "Next Week"
    if (weekOffset === -1) return "Last Week"
    return `Week of ${weekData[0].date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1B4332]">Schedule</h1>
        <p className="text-sm text-[#6b7280]">Manage your weekly cleaning jobs</p>
      </section>

      {/* Week Navigation */}
      <section className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="h-8 w-8 text-[#1B4332] hover:bg-[#1B4332]/10"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#1B4332]">{getWeekLabel()}</p>
          <p className="text-[11px] text-[#9ca3af]">
            {weekData[0].date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
            {weekData[6].date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="h-8 w-8 text-[#1B4332] hover:bg-[#1B4332]/10"
          aria-label="Next week"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </section>

      {/* Week Stats */}
      <section className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-[#1B4332]">{totalJobsThisWeek}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Total Jobs</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-[#15803d]">{completedJobsThisWeek}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-[#d97706]">{totalJobsThisWeek - completedJobsThisWeek}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Remaining</p>
          </CardContent>
        </Card>
      </section>

      {/* Day Selector Strip */}
      <section className="bg-white rounded-2xl shadow-sm p-3">
        <div className="flex justify-between gap-1">
          {weekData.map((day, index) => {
            const hasJobs = day.jobs.length > 0
            const isSelected = selectedDay === index
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(isSelected ? null : index)}
                className={cn(
                  "flex flex-col items-center py-2 px-1.5 rounded-xl transition-all duration-200 flex-1 min-w-0",
                  day.isToday && !isSelected
                    ? "bg-[#1B4332]/10 ring-1 ring-[#1B4332]/30"
                    : isSelected
                    ? "bg-[#1B4332] text-white"
                    : "hover:bg-[#f0fdf4]"
                )}
                aria-label={`${day.dayName}, ${day.month} ${day.dayNum}`}
              >
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase",
                    isSelected ? "text-[#95D5B2]" : day.isToday ? "text-[#1B4332]" : "text-[#9ca3af]"
                  )}
                >
                  {day.dayName}
                </span>
                <span
                  className={cn(
                    "text-lg font-bold leading-tight mt-0.5",
                    isSelected ? "text-white" : day.isToday ? "text-[#1B4332]" : "text-[#374151]"
                  )}
                >
                  {day.dayNum}
                </span>
                {hasJobs && (
                  <div
                    className={cn(
                      "flex gap-0.5 mt-1",
                      day.jobs.length > 1 && "gap-0"
                    )}
                  >
                    {day.jobs.slice(0, 3).map((_, jIdx) => (
                      <div
                        key={jIdx}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-[#95D5B2]" : "bg-[#1B4332]"
                        )}
                      />
                    ))}
                  </div>
                )}
                {!hasJobs && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db] mt-1" />
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Schedule Details */}
      <section className="space-y-3">
        {weekData.map((day, index) => {
          // If a day is selected, only show that day
          if (selectedDay !== null && selectedDay !== index) return null
          // If no jobs, skip unless selected
          if (day.jobs.length === 0 && selectedDay === null) return null
          if (day.jobs.length === 0 && selectedDay === index) {
            return (
              <div key={index} className="text-center py-8">
                <div className="w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-[#95D5B2]" />
                </div>
                <p className="text-sm font-medium text-[#1B4332]">
                  No jobs scheduled for {day.dayName}
                </p>
                <p className="text-xs text-[#9ca3af] mt-1">
                  {day.isToday ? "Enjoy your day off!" : "You're free this day"}
                </p>
              </div>
            )
          }

          return (
            <div key={index} className="space-y-2">
              {/* Day Header */}
              <div className="flex items-center gap-2">
                {day.isToday && (
                  <span className="px-2 py-0.5 bg-[#1B4332] text-white text-[10px] font-semibold rounded-full uppercase">
                    Today
                  </span>
                )}
                <h3 className="text-sm font-semibold text-[#1B4332]">
                  {day.dayName}, {day.month} {day.dayNum}
                </h3>
                <Badge
                  variant="secondary"
                  className="text-[10px] font-medium bg-[#f0fdf4] text-[#1B4332] border-[#95D5B2]/30"
                >
                  {day.jobs.length} {day.jobs.length === 1 ? "job" : "jobs"}
                </Badge>
                {/* Availability indicator */}
                <span
                  className={cn(
                    "ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full",
                    day.jobs.length > 2
                      ? "bg-[#fbbf24]/10 text-[#d97706]"
                      : day.jobs.length > 0
                      ? "bg-[#1B4332]/10 text-[#1B4332]"
                      : "bg-[#15803d]/10 text-[#15803d]"
                  )}
                >
                  {day.jobs.length > 2 ? "Busy" : day.jobs.length > 0 ? "Moderate" : "Available"}
                </span>
              </div>

              {/* Job Cards */}
              {day.jobs.map((job) => {
                const JobIcon = job.icon
                const isCompleted = job.status === "completed"
                return (
                  <Link href={`/cleaner-portal/job/${job.id}`} key={job.id}>
                    <Card
                      className={`border-0 shadow-sm mb-2 hover:shadow-md transition-all cursor-pointer ${
                        isCompleted ? "bg-[#f8fafc]" : "bg-white"
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                              isCompleted ? "bg-[#15803d]/10" : "bg-[#1B4332]/10"
                            )}
                          >
                            <JobIcon
                              className={cn(
                                "w-5 h-5",
                                isCompleted ? "text-[#15803d]" : "text-[#1B4332]"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                className={cn(
                                  "text-sm font-semibold truncate",
                                  isCompleted ? "text-[#6b7280]" : "text-[#1B4332]"
                                )}
                              >
                                {job.customerName}
                              </h4>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock className="w-3 h-3 text-[#9ca3af]" />
                              <span className="text-xs text-[#6b7280]">
                                {job.time} - {job.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#9ca3af]" />
                              <span className="text-xs text-[#9ca3af] truncate">{job.address}</span>
                            </div>
                            <div className="mt-1.5">
                              <Badge
                                variant="secondary"
                                className={cn("text-[10px] font-medium", getServiceBadgeStyle(job.serviceType))}
                              >
                                {job.serviceType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </section>

      {/* Empty state for when no day is selected and no jobs are shown */}
      {weekData.every((d) => (selectedDay === null ? d.jobs.length === 0 : false)) && selectedDay === null && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-[#95D5B2]" />
          </div>
          <p className="text-base font-semibold text-[#1B4332]">No jobs this week</p>
          <p className="text-sm text-[#9ca3af] mt-1">Check next week for upcoming jobs</p>
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}

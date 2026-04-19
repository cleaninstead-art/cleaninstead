"use client"

import React, { useState, useEffect } from "react"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Gift,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Droplets,
  Leaf,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface EarningsApiResponse {
  summary: {
    thisWeek: number
    thisMonth: number
    totalEarnings: number
    weeklyChange: number
    monthlyChange: number
  }
  dailyEarnings: Array<{ day: string; earnings: number; jobs: number }>
  serviceBreakdown: Array<{
    name: string
    percentage: number
    earnings: number
    jobs: number
  }>
  tips: {
    total: number
    thisMonth: number
    recent: Array<{
      id: string
      customer: string
      amount: number
      date: string
      service: string
    }>
  }
  weeklyGoal: {
    target: number
    current: number
    percentage: number
  }
  payoutHistory: Array<{
    id: number
    date: string
    amount: number
    status: string
    method: string
  }>
}

const SERVICE_COLORS = ["#1B4332", "#95D5B2", "#2d6a4f", "#52796f", "#74c69d", "#b7e4c7", "#40916c"]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2.5 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="text-xs font-semibold text-[#1B4332]">{label}</p>
        <p className="text-sm font-bold text-[#1B4332]">${payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "payouts">("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<EarningsApiResponse | null>(null)

  useEffect(() => {
    async function fetchEarnings() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/cleaner/earnings")
        if (!res.ok) {
          throw new Error("Failed to fetch earnings")
        }
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchEarnings()
  }, [])

  // Fallback values when data is not yet available or on error
  const summary = data?.summary ?? {
    thisWeek: 0,
    thisMonth: 0,
    totalEarnings: 0,
    weeklyChange: 0,
    monthlyChange: 0,
  }

  const weeklyGoal = data?.weeklyGoal ?? { target: 1000, current: 0, percentage: 0 }
  const weeklyGoalTarget = weeklyGoal.target
  const weeklyGoalCurrent = weeklyGoal.current
  const weeklyGoalPct = Math.min(Math.round((weeklyGoalCurrent / weeklyGoalTarget) * 100), 100)
  const weeklyGoalRemaining = Math.max(weeklyGoalTarget - weeklyGoalCurrent, 0)

  const dailyEarnings = data?.dailyEarnings ?? [
    { day: "Mon", earnings: 0, jobs: 0 },
    { day: "Tue", earnings: 0, jobs: 0 },
    { day: "Wed", earnings: 0, jobs: 0 },
    { day: "Thu", earnings: 0, jobs: 0 },
    { day: "Fri", earnings: 0, jobs: 0 },
    { day: "Sat", earnings: 0, jobs: 0 },
    { day: "Sun", earnings: 0, jobs: 0 },
  ]

  // Map API serviceBreakdown (name, percentage) to chart format (name, value, color)
  const serviceBreakdown = (data?.serviceBreakdown ?? []).map((service, index) => ({
    name: service.name,
    value: service.percentage,
    color: SERVICE_COLORS[index % SERVICE_COLORS.length],
  }))

  const tips = data?.tips ?? { total: 0, thisMonth: 0, recent: [] }
  const recentTips = tips.recent ?? []
  const payoutHistory = data?.payoutHistory ?? []

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <section className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Earnings</h2>
          <p className="text-muted-foreground">Track your income and tips</p>
        </section>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#1B4332] animate-spin" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <section className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Earnings</h2>
          <p className="text-muted-foreground">Track your income and tips</p>
        </section>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-[#1B4332] font-medium underline underline-offset-2 hover:text-[#2d6a4f] transition-colors"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Earnings</h2>
        <p className="text-muted-foreground">Track your income and tips</p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-3">
        {/* Main Earnings Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-[#95D5B2]" />
              <span className="text-sm text-[#95D5B2] font-medium">This Week</span>
            </div>
            <p className="text-4xl font-bold">${summary.thisWeek.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              {summary.weeklyChange >= 0 ? (
                <>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#95D5B2]" />
                  <span className="text-xs text-[#95D5B2]">+{summary.weeklyChange}% from last week</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#fca5a5]" />
                  <span className="text-xs text-[#fca5a5]">{summary.weeklyChange}% from last week</span>
                </>
              )}
            </div>
            {/* Weekly Goal */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#95D5B2]">Weekly Goal</span>
                <span className="text-xs font-semibold text-white">{weeklyGoalPct}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#95D5B2] rounded-full transition-all duration-500"
                  style={{ width: `${weeklyGoalPct}%` }}
                />
              </div>
              <p className="text-[10px] text-[#95D5B2]/70 mt-1">${weeklyGoalRemaining.toLocaleString()} remaining to reach goal</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly & Total */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#9ca3af]" />
                <span className="text-xs text-[#9ca3af] font-medium">This Month</span>
              </div>
              <p className="text-2xl font-bold text-[#1B4332]">${summary.thisMonth.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {summary.monthlyChange >= 0 ? (
                  <>
                    <ArrowUpRight className="w-3 h-3 text-[#15803d]" />
                    <span className="text-[10px] text-[#15803d] font-medium">+{summary.monthlyChange}% vs last month</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-3 h-3 text-[#dc2626]" />
                    <span className="text-[10px] text-[#dc2626] font-medium">{summary.monthlyChange}% vs last month</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#9ca3af]" />
                <span className="text-xs text-[#9ca3af] font-medium">Total Earnings</span>
              </div>
              <p className="text-2xl font-bold text-[#1B4332]">${summary.totalEarnings.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-[#9ca3af]" />
                <span className="text-[10px] text-[#9ca3af]">Since joining</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="flex bg-[#f0fdf4] rounded-xl p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            activeTab === "overview"
              ? "bg-[#1B4332] text-white shadow-sm"
              : "text-[#6b7280] hover:text-[#1B4332]"
          )}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("payouts")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            activeTab === "payouts"
              ? "bg-[#1B4332] text-white shadow-sm"
              : "text-[#6b7280] hover:text-[#1B4332]"
          )}
        >
          Payouts
        </button>
      </section>

      {activeTab === "overview" ? (
        <>
          {/* Daily Earnings Chart */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-0 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-[#1B4332]">Daily Earnings</CardTitle>
                <Badge variant="secondary" className="text-[10px] font-medium bg-[#f0fdf4] text-[#1B4332] border-[#95D5B2]/30">
                  This Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-4 pt-2">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyEarnings} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(27,67,50,0.05)" }} />
                  <Bar
                    dataKey="earnings"
                    fill="#1B4332"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Breakdown */}
          {serviceBreakdown.length > 0 && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-bold text-[#1B4332]">Service Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-[140px] h-[140px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={65}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {serviceBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, ""]}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            fontSize: "12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3">
                    {serviceBreakdown.map((service, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: service.color }}
                            />
                            <span className="text-xs font-medium text-[#374151]">{service.name}</span>
                          </div>
                          <span className="text-xs font-bold text-[#1B4332]">{service.value}%</span>
                        </div>
                        <Progress value={service.value} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#d97706]" />
              <h2 className="text-sm font-semibold text-[#1B4332] uppercase tracking-wider">Tips</h2>
              <Badge className="bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20 text-[10px] font-medium">
                ${tips.total.toLocaleString()} total
              </Badge>
            </div>

            {recentTips.length > 0 ? (
              recentTips.map((tip) => (
                <Card key={tip.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d97706]/10 flex items-center justify-center shrink-0">
                        <Gift className="w-5 h-5 text-[#d97706]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#1B4332] truncate">
                            {tip.customer}
                          </h3>
                          <span className="text-sm font-bold text-[#d97706] shrink-0 ml-2">
                            +${tip.amount}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#9ca3af]">{tip.service}</span>
                          <span className="text-[#d1d5db]">·</span>
                          <span className="text-xs text-[#9ca3af]">{tip.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 text-[#d97706]/40 mx-auto mb-2" />
                  <p className="text-sm text-[#9ca3af]">No tips yet</p>
                </CardContent>
              </Card>
            )}
          </section>
        </>
      ) : (
        <>
          {/* Payout History */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#1B4332]" />
              <h2 className="text-sm font-semibold text-[#1B4332] uppercase tracking-wider">
                Payout History
              </h2>
            </div>

            {payoutHistory.length > 0 ? (
              payoutHistory.map((payout) => (
                <Card key={payout.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          payout.status === "Paid"
                            ? "bg-[#15803d]/10"
                            : "bg-[#d97706]/10"
                        )}
                      >
                        <CreditCard
                          className={cn(
                            "w-5 h-5",
                            payout.status === "Paid" ? "text-[#15803d]" : "text-[#d97706]"
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#1B4332]">
                            ${payout.amount.toLocaleString()}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] font-medium",
                              payout.status === "Paid"
                                ? "bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20"
                                : "bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20"
                            )}
                          >
                            {payout.status === "Paid" && <CheckCircle2 className="w-3 h-3 mr-0.5" />}
                            {payout.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#9ca3af]">{payout.date}</span>
                          <span className="text-[#d1d5db]">·</span>
                          <span className="text-xs text-[#9ca3af]">{payout.method}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 text-center">
                  <CreditCard className="w-8 h-8 text-[#1B4332]/40 mx-auto mb-2" />
                  <p className="text-sm text-[#9ca3af]">No payout history yet</p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Next Payout Info */}
          <Card className="border-0 shadow-sm bg-[#f0fdf4]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#1B4332]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1B4332]">Next Payout</h3>
                  <p className="text-xs text-[#6b7280] mt-1">
                    Payouts are processed every Friday. Your next payout will be on{" "}
                    <span className="font-semibold text-[#1B4332]">April 19, 2026</span>.
                  </p>
                  <p className="text-xs text-[#6b7280] mt-0.5">
                    Estimated amount: <span className="font-bold text-[#1B4332]">${summary.thisWeek.toLocaleString()}.00</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

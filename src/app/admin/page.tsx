"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ClipboardList,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  UserPlus,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Link from "next/link";

const chartConfig = {
  amount: {
    label: "Revenue",
    color: "#1B4332",
  },
} satisfies ChartConfig;

const kpiData = [
  {
    label: "Revenue",
    value: "$24,580",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Bookings",
    value: "156",
    change: "+8.3%",
    positive: true,
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Customers",
    value: "89",
    change: "+15.2%",
    positive: true,
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
  {
    label: "Avg Rating",
    value: "4.8/5",
    change: "+0.2",
    positive: true,
    icon: Star,
    color: "bg-amber-100 text-amber-700",
  },
];

const recentActivity = [
  {
    id: 1,
    icon: ClipboardList,
    iconColor: "text-blue-600 bg-blue-100",
    message: "New booking #1056 by Amanda J.",
    detail: "Regular Clean - Jan 20, 9:00 AM",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: CreditCard,
    iconColor: "text-emerald-600 bg-emerald-100",
    message: "Payment $180 captured",
    detail: "Booking #1009 - Jennifer Martinez",
    time: "22 min ago",
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconColor: "text-green-600 bg-green-100",
    message: "Review approved for Maria S.",
    detail: "5-star rating from Robert Taylor",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: UserPlus,
    iconColor: "text-purple-600 bg-purple-100",
    message: "New cleaner application from Tom K.",
    detail: "Areas: Coquitlam, Port Moody",
    time: "2 hours ago",
  },
  {
    id: 5,
    icon: CalendarDays,
    iconColor: "text-amber-600 bg-amber-100",
    message: "Booking #1003 rescheduled",
    detail: "Sarah W. moved to Jan 18",
    time: "3 hours ago",
  },
];

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<
    { day: string; amount: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setChartData(data.weeklyRevenue);
      } catch {
        setChartData([
          { day: "Mon", amount: 3200 },
          { day: "Tue", amount: 2800 },
          { day: "Wed", amount: 3500 },
          { day: "Thu", amount: 4100 },
          { day: "Fri", amount: 3800 },
          { day: "Sat", amount: 4200 },
          { day: "Sun", amount: 2980 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening with CleanInstead today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {kpi.positive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        kpi.positive
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last week
                    </span>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${kpi.color}`}
                >
                  <kpi.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Weekly Revenue
                </CardTitle>
                <CardDescription>
                  Revenue overview for the past 7 days
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                This Week
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#1B4332"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#95D5B2"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-xs"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#1B4332"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Recent Activity
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 group"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.iconColor}`}
                  >
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.detail}
                    </p>
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-sm text-[#1B4332] hover:text-[#1B4332] hover:bg-emerald-50"
            >
              View all activity
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Link href="/admin/bookings">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardList className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Manage Bookings
                </p>
                <p className="text-xs text-muted-foreground">12 pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/cleaners">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Cleaners
                </p>
                <p className="text-xs text-muted-foreground">1 pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/reviews">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Reviews
                </p>
                <p className="text-xs text-muted-foreground">3 pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/inventory">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Inventory
                </p>
                <p className="text-xs text-muted-foreground">3 low stock</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

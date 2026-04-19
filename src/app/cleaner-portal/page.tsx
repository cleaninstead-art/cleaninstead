"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  CalendarDays,
  CheckCircle2,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  MapPin,
  Navigation,
  Circle,
  Sparkles,
  Droplets,
  Leaf,
  Wrench,
  MessageCircle,
  ChevronRight,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useAuth } from "@/lib/useAuth";
import { cn } from "@/lib/utils";

const chartConfig = {
  amount: {
    label: "Earnings",
    color: "#1B4332",
  },
} satisfies ChartConfig;

interface TodayJob {
  id: string;
  customerName: string;
  customerInitials: string;
  time: string;
  endTime: string;
  serviceType: string;
  address: string;
  amount: number;
  status: "upcoming" | "completed" | "in_progress";
  progress?: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

function getServiceIcon(serviceType: string) {
  switch (serviceType) {
    case "Deep Clean":
      return { icon: Droplets, iconColor: "text-[#0f766e]", iconBg: "bg-[#0f766e]/10" };
    case "Eco Clean":
      return { icon: Leaf, iconColor: "text-[#15803d]", iconBg: "bg-[#15803d]/10" };
    case "Move In Clean":
    case "Move Out Clean":
      return { icon: Wrench, iconColor: "text-[#b45309]", iconBg: "bg-[#b45309]/10" };
    default:
      return { icon: Sparkles, iconColor: "text-[#1B4332]", iconBg: "bg-[#1B4332]/10" };
  }
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function CleanerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<TodayJob[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(true);
  const [completedJobs, setCompletedJobs] = useState<Set<string>>(new Set());
  const [chartData, setChartData] = useState<{ day: string; amount: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/cleaner/today");
        const data = await res.json();
        setDateStr(data.date || "");

        const mappedJobs: TodayJob[] = (data.jobs || []).map((job: any) => {
          const svc = getServiceIcon(job.serviceType);
          const initials = job.customerName
            ? job.customerName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
            : "??";
          return {
            ...job,
            customerInitials: job.customerInitials || initials,
            icon: svc.icon,
            iconColor: svc.iconColor,
            iconBg: svc.iconBg,
          };
        });

        setJobs(mappedJobs);
        setSummary(data.summary);
        const completed = new Set(
          mappedJobs.filter((j) => j.status === "completed").map((j) => j.id)
        );
        setCompletedJobs(completed);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    async function fetchEarnings() {
      try {
        const res = await fetch("/api/cleaner/earnings");
        const data = await res.json();
        if (data.dailyEarnings) {
          setChartData(data.dailyEarnings.map((d: any) => ({ day: d.day, amount: d.earnings })));
        }
      } catch {
        setChartData([
          { day: "Mon", amount: 85 },
          { day: "Tue", amount: 120 },
          { day: "Wed", amount: 95 },
          { day: "Thu", amount: 150 },
          { day: "Fri", amount: 110 },
          { day: "Sat", amount: 180 },
          { day: "Sun", amount: 60 },
        ]);
      }
    }

    fetchData();
    fetchEarnings();
  }, []);

  const completedCount = completedJobs.size;
  const totalJobs = summary?.totalJobs || jobs.length;
  const upcomingCount = totalJobs - completedCount;

  const kpiData = useMemo(() => [
    {
      label: "Revenue / This Week",
      value: summary ? `$${(summary.totalEarnings || 0).toLocaleString()}` : "$0",
      change: "+12%",
      positive: true,
      icon: DollarSign,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Today's Jobs",
      value: String(totalJobs),
      change: `${completedCount} completed`,
      positive: true,
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Completed",
      value: String(completedCount),
      change: totalJobs > 0 ? `${Math.round((completedCount / totalJobs) * 100)}%` : "0%",
      positive: true,
      icon: CheckCircle2,
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Avg Rating",
      value: "4.9/5",
      change: "+0.2",
      positive: true,
      icon: Star,
      color: "bg-purple-100 text-purple-700",
    },
  ], [totalJobs, completedCount, summary]);

  const handleMarkComplete = (jobId: string) => {
    setCompletedJobs((prev) => {
      const next = new Set(prev);
      next.add(jobId);
      return next;
    });
  };

  const handleGetDirections = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encoded}`, "_blank");
  };

  const userName = user?.name || "Cleaner";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                <div className="h-8 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          {getGreeting()}, {userName.split(" ")[0]}! Here&apos;s your cleaning summary for today.
          {dateStr && <span className="ml-1">{dateStr}</span>}
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
                        kpi.positive ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                    {kpi.label === "Revenue / This Week" && (
                      <span className="text-xs text-muted-foreground">
                        vs last week
                      </span>
                    )}
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

      {/* Weekly Earnings Chart + Today's Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Weekly Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Weekly Earnings
                </CardTitle>
                <CardDescription>
                  Your earnings overview for the past 7 days
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                This Week
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#95D5B2" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#1B4332"
                  strokeWidth={2.5}
                  fill="url(#earningsGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Today's Jobs Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Today&apos;s Jobs
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {totalJobs} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
            {/* Progress */}
            {totalJobs > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Daily Progress</span>
                  <span className="text-xs font-semibold text-[#1B4332]">
                    {completedCount}/{totalJobs}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1B4332] to-[#95D5B2] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${totalJobs > 0 ? (completedCount / totalJobs) * 100 : 0}%`,
                    }}
                  />
                </div>
                {summary && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned:{" "}
                    <span className="font-semibold text-[#1B4332]">
                      ${summary.completedEarnings || 0}
                    </span>{" "}
                    of ${summary.totalEarnings || 0}
                  </p>
                )}
              </div>
            )}

            {/* Job List */}
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No jobs scheduled for today
                </p>
              ) : (
                jobs.map((job) => {
                  const isCompleted = completedJobs.has(job.id);
                  return (
                    <div
                      key={job.id}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          job.iconBg
                        )}
                      >
                        <job.icon className={cn("w-4 h-4", job.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium text-gray-900 leading-tight truncate",
                            isCompleted && "line-through text-gray-400"
                          )}
                        >
                          {job.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.time} - {job.endTime}
                        </p>
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                          {job.serviceType} &middot; ${job.amount}
                        </p>
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-1" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <Link href="/cleaner-portal">
              <Button
                variant="ghost"
                className="w-full mt-4 text-sm text-[#1B4332] hover:text-[#1B4332] hover:bg-emerald-50"
              >
                View all jobs
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Today's Jobs Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Job Details
              </CardTitle>
              <CardDescription>
                Complete job list with status and actions
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              {upcomingCount} upcoming
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-500">No jobs scheduled for today</p>
              <p className="text-xs text-muted-foreground mt-1">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Service</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => {
                    const isCompleted = completedJobs.has(job.id);
                    return (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                job.iconBg
                              )}
                            >
                              <job.icon className={cn("w-4 h-4", job.iconColor)} />
                            </div>
                            <div>
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  isCompleted && "line-through text-gray-400"
                                )}
                              >
                                {job.customerName}
                              </p>
                              <p className="text-xs text-muted-foreground sm:hidden">
                                {job.serviceType}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium"
                          >
                            {job.serviceType}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
                            {job.address}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">
                            {job.time} - {job.endTime}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-semibold text-[#1B4332]">
                            ${job.amount}
                          </span>
                        </TableCell>
                        <TableCell>
                          {isCompleted ? (
                            <Badge className="bg-green-100 text-green-700 text-xs border-0">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Done
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 text-xs border-0">
                              <Circle className="w-3 h-3 mr-1" />
                              Upcoming
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {!isCompleted && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleGetDirections(job.address)}
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-[#1B4332] hover:bg-emerald-50"
                                  aria-label="Get directions"
                                >
                                  <Navigation className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleMarkComplete(job.id)}
                                  className="h-8 text-xs bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
                                >
                                  Complete
                                </Button>
                              </>
                            )}
                            <Link href={`/cleaner-portal/job/${job.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-[#1B4332] hover:bg-emerald-50"
                              >
                                Details
                                <ChevronRight className="w-3 h-3 ml-0.5" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <Link href="/cleaner-portal/schedule">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarDays className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Schedule</p>
                <p className="text-xs text-muted-foreground">View this week</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/cleaner-portal/messages">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Messages</p>
                <p className="text-xs text-muted-foreground">2 unread</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/cleaner-portal/earnings">
          <Card className="hover:shadow-md transition-all hover:border-[#95D5B2] cursor-pointer group col-span-2 md:col-span-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Earnings</p>
                <p className="text-xs text-muted-foreground">Track income</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

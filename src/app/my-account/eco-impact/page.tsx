"use client";

import React, { useState, useEffect } from "react";
import {
  Leaf,
  Droplets,
  Recycle,
  Shield,
  Award,
  Lock,
  Globe2,
  TreePine,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const impactStats = [
  {
    label: "Plastic Bottles Saved",
    value: 24,
    icon: Recycle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    label: "Refill Products Used",
    value: 18,
    icon: Droplets,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "Chemical-Free Cleans",
    value: 15,
    icon: Shield,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const ecoBadges = [
  {
    name: "Eco Starter",
    description: "Completed your 1st eco clean",
    earned: true,
    icon: Leaf,
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Green Warrior",
    description: "Completed 10 eco cleans",
    earned: true,
    icon: TreePine,
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Zero Waste Hero",
    description: "Used 20 refill products",
    earned: false,
    icon: Recycle,
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    progress: "18/20",
  },
  {
    name: "Planet Protector",
    description: "Save 50 plastic bottles",
    earned: false,
    icon: Globe2,
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    progress: "24/50",
  },
  {
    name: "Sustainability Champion",
    description: "Complete 100 eco cleans",
    earned: false,
    icon: Award,
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    progress: "15/100",
  },
];

const monthlyData = [
  { month: "Oct", cleans: 1 },
  { month: "Nov", cleans: 2 },
  { month: "Dec", cleans: 1 },
  { month: "Jan", cleans: 3 },
  { month: "Feb", cleans: 2 },
  { month: "Mar", cleans: 3 },
  { month: "Apr", cleans: 3 },
];

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border text-sm">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-[#1B4332]">
          {payload[0].value} eco clean{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
}

export default function EcoImpactPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero */}
      <div className="text-center bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#95D5B2]/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#95D5B2]/5 rounded-full translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Leaf className="w-7 h-7 text-[#95D5B2]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Your Eco Impact
          </h1>
          <p className="text-[#95D5B2] text-lg max-w-lg mx-auto">
            Every cleaning makes a difference. Here&apos;s the positive impact
            you&apos;ve made on our planet.
          </p>
        </div>
      </div>

      {/* Big Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {impactStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`border ${stat.border} shadow-sm overflow-hidden`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter target={stat.value} />
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Impact Visualization */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-[#1B4332]" />
            <h2 className="text-lg font-bold text-gray-900">
              Your Impact So Far
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Recycle className="w-6 h-6 text-[#1B4332]" />
              </div>
              <div>
                <p className="text-base text-gray-800 font-medium">
                  By choosing CleanInstead, you&apos;ve helped save
                  approximately{" "}
                  <span className="text-[#1B4332] font-bold">12kg</span> of
                  plastic from entering landfills.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  That&apos;s equivalent to{" "}
                  <span className="font-semibold text-gray-700">
                    600 plastic water bottles
                  </span>
                  !
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-base text-gray-800 font-medium">
                  Your use of refill products has saved{" "}
                  <span className="text-blue-600 font-bold">9 liters</span> of
                  cleaning solution from single-use packaging.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Together, we&apos;re reducing waste one clean at a time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-base text-gray-800 font-medium">
                  With{" "}
                  <span className="text-amber-600 font-bold">
                    {impactStats[2].value} chemical-free
                  </span>{" "}
                  cleans, you&apos;ve kept harmful toxins out of your home and
                  our waterways.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Our plant-based products are safe for your family and the
                  environment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eco Badges */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Eco Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecoBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card
                key={badge.name}
                className={`border ${badge.color} shadow-sm relative overflow-hidden`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${badge.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      {badge.earned ? (
                        <Icon className={`w-5 h-5 ${badge.iconColor}`} />
                      ) : (
                        <Lock className={`w-5 h-5 ${badge.iconColor}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {badge.name}
                        </h3>
                        {badge.earned && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] px-1.5 py-0">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {badge.description}
                      </p>
                      {badge.progress && (
                        <p className="text-xs text-gray-400 mt-1.5 font-medium">
                          Progress: {badge.progress}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Monthly Impact Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1B4332]" />
            <CardTitle className="text-base font-semibold text-gray-900">
              Monthly Eco Cleans
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="cleans"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === monthlyData.length - 1
                          ? "#1B4332"
                          : "#95D5B2"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Learn More */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-[#1B4332]" />
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                Our Eco Mission
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                At CleanInstead, we believe that a clean home shouldn&apos;t
                come at the cost of a clean planet. All our cleaning products
                are 100% plant-based, biodegradable, and free from harmful
                chemicals. We use refillable containers to reduce plastic waste,
                and our cleaning methods are designed to minimize water usage.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our microfiber cloths are washed and reused over 500 times each,
                replacing disposable wipes. Every booking contributes to our
                goal of becoming a zero-waste cleaning service by 2026.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-[#1B4332] border border-emerald-100"
                >
                  Plant-Based Products
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border border-blue-100"
                >
                  Refillable Containers
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-amber-50 text-amber-700 border border-amber-100"
                >
                  Zero Single-Use Plastics
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-50 text-purple-700 border border-purple-100"
                >
                  Carbon Neutral Delivery
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

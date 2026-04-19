"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  User,
  ArrowRight,
  Gift,
  CreditCard,
  MessageSquare,
  Users,
  CheckCircle2,
  Trophy,
  Lock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const nextBooking = {
  date: "Saturday, April 26, 2025",
  time: "9:00 AM - 11:00 AM",
  service: "Regular Clean",
  cleaner: "Maria Santos",
  cleanerRating: 4.9,
  address: "123 Elm Street, Surrey",
  bookingId: "#1057",
};

const loyaltyData = {
  currentCleans: 6,
  targetCleans: 10,
  rewards: [
    { name: "Free Fridge Clean", earned: true, icon: Sparkles },
    { name: "Free Windows", earned: true, icon: CreditCard },
    { name: "Free Session", earned: false, icon: Trophy },
  ],
};

const recentActivity = [
  {
    id: 1,
    text: "Booking #1056 completed - Regular Clean",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    time: "2 hours ago",
  },
  {
    id: 2,
    text: "Payment of $120 processed",
    icon: CreditCard,
    color: "text-blue-600",
    bg: "bg-blue-50",
    time: "2 hours ago",
  },
  {
    id: 3,
    text: "You earned 10 loyalty points",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
    time: "2 hours ago",
  },
  {
    id: 4,
    text: "Review submitted for Maria Santos",
    icon: MessageSquare,
    color: "text-purple-600",
    bg: "bg-purple-50",
    time: "1 day ago",
  },
  {
    id: 5,
    text: "Referral bonus: Carol signed up!",
    icon: Gift,
    color: "text-pink-600",
    bg: "bg-pink-50",
    time: "3 days ago",
  },
];

export default function CustomerDashboard() {
  const loyaltyPercent = (loyaltyData.currentCleans / loyaltyData.targetCleans) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, Amanda
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your cleaning account today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/my-account/bookings">
          <Button
            className="bg-[#1B4332] hover:bg-[#15372a] text-white shadow-sm"
            size="lg"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book a Cleaning
          </Button>
        </Link>
        <Link href="/my-account/referral">
          <Button
            variant="outline"
            className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5"
            size="lg"
          >
            <Gift className="w-4 h-4 mr-2" />
            Refer a Friend
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Booking Card - spans 2 columns */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#95D5B2]" />
                <h2 className="text-white font-semibold text-lg">
                  Next Booking
                </h2>
              </div>
              <Badge className="bg-[#95D5B2] text-[#1B4332] font-medium border-0">
                Confirmed
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-[#1B4332]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Date
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {nextBooking.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Time
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {nextBooking.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Service
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {nextBooking.service}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Cleaner
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-gray-800">
                        {nextBooking.cleaner}
                      </p>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium">
                          {nextBooking.cleanerRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Address
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {nextBooking.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Booking ID
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {nextBooking.bookingId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-wrap gap-3">
              <Link href="/my-account/bookings">
                <Button
                  variant="outline"
                  className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-gray-600 hover:bg-gray-50"
              >
                Reschedule
                <Calendar className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-base font-semibold text-gray-900">
                Loyalty Progress
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-[#1B4332]">
                  {loyaltyData.currentCleans}
                  <span className="text-sm font-normal text-gray-400">
                    /{loyaltyData.targetCleans}
                  </span>
                </span>
                <span className="text-xs font-medium text-[#1B4332] bg-[#95D5B2]/30 px-2 py-0.5 rounded-full">
                  Cleans
                </span>
              </div>
              <Progress
                value={loyaltyPercent}
                className="h-2.5 bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-2">
                {loyaltyData.currentCleans} cleans completed!{" "}
                <span className="font-medium text-[#1B4332]">
                  {loyaltyData.targetCleans - loyaltyData.currentCleans} more
                </span>{" "}
                to earn a FREE cleaning session
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                Rewards
              </p>
              <div className="space-y-2.5">
                {loyaltyData.rewards.map((reward) => {
                  const Icon = reward.icon;
                  return (
                    <div
                      key={reward.name}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                        reward.earned
                          ? "bg-[#1B4332]/5 border border-[#1B4332]/10"
                          : "bg-gray-50 border border-gray-100 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          reward.earned
                            ? "bg-[#1B4332]"
                            : "bg-gray-200"
                        }`}
                      >
                        {reward.earned ? (
                          <Icon className="w-3.5 h-3.5 text-[#95D5B2]" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          reward.earned
                            ? "text-[#1B4332]"
                            : "text-gray-400"
                        }`}
                      >
                        {reward.name}
                      </span>
                      {reward.earned && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
              View All
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentActivity.map((item, index) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.id}>
                  <div className="flex items-center gap-4 py-3.5 group">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                        {item.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  {index < recentActivity.length - 1 && (
                    <Separator />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Bookings",
            value: "12",
            icon: Calendar,
            color: "text-[#1B4332]",
            bg: "bg-emerald-50",
          },
          {
            label: "Loyalty Points",
            value: "60",
            icon: Star,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Referrals",
            value: "3",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Eco Impact",
            value: "24",
            icon: Sparkles,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

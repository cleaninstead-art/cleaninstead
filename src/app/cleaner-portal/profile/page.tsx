"use client"

import React, { useState } from "react"
import { signOut } from "next-auth/react"
import {
  Star,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Shield,
  Bell,
  Leaf,
  Phone,
  User,
  LogOut,
  ChevronRight,
  Award,
  Sparkles,
  Droplets,
  Wrench,
  Building,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ProfileSkill {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const skills: ProfileSkill[] = [
  { id: "s1", name: "Regular Cleaning", icon: Sparkles, color: "text-[#1B4332]", bgColor: "bg-[#1B4332]/10" },
  { id: "s2", name: "Deep Cleaning", icon: Droplets, color: "text-[#0f766e]", bgColor: "bg-[#0f766e]/10" },
  { id: "s3", name: "Eco-Friendly", icon: Leaf, color: "text-[#15803d]", bgColor: "bg-[#15803d]/10" },
  { id: "s4", name: "Move In/Out", icon: Wrench, color: "text-[#7c3aed]", bgColor: "bg-[#7c3aed]/10" },
  { id: "s5", name: "Office Cleaning", icon: Building, color: "text-[#d97706]", bgColor: "bg-[#d97706]/10" },
]

const serviceAreas = [
  { name: "Surrey", icon: MapPin },
  { name: "Vancouver", icon: MapPin },
  { name: "Burnaby", icon: MapPin },
  { name: "Richmond", icon: MapPin },
]

const reviews = [
  { id: 1, name: "Amanda Johnson", rating: 5, text: "Maria did an amazing job! Very thorough and professional.", date: "2 days ago" },
  { id: 2, name: "Bob Martinez", rating: 5, text: "Best cleaning service I've ever had. Will definitely book again!", date: "1 week ago" },
  { id: 3, name: "Carol Williams", rating: 4, text: "Great attention to detail. Very eco-conscious approach.", date: "2 weeks ago" },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-6 h-6" : "w-3.5 h-3.5"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            star <= rating
              ? "text-[#d97706] fill-[#d97706]"
              : "text-[#e5e7eb]"
          )}
        />
      ))}
    </div>
  )
}

export default function ProfilePage() {
  const [available, setAvailable] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [ecoOnly, setEcoOnly] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("604-555-1234")
  const [emergencyContact, setEmergencyContact] = useState("")

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin?role=cleaner" })
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-3">
          MS
        </div>
        <h1 className="text-xl font-bold text-[#1B4332]">Maria Santos</h1>
        <p className="text-sm text-[#6b7280] mt-0.5">Professional Eco-Friendly Cleaner</p>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={4} size="sm" />
          <span className="text-sm font-bold text-[#1B4332]">4.9</span>
          <span className="text-xs text-[#9ca3af]">(142 reviews)</span>
        </div>
        <Badge className="mt-2 bg-[#1B4332] text-white text-[11px] font-medium px-3 py-1">
          <Award className="w-3 h-3 mr-1" />
          Top Rated Cleaner
        </Badge>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center mx-auto mb-1.5">
              <Briefcase className="w-4 h-4 text-[#1B4332]" />
            </div>
            <p className="text-lg font-bold text-[#1B4332]">142</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Jobs</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center mx-auto mb-1.5">
              <Clock className="w-4 h-4 text-[#1B4332]" />
            </div>
            <p className="text-lg font-bold text-[#1B4332]">3</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Years</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center mx-auto mb-1.5">
              <DollarSign className="w-4 h-4 text-[#1B4332]" />
            </div>
            <p className="text-lg font-bold text-[#1B4332]">$18.4k</p>
            <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-medium">Earned</p>
          </CardContent>
        </Card>
      </section>

      {/* Skills */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-bold text-[#1B4332]">Skills & Specialties</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const SkillIcon = skill.icon
              return (
                <div
                  key={skill.id}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                    skill.bgColor,
                    skill.color
                  )}
                >
                  <SkillIcon className="w-3.5 h-3.5" />
                  <span>{skill.name}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Service Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <Badge
                key={area.name}
                variant="secondary"
                className="bg-[#f0fdf4] text-[#1B4332] border-[#95D5B2]/30 text-xs font-medium px-3 py-1"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {area.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-bold text-[#1B4332] flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-0">
          {/* Availability Toggle */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <User className="w-4 h-4 text-[#1B4332]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1B4332]">Available for new bookings</p>
                <p className="text-[11px] text-[#9ca3af]">
                  {available ? "You're accepting new jobs" : "New bookings are paused"}
                </p>
              </div>
            </div>
            <Switch
              checked={available}
              onCheckedChange={setAvailable}
              className="data-[state=checked]:bg-[#1B4332]"
            />
          </div>

          <Separator className="bg-[#f0f0f0]" />

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#1B4332]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1B4332]">Push notifications</p>
                <p className="text-[11px] text-[#9ca3af]">
                  {notifications ? "Receive job alerts and updates" : "Notifications are off"}
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-[#1B4332]"
            />
          </div>

          <Separator className="bg-[#f0f0f0]" />

          {/* Eco-Friendly Toggle */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#15803d]/10 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#15803d]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1B4332]">Eco-friendly products only</p>
                <p className="text-[11px] text-[#9ca3af]">
                  {ecoOnly ? "Using green cleaning products" : "Using standard products"}
                </p>
              </div>
            </div>
            <Switch
              checked={ecoOnly}
              onCheckedChange={setEcoOnly}
              className="data-[state=checked]:bg-[#15803d]"
            />
          </div>

          <Separator className="bg-[#f0f0f0]" />

          {/* Phone Number */}
          <div className="py-3.5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#1B4332]" />
              </div>
              <Label htmlFor="phone" className="text-sm font-medium text-[#1B4332]">
                Phone Number
              </Label>
            </div>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-10 text-sm border-[#e5e7eb] focus-visible:ring-[#1B4332]/30"
            />
          </div>

          <Separator className="bg-[#f0f0f0]" />

          {/* Emergency Contact */}
          <div className="py-3.5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#d97706]/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#d97706]" />
              </div>
              <Label htmlFor="emergency" className="text-sm font-medium text-[#1B4332]">
                Emergency Contact
              </Label>
            </div>
            <Input
              id="emergency"
              placeholder="Name and phone number"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="h-10 text-sm border-[#e5e7eb] focus-visible:ring-[#1B4332]/30"
            />
            <p className="text-[10px] text-[#9ca3af]">This information is only shared in case of emergency</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-[#1B4332]">Recent Reviews</CardTitle>
            <button className="text-xs text-[#1B4332] font-medium flex items-center gap-0.5 hover:underline">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[10px] font-bold text-[#1B4332]">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs font-semibold text-[#1B4332]">{review.name}</span>
                </div>
                <span className="text-[10px] text-[#9ca3af]">{review.date}</span>
              </div>
              <StarRating rating={review.rating} size="sm" />
              <p className="text-xs text-[#6b7280] leading-relaxed">{review.text}</p>
              {review.id < reviews.length && <Separator className="bg-[#f0f0f0] mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-11 text-sm font-medium text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>

      <p className="text-center text-[10px] text-[#9ca3af] pb-4">
        CleanInstead Cleaner Portal v1.0.0
      </p>
    </div>
  )
}

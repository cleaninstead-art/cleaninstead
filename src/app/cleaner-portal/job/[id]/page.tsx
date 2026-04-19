"use client"

import React, { useState, useMemo, useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Droplets,
  Leaf,
  Camera,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileText,
  Navigation,
  Phone,
  MessageCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface ChecklistCategory {
  id: string
  name: string
  icon: React.ElementType
  items: ChecklistItem[]
}

interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

const jobData: Record<string, {
  customerName: string
  customerInitials: string
  customerPhone: string
  address: string
  date: string
  time: string
  endTime: string
  serviceType: string
  amount: number
  specialInstructions: string
  accessInfo: string
}> = {
  "job-1": {
    customerName: "Amanda Johnson",
    customerInitials: "AJ",
    customerPhone: "604-555-2345",
    address: "123 Elm Street, Surrey, BC",
    date: "Today",
    time: "9:00 AM",
    endTime: "11:00 AM",
    serviceType: "Regular Clean",
    amount: 120,
    specialInstructions: "Please be careful with the antique dining table. Use only the provided microfiber cloths. The cat may be in the living room — please do not let it outside.",
    accessInfo: "Key under the front mat. Ring doorbell first.",
  },
  "job-2": {
    customerName: "Bob Martinez",
    customerInitials: "BM",
    customerPhone: "604-555-3456",
    address: "456 Oak Avenue, Vancouver, BC",
    date: "Today",
    time: "12:00 PM",
    endTime: "2:00 PM",
    serviceType: "Deep Clean",
    amount: 180,
    specialInstructions: "Focus on kitchen and bathrooms. Oven needs a deep clean. Grout in the master bathroom shower needs attention. Please bring the steam cleaner.",
    accessInfo: "Door code: 4521#. Back door is unlocked.",
  },
  "job-3": {
    customerName: "Carol Williams",
    customerInitials: "CW",
    customerPhone: "604-555-4567",
    address: "789 Pine Road, Burnaby, BC",
    date: "Today",
    time: "3:00 PM",
    endTime: "4:30 PM",
    serviceType: "Eco Clean",
    amount: 95,
    specialInstructions: "Please use only eco-friendly products. Carol has allergies — no scented products. Air purifier is in the bedroom, please leave it on.",
    accessInfo: "Spare key in the lockbox. Code: 1984.",
  },
  "w0-1": {
    customerName: "Sarah Lee",
    customerInitials: "SL",
    customerPhone: "604-555-5678",
    address: "321 Cedar Blvd, Vancouver, BC",
    date: "Monday",
    time: "8:00 AM",
    endTime: "9:30 AM",
    serviceType: "Regular Clean",
    amount: 75,
    specialInstructions: "Focus on living room and kitchen. Vacuum pet hair thoroughly.",
    accessInfo: "Key under the flower pot.",
  },
  "w0-2": {
    customerName: "Tom Baker",
    customerInitials: "TB",
    customerPhone: "604-555-6789",
    address: "654 Maple Lane, Burnaby, BC",
    date: "Monday",
    time: "11:00 AM",
    endTime: "1:00 PM",
    serviceType: "Deep Clean",
    amount: 160,
    specialInstructions: "Full deep clean of all rooms. Pay special attention to baseboards and window sills.",
    accessInfo: "Smart lock: text when arriving.",
  },
}

function getServiceDetails(type: string) {
  switch (type) {
    case "Deep Clean":
      return { icon: Droplets, color: "text-[#0f766e]", bg: "bg-[#0f766e]/10", badge: "bg-[#0f766e]/10 text-[#0f766e] border-[#0f766e]/20" }
    case "Eco Clean":
      return { icon: Leaf, color: "text-[#15803d]", bg: "bg-[#15803d]/10", badge: "bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20" }
    default:
      return { icon: Sparkles, color: "text-[#1B4332]", bg: "bg-[#1B4332]/10", badge: "bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20" }
  }
}

function getDefaultChecklist(type: string): ChecklistCategory[] {
  const base: ChecklistCategory[] = [
    {
      id: "kitchen",
      name: "Kitchen",
      icon: Sparkles,
      items: [
        { id: "k-countertops", label: "Countertops & surfaces", checked: false },
        { id: "k-sink", label: "Sink & faucet", checked: false },
        { id: "k-stove", label: "Stove & cooktop", checked: false },
        { id: "k-microwave", label: "Microwave (interior/exterior)", checked: false },
        { id: "k-floor", label: "Sweep & mop floor", checked: false },
        { id: "k-trash", label: "Empty trash & replace bag", checked: false },
      ],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      icon: Droplets,
      items: [
        { id: "b-toilet", label: "Toilet (inside & outside)", checked: false },
        { id: "b-shower", label: "Shower/tub & tiles", checked: false },
        { id: "b-sink", label: "Sink & vanity", checked: false },
        { id: "b-mirror", label: "Mirror & fixtures", checked: false },
        { id: "b-floor", label: "Sweep & mop floor", checked: false },
        { id: "b-towels", label: "Replace towels (if provided)", checked: false },
      ],
    },
    {
      id: "living-room",
      name: "Living Room",
      icon: FileText,
      items: [
        { id: "l-dusting", label: "Dusting all surfaces", checked: false },
        { id: "l-vacuum", label: "Vacuum carpet/rug", checked: false },
        { id: "l-windows", label: "Windows & sills", checked: false },
        { id: "l-furniture", label: "Wipe furniture surfaces", checked: false },
        { id: "l-floor", label: "Sweep & mop floor", checked: false },
      ],
    },
    {
      id: "bedrooms",
      name: "Bedrooms",
      icon: Leaf,
      items: [
        { id: "n-sheets", label: "Change bed sheets (if requested)", checked: false },
        { id: "n-dusting", label: "Dusting all surfaces", checked: false },
        { id: "n-vacuum", label: "Vacuum carpet/rug", checked: false },
        { id: "n-closet", label: "Closet floor & organization", checked: false },
      ],
    },
    {
      id: "general",
      name: "General",
      icon: AlertCircle,
      items: [
        { id: "g-lights", label: "Light fixtures & switches", checked: false },
        { id: "g-doors", label: "Doors & doorknobs", checked: false },
        { id: "g-baseboards", label: "Baseboards & corners", checked: false },
        { id: "g-vents", label: "Air vents & returns", checked: false },
      ],
    },
  ]

  // Add extra items for deep clean
  if (type === "Deep Clean") {
    base[0].items.push({ id: "k-cabinet", label: "Clean inside cabinets", checked: false })
    base[0].items.push({ id: "k-fridge", label: "Wipe fridge exterior", checked: false })
    base[1].items.push({ id: "b-grout", label: "Grout cleaning", checked: false })
    base[2].items.push({ id: "l-blinds", label: "Blinds & curtains", checked: false })
  }

  return base
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const job = jobData[jobId] || jobData["job-1"]
  const service = getServiceDetails(job.serviceType)
  const ServiceIcon = service.icon

  const [checklist, setChecklist] = useState<ChecklistCategory[]>(getDefaultChecklist(job.serviceType))
  const [notes, setNotes] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [beforePhotos, setBeforePhotos] = useState<string[]>([])
  const [afterPhotos, setAfterPhotos] = useState<string[]>([])

  const toggleItem = useCallback((categoryId: string, itemId: string) => {
    setChecklist((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    )
  }, [])

  const progress = useMemo(() => {
    const total = checklist.reduce((sum, cat) => sum + cat.items.length, 0)
    const checked = checklist.reduce(
      (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
      0
    )
    return total > 0 ? Math.round((checked / total) * 100) : 0
  }, [checklist])

  const totalItems = useMemo(
    () => checklist.reduce((sum, cat) => sum + cat.items.length, 0),
    [checklist]
  )

  const checkedItems = useMemo(
    () => checklist.reduce((sum, cat) => sum + cat.items.filter((i) => i.checked).length, 0),
    [checklist]
  )

  const handleMarkComplete = () => {
    setIsCompleted(true)
  }

  const handleAddPhoto = (type: "before" | "after") => {
    // Placeholder for photo upload
    const mockUrl = `photo-${type}-${Date.now()}`
    if (type === "before") {
      setBeforePhotos((prev) => [...prev, mockUrl])
    } else {
      setAfterPhotos((prev) => [...prev, mockUrl])
    }
  }

  return (
    <div className="pb-6">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 text-[#1B4332] hover:bg-[#1B4332]/10"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-[#1B4332]">Job Details</h1>
        {isCompleted && (
          <Badge className="ml-auto bg-[#15803d] text-white text-xs font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Customer & Job Info Card */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2d6a4f] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                {job.customerInitials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold">{job.customerName}</h2>
                <div className="flex items-center gap-1.5 text-[#95D5B2] text-sm mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{job.address}</span>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[#9ca3af]" />
                <span className="text-[#6b7280]">{job.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#9ca3af]" />
                <span className="text-[#6b7280]">
                  {job.time} - {job.endTime}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={cn("text-xs font-medium", service.badge)}>
                <ServiceIcon className="w-3 h-3 mr-1" />
                {job.serviceType}
              </Badge>
              <span className="text-xl font-bold text-[#1B4332]">${job.amount}</span>
            </div>
            {/* Quick Actions */}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" className="flex-1 text-xs text-[#1B4332] border-[#1B4332]/20 hover:bg-[#1B4332]/10">
                <Phone className="w-3.5 h-3.5 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs text-[#1B4332] border-[#1B4332]/20 hover:bg-[#1B4332]/10">
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs text-[#1B4332] border-[#1B4332]/20 hover:bg-[#1B4332]/10">
                <Navigation className="w-3.5 h-3.5 mr-1" />
                Directions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1B4332]">Cleaning Progress</h3>
              <span className={cn(
                "text-sm font-bold",
                progress === 100 ? "text-[#15803d]" : progress > 50 ? "text-[#d97706]" : "text-[#1B4332]"
              )}>
                {checkedItems}/{totalItems} ({progress}%)
              </span>
            </div>
            <Progress value={progress} className="h-2.5" />
            {progress === 100 && (
              <p className="text-xs text-[#15803d] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All tasks completed!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Special Instructions */}
        {job.specialInstructions && (
          <Card className="border-0 shadow-sm bg-[#fffbeb]">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#d97706]" />
                <h3 className="text-sm font-semibold text-[#d97706]">Special Instructions</h3>
              </div>
              <p className="text-sm text-[#92400e] leading-relaxed">{job.specialInstructions}</p>
            </CardContent>
          </Card>
        )}

        {/* Access Info */}
        {job.accessInfo && (
          <Card className="border-0 shadow-sm bg-[#eff6ff]">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563eb]" />
                <h3 className="text-sm font-semibold text-[#2563eb]">Access Information</h3>
              </div>
              <p className="text-sm text-[#1e40af]">{job.accessInfo}</p>
            </CardContent>
          </Card>
        )}

        {/* Checklist */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-base font-bold text-[#1B4332]">Cleaning Checklist</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Accordion type="multiple" defaultValue={["kitchen"]} className="w-full">
              {checklist.map((category) => {
                const CategoryIcon = category.icon
                const catChecked = category.items.filter((i) => i.checked).length
                const catTotal = category.items.length
                return (
                  <AccordionItem key={category.id} value={category.id} className="border-[#e5e7eb]">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                          <CategoryIcon className="w-4 h-4 text-[#1B4332]" />
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-semibold text-[#1B4332]">{category.name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-[#9ca3af]">
                              {catChecked} of {catTotal} done
                            </span>
                            {catChecked === catTotal && catTotal > 0 && (
                              <CheckCircle2 className="w-3 h-3 text-[#15803d]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <div className="space-y-1 ml-10">
                        {category.items.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#f0fdf4] cursor-pointer transition-colors"
                          >
                            <Checkbox
                              checked={item.checked}
                              onCheckedChange={() => toggleItem(category.id, item.id)}
                              className="data-[state=checked]:bg-[#1B4332] data-[state=checked]:border-[#1B4332]"
                            />
                            <span
                              className={cn(
                                "text-sm transition-all",
                                item.checked
                                  ? "text-[#9ca3af] line-through"
                                  : "text-[#374151]"
                              )}
                            >
                              {item.label}
                            </span>
                            {item.checked && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d] ml-auto" />
                            )}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Photos
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {/* Before Photos */}
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-2">
                Before Photos
              </p>
              <div className="flex gap-2 flex-wrap">
                {beforePhotos.length > 0 &&
                  beforePhotos.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-lg bg-[#1B4332]/10 flex items-center justify-center"
                    >
                      <Camera className="w-5 h-5 text-[#1B4332]/50" />
                    </div>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddPhoto("before")}
                  className="w-16 h-16 rounded-lg border-dashed border-2 border-[#d1d5db] flex-col gap-1 text-[#9ca3af] hover:border-[#1B4332] hover:text-[#1B4332] hover:bg-transparent"
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-[8px] font-medium">Add</span>
                </Button>
              </div>
            </div>
            {/* After Photos */}
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-2">
                After Photos
              </p>
              <div className="flex gap-2 flex-wrap">
                {afterPhotos.length > 0 &&
                  afterPhotos.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-lg bg-[#15803d]/10 flex items-center justify-center"
                    >
                      <Camera className="w-5 h-5 text-[#15803d]/50" />
                    </div>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddPhoto("after")}
                  className="w-16 h-16 rounded-lg border-dashed border-2 border-[#d1d5db] flex-col gap-1 text-[#9ca3af] hover:border-[#1B4332] hover:text-[#1B4332] hover:bg-transparent"
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-[8px] font-medium">Add</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Textarea
              placeholder="Add any notes about the cleaning job..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none border-[#e5e7eb] focus-visible:ring-[#1B4332]/30 text-sm"
            />
            <p className="text-[10px] text-[#9ca3af] mt-1.5">Notes are saved automatically and shared with the customer</p>
          </CardContent>
        </Card>

        {/* Mark Complete Button */}
        <div className="pt-2">
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-xl shadow-lg transition-all",
              isCompleted
                ? "bg-[#15803d] text-white cursor-default"
                : "bg-[#1B4332] hover:bg-[#1B4332]/90 text-white active:scale-[0.98]"
            )}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Job Completed
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark Job Complete
              </>
            )}
          </Button>
          {!isCompleted && progress < 100 && (
            <p className="text-xs text-[#d97706] text-center mt-2">
              ⚠️ {100 - progress}% of checklist items remaining
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

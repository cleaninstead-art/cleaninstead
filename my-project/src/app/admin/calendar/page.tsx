"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ServiceType = "regular" | "deep" | "move" | "eco";

interface CalendarBooking {
  id: number;
  customerName: string;
  serviceType: ServiceType;
  day: number;
  startHour: number;
  duration: number;
}

const serviceConfig: Record<
  ServiceType,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  regular: {
    label: "Regular Clean",
    color: "text-emerald-800",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-300",
  },
  deep: {
    label: "Deep Clean",
    color: "text-blue-800",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
  },
  move: {
    label: "Move In/Out",
    color: "text-orange-800",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
  },
  eco: {
    label: "Eco Clean",
    color: "text-teal-800",
    bgColor: "bg-teal-100",
    borderColor: "border-teal-300",
  },
};

const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8am to 6pm
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDates(offset: number) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7) + offset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      day: days[i],
      date: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      fullDate: date.toISOString().split("T")[0],
    };
  });
}

const mockBookings: CalendarBooking[] = [
  { id: 1, customerName: "Amanda J.", serviceType: "regular", day: 0, startHour: 9, duration: 2 },
  { id: 2, customerName: "Michael C.", serviceType: "deep", day: 0, startHour: 10, duration: 3 },
  { id: 3, customerName: "Sarah W.", serviceType: "move", day: 1, startHour: 8, duration: 4 },
  { id: 4, customerName: "David B.", serviceType: "eco", day: 1, startHour: 14, duration: 2 },
  { id: 5, customerName: "Emily D.", serviceType: "regular", day: 2, startHour: 9, duration: 2 },
  { id: 6, customerName: "James W.", serviceType: "deep", day: 2, startHour: 13, duration: 3 },
  { id: 7, customerName: "Lisa P.", serviceType: "eco", day: 3, startHour: 8, duration: 2 },
  { id: 8, customerName: "Robert T.", serviceType: "regular", day: 3, startHour: 11, duration: 2 },
  { id: 9, customerName: "Jennifer M.", serviceType: "move", day: 4, startHour: 9, duration: 5 },
  { id: 10, customerName: "Christopher L.", serviceType: "eco", day: 4, startHour: 14, duration: 2 },
  { id: 11, customerName: "Thomas A.", serviceType: "deep", day: 5, startHour: 9, duration: 3 },
  { id: 12, customerName: "Karen S.", serviceType: "regular", day: 5, startHour: 13, duration: 2 },
  { id: 13, customerName: "Nancy R.", serviceType: "eco", day: 6, startHour: 10, duration: 2 },
  { id: 14, customerName: "Daniel F.", serviceType: "regular", day: 6, startHour: 14, duration: 2 },
];

function formatHour(hour: number): string {
  if (hour === 12) return "12 PM";
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
}

export default function AdminCalendar() {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  const getBookingsForSlot = (dayIndex: number, hour: number) => {
    return mockBookings.filter(
      (b) => b.day === dayIndex && b.startHour === hour
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Calendar
          </h2>
          <p className="text-muted-foreground mt-1">
            Schedule overview for the week
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekOffset((prev) => prev - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(0)}
            className="px-4"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setWeekOffset((prev) => prev + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Service Types:
            </span>
            {(Object.keys(serviceConfig) as ServiceType[]).map((key) => {
              const config = serviceConfig[key];
              return (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-sm",
                      config.bgColor,
                      config.borderColor,
                      "border"
                    )}
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b bg-gray-50">
              <div className="p-3 text-xs font-medium text-gray-500 border-r flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              {weekDates.map((date, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 text-center border-r last:border-r-0",
                    i === new Date().getDay() - 1 + weekOffset * 7 &&
                      weekOffset === 0
                      ? "bg-[#1B4332]/5"
                      : ""
                  )}
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {date.day}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {date.date}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {date.month}
                  </p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="max-h-[600px] overflow-y-auto">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-8 border-b last:border-b-0"
                >
                  {/* Time Label */}
                  <div className="p-2 text-xs font-medium text-gray-500 border-r flex items-start justify-center pt-3 bg-gray-50/50">
                    {formatHour(hour)}
                  </div>

                  {/* Day Cells */}
                  {weekDates.map((_, dayIndex) => {
                    const bookings = getBookingsForSlot(dayIndex, hour);
                    return (
                      <div
                        key={dayIndex}
                        className="p-1 border-r last:border-r-0 min-h-[72px] relative hover:bg-gray-50/50 transition-colors"
                      >
                        {bookings.map((booking) => {
                          const config = serviceConfig[booking.serviceType];
                          return (
                            <div
                              key={booking.id}
                              className={cn(
                                "rounded-md px-2 py-1.5 mb-1 border-l-3 cursor-pointer hover:opacity-90 transition-opacity",
                                config.bgColor,
                                config.borderColor,
                                "border"
                              )}
                              style={{
                                borderLeftWidth: "3px",
                              }}
                            >
                              <p
                                className={cn(
                                  "text-xs font-semibold truncate",
                                  config.color
                                )}
                              >
                                {booking.customerName}
                              </p>
                              <p
                                className={cn(
                                  "text-[10px] truncate mt-0.5 opacity-75",
                                  config.color
                                )}
                              >
                                {config.label}
                              </p>
                              <p
                                className={cn(
                                  "text-[10px] mt-0.5 opacity-60",
                                  config.color
                                )}
                              >
                                {formatHour(booking.startHour)} -{" "}
                                {formatHour(
                                  booking.startHour + booking.duration
                                )}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

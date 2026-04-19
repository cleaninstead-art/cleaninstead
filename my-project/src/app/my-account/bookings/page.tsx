"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Star,
  User,
  MapPin,
  CreditCard,
  RefreshCw,
  X,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  date: string;
  dayLabel: string;
  time: string;
  service: string;
  cleaner: string;
  cleanerRating: number;
  amount: number;
  address: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  reviewed?: boolean;
  rating?: number;
  notes?: string | null;
}

interface BookingSummary {
  totalBookings: number;
  upcomingCount: number;
  pastCount: number;
  totalSpent: number;
  averageRating: number;
}

interface BookingsResponse {
  upcoming: Booking[];
  past: Booking[];
  summary: BookingSummary;
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    Confirmed:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending:
      "bg-amber-50 text-amber-700 border-amber-200",
    Completed:
      "bg-gray-50 text-gray-600 border-gray-200",
    Cancelled:
      "bg-red-50 text-red-600 border-red-200",
  };
  return styles[status] || styles.Completed;
}

function BookingCard({
  booking,
  isUpcoming,
}: {
  booking: Booking;
  isUpcoming: boolean;
}) {
  const { toast } = useToast();
  const [cancelling, setCancelling] = useState(false);

  const handleReschedule = () => {
    toast({
      title: "Reschedule Request Sent",
      description: `We'll help you reschedule booking ${booking.id}. Our team will contact you shortly.`,
    });
  };

  const handleCancel = () => {
    setCancelling(true);
    setTimeout(() => {
      setCancelling(false);
      toast({
        title: "Booking Cancelled",
        description: `Booking ${booking.id} has been cancelled successfully.`,
        variant: "destructive",
      });
    }, 1000);
  };

  const handleRebook = () => {
    toast({
      title: "Rebooking...",
      description: `We're setting up a new booking similar to ${booking.id}.`,
    });
  };

  const handleReview = () => {
    toast({
      title: "Redirecting to Feedback",
      description: "You'll be able to leave a review for this booking.",
    });
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Top Status Bar */}
        <div
          className={`px-5 py-2.5 flex items-center justify-between border-b ${
            booking.status === "Confirmed"
              ? "bg-emerald-50/50 border-emerald-100"
              : booking.status === "Pending"
              ? "bg-amber-50/50 border-amber-100"
              : "bg-gray-50/50 border-gray-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              {booking.id}
            </span>
            {booking.status === "Confirmed" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
            {booking.status === "Pending" && (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <Badge
            variant="outline"
            className={`text-xs font-medium ${getStatusBadge(booking.status)}`}
          >
            {booking.status}
          </Badge>
        </div>

        {/* Booking Details */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">{booking.dayLabel}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">{booking.time}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-500 truncate">
                  {booking.address}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-700">
                    {booking.cleaner}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">
                      {booking.cleanerRating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-[#1B4332]">
                  ${booking.amount}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 flex-shrink-0" />
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-600"
                >
                  {booking.service}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {isUpcoming && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5 text-xs"
                  onClick={handleReschedule}
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Reschedule
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 text-xs"
                      disabled={cancelling}
                    >
                      {cancelling ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5 mr-1" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel booking {booking.id}?
                        Cancellations within 24 hours may incur a fee.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Yes, Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            {!isUpcoming && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5 text-xs"
                  onClick={handleRebook}
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Rebook
                </Button>
                {!booking.reviewed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={handleReview}
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    Leave Review
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BookingsPage() {
  const [loading, setLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/customer/bookings");
        if (res.ok) {
          const data: BookingsResponse = await res.json();
          setUpcomingBookings(data.upcoming);
          setPastBookings(data.past);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#1B4332]/30 border-t-[#1B4332] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Bookings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your upcoming and past cleaning appointments.
          </p>
        </div>
        <Button className="bg-[#1B4332] hover:bg-[#15372a] text-white shadow-sm w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Book New Cleaning
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-gray-100 w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#1B4332] data-[state=active]:text-white">
            Upcoming
            <Badge
              variant="secondary"
              className="ml-2 bg-[#1B4332]/10 text-[#1B4332] text-[10px] px-1.5 py-0"
            >
              {upcomingBookings.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-[#1B4332] data-[state=active]:text-white">
            Past
            <Badge
              variant="secondary"
              className="ml-2 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0"
            >
              {pastBookings.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No Upcoming Bookings
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  You don&apos;t have any upcoming cleanings scheduled.
                </p>
                <Button className="bg-[#1B4332] hover:bg-[#15372a] text-white">
                  Book a Cleaning
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isUpcoming={true}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-4">
          {pastBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isUpcoming={false}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

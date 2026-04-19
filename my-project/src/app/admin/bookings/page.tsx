"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

interface Booking {
  id: number;
  customerName: string;
  serviceType: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: BookingStatus;
  address: string;
}

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  },
  in_progress: {
    label: "In Progress",
    className:
      "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  },
};

const filterTabs: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const ITEMS_PER_PAGE = 6;

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/admin/bookings");
        const data = await res.json();
        setBookings(data);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    let result = bookings;
    if (activeFilter !== "all") {
      result = result.filter((b) => b.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.customerName.toLowerCase().includes(q) ||
          String(b.id).includes(q)
      );
    }
    return result;
  }, [bookings, activeFilter, searchQuery]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const handleStatusUpdate = (
    bookingId: number,
    newStatus: BookingStatus
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Bookings
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage and track all cleaning service bookings
        </p>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <Button
                  key={tab.value}
                  variant={activeFilter === tab.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(tab.value)}
                  className={cn(
                    activeFilter === tab.value
                      ? "bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {tab.label}
                  {tab.value === "all" && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-[10px]"
                    >
                      {bookings.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative lg:ml-auto w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">
                      Service
                    </TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">
                      Time
                    </TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No bookings found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-sm">
                          #{booking.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
                              {booking.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {booking.serviceType}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm">{booking.serviceType}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">
                          {formatDate(booking.date)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">
                          {booking.startTime} - {booking.endTime}
                        </TableCell>
                        <TableCell className="font-semibold text-sm">
                          ${booking.amount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[11px] font-medium",
                              statusConfig[booking.status].className
                            )}
                          >
                            {statusConfig[booking.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(
                                      booking.id,
                                      "confirmed"
                                    )
                                  }
                                >
                                  Mark as Confirmed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(
                                      booking.id,
                                      "in_progress"
                                    )
                                  }
                                >
                                  Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(
                                      booking.id,
                                      "completed"
                                    )
                                  }
                                >
                                  Mark as Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(
                                      booking.id,
                                      "cancelled"
                                    )
                                  }
                                  className="text-red-600 focus:text-red-600"
                                >
                                  Cancel Booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredBookings.length
                    )}{" "}
                    of {filteredBookings.length} bookings
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={
                            currentPage === page ? "default" : "outline"
                          }
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Booking #{selectedBooking?.id} Details
            </DialogTitle>
            <DialogDescription>
              Full details for this booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Customer
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {selectedBooking.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Service
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {selectedBooking.serviceType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Date
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {formatDate(selectedBooking.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Time
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Amount
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    ${selectedBooking.amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-1 text-[11px] font-medium",
                      statusConfig[selectedBooking.status].className
                    )}
                  >
                    {statusConfig[selectedBooking.status].label}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">
                  Address
                </p>
                <p className="text-sm mt-1">{selectedBooking.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

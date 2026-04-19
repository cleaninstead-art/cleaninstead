"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  DollarSign,
  Clock,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type TransactionStatus = "captured" | "pending" | "refunded";

interface Transaction {
  id: string;
  bookingId: number;
  customerName: string;
  amount: number;
  status: TransactionStatus;
  date: string;
}

const statusConfig: Record<
  TransactionStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  captured: {
    label: "Captured",
    className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
    icon: Clock,
  },
  refunded: {
    label: "Refunded",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
    icon: RotateCcw,
  },
};

const statusFilters: { label: string; value: TransactionStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Captured", value: "captured" },
  { label: "Pending", value: "pending" },
  { label: "Refunded", value: "refunded" },
];

const datePresets = ["All Time", "Today", "This Week", "This Month"];

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<TransactionStatus | "all">(
    "all"
  );
  const [activeDatePreset, setActiveDatePreset] = useState("All Time");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/admin/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (activeStatus !== "all") {
      result = result.filter((t) => t.status === activeStatus);
    }
    // Date filter is visual only for mock
    return result;
  }, [transactions, activeStatus]);

  const totalRevenue = transactions
    .filter((t) => t.status === "captured")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPending = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalRefunded = transactions
    .filter((t) => t.status === "refunded")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleCapture = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "captured" as TransactionStatus } : t
      )
    );
  };

  const handleRefund = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "refunded" as TransactionStatus } : t
      )
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Transactions
        </h2>
        <p className="text-muted-foreground mt-1">
          Track payments, captures, and refunds
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">Captured payments</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalPending.toLocaleString()}
                </p>
                <p className="text-xs text-amber-600 mt-1">Awaiting capture</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Refunded
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalRefunded.toLocaleString()}
                </p>
                <p className="text-xs text-red-600 mt-1">Refunded payments</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeStatus === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveStatus(filter.value)}
                  className={cn(
                    activeStatus === filter.value
                      ? "bg-[#1B4332] hover:bg-[#1B4332]/90"
                      : ""
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 sm:ml-auto">
              {datePresets.map((preset) => (
                <Button
                  key={preset}
                  variant={
                    activeDatePreset === preset ? "secondary" : "ghost"
                  }
                  size="sm"
                  onClick={() => setActiveDatePreset(preset)}
                  className="text-xs"
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80">
                  <TableHead className="font-semibold">Transaction ID</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">
                    Booking
                  </TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((txn) => {
                    const cfg = statusConfig[txn.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <TableRow key={txn.id}>
                        <TableCell className="font-mono text-xs">
                          {txn.id}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">
                          <div className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                            #{txn.bookingId}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {txn.customerName}
                        </TableCell>
                        <TableCell className="font-semibold text-sm">
                          ${txn.amount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[11px] font-medium",
                              cfg.className
                            )}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <p className="text-sm">
                              {formatDate(txn.date)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(txn.date)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {txn.status === "pending" && (
                            <Button
                              size="sm"
                              className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white h-8 text-xs"
                              onClick={() => handleCapture(txn.id)}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Capture
                            </Button>
                          )}
                          {txn.status === "captured" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-600 hover:bg-red-50 h-8 text-xs"
                              onClick={() => handleRefund(txn.id)}
                            >
                              <RotateCcw className="w-3.5 h-3.5 mr-1" />
                              Refund
                            </Button>
                          )}
                          {txn.status === "refunded" && (
                            <span className="text-xs text-muted-foreground">
                              Refunded
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

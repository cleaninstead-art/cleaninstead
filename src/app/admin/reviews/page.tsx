"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  customerName: string;
  cleanerName: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

const ratingFilters = [
  { label: "All Ratings", value: 0 },
  { label: "5 Stars", value: 5 },
  { label: "4 Stars", value: 4 },
  { label: "3 Stars", value: 3 },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [ratingFilter, setRatingFilter] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/admin/reviews");
        const data = await res.json();
        setReviews(data);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const pendingReviews = useMemo(
    () => reviews.filter((r) => !r.isApproved),
    [reviews]
  );

  const approvedReviews = useMemo(() => {
    let result = reviews.filter((r) => r.isApproved);
    if (ratingFilter > 0) {
      result = result.filter((r) => r.rating === ratingFilter);
    }
    return result;
  }, [reviews, ratingFilter]);

  const stats = useMemo(() => {
    const approved = reviews.filter((r) => r.isApproved);
    const avgRating =
      approved.length > 0
        ? approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
        : 0;
    const thisMonth = approved.filter((r) => {
      const reviewDate = new Date(r.date);
      const now = new Date();
      return (
        reviewDate.getMonth() === now.getMonth() &&
        reviewDate.getFullYear() === now.getFullYear()
      );
    });
    return {
      avgRating: avgRating.toFixed(1),
      totalReviews: approved.length,
      thisMonth: thisMonth.length,
      pendingCount: pendingReviews.length,
    };
  }, [reviews, pendingReviews]);

  const handleApprove = (reviewId: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: true } : r))
    );
    toast({
      title: "Review approved",
      description: "The review has been published.",
    });
  };

  const handleReject = (reviewId: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    toast({
      title: "Review rejected",
      description: "The review has been removed.",
      variant: "destructive",
    });
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
          Reviews
        </h2>
        <p className="text-muted-foreground mt-1">
          Moderate and manage customer reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-700 fill-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.avgRating}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Reviews</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.totalReviews}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.thisMonth}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Filter className="w-5 h-5 text-yellow-700" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.pendingCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pending" className="relative">
            Pending Approval
            {pendingReviews.length > 0 && (
              <Badge className="ml-2 h-5 px-1.5 text-[10px] bg-yellow-500 text-white hover:bg-yellow-500">
                {pendingReviews.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">
            All Reviews
          </TabsTrigger>
        </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending" className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : pendingReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <CheckCircle2 className="w-12 h-12 text-green-300 mb-4" />
                <p className="text-lg font-semibold text-gray-900">
                  All caught up!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  No pending reviews to approve.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <Card key={review.id} className="border-yellow-200 bg-yellow-50/30">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {review.customerName}
                            </span>
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                              Pending
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            about{" "}
                            <span className="font-medium">
                              {review.cleanerName}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(review.date)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <Button
                          size="sm"
                          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
                          onClick={() => handleApprove(review.id)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(review.id)}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* All Reviews Tab */}
        <TabsContent value="all" className="mt-4">
          {/* Rating Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {ratingFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={ratingFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setRatingFilter(filter.value)}
                className={cn(
                  ratingFilter === filter.value
                    ? "bg-[#1B4332] hover:bg-[#1B4332]/90"
                    : ""
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : approvedReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg font-semibold text-gray-900">
                  No reviews found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {ratingFilter > 0
                    ? `No ${ratingFilter}-star reviews yet.`
                    : "Approved reviews will appear here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {approvedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex items-center gap-3 sm:w-48 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#95D5B2]/30 flex items-center justify-center text-[#1B4332] font-semibold text-sm">
                          {review.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">
                            {review.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(review.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-muted-foreground">
                            for {review.cleanerName}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

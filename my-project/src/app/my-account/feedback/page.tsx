"use client";

import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  Send,
  Camera,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const pastBookings = [
  {
    id: "booking-1",
    label: "#1056 - Regular Clean - Apr 19, 2025",
    cleaner: "Maria Santos",
  },
  {
    id: "booking-2",
    label: "#1049 - Move-In Clean - Apr 12, 2025",
    cleaner: "Sarah Chen",
  },
  {
    id: "booking-3",
    label: "#1042 - Regular Clean - Apr 5, 2025",
    cleaner: "Maria Santos",
  },
  {
    id: "booking-4",
    label: "#1035 - Deep Clean - Mar 29, 2025",
    cleaner: "James Wilson",
  },
  {
    id: "booking-5",
    label: "#1028 - Regular Clean - Mar 22, 2025",
    cleaner: "Sarah Chen",
  },
];

const previousReviews = [
  {
    id: 1,
    bookingId: "#1056",
    cleaner: "Maria Santos",
    service: "Regular Clean",
    date: "Apr 19, 2025",
    overallRating: 5,
    punctuality: 5,
    quality: 5,
    professionalism: 5,
    communication: 5,
    comment:
      "Maria did an amazing job as always! The apartment was spotless. She pays attention to every detail and is always so friendly and professional.",
    public: true,
  },
  {
    id: 2,
    bookingId: "#1049",
    cleaner: "Sarah Chen",
    service: "Move-In Clean",
    date: "Apr 12, 2025",
    overallRating: 4,
    punctuality: 5,
    quality: 4,
    professionalism: 4,
    communication: 5,
    comment:
      "Great move-in clean. The place looked brand new. Sarah was thorough with the kitchen and bathrooms. Would definitely recommend!",
    public: true,
  },
  {
    id: 3,
    bookingId: "#1035",
    cleaner: "James Wilson",
    service: "Deep Clean",
    date: "Mar 29, 2025",
    overallRating: 5,
    punctuality: 4,
    quality: 5,
    professionalism: 5,
    communication: 4,
    comment:
      "Outstanding deep clean. James tackled some tough stains I thought were permanent. The oven looks like new! Very impressed with the eco products too.",
    public: false,
  },
];

const categories = [
  { key: "punctuality", label: "Punctuality" },
  { key: "quality", label: "Quality of Clean" },
  { key: "professionalism", label: "Professionalism" },
  { key: "communication", label: "Communication" },
];

function StarRating({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (val: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors ${
              star <= (hovered || value)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function StarsDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClasses = { sm: "w-4 h-4", md: "w-5 h-5" };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({
    punctuality: 0,
    quality: 0,
    professionalism: 0,
    communication: 0,
  });
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCategoryChange = (key: string, val: number) => {
    setCategoryRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    if (!selectedBooking || overallRating === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a booking and provide an overall rating.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });
  };

  const handleAddPhoto = () => {
    toast({
      title: "Photo Upload",
      description: "Photo upload feature will be available soon.",
    });
  };

  const handleNewReview = () => {
    setSubmitted(false);
    setSelectedBooking("");
    setOverallRating(0);
    setCategoryRatings({
      punctuality: 0,
      quality: 0,
      professionalism: 0,
      communication: 0,
    });
    setComment("");
    setIsPublic(true);
    setPhotos([]);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#95D5B2]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#95D5B2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Thank You!
            </h1>
            <p className="text-[#95D5B2] text-base">
              Your feedback helps us improve and helps other customers find
              great cleaners.
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Your Rating</p>
              <StarsDisplay rating={overallRating} size="md" />
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {ratingLabels[overallRating]}
              </p>
            </div>
            {comment && (
              <div className="bg-gray-50 rounded-lg p-4 text-left mb-4">
                <p className="text-sm text-gray-500 mb-1">Your Comment</p>
                <p className="text-sm text-gray-700">{comment}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={handleNewReview}
                className="bg-[#1B4332] hover:bg-[#15372a] text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Leave Another Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Leave Feedback
        </h1>
        <p className="text-gray-500 mt-1">
          Your reviews help cleaners improve and help others make informed
          choices.
        </p>
      </div>

      {/* Feedback Form */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Select Booking */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Select Recent Booking
            </Label>
            <Select value={selectedBooking} onValueChange={setSelectedBooking}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a booking to review..." />
              </SelectTrigger>
              <SelectContent>
                {pastBookings.map((booking) => (
                  <SelectItem key={booking.id} value={booking.id}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{booking.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Overall Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Overall Rating
            </Label>
            <div className="flex items-center gap-4">
              <StarRating value={overallRating} onChange={setOverallRating} size="lg" />
              {overallRating > 0 && (
                <span className="text-sm font-medium text-gray-600">
                  {ratingLabels[overallRating]}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Category Ratings */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Category Ratings{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{cat.label}</span>
                  <div className="flex items-center gap-2">
                    <StarRating
                      value={categoryRatings[cat.key as keyof typeof categoryRatings]}
                      onChange={(val) => handleCategoryChange(cat.key, val)}
                      size="sm"
                    />
                    {categoryRatings[cat.key as keyof typeof categoryRatings] > 0 && (
                      <span className="text-xs text-gray-400 w-14 text-right">
                        {ratingLabels[categoryRatings[cat.key as keyof typeof categoryRatings]]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Comment */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Detailed Comments
            </Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your cleaning experience. What went well? Anything we could improve?"
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-400">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Add Photos{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <Button
              variant="outline"
              type="button"
              onClick={handleAddPhoto}
              className="w-full sm:w-auto border-dashed"
            >
              <Camera className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
            {photos.length > 0 && (
              <div className="flex gap-2 mt-2">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Public Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Include in public reviews
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Other customers will be able to see your review
              </p>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <Separator />

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#1B4332] hover:bg-[#15372a] text-white min-w-[160px]"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Reviews */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Previous Reviews
        </h2>
        <div className="space-y-4">
          {previousReviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-800">
                        {review.cleaner}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600"
                      >
                        {review.service}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600"
                      >
                        {review.bookingId}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StarsDisplay rating={review.overallRating} size="sm" />
                    <span className="text-sm font-semibold text-gray-700">
                      {review.overallRating}.0
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const val =
                      review[cat.key as keyof typeof review] as number;
                    return (
                      <div
                        key={cat.key}
                        className="bg-gray-50 rounded-lg px-3 py-2 text-center"
                      >
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">
                          {cat.label}
                        </p>
                        <div className="flex justify-center gap-px">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= val
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-200 fill-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!review.public && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <ThumbsUp className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Private review - not shown publicly
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

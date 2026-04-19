"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Star,
  MapPin,
  Shield,
  Ban,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CleanerStatus = "active" | "pending" | "suspended";

interface Cleaner {
  id: number;
  name: string;
  rating: number;
  totalJobs: number;
  areas: string[];
  skills: string[];
  status: CleanerStatus;
  initials: string;
  joinDate: string;
}

const statusConfig: Record<
  CleanerStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending Approval",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Shield,
  },
  suspended: {
    label: "Suspended",
    className: "bg-red-100 text-red-800 border-red-200",
    icon: Ban,
  },
};

const avatarColors = [
  "bg-emerald-600",
  "bg-blue-600",
  "bg-purple-600",
  "bg-amber-600",
  "bg-teal-600",
  "bg-rose-600",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          )}
        />
      ))}
      <span className="text-sm font-semibold ml-1 text-gray-900">
        {rating}
      </span>
    </div>
  );
}

export default function AdminCleaners() {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(
    null
  );

  useEffect(() => {
    async function fetchCleaners() {
      try {
        const res = await fetch("/api/admin/cleaners");
        const data = await res.json();
        setCleaners(data);
      } catch {
        setCleaners([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCleaners();
  }, []);

  const filteredCleaners = useMemo(() => {
    if (!searchQuery.trim()) return cleaners;
    const q = searchQuery.toLowerCase();
    return cleaners.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.areas.some((a) => a.toLowerCase().includes(q)) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
    );
  }, [cleaners, searchQuery]);

  const handleStatusUpdate = (
    cleanerId: number,
    newStatus: CleanerStatus
  ) => {
    setCleaners((prev) =>
      prev.map((c) =>
        c.id === cleanerId ? { ...c, status: newStatus } : c
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Cleaners
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your cleaning team members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm px-3 py-1">
            {cleaners.filter((c) => c.status === "active").length} Active
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {cleaners.filter((c) => c.status === "pending").length} Pending
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, area, or skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Cleaners Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredCleaners.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No cleaners found matching your search.
            </div>
          ) : (
            filteredCleaners.map((cleaner, index) => {
              const statusCfg = statusConfig[cleaner.status];
              const StatusIcon = statusCfg.icon;
              return (
                <Card
                  key={cleaner.id}
                  className="hover:shadow-lg transition-all duration-200 group"
                >
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                            avatarColors[index % avatarColors.length]
                          )}
                        >
                          {cleaner.initials}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {cleaner.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Joined{" "}
                            {new Date(
                              cleaner.joinDate + "T00:00:00"
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-medium",
                          statusCfg.className
                        )}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusCfg.label}
                      </Badge>
                    </div>

                    {/* Rating & Jobs */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                      <StarRating rating={cleaner.rating} />
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-gray-600">
                          <span className="font-semibold">
                            {cleaner.totalJobs}
                          </span>{" "}
                          jobs completed
                        </span>
                      </div>
                    </div>

                    {/* Areas */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          Service Areas
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cleaner.areas.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="text-[11px] bg-gray-100"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {cleaner.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-[11px] text-[#1B4332] border-[#95D5B2]/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {cleaner.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="flex-1 bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
                            onClick={() =>
                              handleStatusUpdate(cleaner.id, "active")
                            }
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() =>
                              handleStatusUpdate(cleaner.id, "suspended")
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {cleaner.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-amber-700 hover:text-amber-700 hover:bg-amber-50 border-amber-300"
                          onClick={() =>
                            handleStatusUpdate(cleaner.id, "suspended")
                          }
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                      {cleaner.status === "suspended" && (
                        <Button
                          size="sm"
                          className="flex-1 bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
                          onClick={() =>
                            handleStatusUpdate(cleaner.id, "active")
                          }
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Reactivate
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCleaner(cleaner)}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Cleaner Detail Dialog */}
      <Dialog
        open={!!selectedCleaner}
        onOpenChange={() => setSelectedCleaner(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCleaner?.name}</DialogTitle>
            <DialogDescription>Cleaner profile details</DialogDescription>
          </DialogHeader>
          {selectedCleaner && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl",
                    avatarColors[
                      cleaners.findIndex(
                        (c) => c.id === selectedCleaner.id
                      ) % avatarColors.length
                    ]
                  )}
                >
                  {selectedCleaner.initials}
                </div>
                <div>
                  <StarRating rating={selectedCleaner.rating} />
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedCleaner.totalJobs} jobs completed
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-1 text-[11px] font-medium",
                      statusConfig[selectedCleaner.status].className
                    )}
                  >
                    {statusConfig[selectedCleaner.status].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Join Date
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {new Date(
                      selectedCleaner.joinDate + "T00:00:00"
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Service Areas
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedCleaner.areas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedCleaner.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs text-[#1B4332] border-[#95D5B2]/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

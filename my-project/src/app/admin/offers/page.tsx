"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Copy,
  Tag,
  CalendarDays,
  Ticket,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Offer {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minBooking: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
}

const getOfferStatus = (
  offer: Offer
): "active" | "expired" | "deactivated" => {
  if (!offer.isActive) return "deactivated";
  const expiryDate = new Date(offer.expiresAt + "T23:59:59");
  if (expiryDate < new Date()) return "expired";
  return "active";
};

const statusColors: Record<
  string,
  { className: string; label: string }
> = {
  active: {
    className: "bg-green-100 text-green-800 border-green-200",
    label: "Active",
  },
  expired: {
    className: "bg-gray-100 text-gray-800 border-gray-200",
    label: "Expired",
  },
  deactivated: {
    className: "bg-red-100 text-red-800 border-red-200",
    label: "Deactivated",
  },
};

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minBooking: "",
    maxUses: "",
    expiresAt: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/admin/offers");
        const data = await res.json();
        setOffers(data);
      } catch {
        setOffers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const handleToggle = (offerId: number) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, isActive: !o.isActive } : o))
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `${code} has been copied to clipboard.`,
    });
  };

  const handleCreateOffer = () => {
    if (!newOffer.code || !newOffer.value || !newOffer.expiresAt) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const offer: Offer = {
      id: offers.length + 100,
      code: newOffer.code.toUpperCase(),
      type: newOffer.type,
      value: Number(newOffer.value),
      minBooking: Number(newOffer.minBooking) || 0,
      maxUses: Number(newOffer.maxUses) || 100,
      usedCount: 0,
      isActive: true,
      expiresAt: newOffer.expiresAt,
    };

    setOffers((prev) => [offer, ...prev]);
    setCreateDialogOpen(false);
    setNewOffer({
      code: "",
      type: "percentage",
      value: "",
      minBooking: "",
      maxUses: "",
      expiresAt: "",
    });
    toast({
      title: "Offer created!",
      description: `${offer.code} has been created successfully.`,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Offers & Discounts
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage promotional codes and discounts
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Offer
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Offers</p>
              <p className="text-xl font-bold text-gray-900">
                {offers.filter((o) => getOfferStatus(o) === "active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expired</p>
              <p className="text-xl font-bold text-gray-900">
                {offers.filter((o) => getOfferStatus(o) === "expired").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Redemptions</p>
              <p className="text-xl font-bold text-gray-900">
                {offers.reduce((sum, o) => sum + o.usedCount, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offer Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {offers.map((offer) => {
            const status = getOfferStatus(offer);
            const statusCfg = statusColors[status];
            const usagePercent = Math.round(
              (offer.usedCount / offer.maxUses) * 100
            );
            return (
              <Card
                key={offer.id}
                className={cn(
                  "hover:shadow-lg transition-all duration-200",
                  !offer.isActive && "opacity-75"
                )}
              >
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          status === "active"
                            ? "bg-[#1B4332]/10"
                            : "bg-gray-100"
                        )}
                      >
                        <Tag
                          className={cn(
                            "w-5 h-5",
                            status === "active"
                              ? "text-[#1B4332]"
                              : "text-gray-500"
                          )}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-lg font-bold tracking-wider text-gray-900">
                            {offer.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyCode(offer.code)}
                          >
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {offer.type === "percentage"
                            ? `${offer.value}% off`
                            : `$${offer.value} off`}
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
                      {statusCfg.label}
                    </Badge>
                  </div>

                  {/* Offer Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-semibold">
                        {offer.type === "percentage"
                          ? `${offer.value}%`
                          : `$${offer.value}`}
                      </span>
                    </div>
                    {offer.minBooking > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Min. Booking
                        </span>
                        <span className="font-medium">
                          ${offer.minBooking}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expiry</span>
                      <span className="font-medium flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(offer.expiresAt)}
                      </span>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">
                        Usage ({offer.usedCount}/{offer.maxUses})
                      </span>
                      <span className="font-medium text-xs">{usagePercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          usagePercent >= 90
                            ? "bg-red-500"
                            : usagePercent >= 60
                            ? "bg-amber-500"
                            : "bg-[#95D5B2]"
                        )}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-muted-foreground">
                      {offer.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={offer.isActive}
                      onCheckedChange={() => handleToggle(offer.id)}
                      disabled={status === "expired"}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Offer Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Offer</DialogTitle>
            <DialogDescription>
              Add a new discount code for customers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="offer-code">Promo Code *</Label>
              <Input
                id="offer-code"
                placeholder="e.g. SUMMER30"
                value={newOffer.code}
                onChange={(e) =>
                  setNewOffer((prev) => ({
                    ...prev,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                className="font-mono tracking-wider"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="offer-type">Type</Label>
                <Select
                  value={newOffer.type}
                  onValueChange={(val) =>
                    setNewOffer((prev) => ({
                      ...prev,
                      type: val as "percentage" | "fixed",
                    }))
                  }
                >
                  <SelectTrigger id="offer-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-value">
                  Value ({newOffer.type === "percentage" ? "%" : "$"}) *
                </Label>
                <Input
                  id="offer-value"
                  type="number"
                  placeholder={newOffer.type === "percentage" ? "10" : "25"}
                  value={newOffer.value}
                  onChange={(e) =>
                    setNewOffer((prev) => ({ ...prev, value: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="offer-min">Min. Booking ($)</Label>
                <Input
                  id="offer-min"
                  type="number"
                  placeholder="0"
                  value={newOffer.minBooking}
                  onChange={(e) =>
                    setNewOffer((prev) => ({
                      ...prev,
                      minBooking: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-max">Max Uses</Label>
                <Input
                  id="offer-max"
                  type="number"
                  placeholder="100"
                  value={newOffer.maxUses}
                  onChange={(e) =>
                    setNewOffer((prev) => ({
                      ...prev,
                      maxUses: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="offer-expiry">Expiry Date *</Label>
              <Input
                id="offer-expiry"
                type="date"
                value={newOffer.expiresAt}
                onChange={(e) =>
                  setNewOffer((prev) => ({
                    ...prev,
                    expiresAt: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOffer}
              className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
            >
              Create Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

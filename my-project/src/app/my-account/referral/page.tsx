"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
  Link2,
  Gift,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  PartyPopper,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ReferralItem {
  id: string;
  name: string;
  email: string;
  referredDate: string;
  status: string;
  rewardEarned: boolean;
  creditAmount: number;
}

interface ReferralResponse {
  code: string;
  referralCount: number;
  creditsEarned: number;
  pendingReferrals: number;
  referralLink: string;
  rewardPerReferral: number;
  friendDiscount: number;
  referrals: ReferralItem[];
}

function formatReferredDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReferralPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReferralResponse | null>(null);

  useEffect(() => {
    async function fetchReferral() {
      try {
        const res = await fetch("/api/customer/referral");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchReferral();
  }, []);

  const referralCode = data?.code || "";
  const referralStats = data
    ? {
        friendsReferred: data.referralCount,
        creditsEarned: data.creditsEarned,
        pendingReferrals: data.pendingReferrals,
      }
    : { friendsReferred: 0, creditsEarned: 0, pendingReferrals: 0 };

  const referralLink = data?.referralLink || "";
  const friendDiscount = data?.friendDiscount || 20;
  const rewardPerReferral = data?.rewardPerReferral || 15;

  const referralSteps = [
    {
      step: 1,
      title: "Share Your Code",
      description: `Share your unique referral code ${referralCode || "..."} with friends and family.`,
      icon: Share2,
      color: "bg-emerald-50",
      iconColor: "text-[#1B4332]",
    },
    {
      step: 2,
      title: "They Save $20",
      description: `Your friends get $${friendDiscount} off their first booking with CleanInstead.`,
      icon: Gift,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      step: 3,
      title: `You Earn $${rewardPerReferral}`,
      description: `You earn $${rewardPerReferral} credit for each successful referral. No limits!`,
      icon: DollarSign,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const recentReferrals = (data?.referrals || []).map((r) => ({
    name: r.name,
    referredDate: formatReferredDate(r.referredDate),
    earned: r.rewardEarned,
  }));

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast({
        title: "Referral Code Copied!",
        description: `${referralCode} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copied!",
        description: `Referral code: ${referralCode}`,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setLinkCopied(true);
      toast({
        title: "Referral Link Copied!",
        description: "Your unique referral link has been copied to your clipboard.",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast({
        title: "Copied!",
        description: "Referral link has been copied.",
      });
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(
      `Get $${friendDiscount} off your first cleaning with CleanInstead!`
    );
    const body = encodeURIComponent(
      `Hey!\n\nI've been using CleanInstead for eco-friendly cleaning and love it. Use my code ${referralCode} to get $${friendDiscount} off your first booking!\n\nThey use all-natural, chemical-free products and the results are amazing.\n\nBook now: ${referralLink}\n\nCheers!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    toast({
      title: "Opening Email",
      description: "Your default email client will open with a pre-filled message.",
    });
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I've been using CleanInstead for eco-friendly cleaning. Use my code ${referralCode} for $${friendDiscount} off your first booking! 🔧✨`
    );
    window.open(`https://wa.me/?text=${text}`);
    toast({
      title: "Opening WhatsApp",
      description: "You'll be redirected to WhatsApp to share your referral.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#1B4332]/30 border-t-[#1B4332] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#95D5B2]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#95D5B2]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-7 h-7 text-[#95D5B2]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Share the Sparkle
          </h1>
          <p className="text-[#95D5B2] text-lg max-w-md mx-auto">
            Give your friends{" "}
            <span className="font-bold text-white">${friendDiscount} off</span> their first
            clean. You get{" "}
            <span className="font-bold text-white">${rewardPerReferral} credit</span> for each
            referral!
          </p>
        </div>
      </div>

      {/* Referral Code */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <p className="text-sm text-gray-500 text-center mb-4 font-medium">
            Your Unique Referral Code
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-[#1B4332]/5 border-2 border-dashed border-[#1B4332]/20 rounded-xl px-8 py-4 text-center">
              <p className="text-3xl sm:text-4xl font-bold tracking-widest text-[#1B4332]">
                {referralCode}
              </p>
            </div>
            <Button
              onClick={handleCopyCode}
              className={`h-12 w-12 rounded-xl flex-shrink-0 ${
                copied
                  ? "bg-emerald-500 hover:bg-emerald-500"
                  : "bg-[#1B4332] hover:bg-[#15372a]"
              }`}
            >
              {copied ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Copy className="w-5 h-5 text-white" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Share this code with friends or use the share buttons below
          </p>
        </CardContent>
      </Card>

      {/* How It Works */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {referralSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.step}
                className="border-0 shadow-sm relative overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${step.iconColor}`} />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </CardContent>
                {index < referralSteps.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats + Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">
              Your Referral Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Friends Referred</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {referralStats.friendsReferred}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credits Earned</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-[#1B4332]">
                  ${referralStats.creditsEarned}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Referrals</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {referralStats.pendingReferrals}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Buttons */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900">
              Share Via
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
              onClick={handleShareEmail}
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-gray-400">
                  Send via your email app
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
              onClick={handleShareWhatsApp}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">WhatsApp</p>
                <p className="text-xs text-gray-400">
                  Share via WhatsApp message
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className={`w-full justify-start gap-3 h-12 text-gray-700 ${
                linkCopied
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "hover:bg-gray-50 hover:border-gray-300"
              }`}
              onClick={handleCopyLink}
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {linkCopied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Link2 className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">
                  {linkCopied ? "Link Copied!" : "Copy Link"}
                </p>
                <p className="text-xs text-gray-400">
                  Copy your unique referral link
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900">
            Recent Referrals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentReferrals.map((referral, index) => (
              <React.Fragment key={referral.name}>
                <div className="flex items-center gap-4 py-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#1B4332]">
                      {referral.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {referral.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Referred {referral.referredDate}
                    </p>
                  </div>
                  {referral.earned ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      Reward earned
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                      <Clock className="w-3 h-3 mr-0.5" />
                      Pending
                    </Badge>
                  )}
                </div>
                {index < recentReferrals.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-[#1B4332]/5 to-[#95D5B2]/10">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0">
            <PartyPopper className="w-6 h-6 text-[#1B4332]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              No limits on referrals!
            </h3>
            <p className="text-sm text-gray-500">
              Refer as many friends as you like. The more you share, the more you
              earn. Your credits never expire.
            </p>
          </div>
          <Button
            onClick={handleCopyCode}
            className="bg-[#1B4332] hover:bg-[#15372a] text-white w-full sm:w-auto flex-shrink-0"
          >
            <Send className="w-4 h-4 mr-2" />
            Share Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

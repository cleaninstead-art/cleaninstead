"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Sun,
  Moon,
  Clock,
  Leaf,
  PawPrint,
  Save,
  Trash2,
  Lock,
  LogOut,
  Plus,
  Shield,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { toast } = useToast();

  // Profile State
  const [profile, setProfile] = useState({
    fullName: "Amanda Johnson",
    email: "amanda@example.com",
    phone: "604-555-7890",
    address: "123 Elm Street, Surrey, BC V3R 1M7",
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    smsReminders: true,
    promotionalEmails: false,
    cleanerArrival: true,
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    preferredTime: "morning",
    ecoProducts: true,
    petFriendly: true,
    specialInstructions: "",
  });

  // Saved Cards
  const savedCards = [
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
  ];

  // Dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your cleaning preferences have been saved.",
    });
  };

  const handleAddPayment = () => {
    toast({
      title: "Add Payment Method",
      description: "Payment method setup will be available soon.",
    });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    setPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(false);
    toast({
      title: "Account Deletion Requested",
      description:
        "Your account deletion request has been submitted. You'll receive a confirmation email.",
      variant: "destructive",
    });
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <User className="w-4 h-4 text-[#1B4332]" />
            </div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Profile Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Textarea
              id="address"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              rows={2}
              className="max-w-lg resize-none"
            />
          </div>

          <div className="pt-2">
            <Button
              onClick={handleSaveProfile}
              className="bg-[#1B4332] hover:bg-[#15372a] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-600" />
            </div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Notification Preferences
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                Email booking confirmations
              </Label>
              <p className="text-xs text-gray-400">
                Receive email when a booking is confirmed or updated
              </p>
            </div>
            <Switch
              checked={notifications.bookingConfirmations}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  bookingConfirmations: checked,
                })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                SMS reminders
              </Label>
              <p className="text-xs text-gray-400">
                Get text reminders before your scheduled cleanings
              </p>
            </div>
            <Switch
              checked={notifications.smsReminders}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, smsReminders: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                Promotional emails
              </Label>
              <p className="text-xs text-gray-400">
                Receive offers, discounts, and company news
              </p>
            </div>
            <Switch
              checked={notifications.promotionalEmails}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  promotionalEmails: checked,
                })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                Cleaner arrival notifications
              </Label>
              <p className="text-xs text-gray-400">
                Be notified when your cleaner is on their way
              </p>
            </div>
            <Switch
              checked={notifications.cleanerArrival}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, cleanerArrival: checked })
              }
            />
          </div>

          <div className="pt-2">
            <Button
              onClick={handleSaveNotifications}
              className="bg-[#1B4332] hover:bg-[#15372a] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-purple-600" />
            </div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Payment Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border"
            >
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-wider">
                  VISA
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">
                    Visa ending in {card.last4}
                  </p>
                  {card.isDefault && (
                    <Badge className="bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20 text-[10px] px-1.5 py-0">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  Expires {card.expiry}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAddPayment}
            className="w-full sm:w-auto border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Cleaning Preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
              <Sun className="w-4 h-4 text-amber-600" />
            </div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Cleaning Preferences
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Preferred Cleaning Time
            </Label>
            <RadioGroup
              value={preferences.preferredTime}
              onValueChange={(val) =>
                setPreferences({ ...preferences, preferredTime: val })
              }
              className="flex flex-wrap gap-4"
            >
              {[
                { value: "morning", label: "Morning", icon: Sun, desc: "8:00 AM - 12:00 PM" },
                { value: "afternoon", label: "Afternoon", icon: Clock, desc: "12:00 PM - 4:00 PM" },
                { value: "evening", label: "Evening", icon: Moon, desc: "4:00 PM - 8:00 PM" },
              ].map((time) => {
                const Icon = time.icon;
                const isSelected = preferences.preferredTime === time.value;
                return (
                  <Label
                    key={time.value}
                    htmlFor={`time-${time.value}`}
                    className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-[#1B4332] bg-[#1B4332]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem
                      value={time.value}
                      id={`time-${time.value}`}
                    />
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#1B4332]" : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isSelected ? "text-[#1B4332]" : "text-gray-700"
                        }`}
                      >
                        {time.label}
                      </p>
                      <p className="text-xs text-gray-400">{time.desc}</p>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Eco-friendly products only
                </Label>
                <p className="text-xs text-gray-400">
                  Use only plant-based, chemical-free products
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.ecoProducts}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, ecoProducts: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Pet-friendly products
                </Label>
                <p className="text-xs text-gray-400">
                  Safe for households with pets
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.petFriendly}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, petFriendly: checked })
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="text-sm font-medium">
              Special Instructions
            </Label>
            <Textarea
              id="specialInstructions"
              value={preferences.specialInstructions}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  specialInstructions: e.target.value,
                })
              }
              placeholder="Any special requests or instructions for your cleaner (e.g., focus areas, fragile items, access codes)..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="pt-2">
            <Button
              onClick={handleSavePreferences}
              className="bg-[#1B4332] hover:bg-[#15372a] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
              <Shield className="w-4 h-4 text-gray-600" />
            </div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Account
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Change Password */}
          <Dialog
            open={passwordDialogOpen}
            onOpenChange={setPasswordDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-gray-700 hover:bg-gray-50"
              >
                <Lock className="w-4 h-4 mr-3 text-gray-500" />
                Change Password
                <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your current password and choose a new one. Must be at
                  least 8 characters.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Confirm New Password
                  </Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setPasswordDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  className="bg-[#1B4332] hover:bg-[#15372a] text-white"
                >
                  Update Password
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Separator />

          {/* Sign Out */}
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full justify-start h-12 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-3 text-gray-500" />
            Sign Out
            <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
          </Button>

          <Separator />

          {/* Delete Account */}
          <Dialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
              >
                <Trash2 className="w-4 h-4 mr-3" />
                Delete Account
                <ChevronRight className="w-4 h-4 ml-auto text-red-300" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-600">
                  Delete Account
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. All your data, bookings, and
                  loyalty points will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 my-4">
                <p className="text-sm text-red-700">
                  <strong>Warning:</strong> Deleting your account will:
                </p>
                <ul className="text-sm text-red-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Cancel all upcoming bookings</li>
                  <li>Permanently delete your loyalty points</li>
                  <li>Remove your payment methods</li>
                  <li>Delete all reviews and feedback</li>
                </ul>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Keep Account
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

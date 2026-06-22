"use client";

import { useState } from "react";
import { Loader2, Gift, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { customersApi } from "@/lib/api";
import { toast } from "sonner";

interface PointsRedemptionModalProps {
  open: boolean;
  onClose: () => void;
  points: number;
  onRedeemed: () => void;
}

const REDEMPTION_THRESHOLD = 5000;

export default function PointsRedemptionModal({ open, onClose, points, onRedeemed }: PointsRedemptionModalProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRedeem = async () => {
    if (!phone.trim()) { setError("Please enter a phone number"); return; }
    setError("");
    setIsLoading(true);
    const res = await customersApi.redeemPoints(phone);
    if (res.success) {
      setSuccess(true);
      toast.success("₦1,000 airtime sent successfully!");
      onRedeemed();
      setTimeout(() => {
        setSuccess(false);
        setPhone("");
        onClose();
      }, 2500);
    } else {
      setError(res.message || "Redemption failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { setError(""); setSuccess(false); onClose(); } }}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-500" />Redeem Points
          </DialogTitle>
          <DialogDescription>Convert {REDEMPTION_THRESHOLD.toLocaleString()} points for ₦1,000 airtime</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Airtime Sent!</h3>
            <p className="text-slate-500 text-sm">₦1,000 airtime has been sent to {phone}</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-sm text-amber-800 font-medium">
                You have <strong>{points.toLocaleString()} points</strong>. Redeem {REDEMPTION_THRESHOLD.toLocaleString()} for ₦1,000 airtime.
              </p>
              <p className="text-xs text-amber-600 mt-0.5">Remaining: {(points - REDEMPTION_THRESHOLD).toLocaleString()} pts</p>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
                <Phone className="h-3.5 w-3.5" />Phone Number for Airtime
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. 08012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white"
              />
              <p className="text-xs text-slate-400">Enter the Nigerian number to receive the airtime</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
              <Button onClick={handleRedeem} disabled={isLoading || !phone.trim()} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Redeem Now"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

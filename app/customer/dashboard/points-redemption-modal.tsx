"use client";

import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CustomerUser } from "@/types/user";

interface PointsRedemptionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  totalPoints: number;
  userData: CustomerUser;
  onConfirm: () => void;
}

export default function PointsRedemptionModal({
  isOpen,
  onOpenChange,
  totalPoints,
  userData,
  onConfirm,
}: PointsRedemptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-2xl overflow-hidden p-0">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold mb-2">Redeem Rewards</DialogTitle>
          </DialogHeader>
          <div className="mx-auto bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-2 shadow-inner">
            <Coins className="h-10 w-10 text-white drop-shadow-md" />
          </div>
          <p className="text-green-50 font-medium">You've unlocked a reward!</p>
        </div>
        
        <div className="px-6 py-8 space-y-6 bg-white">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Available</p>
              <p className="text-2xl font-bold text-slate-900">{totalPoints}</p>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Cost</p>
              <p className="text-2xl font-bold text-slate-900">5,000</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Airtime Value</span>
            <span className="font-bold text-green-600 text-lg">₦1,000</span>
          </div>

          <p className="text-sm text-slate-600 text-center">
            Airtime will be instantly credited to your registered phone number:<br/>
            <span className="font-bold text-slate-900 inline-block mt-1 bg-slate-100 px-3 py-1 rounded-md">{userData.phone}</span>
          </p>
        </div>
        
        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex sm:justify-between items-center w-full">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full sm:w-auto text-slate-500 hover:text-slate-700 hover:bg-slate-200">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-md font-semibold px-8"
          >
            Confirm Redemption
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { MessageSquare, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { providersApi } from "@/lib/api";
import { toast } from "sonner";

interface InquiriesTabProps {
  inquiries: any[];
  onUpdated: () => void;
}

const statusColors: Record<string, string> = {
  NEW: "bg-red-50 text-red-700 border-red-200",
  REPLIED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-slate-50 text-slate-500 border-slate-200",
};

export default function InquiriesTab({ inquiries, onUpdated }: InquiriesTabProps) {
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const handleReply = async (inquiryId: string) => {
    const reply = replyTexts[inquiryId]?.trim();
    if (!reply) return;
    setSubmitting(inquiryId);
    const res = await providersApi.replyToInquiry(inquiryId, { reply, status: "replied" });
    if (res.success) {
      toast.success("Reply sent!");
      setReplyTexts((prev) => { const n = { ...prev }; delete n[inquiryId]; return n; });
      onUpdated();
    } else {
      toast.error(res.message || "Failed to send reply");
    }
    setSubmitting(null);
  };

  if (inquiries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">No inquiries yet</h3>
        <p className="text-slate-500 text-sm">Customer inquiries will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry: any) => (
        <div key={inquiry.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-slate-900 text-sm">{inquiry.customer?.fullName}</p>
                <Badge variant="outline" className={`text-xs ${statusColors[inquiry.status] || statusColors.NEW}`}>
                  {inquiry.status}
                </Badge>
              </div>
              <p className="text-xs text-blue-600 font-medium mt-0.5">{inquiry.service}</p>
              <p className="text-xs text-slate-400 mt-0.5">{new Date(inquiry.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</p>
            </div>
            {inquiry.customer?.phone && (
              <a href={`tel:${inquiry.customer.phone}`} className="text-xs text-blue-600 hover:underline flex-shrink-0">{inquiry.customer.phone}</a>
            )}
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 mb-3">
            {inquiry.message}
          </div>

          {inquiry.reply && (
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 border border-blue-100 mb-3">
              <p className="text-xs font-medium text-blue-600 mb-1">Your reply:</p>
              {inquiry.reply}
            </div>
          )}

          {inquiry.status !== "CLOSED" && !inquiry.reply && (
            <div className="space-y-2">
              <Textarea
                placeholder="Type your reply..."
                value={replyTexts[inquiry.id] || ""}
                onChange={(e) => setReplyTexts((prev) => ({ ...prev, [inquiry.id]: e.target.value }))}
                rows={2}
                className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none text-sm"
              />
              <Button
                size="sm"
                onClick={() => handleReply(inquiry.id)}
                disabled={submitting === inquiry.id || !replyTexts[inquiry.id]?.trim()}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                {submitting === inquiry.id ? <><Loader2 className="mr-1.5 h-3 w-3 animate-spin" />Sending...</> : <><Send className="mr-1.5 h-3 w-3" />Send Reply</>}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

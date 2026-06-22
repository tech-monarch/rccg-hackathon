"use client";

import { useState } from "react";
import { Loader2, Save, Trash2, Plus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/image-upload";
import { providersApi } from "@/lib/api";
import { toast } from "sonner";

const categories = ["Academic Support","Digital Services","Home Services","Cooking Services","Laundry Services","Home Cleaning Services","Hair Styling Services","Farming Services"];
const states = ["Lagos","Abuja","Kano","Kaduna","Port Harcourt","Ibadan","Benin City","Jos","Ilorin","Enugu","Aba","Onitsha","Warri","Sokoto","Katsina"];

interface ProfileTabProps {
  providerData: any;
  onUpdated: () => void;
}

export default function ProfileTab({ providerData, onUpdated }: ProfileTabProps) {
  const [formData, setFormData] = useState({
    businessName: providerData?.businessName || "",
    ownerName: providerData?.ownerName || "",
    phone: providerData?.phone || "",
    category: providerData?.category || "",
    location: providerData?.location || "",
    description: providerData?.description || "",
    services: providerData?.services || "",
    experience: providerData?.experience || "",
    website: providerData?.website || "",
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [profileError, setProfileError] = useState("");

  const portfolioImages: any[] = providerData?.portfolioImages || [];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    const res = await providersApi.updateMe(formData);
    if (res.success) {
      toast.success("Profile updated successfully!");
      onUpdated();
    } else {
      setProfileError(res.message || "Failed to update profile");
    }
    setSavingProfile(false);
  };

  const handleUploadImages = async () => {
    if (newImages.length === 0) return;
    setUploadingImages(true);
    const res = await providersApi.uploadPortfolio(newImages);
    if (res.success) {
      toast.success(`${newImages.length} image(s) uploaded!`);
      setNewImages([]);
      onUpdated();
    } else {
      toast.error(res.message || "Upload failed");
    }
    setUploadingImages(false);
  };

  const handleDeleteImage = async (imageId: string) => {
    setDeletingId(imageId);
    const res = await providersApi.deletePortfolioImage(imageId);
    if (res.success) {
      toast.success("Image deleted");
      onUpdated();
    } else {
      toast.error("Failed to delete image");
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Profile form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Business Information</h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {profileError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{profileError}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Business Name</Label>
              <Input value={formData.businessName} onChange={(e) => setFormData((p) => ({ ...p, businessName: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label>Owner Name</Label>
              <Input value={formData.ownerName} onChange={(e) => setFormData((p) => ({ ...p, ownerName: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label>Experience</Label>
              <Input placeholder="e.g. 5+ years" value={formData.experience} onChange={(e) => setFormData((p) => ({ ...p, experience: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}>
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50"><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Select value={formData.location} onValueChange={(v) => setFormData((p) => ({ ...p, location: v }))}>
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50"><SelectValue /></SelectTrigger>
                <SelectContent>{states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} rows={3} className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label>Services Offered</Label>
            <Textarea placeholder="e.g. Deep cleaning, Regular cleaning..." value={formData.services} onChange={(e) => setFormData((p) => ({ ...p, services: e.target.value }))} rows={2} className="rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label>Website (optional)</Label>
            <Input type="url" placeholder="https://yourbusiness.com" value={formData.website} onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))} className="h-11 rounded-xl border-slate-200 bg-slate-50 focus-visible:bg-white" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={savingProfile} className="bg-slate-900 hover:bg-slate-800 text-white px-6">
              {savingProfile ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" />Save Changes</>}
            </Button>
          </div>
        </form>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-blue-600" />Portfolio ({portfolioImages.length}/12)
        </h3>

        {portfolioImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {portfolioImages.map((img: any) => (
              <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
                <img src={img.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={deletingId === img.id}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    {deletingId === img.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {portfolioImages.length < 12 && (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <ImageUpload images={newImages} onImagesChange={setNewImages} maxImages={Math.min(6, 12 - portfolioImages.length)} maxSizeMB={5} />
            </div>
            {newImages.length > 0 && (
              <Button onClick={handleUploadImages} disabled={uploadingImages} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {uploadingImages ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : <><Plus className="mr-2 h-4 w-4" />Upload {newImages.length} Image{newImages.length > 1 ? "s" : ""}</>}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

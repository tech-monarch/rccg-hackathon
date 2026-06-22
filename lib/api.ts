"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// ─── Token management (now persistent) ──────────────────────────────────────
let _accessToken: string | null = null;

// Initialize token from localStorage on module load (client‑side only)
if (typeof window !== "undefined") {
  _accessToken = localStorage.getItem("haven_access_token");
}

export const setAccessToken = (token: string) => {
  _accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("haven_access_token", token);
  }
};

export const getAccessToken = () => {
  // If memory is empty, try to restore from localStorage
  if (!_accessToken && typeof window !== "undefined") {
    const stored = localStorage.getItem("haven_access_token");
    if (stored) {
      _accessToken = stored;
    }
  }
  return _accessToken;
};

export const clearTokens = () => {
  _accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("haven_refresh_token");
    localStorage.removeItem("haven_role");
    localStorage.removeItem("haven_profile_id");
    localStorage.removeItem("haven_user_id");
    localStorage.removeItem("haven_access_token"); // new
  }
};

export const saveSession = (data: {
  accessToken: string;
  refreshToken: string;
  role: string;
  profileId?: string;
  userId: string;
}) => {
  setAccessToken(data.accessToken); // now also persists to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("haven_refresh_token", data.refreshToken);
    localStorage.setItem("haven_role", data.role);
    localStorage.setItem("haven_profile_id", data.profileId || "");
    localStorage.setItem("haven_user_id", data.userId);
    // accessToken is already saved inside setAccessToken
  }
};

export const getStoredRole = () =>
  typeof window !== "undefined" ? localStorage.getItem("haven_role") : null;

export const getStoredProfileId = () =>
  typeof window !== "undefined" ? localStorage.getItem("haven_profile_id") : null;

export const isLoggedIn = () =>
  typeof window !== "undefined" && !!localStorage.getItem("haven_refresh_token");

// ─── Refresh token flow ───────────────────────────────────────────────────────
let _refreshPromise: Promise<boolean> | null = null;

const doRefresh = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  const refreshToken = localStorage.getItem("haven_refresh_token");
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) { clearTokens(); return false; }
    const json = await res.json();
    if (json.success) {
      setAccessToken(json.data.accessToken); // persists both memory & localStorage
      localStorage.setItem("haven_refresh_token", json.data.refreshToken);
      // accessToken is already saved inside setAccessToken
      return true;
    }
    clearTokens();
    return false;
  } catch {
    clearTokens();
    return false;
  }
};

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  isRetry = false
): Promise<{ success: boolean; data?: T; message?: string; errors?: any; meta?: any }> {
  const headers: Record<string, string> = {};

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Use getAccessToken() – it checks memory and falls back to localStorage
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string> || {}) },
  });

  // Handle 401 — try refresh once
  if (res.status === 401 && !isRetry) {
    if (!_refreshPromise) {
      _refreshPromise = doRefresh().finally(() => { _refreshPromise = null; });
    }
    const refreshed = await _refreshPromise;
    if (refreshed) return apiFetch<T>(path, options, true);
    // Redirect to login
    if (typeof window !== "undefined") {
      clearTokens();
      window.location.href = "/auth/login";
    }
    return { success: false, message: "Session expired" };
  }

  try {
    return await res.json();
  } catch {
    return { success: false, message: `HTTP ${res.status}` };
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  registerCustomer: async (data: {
    fullName: string; email: string; phone: string; password: string;
  }) => apiFetch("/auth/register/customer", { method: "POST", body: JSON.stringify(data) }),

  registerProvider: async (formData: FormData) =>
    apiFetch("/auth/register/provider", { method: "POST", body: formData }),

  login: async (email: string, password: string) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  logout: async () => {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("haven_refresh_token") : null;
    if (refreshToken) {
      await apiFetch("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) });
    }
    clearTokens();
  },

  forgotPassword: async (email: string) =>
    apiFetch("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
};

// ─── Providers API ────────────────────────────────────────────────────────────
export const providersApi = {
  list: async (params?: {
    search?: string; category?: string; location?: string;
    minRating?: number; sort?: string; page?: number; limit?: number;
  }) => {
    const q = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== "" && v !== 0) q.set(k, String(v));
      });
    }
    return apiFetch(`/providers?${q.toString()}`);
  },

  getById: async (id: string) => apiFetch(`/providers/${id}`),

  getMe: async () => apiFetch("/providers/me"),

  updateMe: async (data: Record<string, any>) =>
    apiFetch("/providers/me", { method: "PUT", body: JSON.stringify(data) }),

  uploadPortfolio: async (files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("images", f));
    return apiFetch("/providers/me/portfolio", { method: "POST", body: fd });
  },

  deletePortfolioImage: async (imageId: string) =>
    apiFetch(`/providers/me/portfolio/${imageId}`, { method: "DELETE" }),

  getMyInquiries: async (params?: { status?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params) Object.entries(params).forEach(([k, v]) => v && q.set(k, String(v)));
    return apiFetch(`/providers/me/inquiries?${q.toString()}`);
  },

  replyToInquiry: async (inquiryId: string, data: { reply?: string; status?: string }) =>
    apiFetch(`/providers/me/inquiries/${inquiryId}`, { method: "PATCH", body: JSON.stringify(data) }),

  getMyReviews: async (params?: { page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params) Object.entries(params).forEach(([k, v]) => v && q.set(k, String(v)));
    return apiFetch(`/providers/me/reviews?${q.toString()}`);
  },

  replyToReview: async (reviewId: string, reply: string) =>
    apiFetch(`/providers/me/reviews/${reviewId}/reply`, { method: "POST", body: JSON.stringify({ reply }) }),
};

// ─── Customers API ────────────────────────────────────────────────────────────
export const customersApi = {
  getMe: async () => apiFetch("/customers/me"),

  updateMe: async (data: { fullName?: string; phone?: string; address?: string }) =>
    apiFetch("/customers/me", { method: "PUT", body: JSON.stringify(data) }),

  uploadAvatar: async (file: File) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return apiFetch("/customers/me/avatar", { method: "POST", body: fd });
  },



  changePassword: async (currentPassword: string, newPassword: string) =>
    apiFetch("/customers/me/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  getServiceHistory: async (params?: { status?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params) Object.entries(params).forEach(([k, v]) => v && q.set(k, String(v)));
    return apiFetch(`/customers/me/service-history?${q.toString()}`);
  },

  getPoints: async () => apiFetch("/customers/me/points"),

  redeemPoints: async (phone: string) =>
    apiFetch("/points/redeem", { method: "POST", body: JSON.stringify({ phone }) }),
};

// ─── Service Requests API ─────────────────────────────────────────────────────
export const serviceRequestsApi = {
  create: async (data: {
    category: string; description: string; address: string;
    preferredDate: string; preferredTime: string; urgency: string;
  }) => apiFetch("/service-requests", { method: "POST", body: JSON.stringify(data) }),

  uploadMedia: async (requestId: string, files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    return apiFetch(`/service-requests/${requestId}/media`, { method: "POST", body: fd });
  },

  getQuotes: async (requestId: string) =>
    apiFetch(`/service-requests/${requestId}/quotes`),
};

// ─── Bookings API ─────────────────────────────────────────────────────────────
export const bookingsApi = {
  create: async (data: { serviceRequestId: string; providerId: string; scheduledAt: string; amount: number }) =>
    apiFetch("/bookings", { method: "POST", body: JSON.stringify(data) }),

  getById: async (id: string) => apiFetch(`/bookings/${id}`),

  leaveReview: async (bookingId: string, data: { rating: number; comment?: string }) =>
    apiFetch(`/bookings/${bookingId}/reviews`, { method: "POST", body: JSON.stringify(data) }),
};

// ─── Housing API ──────────────────────────────────────────────────────────────
export const housingApi = {
  list: async (params?: {
    search?: string; category?: string; location?: string;
    minRating?: number; sort?: string; page?: number; limit?: number;
  }) => {
    const q = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== "" && v !== 0) q.set(k, String(v));
      });
    }
    return apiFetch(`/housing?${q.toString()}`);
  },
  getById: async (id: string) => apiFetch(`/housing/${id}`),
};

// ─── Inquiries API ────────────────────────────────────────────────────────────
export const inquiriesApi = {
  send: async (data: { providerId: string; service: string; message: string }) =>
    apiFetch("/inquiries", { method: "POST", body: JSON.stringify(data) }),
};

export default apiFetch;
// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!API_BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is not defined");
}

// ==================== TOKEN ====================

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("benenw_token");
}

// ==================== API CALL ====================

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // ❌ IMPORTANT: do NOT crash silently
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  return res.json();
}

// ==================== AUTH ====================

export const authAPI = {
  register: (data: any) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: any) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ==================== USER ====================

export const userAPI = {
  getDashboard: () => apiCall("/user/dashboard"),
};

export default apiCall;
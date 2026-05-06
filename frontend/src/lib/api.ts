// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!API_BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is NOT defined");
}

// ================= TOKEN =================

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("benenw_token");
}

// ================= CORE =================

async function apiCall<T>(
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

  if (res.status === 401 || res.status === 403) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("benenw_token");
      localStorage.removeItem("benenw_user");
      window.location.href = "/";
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "API error");
  }

  return res.json();
}

// ================= AUTH API (FIXED) =================

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    apiCall<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: { name: string; email: string; password: string }) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ================= USER =================

export const userAPI = {
  getDashboard: () => apiCall("/user/dashboard"),
};

// ================= REGISTRY =================

export const registryAPI = {
  create: (data: any) =>
    apiCall("/registry/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getById: (id: string) => apiCall(`/registry/${id}`),

  getShare: (id: string) => apiCall(`/registry/${id}/share`),
};

export default apiCall;
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ==================== TYPES ====================
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegistryResponse {
  id: string;
  title: string;
  description?: string;
  goalAmount: number;
  occasion?: string;
  coverImage?: string;
  isPublic: boolean;
  createdAt: string;
  userId: string;
}

export interface GiftItemResponse {
  id: string;
  title: string;
  description?: string;
  price?: number;
  quantity: number;
  link?: string;
  isReserved: boolean;
  registryId: string;
  createdAt: string;
}

export interface ContributionResponse {
  id: string;
  amount: number;
  message?: string;
  name?: string;
  tx_ref: string;
  status: string;
  giftItemId?: string;
  registryId: string;
  createdAt: string;
}

export interface PaymentInitiateResponse {
  checkout_url: string;
  tx_ref: string;
}

export interface ShareResponse {
  shareUrl: string;
  whatsappUrl: string;
  telegramUrl: string;
  email: { subject: string; body: string };
  qrCode: string;
}

// ==================== HELPER: Get Auth Token ====================
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('benenw_token');
  }
  return null;
}

// ==================== ENHANCED API CALL ====================
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  
  const headersRecord: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };

  if (token) {
    headersRecord['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: headersRecord,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

// ==================== AUTH APIs ====================
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    apiCall<AuthResponse | User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  forgotPassword: (email: string) =>
    apiCall<{ message: string }>('/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, newPassword: string) =>
    apiCall<{ message: string }>('/password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    }),
};

// ==================== USER APIs ====================
export const userAPI = {
  getDashboard: () => apiCall('/user/dashboard'),
};

// ==================== REGISTRY APIs ====================
export const registryAPI = {
  create: (data: { title: string; description?: string; goalAmount?: number; occasion?: string }) =>
    apiCall<RegistryResponse>('/registry/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (id: string) =>
    apiCall(`/registry/${id}`),

  getDashboard: (id: string) =>
    apiCall(`/registry/${id}/dashboard`),

  update: (id: string, data: { title?: string; description?: string; goalAmount?: number; occasion?: string; coverImage?: string; isPublic?: boolean }) =>
    apiCall<RegistryResponse>(`/registry/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<{ message: string }>(`/registry/${id}`, {
      method: 'DELETE',
    }),

  search: (query: string) =>
    apiCall(`/registry/search?q=${encodeURIComponent(query)}`),

  getShare: (id: string) =>
    apiCall<ShareResponse>(`/registry/${id}/share`),
};

// ==================== GIFT APIs ====================
export const giftAPI = {
  add: (registryId: string, data: { title: string; description?: string; price?: number; quantity?: number; link?: string }) =>
    apiCall<GiftItemResponse>(`/gifts/${registryId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: { title?: string; description?: string; price?: number; quantity?: number; link?: string; isReserved?: boolean }) =>
    apiCall<GiftItemResponse>(`/gifts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<{ message: string }>(`/gifts/${id}`, {
      method: 'DELETE',
    }),

  reserve: (id: string) =>
    apiCall<GiftItemResponse>(`/gifts/${id}/reserve`, {
      method: 'PATCH',
    }),
};

// ==================== CONTRIBUTION APIs ====================
export const contributionAPI = {
  add: (data: { amount: number; message?: string; name?: string; registryId: string; giftItemId?: string }) =>
    apiCall<ContributionResponse>('/contributions/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getByRegistry: (registryId: string) =>
    apiCall(`/contributions/${registryId}`),

  getTotal: (registryId: string) =>
    apiCall(`/contributions/total/${registryId}`),
};

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
  initiate: (data: { amount: number; email: string; first_name: string; last_name: string; registryId: string; giftItemId?: string; message?: string }) =>
    apiCall<PaymentInitiateResponse>('/payment/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ==================== QR CODE APIs ====================
export const qrAPI = {
  generateRegistry: (id: string) =>
    apiCall<{ registryUrl: string; qrCode: string }>(`/qr/registry/${id}`),
};

export default apiCall;
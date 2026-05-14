import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

API.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* =========================
   AUTH
========================= */

export const authAPI = {
  login: (email: string, password: string) =>
    API.post('/auth/login', { email, password }).then(r => r.data),

  register: (name: string, email: string, password: string) =>
    API.post('/auth/register', { name, email, password }).then(r => r.data),

  me: () =>
    API.get('/auth/me').then(r => r.data),

  logout: () =>
    API.post('/auth/logout').then(r => r.data),

  // ✅ ADD THIS
  forgotPassword: (email: string) =>
    API.post('/password/forgot', { email }).then(r => r.data),

  resetPassword: (token: string, newPassword: string) =>
    API.post('/password/reset', { token, newPassword }).then(r => r.data),
}

/* =========================
   REGISTRY (FIXED ROUTES)
========================= */

export const registryAPI = {
  create: (data: any) =>
    API.post('/registry/create', data).then(r => r.data),

  getById: (id: string) =>
    API.get(`/registry/${id}`).then(r => r.data),

  getShare: (id: string) =>
    API.get(`/registry/${id}/share`).then(r => r.data),

  search: (q: string) =>
    API.get(`/registry/search?q=${q}`).then(r => r.data),
}

/* =========================
   USER
========================= */

export const userAPI = {
  getDashboard: () =>
    API.get('/user/dashboard').then(r => r.data),
}

export default API
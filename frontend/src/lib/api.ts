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
   AUTH API
========================= */

export const authAPI = {
  login: async (
    email: string,
    password: string
  ) => {
    const res = await API.post('/auth/login', {
      email,
      password,
    })

    return res.data
  },

  register: async (
    name: string,
    email: string,
    password: string
  ) => {
    const res = await API.post('/auth/register', {
      name,
      email,
      password,
    })

    return res.data
  },

  me: async () => {
    const res = await API.get('/auth/me')

    return res.data
  },

  logout: async () => {
    const res = await API.post('/auth/logout')

    return res.data
  },

  forgotPassword: async (
    email: string
  ) => {
    const res = await API.post(
      '/auth/forgot-password',
      {
        email,
      }
    )

    return res.data
  },
}

/* =========================
   REGISTRY API
========================= */

export const registryAPI = {
  create: async (data: any) => {
    const res = await API.post(
      '/registries',
      data
    )

    return res.data
  },

  getById: async (id: string) => {
    const res = await API.get(
      `/registries/${id}`
    )

    return res.data
  },

  getShare: async (id: string) => {
    const res = await API.get(
      `/registries/${id}/share`
    )

    return res.data
  },

  search: async (query: string) => {
    const res = await API.get(
      `/registries/search?q=${query}`
    )

    return res.data
  },
}

/* =========================
   USER API
========================= */

export const userAPI = {
  getDashboard: async () => {
    const res = await API.get(
      '/users/dashboard'
    )

    return res.data
  },
}

export default API
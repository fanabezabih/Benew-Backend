import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

/* =========================
   AUTH
========================= */

export const authAPI = {

  login: (
    email: string,
    password: string
  ) =>
    API.post('/auth/login', {
      email,
      password
    }).then(r => r.data),

  register: (
    name: string,
    email: string,
    password: string
  ) =>
    API.post('/auth/register', {
      name,
      email,
      password
    }).then(r => r.data),

  me: () =>
    API.get('/auth/me')
      .then(r => r.data),

  logout: () =>
    API.post('/auth/logout')
      .then(r => r.data),

  forgotPassword: (
    email: string
  ) =>
    API.post('/password/forgot', {
      email
    }).then(r => r.data),

  resetPassword: (
    token: string,
    newPassword: string
  ) =>
    API.post('/password/reset', {
      token,
      newPassword
    }).then(r => r.data),
}

/* =========================
   REGISTRY
========================= */

export const registryAPI = {

  create: (data: any) =>
    API.post(
      '/registry/create',
      data
    ).then(r => r.data),

  getById: (id: string) =>
    API.get(
      `/registry/${id}`
    ).then(r => r.data),

  getShare: (id: string) =>
    API.get(
      `/registry/${id}/share`
    ).then(r => r.data),

  search: (q: string) =>
    API.get(
      `/registry/search?q=${q}`
    ).then(r => r.data),

  update: (
    id: string,
    data: any
  ) =>
    API.put(
      `/registry/${id}`,
      data
    ).then(r => r.data),

  delete: (id: string) =>
    API.delete(
      `/registry/${id}`
    ).then(r => r.data),
}

/* =========================
   GIFT
========================= */

export const giftAPI = {

  // ➕ ADD GIFT
  addGift: (
    registryId: string,
    formData: FormData
  ) =>
    API.post(
      `/gifts/${registryId}`,
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    ).then(r => r.data),

  // ✏️ UPDATE GIFT
  updateGift: (
    id: string,
    data: any
  ) => {

    const isFormData =
      data instanceof FormData

    return API.put(
      `/gifts/${id}`,
      data,
      isFormData
        ? {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }
        : undefined
    ).then(r => r.data)
  },

  // ❌ DELETE
  deleteGift: (id: string) =>
    API.delete(
      `/gifts/${id}`
    ).then(r => r.data),

  // ✅ MARK AS PURCHASED
  reserveGift: (
    id: string,
    purchaserName: string
  ) =>
    API.patch(
      `/gifts/${id}/reserve`,
      {
        name: purchaserName
      }
    ).then(r => r.data),
}

/* =========================
   PAYMENT / CONTRIBUTIONS
========================= */

export const contributionAPI = {

  initiatePayment: (
    data: {
      amount: number
      email: string
      first_name: string
      last_name: string
      registryId: string
      giftItemId?: string
      message?: string
    }
  ) =>
    API.post(
      '/payment/initiate',
      data
    ).then(r => r.data),

  getRegistryContributions: (
    registryId: string
  ) =>
    API.get(
      `/contribution/${registryId}`
    ).then(r => r.data),

  getTotalContribution: (
    registryId: string
  ) =>
    API.get(
      `/contribution/total/${registryId}`
    ).then(r => r.data),
}

/* =========================
   LINK PREVIEW
========================= */

export const linkPreviewAPI = {

  preview: (
    url: string
  ) =>
    API.post(
      '/link-preview',
      { url }
    ).then(r => r.data),
}

/* =========================
   USER
========================= */

export const userAPI = {

  getDashboard: () =>
    API.get(
      '/user/dashboard'
    ).then(r => r.data),
}

export default API
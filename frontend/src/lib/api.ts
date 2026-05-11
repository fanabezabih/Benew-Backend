import axios from 'axios';

// ========================
// AXIOS INSTANCE
// ========================

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ========================
// AUTH API
// ========================

export const authAPI = {

  // LOGIN
  login: async (
    email: string,
    password: string
  ) => {

    const res = await api.post(
      '/auth/login',
      {
        email,
        password,
      }
    );

    return res.data;
  },

  // REGISTER
  register: async (
    name: string,
    email: string,
    password: string
  ) => {

    const res = await api.post(
      '/auth/register',
      {
        name,
        email,
        password,
      }
    );

    return res.data;
  },

  // CURRENT USER
  me: async () => {

    const res = await api.get(
      '/auth/me'
    );

    return res.data;
  },

  // LOGOUT
  logout: async () => {

    const res = await api.post(
      '/auth/logout'
    );

    return res.data;
  },
};

// ========================
// USER API
// ========================

export const userAPI = {

  getDashboard: async () => {

    const res = await api.get(
      '/user/dashboard'
    );

    return res.data;
  },
};

// ========================
// REGISTRY API
// ========================

export const registryAPI = {

  // CREATE
  create: async (data: any) => {

    const res = await api.post(
      '/registry',
      data
    );

    return res.data;
  },

  // GET ONE
  getById: async (id: string) => {

    const res = await api.get(
      `/registry/${id}`
    );

    return res.data;
  },

  // SHARE
  getShare: async (id: string) => {

    const res = await api.get(
      `/registry/${id}/share`
    );

    return res.data;
  },
};

export default api;
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// AUTH
export const authAPI = {
  login: (email: string, password: string) =>
    API.post('/auth/login', { email, password }),

  register: (data: any) =>
    API.post('/auth/register', data),

  logout: () =>
    API.post('/auth/logout'),

  me: () =>
    API.get('/auth/me').then(res => res.data),
};

// USER
export const userAPI = {
  getDashboard: () =>
    API.get('/user/dashboard').then(res => res.data),
};

// REGISTRY
export const registryAPI = {
  create: (data: any) =>
    API.post('/registry', data).then(res => res.data),

  getById: (id: string) =>
    API.get(`/registry/${id}`).then(res => res.data),

  getShare: (id: string) =>
    API.get(`/registry/${id}/share`).then(res => res.data),
};
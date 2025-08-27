"use server";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Set your API base URL
});

// Request interceptor to add the Bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token"); // Get token from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

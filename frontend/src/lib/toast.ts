"use client";

import { toast, type ToastOptions } from "react-toastify";
import { ApiError } from "@/lib/api";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notify = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultOptions, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultOptions, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaultOptions, ...options }),

  apiError: (error: unknown, fallback = "Something went wrong. Please try again.") => {
    const message = error instanceof ApiError ? error.message : fallback;
    toast.error(message, defaultOptions);
  },
};

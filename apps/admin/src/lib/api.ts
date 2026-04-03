import { NotificationSchema } from "./schemas/notifications";
import { UserSchema } from "./schemas/user";
import { NotificationChannel } from "./types/notification-channel.enum";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export const api = {
  auth: {
    register: (data: { name: string; email: string; password: string; phoneNumber: string }) =>
      fetchApi<{ id: string; name: string; email: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      fetchApi<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  users: {
    findAll: () =>
      fetchApi<UserSchema[]>("/users", {
        method: "GET",
      }),
  },
  notifications: {
    createNotification: (data: { userId: string; channel: NotificationChannel; message: string }) =>
      fetchApi<NotificationSchema>("/notifications", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};

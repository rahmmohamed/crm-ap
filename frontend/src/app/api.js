const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("crm_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

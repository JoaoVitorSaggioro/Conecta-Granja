const BASE_URL = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("cg_token");
}

export async function api(path, { method = "GET", body } = {}) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "Não foi possível concluir a operação.");
  }

  return data;
}

export const http = {
  get: (path) => api(path),
  post: (path, body) => api(path, { method: "POST", body }),
  put: (path, body) => api(path, { method: "PUT", body }),
  patch: (path, body) => api(path, { method: "PATCH", body }),
  del: (path) => api(path, { method: "DELETE" }),
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || response.statusText);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function getProfile() {
  return fetchAPI("/auth/profile");
}

// Categories
export async function getCategories() {
  return fetchAPI("/categories");
}

export async function createCategory(data: { name: string }) {
  return fetchAPI("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id: number, data: { name: string }) {
  return fetchAPI(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: number) {
  return fetchAPI(`/categories/${id}`, {
    method: "DELETE",
  });
}

// Tags
export async function getTags() {
  return fetchAPI("/tags");
}

export async function createTag(data: { name: string }) {
  return fetchAPI("/tags", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTag(id: number, data: { name: string }) {
  return fetchAPI(`/tags/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTag(id: number) {
  return fetchAPI(`/tags/${id}`, {
    method: "DELETE",
  });
}

// Users
export async function getUsers() {
  return fetchAPI("/users");
}

export async function createUser(data: Record<string, unknown>) {
  return fetchAPI("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: number, data: Record<string, unknown>) {
  return fetchAPI(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number) {
  return fetchAPI(`/users/${id}`, {
    method: "DELETE",
  });
}

// Posts
export async function getPost(id: string | number) {
  return fetchAPI(`/posts/${id}`);
}

export async function updatePost(
  id: string | number,
  data: Record<string, unknown>,
) {
  return fetchAPI(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deletePost(id: string | number) {
  return fetchAPI(`/posts/${id}`, {
    method: "DELETE",
  });
}

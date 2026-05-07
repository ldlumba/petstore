const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export function getPets(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, value);
    }
  });
  const query = search.toString();
  return request(`/lumba/api/v1/pets${query ? `?${query}` : ''}`);
}

export function getPet(id) {
  return request(`/lumba/api/v1/pets/${id}`);
}

export function createPet(payload) {
  return request('/lumba/api/v1/pets', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updatePet(id, payload) {
  return request(`/lumba/api/v1/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function deletePet(id) {
  return request(`/lumba/api/v1/pets/${id}`, {
    method: 'DELETE'
  });
}

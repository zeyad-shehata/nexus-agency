// Detect API base from Vite env or fall back to localhost
const DEFAULT_API = 'http://localhost:5000/api/v1';
export const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || DEFAULT_API;
export const SOCKET_URL = API_BASE.replace(/\/api\/v1$/, '');

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) throw new Error('Refresh failed');
    const data = await res.json();
    
    const token = data.accessToken || data.token;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return token;
  } catch (err) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return null;
  }
}

export async function apiFetch(endpoint: string, options: RequestInit & { headers?: Record<string, string> } = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  
  options.headers = {
    ...options.headers,
  };

  // Auto-set Content-Type for JSON bodies (but not FormData)
  if (options.body && !(options.body instanceof FormData) && !options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, options);

  // If unauthorized, attempt to refresh token once
  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      options.headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, options);
    } else {
      // Clear credentials and trigger route change
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.history.pushState({}, '', '/auth');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  return response;
}

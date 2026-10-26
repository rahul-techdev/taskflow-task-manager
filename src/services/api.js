/**
 * TaskFlow API Service
 * Handles communication with the Express backend on /api
 * Provides resilient fallbacks for seamless offline or client-only use.
 */

const API_BASE = '/api';
const TOKEN_KEY = 'taskflow_auth_token';

// Helper for making API requests with timeout and error handling
async function request(endpoint, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.message || `Request failed with status ${res.status}`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const api = {
  // Server Health Check
  async checkHealth() {
    try {
      const res = await request('/health', { method: 'GET' });
      return { connected: true, data: res };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  },

  // Task Endpoints
  async getTasks(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.priority && params.priority !== 'all') query.append('priority', params.priority);
    if (params.search) query.append('search', params.search);
    if (params.sortBy) query.append('sortBy', params.sortBy);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await request(`/tasks${queryString}`, { method: 'GET' });
    return res.data;
  },

  async createTask(taskData) {
    const res = await request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return res.data;
  },

  async updateTask(id, taskData) {
    const res = await request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return res.data;
  },

  async patchTask(id, partialData) {
    const res = await request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(partialData),
    });
    return res.data;
  },

  async deleteTask(id) {
    const res = await request(`/tasks/${id}`, {
      method: 'DELETE',
    });
    return res.data;
  },

  async clearCompletedTasks() {
    const res = await request('/tasks/clear-completed', {
      method: 'POST',
    });
    return res;
  },

  async resetTasks() {
    const res = await request('/tasks/reset', {
      method: 'POST',
    });
    return res.data;
  },

  // Profile & Gamification
  async getProfile() {
    const res = await request('/profile', { method: 'GET' });
    return res.data;
  },

  async updateProfile(profileData) {
    const res = await request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return res.data;
  },

  async addXp(amount, taskId = null) {
    const res = await request('/profile/xp', {
      method: 'POST',
      body: JSON.stringify({ amount, taskId }),
    });
    return res.data;
  },

  // Settings
  async getSettings() {
    const res = await request('/settings', { method: 'GET' });
    return res.data;
  },

  async updateSettings(settingsData) {
    const res = await request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
    return res.data;
  },

  // Analytics
  async getStats() {
    const res = await request('/stats', { method: 'GET' });
    return res.data;
  },

  // Authentication
  async login(email, password) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) {
      localStorage.setItem(TOKEN_KEY, res.data.token);
    }
    return res.data;
  },

  async register(name, email, password) {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (res.data?.token) {
      localStorage.setItem(TOKEN_KEY, res.data.token);
    }
    return res.data;
  },

  async getMe() {
    const res = await request('/auth/me', { method: 'GET' });
    return res.data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

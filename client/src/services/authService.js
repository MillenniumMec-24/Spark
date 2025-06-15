const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Login failed');
    }
    return response.json();
  },

  async signup(userData) {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Signup failed');
    }
    return response.json();
  },

  async resendVerification(email) {
    const response = await fetch(`${API_URL}/users/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to resend verification');
    }
    return response.json();
  }
};
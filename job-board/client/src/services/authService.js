const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function registerUser({ name, email, password, role }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed')
  }

  return result
}

async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Login failed')
  }

  return result
}

async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch current user')
  }

  return result.data
}

export { registerUser, loginUser, getCurrentUser }
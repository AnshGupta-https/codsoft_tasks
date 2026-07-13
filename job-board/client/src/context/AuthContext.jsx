import { createContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authService.js'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      const storedToken = localStorage.getItem('token')

      if (!storedToken) {
        setIsLoading(false)
        return
      }

      try {
        const currentUser = await getCurrentUser(storedToken)
        setUser(currentUser)
        setToken(storedToken)
      } catch {
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  async function login(email, password) {
    const result = await loginUser({ email, password })
    localStorage.setItem('token', result.token)
    setToken(result.token)
    setUser(result.data)
    return result.data
  }

  async function register(name, email, password, role) {
    const result = await registerUser({ name, email, password, role })
    localStorage.setItem('token', result.token)
    setToken(result.token)
    setUser(result.data)
    return result.data
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = { user, token, isLoading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
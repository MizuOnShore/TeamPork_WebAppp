"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/AuthService.js"

const AuthContext = createContext(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = await authService.getValidAccessToken()
      const storedUser = localStorage.getItem("user")

      if (token && storedUser) {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (username, password) => {
    const response = await authService.login(username, password)

    localStorage.setItem("accessToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("tokenExpiry", (Date.now() + response.expiresIn * 1000).toString())

    // Store user info (you can expand this based on what your API returns)
    const userInfo = { username, email: response.email || `${username}@example.com` }
    setUser(userInfo)
    localStorage.setItem("user", JSON.stringify(userInfo))

    setIsAuthenticated(true)
  }

  const register = async (username, email, password) => {
    const response = await authService.register(username, email, password)

    localStorage.setItem("accessToken", response.accessToken)
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("tokenExpiry", (Date.now() + response.expiresIn * 1000).toString())

    // Store user info
    const userInfo = { username, email }
    setUser(userInfo)
    localStorage.setItem("user", JSON.stringify(userInfo))

    setIsAuthenticated(true)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

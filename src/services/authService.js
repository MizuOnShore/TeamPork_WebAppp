class AuthService {
  constructor() {
    this.baseUrl = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL || "http://localhost:5058"
  }

  async login(username, password) {
    try {
      const requestBody = { username, password }
      console.log("Login request body:", requestBody)
      console.log("API URL:", `${this.baseUrl}/api/Auth/Login`)

      const response = await fetch(`${this.baseUrl}/api/Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("Login response status:", response.status)
      console.log("Login response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        let errorMessage = "Login failed"
        let errorDetails = ""

        try {
          const contentType = response.headers.get("content-type")
          console.log("Response content-type:", contentType)

          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json()
            console.error("Login error JSON:", errorData)

            if (errorData.title) {
              errorMessage = errorData.title
              errorDetails = errorData.detail || ""
            } else if (errorData.message) {
              errorMessage = errorData.message
            } else if (typeof errorData === "string") {
              errorMessage = errorData
            }
          } else {
            const errorText = await response.text()
            console.error("Login error text:", errorText)
            errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
          }

          if (response.status === 400) {
            if (errorMessage.includes("Bad Request")) {
              errorMessage = "Invalid request format. Please check your username and password."
              errorDetails = "The server couldn't understand the request. This might be a validation error."
            }
          } else if (response.status === 401) {
            errorMessage = "Invalid username or password"
          } else if (response.status === 500) {
            errorMessage = "Server error. Please try again later."
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }

        const fullError = errorDetails ? `${errorMessage}\n\nDetails: ${errorDetails}` : errorMessage
        throw new Error(fullError)
      }

      const data = await response.json()
      console.log("Login successful, response keys:", Object.keys(data))
      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async register(username, email, password) {
    try {
      const requestBody = { username, email, password }
      console.log("Register request body:", requestBody)
      console.log("API URL:", `${this.baseUrl}/api/Auth/Register`)

      const response = await fetch(`${this.baseUrl}/api/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("Register response status:", response.status)
      console.log("Register response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        let errorMessage = "Registration failed"
        let errorDetails = ""

        try {
          const contentType = response.headers.get("content-type")
          console.log("Response content-type:", contentType)

          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json()
            console.error("Register error JSON:", errorData)

            if (errorData.title) {
              errorMessage = errorData.title
              errorDetails = errorData.detail || ""
            } else if (errorData.message) {
              errorMessage = errorData.message
            } else if (typeof errorData === "string") {
              errorMessage = errorData
            }
          } else {
            const errorText = await response.text()
            console.error("Register error text:", errorText)
            errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
          }

          if (response.status === 400) {
            if (errorMessage.includes("Bad Request")) {
              errorMessage = "Invalid registration data. Please check all fields."
              errorDetails =
                "The server couldn't validate your registration data. Check username, email format, and password requirements."
            }
          } else if (response.status === 409) {
            errorMessage = "Username or email already exists"
          } else if (response.status === 500) {
            errorMessage = "Server error. Please try again later."
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }

        const fullError = errorDetails ? `${errorMessage}\n\nDetails: ${errorDetails}` : errorMessage
        throw new Error(fullError)
      }

      const data = await response.json()
      console.log("Registration successful, response keys:", Object.keys(data))
      return data
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  async refreshToken(token) {
    try {
      const response = await fetch(`${this.baseUrl}/api/Auth/Refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(errorData || "Token refresh failed")
      }

      return response.json()
    } catch (error) {
      console.error("Refresh token error:", error)
      throw error
    }
  }

  getAccessToken() {
    return localStorage.getItem("accessToken")
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken")
  }

  isTokenExpired() {
    const expiry = localStorage.getItem("tokenExpiry")
    if (!expiry) return true
    return Date.now() > Number.parseInt(expiry)
  }

  async getValidAccessToken() {
    const accessToken = this.getAccessToken()

    if (!accessToken) return null

    if (!this.isTokenExpired()) {
      return accessToken
    }

    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      this.logout()
      return null
    }

    try {
      const response = await this.refreshToken(refreshToken)

      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("tokenExpiry", (Date.now() + response.expiresIn * 1000).toString())

      return response.accessToken
    } catch (error) {
      this.logout()
      return null
    }
  }

  logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("tokenExpiry")
  }

  isAuthenticated() {
    return !!this.getAccessToken() && !this.isTokenExpired()
  }
}

export const authService = new AuthService()

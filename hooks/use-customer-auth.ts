"use client"

import { useState, useEffect } from "react"

interface CustomerData {
  fullName: string
  email: string
  phone: string
  registrationDate: string
}

export function useCustomerAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<CustomerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const isLoggedIn = localStorage.getItem("customerLoggedIn")
      const currentUser = localStorage.getItem("currentCustomer")

      if (isLoggedIn && currentUser) {
        const user = JSON.parse(currentUser)
        setUserData(user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedData = localStorage.getItem("customerData")

        if (storedData) {
          const userData = JSON.parse(storedData)

          if (userData.email === email) {
            localStorage.setItem("customerLoggedIn", "true")
            localStorage.setItem("currentCustomer", JSON.stringify(userData))
            setUserData(userData)
            setIsAuthenticated(true)
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          resolve(false)
        }
      }, 1500)
    })
  }

  const register = (formData: any): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          ...formData,
          registrationDate: new Date().toISOString(),
        }

        localStorage.setItem("customerData", JSON.stringify(userData))
        localStorage.setItem("customerLoggedIn", "true")
        localStorage.setItem("currentCustomer", JSON.stringify(userData))

        setUserData(userData)
        setIsAuthenticated(true)
        resolve(true)
      }, 2000)
    })
  }

  const logout = () => {
    localStorage.removeItem("customerLoggedIn")
    localStorage.removeItem("currentCustomer")
    setUserData(null)
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    userData,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus,
  }
}
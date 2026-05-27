"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface CustomerAuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function CustomerAuthGuard({ children, redirectTo = "/customer/login" }: CustomerAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("customerLoggedIn")
      const currentUser = localStorage.getItem("currentCustomer")

      if (isLoggedIn && currentUser) {
        try {
          JSON.parse(currentUser) // Validate JSON
          setIsAuthenticated(true)
        } catch (error) {
          localStorage.removeItem("customerLoggedIn")
          localStorage.removeItem("currentCustomer")
          window.location.href = redirectTo
        }
      } else {
        window.location.href = redirectTo
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
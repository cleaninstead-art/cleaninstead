"use client"

import { useState, useEffect, useCallback } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/session")
      const data = await res.json()
      setUser(data.user || null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.success && data.user) {
      setUser(data.user)
      return { success: true, user: data.user }
    }
    return { success: false, error: data.error || "Login failed" }
  }

  const logout = async () => {
    await fetch("/api/session", { method: "POST" })
    setUser(null)
  }

  return { user, loading, login, logout, refresh }
}

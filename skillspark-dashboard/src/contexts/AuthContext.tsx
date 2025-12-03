'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  email: string
  role: 'student' | 'startup' | 'admin' | null
  is_verified: boolean
  full_name?: string
  company_name?: string
  college_name?: string
  course?: string
  year_of_study?: number
  created_at?: string
  updated_at?: string
}

interface AuthContextType {
  user: { id: string; email: string } | null
  profile: UserProfile | null
  session: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [])

  const signIn = async (_email: string, _password: string) => {
    return { error: null }
  }

  const signUp = async (_email: string, _password: string) => {
    return { error: null }
  }

  const signInWithGoogle = async () => {
    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    setSession(null)
    router.push('/auth')
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') }
    setProfile(prev => (prev ? { ...prev, ...updates } : prev))
    return { error: null }
  }

  useEffect(() => {
    if (user && profile && !loading) {
      const currentPath = window.location.pathname
      
      if (currentPath.startsWith('/auth') || currentPath.startsWith('/onboarding')) {
        return
      }

      if (profile.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else if (profile.role === 'student' && !currentPath.startsWith('/home')) {
        router.push('/home')
      } else if (profile.role === 'startup') {
        window.location.href = '/company/home'
      } else if (!profile.role) {
        router.push('/onboarding')
      }
    }
  }, [user, profile, loading, router])

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
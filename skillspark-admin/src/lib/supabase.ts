import { createClient } from '@supabase/supabase-js'

export type UserRole = 'admin' | 'student' | 'startup'

export interface Profile {
  id: string
  email?: string
  role?: UserRole
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
  // Add additional profile fields as needed
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid throwing during build; surface at runtime instead
  console.warn('Supabase env vars are not set. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)



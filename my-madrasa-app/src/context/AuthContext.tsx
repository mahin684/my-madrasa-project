import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import insforge from '@/lib/insforge'

interface AuthUser {
  id: string
  email: string
  profile?: {
    full_name: string
    role: string
    avatar_url?: string
    avatar_key?: string
    phone_number?: string
  }
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: string | null }>
  signInWithGoogle: () => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (data: { full_name?: string; phone_number?: string; avatar_url?: string; avatar_key?: string }) => Promise<{ error: string | null }>
  uploadAvatar: (file: File) => Promise<{ error: string | null }>
  sendPasswordResetEmail: (email: string) => Promise<{ error: string | null }>
  exchangeResetPasswordToken: (email: string, code: string) => Promise<{ data: { token: string } | null; error: string | null }>
  resetPassword: (newPassword: string, token: string) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const { data, error } = await insforge.auth.getCurrentUser()
      if (error || !data?.user) {
        setUser(null)
        setLoading(false)
        return
      }

      const sdkUser = data.user

      const { data: profiles } = await insforge.database
        .from('profiles')
        .select('*')
        .eq('id', sdkUser.id)
        .single()

      setUser({
        id: sdkUser.id,
        email: sdkUser.email || '',
        profile: profiles || undefined,
      })
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  async function signIn(email: string, password: string) {
    const { error } = await insforge.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    await loadUser()
    return { error: null }
  }

  async function signUp(email: string, password: string, fullName: string, phone?: string) {
    const { data, error } = await insforge.auth.signUp({ email, password })
    if (error) return { error: error.message }
    if (data?.user) {
      await insforge.database.from('profiles').insert([{
        id: data.user.id,
        full_name: fullName,
        phone_number: phone || null,
        role: 'user',
      }])
    }
    await loadUser()
    return { error: null }
  }

  async function signInWithGoogle() {
    const { error } = await insforge.auth.signInWithOAuth({
      provider: 'google',
      redirectTo: window.location.origin + '/auth',
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  async function updateProfile(updateData: { full_name?: string; phone_number?: string; avatar_url?: string; avatar_key?: string }) {
    if (!user) return { error: 'ব্যবহারকারী লগইন করা নেই।' }
    const { error } = await insforge.database
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)
    if (error) return { error: error.message }
    await loadUser()
    return { error: null }
  }

  async function uploadAvatar(file: File) {
    if (!user) return { error: 'ব্যবহারকারী লগইন করা নেই।' }

    if (user.profile?.avatar_key) {
      await insforge.storage.from('avatars').remove(user.profile.avatar_key)
    }

    const fileExt = file.name.split('.').pop()
    const key = `${user.id}/avatar-${Date.now()}.${fileExt}`

    const { data, error } = await insforge.storage
      .from('avatars')
      .upload(key, file)

    if (error || !data) return { error: error?.message || 'আপলোড ব্যর্থ হয়েছে।' }

    const result = await updateProfile({
      avatar_url: data.url,
      avatar_key: data.key,
    })

    return result
  }

  async function sendPasswordResetEmail(email: string) {
    const { error } = await insforge.auth.sendResetPasswordEmail({
      email,
      redirectTo: window.location.origin + '/auth',
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  async function exchangeResetPasswordToken(email: string, code: string) {
    const { data, error } = await insforge.auth.exchangeResetPasswordToken({
      email,
      code,
    })
    if (error) return { data: null, error: error.message }
    return { data: { token: data?.token || '' }, error: null }
  }

  async function resetPassword(newPassword: string, token: string) {
    const { error } = await insforge.auth.resetPassword({
      newPassword,
      otp: token,
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  async function signOut() {
    await insforge.auth.signOut()
    setUser(null)
  }

  async function refreshProfile() {
    await loadUser()
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      refreshProfile,
      updateProfile,
      uploadAvatar,
      sendPasswordResetEmail,
      exchangeResetPasswordToken,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

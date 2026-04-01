import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Calendar, BookOpen, Bell, Heart, LogOut, Pencil, Camera, X, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const roleColors: Record<string, string> = {
  admin: 'bg-red-50 text-red-600 border border-red-200',
  teacher: 'bg-primary-100 text-primary border border-primary-200',
  student: 'bg-green-50 text-green-600 border border-green-200',
  user: 'bg-gray-50 text-gray-600 border border-gray-200',
}

const quickActions = [
  { label: 'ফলাফল', icon: BookOpen, to: '/results', color: 'from-primary to-primary-600' },
  { label: 'নোটিশ', icon: Bell, to: '/notices', color: 'from-amber-500 to-orange-600' },
  { label: 'অনুদান', icon: Heart, to: '/donate', color: 'from-pink-500 to-rose-600' },
]

export default function Profile() {
  const { user, signOut, updateProfile, uploadAvatar } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) navigate('/auth')
  }, [user, navigate])

  useEffect(() => {
    if (user?.profile) {
      setEditName(user.profile.full_name || '')
      setEditPhone(user.profile.phone_number || '')
    }
  }, [user])

  if (!user) return null

  const fullName = user.profile?.full_name || 'ব্যবহারকারী'
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const role = user.profile?.role || 'user'
  const phone = user.profile?.phone_number || 'যোগ করা হয়নি'
  const avatarUrl = previewUrl || user.profile?.avatar_url

  function handleEditOpen() {
    setEditName(user?.profile?.full_name || '')
    setEditPhone(user?.profile?.phone_number || '')
    setError('')
    setSuccess('')
    setEditing(true)
  }

  function handleEditCancel() {
    setEditing(false)
    setError('')
    setPreviewUrl(null)
  }

  async function handleSave() {
    if (!editName.trim()) {
      setError('পূর্ণ নাম আবশ্যক।')
      return
    }
    setSaving(true)
    setError('')

    const { error: updateError } = await updateProfile({
      full_name: editName.trim(),
      phone_number: editPhone.trim() || undefined,
    })

    if (updateError) {
      setError(updateError)
      setSaving(false)
      return
    }

    setSaving(false)
    setEditing(false)
    setSuccess('প্রোফাইল সফলভাবে আপডেট হয়েছে!')
    setTimeout(() => setSuccess(''), 3000)
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('ছবির সাইজ ৫ MB এর বেশি হতে পারবে না।')
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setUploadingPhoto(true)
    setError('')

    const { error: uploadError } = await uploadAvatar(file)

    if (uploadError) {
      setError(uploadError)
      setPreviewUrl(null)
    } else {
      setSuccess('প্রোফাইল ছবি আপডেট হয়েছে!')
      setTimeout(() => setSuccess(''), 3000)
    }

    setUploadingPhoto(false)
  }

  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 shrink-0" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Madrasa Logo */}
        <div className="text-center mb-2">
          <img
            src="https://i.postimg.cc/DzzZbK29/245387823-104348102030811-1572487762600280077-n.jpg"
            alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা লোগো"
            className="w-16 h-16 mx-auto rounded-2xl shadow-card object-cover mb-2"
          />
          <p className="font-heading font-bold text-navy text-sm">মিজমিজি পাইনাদী ফাজিল (ডিগ্রী) মাদ্রাসা</p>
        </div>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative card overflow-hidden p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100" />
          <div className="relative z-10">
            {/* Avatar with upload */}
            <div className="relative mx-auto mb-4 w-24 h-24">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-soft" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white shadow-soft">
                  {initials}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-primary-50 transition-colors border border-gray-100"
              >
                {uploadingPhoto ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 text-primary" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </div>

            <h1 className="text-2xl font-heading font-bold text-navy">{fullName}</h1>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${roleColors[role] || roleColors.user}`}>
              {role === 'user' ? 'ব্যবহারকারী' : role}
            </span>
          </div>
        </motion.div>

        {/* Profile Info / Edit Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-navy">প্রোফাইল তথ্য</h2>
            {!editing && (
              <button onClick={handleEditOpen} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-600 transition-colors font-medium">
                <Pencil className="w-4 h-4" />
                সম্পাদনা
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">পূর্ণ নাম</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="input-field pl-12"
                      placeholder="আপনার পূর্ণ নাম"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">মোবাইল নাম্বার</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="input-field pl-12"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input-field pl-12 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> সেভ হচ্ছে...</> : 'সেভ করুন'}
                  </button>
                  <button onClick={handleEditCancel} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                    <X className="w-4 h-4" />
                    বাতিল
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">পূর্ণ নাম</p>
                    <p className="text-sm font-medium text-navy">{fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">মোবাইল</p>
                    <p className="text-sm font-medium text-navy">{phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ইমেইল</p>
                    <p className="text-sm font-medium text-navy">{user.email}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
          <h2 className="mb-4 text-lg font-heading font-semibold text-navy">দ্রুত অ্যাক্সেস</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to} className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-primary-200 hover:bg-primary-50">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-soft`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-primary">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button onClick={async () => { await signOut(); navigate('/auth') }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 transition-all hover:bg-red-100">
            <LogOut className="h-5 w-5" />
            লগআউট
          </button>
        </motion.div>
      </div>
    </div>
  )
}

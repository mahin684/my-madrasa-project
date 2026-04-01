import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type AuthTab = 'login' | 'signup'
type AuthView = 'form' | 'forgot' | 'reset-code'

export default function Auth() {
  const [searchParams] = useSearchParams()
  const defaultTab = (searchParams.get('tab') as AuthTab) || 'login'
  const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab)
  const [view, setView] = useState<AuthView>('form')

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Signup state
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  // Reset code state
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  // Common state
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp, sendPasswordResetEmail, signInWithGoogle, exchangeResetPasswordToken, resetPassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setActiveTab(defaultTab)
    setView('form')
    setError('')
  }, [defaultTab])

  function validateSignup(): string | null {
    if (!fullName.trim()) return 'পূর্ণ নাম আবশ্যক।'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) return 'একটি বৈধ ইমেইল ঠিকানা লিখুন।'
    if (signupPassword.length < 8) return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।'
    if (!/\d/.test(signupPassword)) return 'পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।'
    if (signupPassword !== confirmPassword) return 'পাসওয়ার্ড মিলছে না।'
    return null
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await signIn(loginEmail, loginPassword)

    if (signInError) {
      setError(signInError)
      setLoading(false)
      return
    }

    navigate('/')
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const validationError = validateSignup()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    const { error: signUpError } = await signUp(signupEmail, signupPassword, fullName, phone || undefined)

    if (signUpError) {
      setError(signUpError)
      setLoading(false)
      return
    }

    setLoading(false)
    navigate('/profile')
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setError('একটি বৈধ ইমেইল ঠিকানা লিখুন।')
      return
    }

    setLoading(true)
    const { error: resetError } = await sendPasswordResetEmail(forgotEmail)
    setLoading(false)

    if (resetError) {
      setError(resetError)
      return
    }

    setForgotSent(true)
  }

  async function handleResetCode(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!resetCode.trim()) {
      setError('ভেরিফিকেশন কোড লিখুন।')
      return
    }
    if (newPassword.length < 8) {
      setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।')
      return
    }
    if (!/\d/.test(newPassword)) {
      setError('পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।')
      return
    }

    setLoading(true)
    const { data: tokenData, error: tokenError } = await exchangeResetPasswordToken(forgotEmail, resetCode)

    if (tokenError || !tokenData?.token) {
      setError(tokenError || 'কোড সঠিক নয় বা মেয়াদ শেষ হয়ে গেছে।')
      setLoading(false)
      return
    }

    const { error: resetError } = await resetPassword(newPassword, tokenData.token)
    setLoading(false)

    if (resetError) {
      setError(resetError)
      return
    }

    setResetSuccess(true)
  }

  async function handleGoogleSignIn() {
    setError('')
    setLoading(true)
    const { error: oauthError } = await signInWithGoogle()
    if (oauthError) {
      setError(oauthError)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Madrasa Logo */}
        <div className="text-center mb-6">
          <img
            src="https://i.postimg.cc/DzzZbK29/245387823-104348102030811-1572487762600280077-n.jpg"
            alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা লোগো"
            className="w-20 h-20 mx-auto rounded-2xl shadow-card object-cover mb-3"
          />
          <h2 className="font-heading font-bold text-navy text-lg">মিজমিজি পাইনাদী ফাজিল</h2>
          <p className="text-xs text-gray-400">(ডিগ্রী) মাদ্রাসা</p>
        </div>

        <div className="card p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {/* Reset Code View */}
            {view === 'reset-code' && (
              <motion.div
                key="reset-code"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {resetSuccess ? (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                      পাসওয়ার্ড পরিবর্তন হয়েছে!
                    </h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      আপনার নতুন পাসওয়ার্ড সফলভাবে সেভ হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।
                    </p>
                    <button
                      onClick={() => {
                        setView('form')
                        setResetSuccess(false)
                        setForgotSent(false)
                        setForgotEmail('')
                        setResetCode('')
                        setNewPassword('')
                        setActiveTab('login')
                        setError('')
                      }}
                      className="btn-primary"
                    >
                      লগইন করুন
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => { setView('forgot'); setError('') }}
                      className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      পিছনে যান
                    </button>

                    <div className="text-center mb-8">
                      <h1 className="font-heading text-2xl font-bold text-navy mb-2">
                        ভেরিফিকেশন কোড লিখুন
                      </h1>
                      <p className="text-gray-500 text-sm">
                        আপনার ইমেইলে পাঠানো ৬ ডিজিটের কোড এবং নতুন পাসওয়ার্ড লিখুন।
                      </p>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleResetCode} className="space-y-5">
                      <div>
                        <label htmlFor="reset-code" className="block text-sm font-medium text-navy mb-2">
                          ভেরিফিকেশন কোড
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="reset-code"
                            type="text"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            placeholder="৬ ডিজিটের কোড লিখুন"
                            maxLength={6}
                            required
                            className="input-field pl-12 tracking-[0.5em] text-center text-lg font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-navy mb-2">
                          নতুন পাসওয়ার্ড
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর ও একটি সংখ্যা"
                            required
                            className="input-field pl-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <><span className="loading-spinner" /> পরিবর্তন হচ্ছে...</>
                        ) : (
                          'পাসওয়ার্ড পরিবর্তন করুন'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* Forgot Password View */}
            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {forgotSent ? (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                      আপনার ইমেইল চেক করুন
                    </h2>
                    <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                      আমরা একটি ভেরিফিকেশন কোড পাঠিয়েছি:
                    </p>
                    <div className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-3 mb-6">
                      <p className="text-navy font-semibold text-sm">{forgotEmail}</p>
                    </div>
                    <p className="text-gray-400 text-xs mb-6">
                      ইমেইলে না পেলে স্প্যাম ফোল্ডার চেক করুন।
                    </p>
                    <button
                      onClick={() => {
                        setView('reset-code')
                        setError('')
                      }}
                      className="btn-primary w-full mb-3"
                    >
                      কোড দিয়ে পাসওয়ার্ড পরিবর্তন করুন
                    </button>
                    <button
                      onClick={() => {
                        setView('form')
                        setForgotSent(false)
                        setForgotEmail('')
                        setError('')
                      }}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      লগইনে ফিরে যান
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => { setView('form'); setError('') }}
                      className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      পিছনে যান
                    </button>

                    <div className="text-center mb-8">
                      <h1 className="font-heading text-2xl font-bold text-navy mb-2">
                        পাসওয়ার্ড ভুলে গেছেন?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        আপনার ইমেইল দিন, আমরা ভেরিফিকেশন কোড পাঠিয়ে দেব।
                      </p>
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-5">
                      <div>
                        <label htmlFor="forgot-email" className="block text-sm font-medium text-navy mb-2">
                          ইমেইল ঠিকানা
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="forgot-email"
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="input-field pl-12"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <><span className="loading-spinner" /> পাঠানো হচ্ছে...</>
                        ) : (
                          'ভেরিফিকেশন কোড পাঠান'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* Main Form View */}
            {view === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Tab Toggle */}
                <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                  <button
                    onClick={() => { setActiveTab('login'); setError('') }}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeTab === 'login' ? 'bg-white text-primary shadow-soft' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    লগইন
                  </button>
                  <button
                    onClick={() => { setActiveTab('signup'); setError('') }}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeTab === 'signup' ? 'bg-white text-primary shadow-soft' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    রেজিস্ট্রেশন
                  </button>
                </div>

                <div className="text-center mb-8">
                  <h1 className="font-heading text-3xl font-bold text-navy mb-2">
                    {activeTab === 'login' ? 'স্বাগতম' : 'অ্যাকাউন্ট তৈরি করুন'}
                  </h1>
                  <p className="font-body text-gray-500">
                    {activeTab === 'login' ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'আমাদের মাদ্রাসা পরিবারে যোগ দিন'}
                  </p>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {/* Login Form */}
                  {activeTab === 'login' && (
                    <motion.form
                      key="login-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="space-y-5"
                    >
                      <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-navy mb-2">
                          ইমেইল ঠিকানা
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="login-email"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="input-field pl-12"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="login-password" className="block text-sm font-medium text-navy">
                            পাসওয়ার্ড
                          </label>
                          <button
                            type="button"
                            onClick={() => { setView('forgot'); setError('') }}
                            className="text-xs text-primary hover:underline font-medium"
                          >
                            পাসওয়ার্ড ভুলে গেছেন?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="login-password"
                            type={showLoginPassword ? 'text' : 'password'}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            required
                            className="input-field pl-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? <><span className="loading-spinner" /> লগইন হচ্ছে...</> : 'লগইন করুন'}
                      </button>
                    </motion.form>
                  )}

                  {/* Signup Form */}
                  {activeTab === 'signup' && (
                    <motion.form
                      key="signup-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSignup}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="signup-name" className="block text-sm font-medium text-navy mb-2">পূর্ণ নাম</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="signup-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="আপনার পূর্ণ নাম লিখুন" required className="input-field pl-12" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-navy mb-2">ইমেইল ঠিকানা</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" required className="input-field pl-12" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-phone" className="block text-sm font-medium text-navy mb-2">মোবাইল নাম্বার <span className="text-gray-400 font-normal">(ঐচ্ছিক)</span></label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="signup-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXX-XXXXXX" className="input-field pl-12" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-navy mb-2">পাসওয়ার্ড</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="signup-password" type={showSignupPassword ? 'text' : 'password'} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর ও একটি সংখ্যা" required className="input-field pl-12 pr-12" />
                          <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-navy mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="পুনরায় পাসওয়ার্ড লিখুন" required className="input-field pl-12 pr-12" />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                        {loading ? <><span className="loading-spinner" /> অ্যাকাউন্ট তৈরি হচ্ছে...</> : 'রেজিস্ট্রেশন করুন'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Social Auth Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                  <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400">অথবা এর মাধ্যমে চালিয়ে যান</span></div>
                </div>

                {/* Google Auth Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Google দিয়ে লগইন করুন</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

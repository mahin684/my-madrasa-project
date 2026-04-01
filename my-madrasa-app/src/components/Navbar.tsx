import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Download, User, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useDarkMode } from '@/context/DarkModeContext'

const navLinks = [
  { to: '/students', label: 'শিক্ষার্থী' },
  { to: '/teachers', label: 'শিক্ষক' },
  { to: '/results', label: 'ফলাফল' },
  { to: '/admission', label: 'ভর্তি' },
  { to: '/notices', label: 'নোটিশ' },
  { to: '/donate', label: 'অনুদান' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/results?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
      scrolled ? 'shadow-card' : 'border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== TOP ROW: Logo + Right Icons ===== */}
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="https://i.postimg.cc/DzzZbK29/245387823-104348102030811-1572487762600280077-n.jpg"
              alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা লোগো"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover shadow-soft group-hover:scale-110 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-navy text-sm lg:text-base leading-tight">
                মিজমিজি পাইনাদী ফাজিল
              </h1>
              <p className="text-xs text-gray-500">(ডিগ্রী) মাদ্রাসা</p>
            </div>
          </Link>

          {/* ===== DESKTOP: Search + Nav + Right Side ===== */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="শিক্ষার্থী, ফলাফল খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 pr-4 py-2 text-sm rounded-full bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </form>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-xl hover:bg-primary-50 transition-all">
                হোম
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-xl hover:bg-primary-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-primary-50 transition-colors text-gray-600"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* App Download */}
            <a href="/app.apk" download className="flex items-center gap-1.5 btn-accent text-sm py-2 px-4">
              <Download className="w-4 h-4" />
              <span>অ্যাপ ডাউনলোড</span>
            </a>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-primary-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-semibold text-sm">
                    {user.profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-navy text-sm">{user.profile?.full_name || 'ব্যবহারকারী'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-navy hover:bg-primary-50 transition-colors">
                        <User className="w-4 h-4" /> প্রোফাইল
                      </Link>
                      <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
                        <LogOut className="w-4 h-4" /> লগআউট
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-primary px-4 py-2 rounded-xl hover:bg-primary-50 transition-all">
                  লগইন
                </Link>
                <Link to="/auth?tab=signup" className="btn-primary text-sm py-2 px-5">
                  রেজিস্ট্রেশন
                </Link>
              </div>
            )}
          </div>

          {/* ===== MOBILE: Right Side Icons ===== */}
          <div className="flex lg:hidden items-center gap-1">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-primary-50 transition-colors text-gray-600"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* App Download Icon */}
            <a href="/app.apk" download className="p-2 rounded-xl hover:bg-primary-50 transition-colors text-primary">
              <Download className="w-5 h-5" />
            </a>

            {/* Login/Signup when not logged in */}
            {!user && (
              <>
                <Link to="/auth" className="text-xs font-medium text-gray-600 hover:text-primary px-2 py-1.5 rounded-lg hover:bg-primary-50 transition-all">
                  লগইন
                </Link>
                <Link to="/auth?tab=signup" className="text-xs font-medium text-white bg-primary px-2.5 py-1.5 rounded-lg hover:bg-primary-600 transition-all">
                  সাইনআপ
                </Link>
              </>
            )}

            {/* Profile when logged in */}
            {user && (
              <Link to="/profile" className="p-1.5 rounded-xl hover:bg-primary-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-xs">
                  {user.profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </div>
              </Link>
            )}

            {/* Hamburger Menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl hover:bg-primary-50 transition-colors">
              {mobileOpen ? <X className="w-5 h-5 text-navy" /> : <Menu className="w-5 h-5 text-navy" />}
            </button>
          </div>
        </div>

        {/* ===== MOBILE: Search Bar (always visible) ===== */}
        <form onSubmit={handleSearch} className="lg:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>
        </form>
      </div>

      {/* ===== MOBILE: Hamburger Menu (only nav links) ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

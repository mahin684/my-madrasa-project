import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const announcements = [
  '📢 ভর্তি চলছে! ২০২৬ শিক্ষাবর্ষের জন্য আবেদন করুন।',
  '🎉 আমাদের মাদ্রাসার নতুন ওয়েবসাইট চালু হয়েছে!',
  '📚 পরীক্ষার ফলাফল প্রকাশিত হয়েছে। দেখুন ফলাফল পেজে।',
]

export default function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!visible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [visible])

  if (!visible) return null

  return (
    <div className="bg-primary text-white text-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-10 relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center truncate px-8"
            >
              {announcements[currentIndex]}
            </motion.p>
          </AnimatePresence>

          <button
            onClick={() => setVisible(false)}
            className="absolute right-0 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

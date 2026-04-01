import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ChevronDown, ChevronUp, Bell } from 'lucide-react'

interface Notice {
  id: number
  title: string
  date: string
  preview: string
  content: string
  urgent: boolean
}

const notices: Notice[] = [
  { id: 1, title: '২০২৬ শিক্ষাবর্ষে ভর্তি চলছে', date: '২৫ মার্চ, ২০২৬', preview: 'নার্সারি থেকে ফাজিল পর্যন্ত সকল ক্লাসের জন্য ভর্তি ফর্ম পাওয়া যাচ্ছে।', content: 'আমরা ২০২৬ শিক্ষাবর্ষের জন্য ভর্তি উন্মুক্ত করতে পেরে আনন্দিত। সকাল ৯টা থেকে বিকাল ৪টা পর্যন্ত অফিস থেকে ফর্ম সংগ্রহ করা যাবে। প্রয়োজনীয় কাগজপত্র: জন্ম সনদ, পূর্ববর্তী মার্কশিট এবং ছবি। আবেদনের শেষ তারিখ ৩০ এপ্রিল, ২০২৬।', urgent: true },
  { id: 2, title: 'বার্ষিক পরীক্ষার রুটিন প্রকাশিত', date: '২০ মার্চ, ২০২৬', preview: 'সকল ক্লাসের বার্ষিক পরীক্ষার রুটিন চূড়ান্ত হয়েছে।', content: '২০২৫-২০২৬ শিক্ষাবর্ষের বার্ষিক পরীক্ষা ১ মে, ২০২৬ থেকে শুরু হবে। শিক্ষার্থীদের ২৫ এপ্রিলের আগে ক্লাস শিক্ষকের কাছ থেকে প্রবেশপত্র সংগ্রহ করতে হবে।', urgent: true },
  { id: 3, title: 'অভিভাবক-শিক্ষক সভা নির্ধারিত', date: '১৮ মার্চ, ২০২৬', preview: 'এপ্রিল মাসের প্রথম শনিবারে মাসিক অভিভাবক-শিক্ষক সভা অনুষ্ঠিত হবে।', content: '৫ এপ্রিল, ২০২৬ (শনিবার) সকাল ১০টা থেকে দুপুর ১টা পর্যন্ত অভিভাবক-শিক্ষক সভা অনুষ্ঠিত হবে। অভিভাবকদের অনুরোধ করা হচ্ছে উপস্থিত থেকে সন্তানের একাডেমিক অগ্রগতি নিয়ে আলোচনা করতে।', urgent: false },
  { id: 4, title: 'কুরআন প্রতিযোগিতার ফলাফল', date: '১৫ মার্চ, ২০২৬', preview: 'আন্তঃশ্রেণি কুরআন তিলাওয়াত প্রতিযোগিতার ফলাফল ঘোষিত হয়েছে।', content: '১০ মার্চ, ২০২৬ তারিখে অনুষ্ঠিত কুরআন তিলাওয়াত প্রতিযোগিতার ফলাফল: প্রথম স্থান - মো. রহিম (ক্লাস ৮), দ্বিতীয় স্থান - ফাতেমা বেগম (ক্লাস ৭), তৃতীয় স্থান - আব্দুল্লাহ খান (ক্লাস ৯)।', urgent: false },
  { id: 5, title: 'ঈদুল ফিতরে ছুটির নোটিশ', date: '১২ মার্চ, ২০২৬', preview: 'ঈদুল ফিতর উপলক্ষে মাদ্রাসা বন্ধ থাকবে।', content: 'ঈদুল ফিতর উপলক্ষে ৩০ মার্চ থেকে ৭ এপ্রিল পর্যন্ত মাদ্রাসা বন্ধ থাকবে। ৮ এপ্রিল (বুধবার) থেকে ক্লাস পুনরায় শুরু হবে। সকলকে ঈদ মোবারক!', urgent: false },
  { id: 6, title: 'লাইব্রেরির বই ফেরত দেওয়ার অনুরোধ', date: '১০ মার্চ, ২০২৬', preview: 'বার্ষিক পরীক্ষার আগে সকল ধার করা বই ফেরত দিতে হবে।', content: 'যে শিক্ষার্থীরা মাদ্রাসার লাইব্রেরি থেকে বই ধার করেছেন, অনুগ্রহ করে ১৫ এপ্রিলের মধ্যে সব বই ফেরত দিন।', urgent: false },
  { id: 7, title: 'বেতন পরিশোধের সময়সীমা বর্ধিত', date: '৮ মার্চ, ২০২৬', preview: 'মাসিক বেতন পরিশোধের সময়সীমা ২৫ মার্চ পর্যন্ত বর্ধিত করা হয়েছে।', content: 'জনপ্রিয় চাহিদার কারণে, বেতন পরিশোধের সময়সীমা ১৫ মার্চ থেকে ২৫ মার্চ, ২০২৬ পর্যন্ত বর্ধিত করা হয়েছে।', urgent: true },
  { id: 8, title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা', date: '৫ মার্চ, ২০২৬', preview: 'মার্চ মাসের শেষ শুক্রবারে বার্ষিক ক্রীড়া দিবস অনুষ্ঠিত হবে।', content: 'মিজমিজি পাইনাদী ফাজিল মাদ্রাসার বার্ষিক ক্রীড়া দিবস ২৮ মার্চ, ২০২৬ (শুক্রবার) সকাল ৮টা থেকে দুপুর ২টা পর্যন্ত অনুষ্ঠিত হবে।', urgent: false },
]

export default function Notices() {
  const [filter, setFilter] = useState<'all' | 'urgent'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredNotices = filter === 'urgent' ? notices.filter((n) => n.urgent) : notices

  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 flex items-center justify-center">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h1 className="section-header text-center">নোটিশ ও ঘোষণা</h1>
            <div className="divider mb-4" />
            <p className="section-subheader text-center">
              আমাদের মাদ্রাসার সর্বশেষ সংবাদ, ইভেন্ট এবং গুরুত্বপূর্ণ ঘোষণা সম্পর্কে আপডেট থাকুন।
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <button onClick={() => setFilter('all')} className={`px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300 ${filter === 'all' ? 'bg-primary text-white shadow-soft' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-primary-50'}`}>
              সকল নোটিশ
            </button>
            <button onClick={() => setFilter('urgent')} className={`px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${filter === 'urgent' ? 'bg-red-500 text-white shadow-soft' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-red-50'}`}>
              <AlertTriangle className="w-4 h-4" />
              জরুরি
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredNotices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`card rounded-2xl overflow-hidden ${notice.urgent ? 'border-l-4 border-l-red-500' : ''}`}
                >
                  <button onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)} className="w-full text-left p-6 flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-heading text-lg font-bold text-navy">{notice.title}</h3>
                        {notice.urgent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-heading font-semibold rounded-full border border-red-200">
                            <AlertTriangle className="w-3 h-3" />
                            জরুরি
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{notice.date}</p>
                      <p className="text-gray-600">{notice.preview}</p>
                    </div>
                    {expandedId === notice.id ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />}
                  </button>
                  <AnimatePresence>
                    {expandedId === notice.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">{notice.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredNotices.length === 0 && (
            <div className="text-center py-16">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-lg">এই মুহূর্তে কোনো জরুরি নোটিশ নেই।</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

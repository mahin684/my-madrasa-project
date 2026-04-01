import { motion } from 'framer-motion'
import { Shield, Eye, Database, Lock, Cookie, Mail } from 'lucide-react'

const sections = [
  {
    icon: Eye,
    title: 'তথ্য সংগ্রহ',
    content: 'আমরা আপনার নাম, ইমেইল, মোবাইল নাম্বার এবং অন্যান্য প্রয়োজনীয় তথ্য সংগ্রহ করি। এই তথ্যগুলো শুধুমাত্র মাদ্রাসার সেবা প্রদানের জন্য ব্যবহৃত হয়।',
  },
  {
    icon: Database,
    title: 'তথ্য ব্যবহার',
    content: 'আপনার ব্যক্তিগত তথ্য শুধুমাত্র নিম্নলিখিত কাজে ব্যবহৃত হয়:\n\n• অ্যাকাউন্ট তৈরি ও ব্যবস্থাপনা\n• ফলাফল প্রদর্শন\n• নোটিশ ও ঘোষণা প্রেরণ\n• ভর্তি প্রক্রিয়া সম্পন্ন করা\n• সেবার মান উন্নয়ন',
  },
  {
    icon: Lock,
    title: 'তথ্য সুরক্ষা',
    content: 'আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে আমরা আধুনিক এনক্রিপশন প্রযুক্তি ব্যবহার করি। আপনার পাসওয়ার্ড হ্যাশ করে সংরক্ষণ করা হয় এবং তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।',
  },
  {
    icon: Cookie,
    title: 'কুকিজ',
    content: 'আমাদের ওয়েবসাইট আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করে। আপনি আপনার ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।',
  },
  {
    icon: Mail,
    title: 'যোগাযোগ',
    content: 'গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:\n\nইমেইল: privacy@mizmizi.edu.bd\nফোন: +880 1XXX-XXXXXX',
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="section-header text-center">গোপনীয়তা নীতি</h1>
            <div className="divider mb-4" />
            <p className="section-subheader text-center">
              মিজমিজি পাইনাদী ফাজিল (ডিগ্রী) মাদ্রাসা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ।
            </p>
            <p className="text-sm text-gray-400 mt-2">সর্বশেষ আপডেট: ৩০ মার্চ, ২০২৬</p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-navy mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 card p-6 bg-primary-50 border-primary-100 text-center"
          >
            <p className="text-sm text-gray-600">
              এই গোপনীয়তা নীতি যেকোনো সময় পরিবর্তন হতে পারে। পরিবর্তনগুলো এই পেজে প্রকাশ করা হবে।
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

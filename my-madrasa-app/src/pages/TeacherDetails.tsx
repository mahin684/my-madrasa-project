import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Send, User, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Teacher {
  id: string
  name: string
  position: string
  qualification: string
  bio: string
  avatar: string
  avg_rating: number
  ai_sentiment_score: number
}

interface Comment {
  id: number
  user_name: string
  content: string
  date: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

const mockTeachers: Record<string, Teacher> = {
  '1': { id: '1', name: 'মাওলানা আব্দুল হামিদ', position: 'অধ্যক্ষ', qualification: 'ফাযীলাত (মাদরাসা আলিয়া, ঢাকা)', bio: 'মাওলানা আব্দুল হামিদ ৩০ বছরের বেশি সময় ধরে ইসলামী শিক্ষায় অবদান রাখছেন। তাঁর নেতৃত্বে মাদ্রাসা অনেক উচ্চতায় পৌঁছেছে। তিনি তাফসীর ও হাদিসে গভীর জ্ঞানের অধিকারী।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AH&backgroundColor=f59e0b', avg_rating: 5.0, ai_sentiment_score: 0.98 },
  '2': { id: '2', name: 'মাওলানা মুহাম্মদ আব্দুল্লাহ', position: 'উপাধ্যক্ষ', qualification: 'ফাযীলাত (আল-আজহার, কায়রো)', bio: 'মাওলানা আব্দুল্লাহ কুরআন তিলাওয়াত ও তাজবীদে বিশেষজ্ঞ। ২০ বছরের অভিজ্ঞতা নিয়ে হাজার হাজার শিক্ষার্থীকে সঠিক তিলাওয়াত শিখিয়েছেন।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MA&backgroundColor=2563eb', avg_rating: 5.0, ai_sentiment_score: 0.95 },
  '3': { id: '3', name: 'মাওলানা নূর মুহাম্মদ', position: 'সিনিয়র শিক্ষক', qualification: 'ফাযীলাত (দারুল উলুম দেওবন্দ)', bio: 'মাওলানা নূর মুহাম্মদ হাদিস শরীফে গভীর জ্ঞানের অধিকারী। তাঁর ক্লাস পণ্ডিত অন্তর্দৃষ্টি এবং ব্যবহারিক প্রয়োগের জন্য বিখ্যাত।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NM&backgroundColor=4f46e5', avg_rating: 5.0, ai_sentiment_score: 0.93 },
  '4': { id: '4', name: 'মুফতি আব্দুর রহমান', position: 'সিনিয়র শিক্ষক', qualification: 'ফাযীলাত (জামিয়া ইসলামিয়া দারুল উলুম)', bio: 'মুফতি আব্দুর রহমান ফিকহ ও উসূলে ফিকহে বিশেষজ্ঞ। তিনি মাদ্রাসার ফিকহ বিভাগের প্রধান শিক্ষক এবং ফতোয়া কমিটির সদস্য।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AR&backgroundColor=7c3aed', avg_rating: 5.0, ai_sentiment_score: 0.96 },
  '5': { id: '5', name: 'উস্তাদ ইউসুফ আলী', position: 'সিনিয়র শিক্ষক', qualification: 'তাকমীল (আল-আজহার বিশ্ববিদ্যালয়)', bio: 'উস্তাদ ইউসুফ আলী আরবি সাহিত্য ও ভাষা শিক্ষায় দক্ষ। তাঁর শিক্ষাদান পদ্ধতি একাধিক মাদ্রাসায় গৃহীত হয়েছে।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=YA&backgroundColor=0d9488', avg_rating: 5.0, ai_sentiment_score: 0.94 },
  '6': { id: '6', name: 'মাওলানা হারুন অর রশিদ', position: 'শিক্ষক', qualification: 'ফাযীলাত (মাদরাসা আলিয়া)', bio: 'মাওলানা হারুন আরবি ব্যাকরণে বিশেষজ্ঞ। নাহু ও সরফ শেখানোতে তিনি অত্যন্ত দক্ষ এবং শিক্ষার্থীদের কাছে জনপ্রিয়।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HR&backgroundColor=e11d48', avg_rating: 4.5, ai_sentiment_score: 0.89 },
  '7': { id: '7', name: 'মুফতি সাইফুল ইসলাম', position: 'শিক্ষক', qualification: 'ফাযীলাত (জামিয়া রাহমানিয়া)', bio: 'মুফতি সাইফুল ইসলাম ফিকহ ও মাসায়েলে দক্ষ। দৈনন্দিন জীবনের ইসলামী বিধান শেখানোতে তিনি বিশেষভাবে পারদর্শী।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SI&backgroundColor=0ea5e9', avg_rating: 4.5, ai_sentiment_score: 0.87 },
  '8': { id: '8', name: 'মাওলানা আবু বকর সিদ্দিক', position: 'শিক্ষক', qualification: 'তাকমীল (আল-আজহার বিশ্ববিদ্যালয়)', bio: 'মাওলানা আবু বকর তাফসীর শিক্ষায় অভিজ্ঞ। কুরআনের অর্থ ও ব্যাখ্যা সহজভাবে বুঝানোতে তিনি দক্ষ।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AB&backgroundColor=84cc16', avg_rating: 4.5, ai_sentiment_score: 0.91 },
  '9': { id: '9', name: 'উস্তাদ ওমর ফারুক', position: 'শিক্ষক', qualification: 'ফাযীলাত (ইসলামিক ইউনিভার্সিটি মদীনা)', bio: 'উস্তাদ ওমর ফারুক সীরাত ও ইসলামের ইতিহাস শেখানোতে বিশেষজ্ঞ। তাঁর ক্লাস আকর্ষণীয় ও তথ্যপূর্ণ।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=OF&backgroundColor=d946ef', avg_rating: 4.0, ai_sentiment_score: 0.86 },
  '10': { id: '10', name: 'মাওলানা হাসান মাহমুদ', position: 'শিক্ষক', qualification: 'তাকমীল (জামিয়া আরাবিয়া আশরাফুল উলুম)', bio: 'মাওলানা হাসান মাহমুদ নাহু ও সরফ শিক্ষায় দক্ষ। আরবি ভাষা শেখানোতে তাঁর অনন্য পদ্ধতি রয়েছে।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HM&backgroundColor=ef4444', avg_rating: 4.5, ai_sentiment_score: 0.88 },
  '11': { id: '11', name: 'মাওলানা কামাল উদ্দীন', position: 'শিক্ষক', qualification: 'ফাযীলাত (দারুল উলুম দেওবন্দ)', bio: 'মাওলানা কামাল উদ্দীন হাদিস ও মুস্তালাহুল হাদিসে গভীর জ্ঞানের অধিকারী। তাঁর শিক্ষাদান অত্যন্ত প্রশংসিত।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KU&backgroundColor=6366f1', avg_rating: 5.0, ai_sentiment_score: 0.95 },
  '12': { id: '12', name: 'উস্তাদ জুবায়ের আহমদ', position: 'শিক্ষক', qualification: 'তাকমীল (জামিয়া ইসলামিয়া দারুল উলুম)', bio: 'উস্তাদ জুবায়ের মানতিক ও ফালসাফা শিক্ষায় দক্ষ। যুক্তি ও দর্শন শাস্ত্রে তাঁর গভীর জ্ঞান রয়েছে।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZA&backgroundColor=f97316', avg_rating: 4.0, ai_sentiment_score: 0.84 },
  '13': { id: '13', name: 'মুফতি রফিকুল ইসলাম', position: 'শিক্ষক', qualification: 'ফাযীলাত (মাদরাসা আলিয়া, চট্টগ্রাম)', bio: 'মুফতি রফিকুল ইসলাম হিফজ বিভাগের প্রধান। তাঁর তত্ত্বাবধানে শতাধিক শিক্ষার্থী কুরআন হিফজ সম্পন্ন করেছে।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RI&backgroundColor=10b981', avg_rating: 5.0, ai_sentiment_score: 0.97 },
  '14': { id: '14', name: 'মাওলানা ইব্রাহিম খলিল', position: 'শিক্ষক', qualification: 'তাকমীল (আল-আজহার, কায়রো)', bio: 'মাওলানা ইব্রাহিম খলিল আরবি ভাষা ও সাহিত্যে বিশেষজ্ঞ। আল-আজহার থেকে তাকমীল সম্পন্ন করে দেশে ফিরে শিক্ষাদান করছেন।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IK&backgroundColor=0ea5e9', avg_rating: 4.5, ai_sentiment_score: 0.90 },
  '15': { id: '15', name: 'উস্তাদ ফারহান আহমদ', position: 'সহকারী শিক্ষক', qualification: 'আলিম (মাদরাসা আলিয়া)', bio: 'উস্তাদ ফারহান ইংরেজি ও গণিত শিক্ষায় দক্ষ। আধুনিক শিক্ষা পদ্ধতি ও ইসলামী শিক্ষার সমন্বয়ে তিনি অনন্য।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FA&backgroundColor=8b5cf6', avg_rating: 4.0, ai_sentiment_score: 0.85 },
  '16': { id: '16', name: 'মাওলানা তারিক মাসুদ', position: 'সহকারী শিক্ষক', qualification: 'ফাযীলাত (জামিয়া রাহমানিয়া, ঢাকা)', bio: 'মাওলানা তারিক মাসুদ বাংলা ও সাধারণ জ্ঞান শিক্ষায় অভিজ্ঞ। শিক্ষার্থীদের প্রতি তাঁর যত্নশীল মনোভাব অনেক প্রশংসিত।', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TM&backgroundColor=ec4899', avg_rating: 4.0, ai_sentiment_score: 0.83 },
}

const mockComments: Record<string, Comment[]> = {
  '1': [
    { id: 1, user_name: 'আহমেদ হাসান', content: 'অধ্যক্ষ মহোদয় অত্যন্ত যোগ্য ও দয়ালু। তাঁর নেতৃত্বে মাদ্রাসা অনেক এগিয়েছে।', date: '2026-03-15', sentiment: 'positive' },
    { id: 2, user_name: 'সারা বেগম', content: 'তাফসীর ক্লাস অসাধারণ। কুরআনের অর্থ সহজভাবে বুঝতে পারি।', date: '2026-03-10', sentiment: 'positive' },
    { id: 3, user_name: 'ওমর ফারুক', content: 'মাদ্রাসার সবচেয়ে ভালো অধ্যক্ষ। আল্লাহ তাঁকে দীর্ঘায়ু দিন।', date: '2026-02-28', sentiment: 'positive' },
  ],
  '2': [
    { id: 1, user_name: 'ইব্রাহিম সাঈদ', content: 'তাজবীদ শেখানোতে তিনি সেরা। আল-আজহারের ছাত্র হিসেবে তাঁর জ্ঞান অসাধারণ।', date: '2026-03-18', sentiment: 'positive' },
    { id: 2, user_name: 'মরিয়ম নূর', content: 'তাঁর ক্লাসে অংশগ্রহণ করে আমার তিলাওয়াত অনেক উন্নত হয়েছে।', date: '2026-03-12', sentiment: 'positive' },
  ],
  '3': [
    { id: 1, user_name: 'আলী রিজভী', content: 'হাদিস শরীফে তাঁর গভীর জ্ঞান আমাকে মুগ্ধ করে। দারুল উলুমের ঐতিহ্য ধরে রেখেছেন।', date: '2026-03-20', sentiment: 'positive' },
    { id: 2, user_name: 'আয়েশা বেগম', content: 'তাঁর হাদিস ক্লাস অত্যন্ত তথ্যপূর্ণ এবং আকর্ষণীয়।', date: '2026-03-08', sentiment: 'positive' },
  ],
  '4': [
    { id: 1, user_name: 'রহিম উদ্দিন', content: 'ফিকহ শেখানোতে মুফতি সাহেব সেরা। দৈনন্দিন মাসায়েল সহজভাবে বুঝান।', date: '2026-03-15', sentiment: 'positive' },
    { id: 2, user_name: 'করিম হোসেন', content: 'তাঁর ফতোয়া কমিটির কাজ প্রশংসনীয়।', date: '2026-03-01', sentiment: 'positive' },
  ],
  '5': [
    { id: 1, user_name: 'নাসির আহমেদ', content: 'আরবি সাহিত্য শেখানোতে উস্তাদ ইউসুফ অতুলনীয়। আল-আজহারের শিক্ষার মান দেখা যায়।', date: '2026-03-18', sentiment: 'positive' },
  ],
  '6': [
    { id: 1, user_name: 'তানভীর হোসেন', content: 'আরবি ব্যাকরণ সহজভাবে শেখানোতে মাওলানা হারুন দক্ষ।', date: '2026-03-15', sentiment: 'positive' },
  ],
  '7': [
    { id: 1, user_name: 'শাহজাহান আলী', content: 'ফিকহ ও মাসায়েল শেখানোতে মুফতি সাইফুল সাহেব অসাধারণ।', date: '2026-03-12', sentiment: 'positive' },
  ],
  '8': [
    { id: 1, user_name: 'জাহাঙ্গীর আলম', content: 'তাফসীর ক্লাস খুব উপকারী। কুরআনের গভীর অর্থ বুঝতে পারি।', date: '2026-03-10', sentiment: 'positive' },
  ],
  '9': [
    { id: 1, user_name: 'রাশেদ খান', content: 'সীরাত ক্লাস আকর্ষণীয়। রাসূল (সা.)-এর জীবন সম্পর্কে অনেক কিছু শিখলাম।', date: '2026-03-15', sentiment: 'positive' },
  ],
  '10': [
    { id: 1, user_name: 'সাবিত রহমান', content: 'নাহু ও সরফ শেখানোতে মাওলানা হাসান সেরা। আরবি ব্যাকরণ এখন সহজ লাগে।', date: '2026-03-12', sentiment: 'positive' },
  ],
  '11': [
    { id: 1, user_name: 'আমিনুল ইসলাম', content: 'হাদিস শরীফে মাওলানা কামাল উদ্দীনের জ্ঞান অসাধারণ। তাঁর ক্লাস থেকে অনেক শিখছি।', date: '2026-03-18', sentiment: 'positive' },
  ],
  '12': [
    { id: 1, user_name: 'মাসুদ রানা', content: 'মানতিক ও ফালসাফা শেখানোতে উস্তাদ জুবায়ের দক্ষ। যুক্তিবিদ্যা সহজ হয়েছে।', date: '2026-03-10', sentiment: 'positive' },
  ],
  '13': [
    { id: 1, user_name: 'আবদুল্লাহ খান', content: 'হিফজ বিভাগে মুফতি রফিকুল সাহেবের তত্ত্বাবধান চমৎকার। আমার সন্তান হিফজ সম্পন্ন করেছে।', date: '2026-03-20', sentiment: 'positive' },
  ],
  '14': [
    { id: 1, user_name: 'সাদমান সাকিব', content: 'আরবি সাহিত্য শেখানোতে মাওলানা ইব্রাহিম অসাধারণ। আল-আজহারের মান দেখা যায়।', date: '2026-03-15', sentiment: 'positive' },
  ],
  '15': [
    { id: 1, user_name: 'নাঈম হাসান', content: 'ইংরেজি ও গণিত শেখানোতে উস্তাদ ফারহান ভালো। আধুনিক শিক্ষার সাথে ইসলামী শিক্ষার সমন্বয় দারুণ।', date: '2026-03-12', sentiment: 'positive' },
  ],
  '16': [
    { id: 1, user_name: 'রিয়াদ হোসেন', content: 'বাংলা শেখানোতে মাওলানা তারিক ভালো। শিক্ষার্থীদের প্রতি তাঁর যত্নশীল মনোভাব প্রশংসনীয়।', date: '2026-03-10', sentiment: 'positive' },
  ],
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

function SentimentIcon({ sentiment }: { sentiment: string }) {
  if (sentiment === 'positive') return <ThumbsUp className="w-4 h-4 text-green-500" />
  if (sentiment === 'negative') return <ThumbsDown className="w-4 h-4 text-red-500" />
  return <div className="w-4 h-4 rounded-full bg-gray-300" />
}

export default function TeacherDetails() {
  const { id } = useParams<{ id: string }>()
  const teacher = mockTeachers[id || '1'] || mockTeachers['1']
  const [comments, setComments] = useState<Comment[]>(mockComments[id || '1'] || mockComments['1'])
  const [newComment, setNewComment] = useState('')
  const [userName, setUserName] = useState('')

  const handleSubmitComment = () => {
    if (!newComment.trim() || !userName.trim()) return
    setComments([{ id: comments.length + 1, user_name: userName, content: newComment, date: new Date().toISOString().split('T')[0], sentiment: 'neutral' }, ...comments])
    setNewComment('')
    setUserName('')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/teachers" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>শিক্ষক তালিকায় ফিরে যান</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="card overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-accent" />
              <div className="px-6 pb-6 -mt-16">
                <img src={teacher.avatar} alt={teacher.name} className="w-32 h-32 rounded-full border-4 border-white shadow-card bg-white" />
                <h1 className="mt-4 text-2xl font-bold text-navy">{teacher.name}</h1>
                <p className="mt-1 text-primary font-medium">{teacher.position}</p>
                <p className="mt-2 text-sm text-gray-500">যোগ্যতা: {teacher.qualification}</p>
                <div className="mt-4 flex items-center gap-3">
                  <StarRating rating={teacher.avg_rating} />
                  <span className="text-lg font-semibold text-navy">{teacher.avg_rating}</span>
                  <span className="text-sm text-gray-500">({comments.length} রিভিউ)</span>
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{teacher.bio}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="card p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">AI মনোভাব স্কোর</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">শিক্ষার্থী সন্তুষ্টি</span>
                  <span className="text-sm font-bold text-primary">{Math.round(teacher.ai_sentiment_score * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${teacher.ai_sentiment_score * 100}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-primary" />
                </div>
                <p className="text-xs text-gray-400">{comments.length} টি শিক্ষার্থীর মন্তব্যের বিশ্লেষণের উপর ভিত্তি করে</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">মন্তব্য করুন</h2>
              <div className="space-y-4">
                <input type="text" placeholder="আপনার নাম" value={userName} onChange={(e) => setUserName(e.target.value)} className="input-field" />
                <textarea placeholder="এই শিক্ষক সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..." value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={4} className="input-field resize-none" />
                <button onClick={handleSubmitComment} disabled={!newComment.trim() || !userName.trim()} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" />
                  মন্তব্জ জমা দিন
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-lg font-semibold text-navy mb-4">মন্তব্য ({comments.length})</h2>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.05 }} className="card p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy">{comment.user_name}</p>
                          <p className="text-xs text-gray-400">{comment.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
                        <SentimentIcon sentiment={comment.sentiment} />
                        <span className="text-xs text-gray-500">{comment.sentiment === 'positive' ? 'ইতিবাচক' : comment.sentiment === 'negative' ? 'নেতিবাচক' : 'নিরপেক্ষ'}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

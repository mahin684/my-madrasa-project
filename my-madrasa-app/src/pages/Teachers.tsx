import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, GraduationCap, Award, ChevronRight } from 'lucide-react'

interface Teacher {
  id: number
  name: string
  position: string
  positionRank: number
  qualification: string
  subject: string
  rating: number
  initials: string
  gradient: string
}

const teachers: Teacher[] = [
  { id: 1, name: 'মাওলানা আব্দুল হামিদ', position: 'অধ্যক্ষ', positionRank: 1, qualification: 'ফাযীলাত (মাদরাসা আলিয়া, ঢাকা)', subject: 'তাফসীর ও হাদিস', rating: 5, initials: 'আহ', gradient: 'from-amber-500 to-orange-600' },
  { id: 2, name: 'মাওলানা মুহাম্মদ আব্দুল্লাহ', position: 'উপাধ্যক্ষ', positionRank: 2, qualification: 'ফাযীলাত (আল-আজহার, কায়রো)', subject: 'কুরআন তিলাওয়াত ও তাজবীদ', rating: 5, initials: 'আ', gradient: 'from-primary to-primary-600' },
  { id: 3, name: 'মাওলানা নূর মুহাম্মদ', position: 'সিনিয়র শিক্ষক', positionRank: 3, qualification: 'ফাযীলাত (দারুল উলুম দেওবন্দ)', subject: 'হাদিস শরীফ', rating: 5, initials: 'ন', gradient: 'from-blue-500 to-indigo-600' },
  { id: 4, name: 'মুফতি আব্দুর রহমান', position: 'সিনিয়র শিক্ষক', positionRank: 3, qualification: 'ফাযীলাত (জামিয়া ইসলামিয়া দারুল উলুম)', subject: 'ফিকহ ও উসূলে ফিকহ', rating: 5, initials: 'আর', gradient: 'from-purple-500 to-violet-600' },
  { id: 5, name: 'উস্তাদ ইউসুফ আলী', position: 'সিনিয়র শিক্ষক', positionRank: 3, qualification: 'তাকমীল (আল-আজহার বিশ্ববিদ্যালয়)', subject: 'আরবি সাহিত্য', rating: 5, initials: 'ই', gradient: 'from-teal-500 to-cyan-600' },
  { id: 6, name: 'মাওলানা হারুন অর রশিদ', position: 'শিক্ষক', positionRank: 4, qualification: 'ফাযীলাত (মাদরাসা আলিয়া)', subject: 'আরবি ব্যাকরণ', rating: 4, initials: 'হ', gradient: 'from-rose-500 to-pink-600' },
  { id: 7, name: 'মুফতি সাইফুল ইসলাম', position: 'শিক্ষক', positionRank: 4, qualification: 'ফাযীলাত (জামিয়া রাহমানিয়া)', subject: 'ফিকহ ও মাসায়েল', rating: 4, initials: 'স', gradient: 'from-cyan-500 to-sky-600' },
  { id: 8, name: 'মাওলানা আবু বকর সিদ্দিক', position: 'শিক্ষক', positionRank: 4, qualification: 'তাকমীল (আল-আজহার বিশ্ববিদ্যালয়)', subject: 'তাফসীর', rating: 4, initials: 'আব', gradient: 'from-lime-500 to-green-600' },
  { id: 9, name: 'উস্তাদ ওমর ফারুক', position: 'শিক্ষক', positionRank: 4, qualification: 'ফাযীলাত (ইসলামিক ইউনিভার্সিটি মদীনা)', subject: 'সীরাত ও ইসলামের ইতিহাস', rating: 4, initials: 'ও', gradient: 'from-fuchsia-500 to-pink-600' },
  { id: 10, name: 'মাওলানা হাসান মাহমুদ', position: 'শিক্ষক', positionRank: 4, qualification: 'তাকমীল (জামিয়া আরাবিয়া আশরাফুল উলুম)', subject: 'নাহু ও সরফ', rating: 4, initials: 'হা', gradient: 'from-red-500 to-rose-600' },
  { id: 11, name: 'মাওলানা কামাল উদ্দীন', position: 'শিক্ষক', positionRank: 4, qualification: 'ফাযীলাত (দারুল উলুম দেওবন্দ)', subject: 'হাদিস ও মুস্তালাহুল হাদিস', rating: 5, initials: 'ক', gradient: 'from-indigo-500 to-blue-600' },
  { id: 12, name: 'উস্তাদ জুবায়ের আহমদ', position: 'শিক্ষক', positionRank: 4, qualification: 'তাকমীল (জামিয়া ইসলামিয়া দারুল উলুম)', subject: 'মানতিক ও ফালসাফা', rating: 4, initials: 'জ', gradient: 'from-orange-500 to-amber-600' },
  { id: 13, name: 'মুফতি রফিকুল ইসলাম', position: 'শিক্ষক', positionRank: 4, qualification: 'ফাযীলাত (মাদরাসা আলিয়া, চট্টগ্রাম)', subject: 'কুরআন হিফজ', rating: 5, initials: 'র', gradient: 'from-emerald-500 to-green-600' },
  { id: 14, name: 'মাওলানা ইব্রাহিম খলিল', position: 'শিক্ষক', positionRank: 4, qualification: 'তাকমীল (আল-আজহার, কায়রো)', subject: 'আরবি ভাষা ও সাহিত্য', rating: 4, initials: 'ইব', gradient: 'from-sky-500 to-blue-600' },
  { id: 15, name: 'উস্তাদ ফারহান আহমদ', position: 'সহকারী শিক্ষক', positionRank: 5, qualification: 'আলিম (মাদরাসা আলিয়া)', subject: 'ইংরেজি ও গণিত', rating: 4, initials: 'ফ', gradient: 'from-violet-500 to-purple-600' },
  { id: 16, name: 'মাওলানা তারিক মাসুদ', position: 'সহকারী শিক্ষক', positionRank: 5, qualification: 'ফাযীলাত (জামিয়া রাহমানিয়া, ঢাকা)', subject: 'বাংলা ও সাধারণ জ্ঞান', rating: 4, initials: 'ত', gradient: 'from-pink-500 to-rose-600' },
]

const sortedTeachers = [...teachers].sort((a, b) => a.positionRank - b.positionRank)

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

export default function Teachers() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="section-header text-center">আমাদের শিক্ষকমণ্ডলী</h1>
          <div className="divider mb-4" />
          <p className="section-subheader text-center">
            ইসলামী শিক্ষায় অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী যারা আপনাদের সন্তানের
            ভবিষ্যৎ গড়তে প্রতিশ্রুতিবদ্ধ
          </p>
          <p className="text-sm text-gray-400 mt-2">মোট শিক্ষক: {teachers.length} জন</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedTeachers.map((teacher) => (
            <motion.div key={teacher.id} variants={item}>
              <Link
                to={`/teachers/${teacher.id}`}
                className="block card-hover rounded-2xl p-6 group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${teacher.gradient} flex items-center justify-center text-white text-xl font-bold shadow-soft mb-4`}>
                    {teacher.initials}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    {teacher.positionRank <= 2 ? (
                      <Award className={`w-5 h-5 ${teacher.positionRank === 1 ? 'text-amber-500' : 'text-gray-400'}`} />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-primary" />
                    )}
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {teacher.position}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy mt-1">{teacher.name}</h3>

                  <p className="text-xs text-gray-400 mt-1">{teacher.subject}</p>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    <span className="font-medium text-gray-600">যোগ্যতা:</span> {teacher.qualification}
                  </p>

                  <div className="mt-3">
                    <StarRating rating={teacher.rating} />
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>বিস্তারিত দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

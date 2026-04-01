import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Download, FileText, Award, TrendingUp } from 'lucide-react'

interface SubjectMark {
  subject: string
  marks: number
  totalMarks: number
}

interface StudentResult {
  id: number
  name: string
  roll: string
  className: string
  subjects: SubjectMark[]
  gpa: number
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  status: 'Pass' | 'Fail'
}

const classes = ['ক্লাস ১', 'ক্লাস ২', 'ক্লাস ৩', 'ক্লাস ৪', 'ক্লাস ৫', 'ক্লাস ৬', 'ক্লাস ৭', 'ক্লাস ৮', 'ক্লাস ৯', 'ক্লাস ১০', 'আলিম', 'ফাজিল']

const subjectSets: Record<string, string[]> = {
  'ক্লাস ১': ['কুরআন', 'আরবি', 'বাংলা', 'ইংরেজি', 'গণিত'],
  'ক্লাস ২': ['কুরআন', 'আরবি', 'বাংলা', 'ইংরেজি', 'গণিত'],
  'ক্লাস ৩': ['কুরআন', 'আরবি ব্যাকরণ', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
  'ক্লাস ৪': ['কুরআন', 'আরবি ব্যাকরণ', 'হাদিস', 'বাংলা', 'ইংরেজি', 'গণিত'],
  'ক্লাস ৫': ['কুরআন', 'আরবি ব্যাকরণ', 'হাদিস', 'ফিকহ', 'বাংলা', 'ইংরেজি', 'গণিত'],
  'ক্লাস ৬': ['কুরআন', 'আরবি ব্যাকরণ', 'হাদিস', 'ফিকহ', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
  'ক্লাস ৭': ['কুরআন', 'আরবি সাহিত্য', 'হাদিস', 'ফিকহ', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
  'ক্লাস ৮': ['কুরআন', 'আরবি সাহিত্য', 'হাদিস', 'ফিকহ ও উসূল', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
  'ক্লাস ৯': ['তাফসীর', 'হাদিস অধ্যয়ন', 'ফিকহ ও উসূল', 'আরবি সাহিত্য', 'বাংলা', 'ইংরেজি', 'গণিত', 'পদার্থবিজ্ঞান'],
  'ক্লাস ১০': ['তাফসীর', 'হাদিস অধ্যয়ন', 'ফিকহ ও উসূল', 'আরবি সাহিত্য', 'বাংলা', 'ইংরেজি', 'গণিত', 'রসায়ন'],
  'আলিম': ['তাফসীর', 'হাদিস অধ্যয়ন', 'ফিকহ ও উসূল', 'আরবি সাহিত্য', 'গণিত', 'পদার্থবিজ্ঞান'],
  'ফাজিল': ['তাফসীর', 'হাদিস', 'ইসলামী আইন', 'আরবি সাহিত্য', 'দর্শন', 'রাষ্ট্রবিজ্ঞান'],
}

const gradeLabels: Record<string, string> = {
  'A+': 'অসাধারণ',
  A: 'অত্যন্ত ভালো',
  B: 'ভালো',
  C: 'মোটামুটি',
  D: 'গড়',
  F: 'অকৃতকার্য',
}

const gradeColors: Record<string, string> = {
  'A+': '#22C55E',
  A: '#2563EB',
  B: '#F59E0B',
  C: '#8B5CF6',
  D: '#EF4444',
  F: '#DC2626',
}

const gradeBgColors: Record<string, string> = {
  'A+': 'bg-green-50 text-green-700 border border-green-200',
  A: 'bg-primary-50 text-primary border border-primary-200',
  B: 'bg-amber-50 text-amber-700 border border-amber-200',
  C: 'bg-purple-50 text-purple-700 border border-purple-200',
  D: 'bg-red-50 text-red-600 border border-red-200',
  F: 'bg-red-100 text-red-700 border border-red-300',
}

const bengaliNames = [
  'রহিম উদ্দিন', 'করিম হোসেন', 'ফাতেমা বেগম', 'হাসান মাহমুদ', 'সুমাইয়া আক্তার',
  'আবদুল কাদের', 'মরিয়ম খাতুন', 'সাইফুল ইসলাম', 'নুসরাত জাহান', 'মাসুদ রানা',
  'রূপা খাতুন', 'জুবায়ের আহমেদ', 'সাবিনা ইয়াসমিন', 'আরিফ হোসেন', 'তাহমিনা রহমান',
  'ফাহিম আহমেদ', 'নাসরিন আক্তার', 'রফিকুল ইসলাম', 'শারমিন সুলতানা', 'ইমরান হোসেন',
]

function generateResults(): StudentResult[] {
  const results: StudentResult[] = []
  let id = 1
  let nameIdx = 0

  for (const cls of classes) {
    const subjects = subjectSets[cls]
    const studentCount = cls.startsWith('ক্লাস') ? 5 : 4

    for (let idx = 0; idx < studentCount; idx++) {
      const name = bengaliNames[nameIdx % bengaliNames.length]
      nameIdx++

      const subjectMarks: SubjectMark[] = subjects.map((subject) => {
        const marks = Math.floor(Math.random() * 41) + 60
        return { subject, marks, totalMarks: 100 }
      })

      const totalObtained = subjectMarks.reduce((sum, s) => sum + s.marks, 0)
      const totalPossible = subjectMarks.reduce((sum, s) => sum + s.totalMarks, 0)
      const percentage = (totalObtained / totalPossible) * 100

      let grade: StudentResult['grade']
      let gpa: number
      let status: StudentResult['status']

      if (percentage >= 90) {
        grade = 'A+'; gpa = 5.0; status = 'Pass'
      } else if (percentage >= 80) {
        grade = 'A'; gpa = 4.0; status = 'Pass'
      } else if (percentage >= 70) {
        grade = 'B'; gpa = 3.5; status = 'Pass'
      } else if (percentage >= 60) {
        grade = 'C'; gpa = 3.0; status = 'Pass'
      } else if (percentage >= 50) {
        grade = 'D'; gpa = 2.0; status = 'Pass'
      } else {
        grade = 'F'; gpa = 0.0; status = 'Fail'
      }

      results.push({
        id: id++,
        name,
        roll: String(idx + 1).padStart(3, '0'),
        className: cls,
        subjects: subjectMarks,
        gpa,
        grade,
        status,
      })
    }
  }

  return results
}

const mockResults = generateResults()

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
}

export default function Results() {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedRoll, setSelectedRoll] = useState<string>('')
  const [searched, setSearched] = useState(false)

  const availableRolls = useMemo(() => {
    if (!selectedClass) return []
    return mockResults
      .filter((r) => r.className === selectedClass)
      .map((r) => r.roll)
  }, [selectedClass])

  const filteredResults = useMemo(() => {
    if (!searched) return mockResults
    if (!selectedClass) return mockResults

    return mockResults.filter((r) => {
      const matchesClass = r.className === selectedClass
      if (!selectedRoll) return matchesClass
      return matchesClass && r.roll === selectedRoll
    })
  }, [selectedClass, selectedRoll, searched])

  const handleSearch = () => {
    setSearched(true)
  }

  const handleReset = () => {
    setSelectedClass('')
    setSelectedRoll('')
    setSearched(false)
  }

  const handleDownloadPDF = (studentName: string) => {
    console.log(`Downloading PDF for ${studentName}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Filter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-6 md:p-8 rounded-2xl mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary-100">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">পরীক্ষার ফলাফল</h1>
                <p className="text-gray-500 text-sm">শিক্ষার্থীদের পরীক্ষার ফলাফল খুঁজুন ও দেখুন</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">ক্লাস নির্বাচন করুন</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value)
                    setSelectedRoll('')
                  }}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="">ক্লাস নির্বাচন করুন</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <AnimatePresence>
                {selectedClass && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-navy mb-2">রোল নির্বাচন করুন</label>
                    <select
                      value={selectedRoll}
                      onChange={(e) => setSelectedRoll(e.target.value)}
                      disabled={!selectedClass}
                      className="input-field appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">সকল রোল</option>
                      {availableRolls.map((roll) => (
                        <option key={roll} value={roll}>রোল {roll}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 inline-flex items-center justify-center gap-2 btn-primary py-3"
                >
                  <Search className="w-4 h-4" />
                  খুঁজুন
                </button>
                {searched && (
                  <button
                    onClick={handleReset}
                    className="btn-secondary py-3"
                  >
                    রিসেট
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {!searched && (
              <motion.div
                key="all-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-navy">প্রকাশিত ফলাফল</h2>
                  <span className="text-xs bg-primary-100 text-primary px-2.5 py-1 rounded-full font-medium">
                    {mockResults.length} টি ফলাফল
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockResults.slice(0, 12).map((result, i) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      index={i}
                      onDownload={handleDownloadPDF}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {searched && (
              <motion.div
                key="filtered-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-navy">
                    {selectedRoll ? 'শিক্ষার্থীর ফলাফল' : `${selectedClass} এর ফলাফল`}
                  </h2>
                  <span className="text-xs bg-primary-100 text-primary px-2.5 py-1 rounded-full font-medium">
                    {filteredResults.length} টি ফলাফল পাওয়া গেছে
                  </span>
                </div>

                {filteredResults.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card p-12 rounded-2xl text-center"
                  >
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg font-medium">কোনো ফলাফল পাওয়া যায়নি</p>
                    <p className="text-gray-400 text-sm mt-1">অনুগ্রহ করে অনুসন্ধান পরিবর্তন করুন</p>
                  </motion.div>
                ) : (
                  <div className={`grid gap-4 ${filteredResults.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {filteredResults.map((result, i) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        index={i}
                        onDownload={handleDownloadPDF}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

function ResultCard({
  result,
  index,
  onDownload,
}: {
  result: StudentResult
  index: number
  onDownload: (name: string) => void
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="card rounded-2xl overflow-hidden hover:border-primary-200 transition-all duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-soft">
              {getInitials(result.name)}
            </div>
            <div>
              <h3 className="text-navy font-semibold">{result.name}</h3>
              <p className="text-gray-500 text-sm">
                রোল: {result.roll} &middot; {result.className}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${gradeBgColors[result.grade]}`}>
              {gradeLabels[result.grade]}
            </span>
            <p className="text-xs text-gray-400 mt-1">{result.grade}</p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {result.subjects.map((subject) => {
            const percentage = (subject.marks / subject.totalMarks) * 100
            return (
              <div key={subject.subject}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{subject.subject}</span>
                  <span className="text-gray-500 font-medium">
                    {subject.marks}/{subject.totalMarks}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: gradeColors[result.grade] }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">মোট</p>
              <p className="text-navy font-bold text-sm">
                {result.subjects.reduce((sum, s) => sum + s.marks, 0)}/
                {result.subjects.reduce((sum, s) => sum + s.totalMarks, 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">জিপিএ</p>
              <p className="text-navy font-bold text-sm">{result.gpa.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">অবস্থা</p>
              <p className={`font-bold text-sm ${result.status === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                {result.status === 'Pass' ? 'উত্তীর্ণ' : 'অকৃতকার্য'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onDownload(result.name)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary text-sm font-medium rounded-xl transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            পিডিএফ
          </button>
        </div>
      </div>
    </motion.div>
  )
}

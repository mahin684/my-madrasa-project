import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Filter, Search } from 'lucide-react'

interface Student {
  id: number
  name: string
  roll: string
  className: string
}

const classes = ['ক্লাস ১', 'ক্লাস ২', 'ক্লাস ৩', 'ক্লাস ৪', 'ক্লাস ৫', 'ক্লাস ৬', 'ক্লাস ৭', 'ক্লাস ৮', 'ক্লাস ৯', 'ক্লাস ১০', 'আলিম', 'ফাজিল']

const mockStudents: Student[] = [
  { id: 1, name: 'রহিম উদ্দিন', roll: '001', className: 'ক্লাস ১' },
  { id: 2, name: 'করিম হোসেন', roll: '002', className: 'ক্লাস ১' },
  { id: 3, name: 'ফাতেমা বেগম', roll: '003', className: 'ক্লাস ২' },
  { id: 4, name: 'হাসান মাহমুদ', roll: '004', className: 'ক্লাস ২' },
  { id: 5, name: 'সুমাইয়া আক্তার', roll: '005', className: 'ক্লাস ৩' },
  { id: 6, name: 'আবদুল কাদের', roll: '006', className: 'ক্লাস ৩' },
  { id: 7, name: 'মরিয়ম খাতুন', roll: '007', className: 'ক্লাস ৪' },
  { id: 8, name: 'সাইফুল ইসলাম', roll: '008', className: 'ক্লাস ৫' },
  { id: 9, name: 'নুসরাত জাহান', roll: '009', className: 'ক্লাস ৬' },
  { id: 10, name: 'মাসুদ রানা', roll: '010', className: 'ক্লাস ৭' },
  { id: 11, name: 'রূপা খাতুন', roll: '011', className: 'ক্লাস ৮' },
  { id: 12, name: 'জুবায়ের আহমেদ', roll: '012', className: 'ক্লাস ৯' },
  { id: 13, name: 'সাবিনা ইয়াসমিন', roll: '013', className: 'ক্লাস ১০' },
  { id: 14, name: 'আরিফ হোসেন', roll: '014', className: 'আলিম' },
  { id: 15, name: 'তাহমিনা রহমান', roll: '015', className: 'ফাজিল' },
  { id: 16, name: 'ফাহিম আহমেদ', roll: '016', className: 'ক্লাস ৫' },
  { id: 17, name: 'নাসরিন আক্তার', roll: '017', className: 'আলিম' },
  { id: 18, name: 'রফিকুল ইসলাম', roll: '018', className: 'ফাজিল' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getClassCount(className: string) {
  return mockStudents.filter((s) => s.className === className).length
}

const classColors: Record<string, string> = {
  'ক্লাস ১': 'from-blue-400 to-blue-600',
  'ক্লাস ২': 'from-sky-400 to-sky-600',
  'ক্লাস ৩': 'from-cyan-400 to-cyan-600',
  'ক্লাস ৪': 'from-teal-400 to-teal-600',
  'ক্লাস ৫': 'from-emerald-400 to-emerald-600',
  'ক্লাস ৬': 'from-green-400 to-green-600',
  'ক্লাস ৭': 'from-lime-400 to-lime-600',
  'ক্লাস ৮': 'from-amber-400 to-amber-600',
  'ক্লাস ৯': 'from-orange-400 to-orange-600',
  'ক্লাস ১০': 'from-red-400 to-red-600',
  'আলিম': 'from-purple-400 to-purple-600',
  'ফাজিল': 'from-indigo-400 to-indigo-600',
}

export default function Students() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = mockStudents.filter((student) => {
    const matchesClass = selectedClass ? student.className === selectedClass : true
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesClass && matchesSearch
  })

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

  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="md:w-64 shrink-0"
            >
              <div className="card p-4 md:p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-navy">ক্লাসসমূহ</h2>
                </div>

                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                  <button
                    onClick={() => setSelectedClass(null)}
                    className={`shrink-0 md:w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedClass === null
                        ? 'bg-primary-100 text-primary border border-primary-200'
                        : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span>সকল ক্লাস</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {mockStudents.length}
                      </span>
                    </span>
                  </button>

                  {classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`shrink-0 md:w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedClass === cls
                          ? 'bg-primary-100 text-primary border border-primary-200'
                          : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span>{cls}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {getClassCount(cls)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="card p-6 rounded-2xl mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary-100">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-navy">
                        {selectedClass ? selectedClass : 'সকল শিক্ষার্থী'}
                      </h1>
                      <p className="text-gray-500 text-sm">
                        মোট {filteredStudents.length} জন শিক্ষার্থী ভর্তি আছে
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="শিক্ষার্থী খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10 text-sm w-full sm:w-64"
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!selectedClass && !searchTerm && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                      {classes.map((cls, i) => (
                        <motion.button
                          key={cls}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => setSelectedClass(cls)}
                          className="card-hover p-4 rounded-2xl text-left group"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${classColors[cls]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                          >
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-sm font-semibold text-navy mb-1">{cls}</h3>
                          <p className="text-gray-500 text-xs">
                            {getClassCount(cls)} জন
                          </p>
                        </motion.button>
                      ))}
                    </div>

                    <div className="card p-6 rounded-2xl">
                      <h2 className="text-lg font-bold text-navy mb-4">সাম্প্রতিক শিক্ষার্থী</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockStudents.slice(0, 6).map((student, i) => (
                          <motion.div
                            key={student.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="card-flat p-4 rounded-xl flex items-center gap-3"
                          >
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${classColors[student.className]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                            >
                              {getInitials(student.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-navy text-sm font-medium truncate">
                                {student.name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                রোল: {student.roll} &middot; {student.className}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {(selectedClass || searchTerm) && (
                  <motion.div
                    key="students"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    <AnimatePresence>
                      {filteredStudents.map((student, i) => (
                        <motion.div
                          key={student.id}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="card-hover p-5 rounded-2xl flex flex-col items-center text-center group"
                        >
                          <div
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${classColors[student.className]} flex items-center justify-center text-white text-lg font-bold mb-3 group-hover:scale-110 transition-transform shadow-soft`}
                          >
                            {getInitials(student.name)}
                          </div>
                          <h3 className="text-navy font-semibold mb-1">{student.name}</h3>
                          <p className="text-gray-500 text-sm mb-3">রোল: {student.roll}</p>
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${classColors[student.className]} text-white`}
                          >
                            {student.className}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {filteredStudents.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full card p-12 rounded-2xl text-center"
                      >
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">কোনো শিক্ষার্থী পাওয়া যায়নি</p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

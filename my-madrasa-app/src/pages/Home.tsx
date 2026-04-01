import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen, Bell, Download, ArrowRight } from 'lucide-react'

const stats = [
  { icon: Users, label: 'মোট শিক্ষার্থী', value: '১,২০০+' },
  { icon: GraduationCap, label: 'মোট শিক্ষক', value: '১৬+' },
  { icon: BookOpen, label: 'মোট ক্লাস', value: '৩০+' },
  { icon: Bell, label: 'সক্রিয় নোটিশ', value: '১২' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 section-padding text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-heading text-lg md:text-xl mb-4"
          >
            আমাদের প্রতিষ্ঠানে স্বাগতম
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6"
          >
            মিজমিজি পাইনাদী ফাজিল{' '}
            <span className="text-primary">(ডিগ্রী) মাদ্রাসা</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-body text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ইসলামী জ্ঞান ও আধুনিক শিক্ষার সমন্বয়ে উজ্জ্বল ভবিষ্যতের জন্য
            শিক্ষার্থীদের মেধা বিকাশ করা।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/students"
              className="group inline-flex items-center gap-2 btn-primary text-lg"
            >
              শিক্ষার্থী দেখুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/admission"
              className="group inline-flex items-center gap-2 btn-secondary text-lg"
            >
              ভর্তি চলছে
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="section-header text-center">
              আমাদের সম্প্রদায় এক নজরে
            </h2>
            <div className="divider mb-4" />
            <p className="section-subheader text-center">
              প্রতিষ্ঠার পর থেকে মানসম্মত ইসলামী ও আধুনিক শিক্ষা প্রদান করে আসছি।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-hover p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 mb-5">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-heading text-3xl font-bold text-navy mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="section-padding overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100">
                <img
                  src="https://i.postimg.cc/g04d1S3W/245387823-104348102030811-1572487762600280077-n.jpg"
                  alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা লোগো"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight mb-6">
                মিজমিজি পাইনাদী{' '}
                <span className="text-primary">ফাজিল মাদ্রাসা</span>
              </h2>
              <p className="font-body text-gray-500 text-lg mb-8 max-w-lg leading-relaxed">
                ইসলামী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে শিক্ষার্থীদের উজ্জ্বল ভবিষ্যতের জন্য প্রস্তুত করা। আমরা কুরআন, হাদীস, ফিকহ এবং আধুনিক বিজ্ঞান ও প্রযুক্তি শিক্ষা প্রদান করি।
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/admission"
                  className="group inline-flex items-center gap-3 btn-primary"
                >
                  ভর্তি আবেদন করুন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, FileText } from 'lucide-react'

const documents = [
  'জন্ম সনদ (মূল + ফটোকপি)',
  'পূর্ববর্তী স্কুলের মার্কশিট',
  'পাসপোর্ট সাইজের ছবি (৪ কপি)',
  'ট্রান্সফার সার্টিফিকেট (প্রযোজ্য হলে)',
  'অভিভাবকের জাতীয় পরিচয়পত্রের কপি',
  'চরিত্র সনদ',
  'স্বাস্থ্য সনদ',
]

const feeStructure = [
  { cls: 'নার্সারি – কেজি', admission: '৳ ২,০০০', monthly: '৳ ৮০০' },
  { cls: 'ক্লাস ১ – ৫', admission: '৳ ৩,০০০', monthly: '৳ ১,০০০' },
  { cls: 'ক্লাস ৬ – ৮', admission: '৳ ৪,০০০', monthly: '৳ ১,২০০' },
  { cls: 'ক্লাস ৯ – ১০', admission: '৳ ৫,০০০', monthly: '৳ ১,৫০০' },
  { cls: 'আলিম (১১–১২)', admission: '৳ ৬,০০০', monthly: '৳ ১,৮০০' },
  { cls: 'ফাজিল (ডিগ্রী)', admission: '৳ ৭,০০০', monthly: '৳ ২,০০০' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

export default function Admission() {
  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="section-header text-center">ভর্তি তথ্য</h1>
            <div className="divider mb-4" />
            <p className="section-subheader text-center">ইসলামী জ্ঞান ও আধুনিক শিক্ষার যাত্রা শুরু করুন। ভর্তির জন্য নিচের ধাপগুলো অনুসরণ করুন।</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-navy">প্রয়োজনীয় কাগজপত্র</h2>
              </div>
              <ul className="space-y-3">
                {documents.map((doc, i) => (
                  <motion.li key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    {doc}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <span className="text-primary font-heading font-bold text-lg">৳</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-navy">ফি কাঠামো</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-navy font-semibold">ক্লাস</th>
                      <th className="py-3 px-4 text-navy font-semibold">ভর্তি ফি</th>
                      <th className="py-3 px-4 text-navy font-semibold">মাসিক ফি</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((row, i) => (
                      <motion.tr key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="border-b border-gray-100 hover:bg-primary-50 transition-colors">
                        <td className="py-3 px-4 text-gray-700">{row.cls}</td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{row.admission}</td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{row.monthly}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 md:p-12 bg-primary-50 border-primary-100">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-8 text-center">যোগাযোগের তথ্য</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white shadow-soft flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-navy font-semibold mb-1">ফোন</p>
                <p className="text-gray-600">+880 1XXX-XXXXXX</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white shadow-soft flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-navy font-semibold mb-1">ইমেইল</p>
                <p className="text-gray-600">admission@madrasa.edu</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white shadow-soft flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-navy font-semibold mb-1">ঠিকানা</p>
                <p className="text-gray-600">মিজমিজি পাইনাদী, জেলা, বাংলাদেশ</p>
              </div>
            </div>
            <div className="text-center">
              <a href="tel:+8801XXXXXXXXX" className="inline-flex items-center gap-3 btn-primary">
                <Phone className="w-5 h-5" />
                এখনই কল করুন
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

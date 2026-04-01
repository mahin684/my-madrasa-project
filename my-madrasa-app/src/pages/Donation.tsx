import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle } from 'lucide-react'

const presetAmounts = [100, 500, 1000, 5000]

export default function Donation() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedAmount = amount === -1 ? Number(customAmount) : amount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !selectedAmount) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center section-padding">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center max-w-md w-full">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="font-heading text-2xl font-bold text-navy mb-3">জাযাকাল্লাহু খাইরান!</h2>
          <p className="text-gray-600 mb-2">আপনার দান <span className="font-semibold text-green-600">৳{selectedAmount}</span> সফলভাবে গৃহীত হয়েছে।</p>
          <p className="text-gray-400 text-sm mb-6">আল্লাহ আপনাকে প্রচুর প্রতিদান দিন।</p>
          <button onClick={() => { setSuccess(false); setName(''); setPhone(''); setAmount(null); setCustomAmount(''); setDescription('') }} className="btn-primary">আবার অনুদান করুন</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="section-header text-center">আমাদের মাদ্রাসাকে সহায়তা করুন</h1>
            <div className="divider mb-4" />
            <p className="section-subheader text-center">আপনার সদকা ও অনুদান শত শত শিক্ষার্থীকে মানসম্মত ইসলামী শিক্ষা প্রদানে সাহায্য করে।</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-navy">অনুদান ফর্ম</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">নাম</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার পূর্ণ নাম লিখুন" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">মোবাইল নাম্বার</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="০১XXXXXXXXX" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">টাকার পরিমাণ (৳)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {presetAmounts.map((val) => (
                    <button key={val} type="button" onClick={() => { setAmount(val); setCustomAmount('') }} className={`py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-300 ${amount === val ? 'bg-primary text-white shadow-soft' : 'bg-gray-50 border border-gray-200 text-navy hover:border-primary-300'}`}>
                      ৳{val.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setAmount(-1) }} placeholder="কাস্টম পরিমাণ লিখুন" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">বিবরণ (ঐচ্ছিক)</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="যেমন: শিক্ষার্থী বৃত্তি তহবিলের জন্য" rows={3} className="input-field resize-none" />
              </div>
            </div>

            <button type="submit" disabled={loading || !name || !phone || !selectedAmount} className="w-full mt-8 py-4 btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (<><span className="loading-spinner" /> পেমেন্ট প্রক্রিয়াধীন...</>) : (<><Heart className="w-5 h-5" /> এখনই অনুদান করুন</>)}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}

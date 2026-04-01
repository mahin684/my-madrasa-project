import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Youtube, Instagram, Facebook, Music, ExternalLink, Pencil, Trash2, X, MapPin } from 'lucide-react'
import { useState } from 'react'

const DEVELOPER = {
  name: 'Mynul Islam Mahin',
  class: '৯ | ২০২৬',
  profilePic: 'https://i.postimg.cc/2SkjPfBq/855181bc9392d30bbc3f3777d2718569-tplv-tiktokx-cropcenter-1080-1080.jpg',
  links: [
    { platform: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@Mynix-AE', color: 'bg-red-500 hover:bg-red-600' },
    { platform: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/maynul.islam.mahin.2024', color: 'bg-blue-600 hover:bg-blue-700' },
    { platform: 'TikTok', icon: Music, url: 'https://www.tiktok.com/@mynixedit', color: 'bg-gray-800 hover:bg-gray-900' },
  ],
}

export default function Footer() {
  const [visible, setVisible] = useState(true)

  if (!visible) return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-t border-white/10 pt-6 text-center text-sm text-primary-300">
          &copy; {new Date().getFullYear()} মিজমিজি পাইনাদী ফাজিল (ডিগ্রী) মাদ্রাসা। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  )

  return (
    <footer className="bg-navy text-white">
      {/* Developer Section */}
      <div className="bg-gradient-to-r from-primary-700 via-navy to-primary-700 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="relative">
                <img
                  src={DEVELOPER.profilePic}
                  alt={DEVELOPER.name}
                  className="w-28 h-28 rounded-full border-4 border-white/20 shadow-elevated object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-navy">
                  AE
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-xs uppercase tracking-widest text-primary-300 mb-1">ডেভেলপার</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                {DEVELOPER.name}
              </h3>
              <p className="text-primary-300 text-sm mb-4">
                ক্লাস: {DEVELOPER.class} | ভিডিও এডিটর & ওয়েব ডেভেলপার
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {DEVELOPER.links.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                    {social.platform}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 md:static md:self-start w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-colors group"
              title="সেকশন সরান"
            >
              <X className="w-4 h-4 text-white/60 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl">
                ম
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">মিজমিজি পাইনাদী ফাজিল</h3>
                <p className="text-sm text-primary-300">(ডিগ্রী) মাদ্রাসা</p>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed">
              ইসলামী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে মানসম্মত শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ একটি আধুনিক শিক্ষা প্রতিষ্ঠান।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              {[
                { to: '/students', label: 'Students' },
                { to: '/teachers', label: 'Teachers' },
                { to: '/results', label: 'Results' },
                { to: '/admission', label: 'Admission' },
                { to: '/notices', label: 'Notices' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">অবস্থান</h4>
            <ul className="space-y-2 text-sm text-primary-300 mb-4">
              <li>জেলা: নারায়ণগঞ্জ</li>
              <li>উপজেলা/থানা: সিদ্ধিরগঞ্জ</li>
              <li>শহর/এলাকা: মিজমিজি</li>
            </ul>
            <a
              href="https://www.google.com/maps/place/Mizmizi+painadi+fazil+madrasah/@23.6864268,90.5061265,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b7191a31ce1f:0xb2f1e79a0d3023a!8m2!3d23.6864219!4d90.5087014!16s%2Fg%2F11h4p9gxx_?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-white text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Google Maps এ দেখুন
            </a>
          </div>



          {/* Madrasa Image */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">মাদ্রাসা পরিচিতি</h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-3">
              <img
                src="https://i.postimg.cc/WpdkH0cB/6183501190021188988.jpg"
                alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা"
                className="w-full h-32 object-cover"
              />
            </div>

          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-primary-300">
          <img
            src="https://i.postimg.cc/DzzZbK29/245387823-104348102030811-1572487762600280077-n.jpg"
            alt="মিজমিজি পাইনাদী ফাজিল মাদ্রাসা লোগো"
            className="w-12 h-12 mx-auto rounded-xl object-cover mb-3 border border-white/20"
          />
          <p>&copy; {new Date().getFullYear()} মিজমিজি পাইনাদী ফাজিল (ডিগ্রী) মাদ্রাসা। সর্বস্বত্ব সংরক্ষিত।</p>
          <Link to="/privacy-policy" className="hover:text-white transition-colors underline mt-1 inline-block">
            গোপনীয়তা নীতি
          </Link>
        </div>
      </div>
    </footer>
  )
}

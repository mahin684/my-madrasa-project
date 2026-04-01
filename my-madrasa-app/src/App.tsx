import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Students from '@/pages/Students'
import Teachers from '@/pages/Teachers'
import TeacherDetails from '@/pages/TeacherDetails'
import Results from '@/pages/Results'
import Admission from '@/pages/Admission'
import Notices from '@/pages/Notices'
import Donation from '@/pages/Donation'
import Auth from '@/pages/Auth'
import Profile from '@/pages/Profile'
import PrivacyPolicy from '@/pages/PrivacyPolicy'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="teachers/:id" element={<TeacherDetails />} />
        <Route path="results" element={<Results />} />
        <Route path="admission" element={<Admission />} />
        <Route path="notices" element={<Notices />} />
        <Route path="donate" element={<Donation />} />
        <Route path="auth" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  )
}

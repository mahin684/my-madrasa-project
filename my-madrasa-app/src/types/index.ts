export interface Profile {
  id: string
  role: 'admin' | 'teacher' | 'student' | 'user'
  full_name: string
  phone_number?: string
  avatar_url?: string
  created_at: string
}

export interface Class {
  id: string
  name: string
  name_bn?: string
  display_order: number
  created_at: string
}

export interface Student {
  id: string
  profile_id: string
  class_id: string
  roll_number: string
  admission_date?: string
  profile?: Profile
  class?: Class
  created_at: string
}

export interface Teacher {
  id: string
  profile_id: string
  name: string
  position: string
  qualification?: string
  bio?: string
  image_url?: string
  position_order: number
  avg_rating: number
  total_comments: number
  created_at: string
}

export interface Comment {
  id: string
  teacher_id: string
  user_id: string
  content: string
  sentiment_score: number
  user_name?: string
  created_at: string
}

export interface Result {
  id: string
  student_id: string
  class_id: string
  exam_name: string
  total_marks: number
  gpa: number
  grade: string
  pass: boolean
  published: boolean
  student?: Student
  class?: Class
  subjects?: Subject[]
  created_at: string
}

export interface Subject {
  id: string
  result_id: string
  name: string
  marks: number
  max_marks: number
  grade: string
  created_at: string
}

export interface Notice {
  id: string
  title: string
  content: string
  image_url?: string
  file_url?: string
  urgent: boolean
  created_at: string
}

export interface Donation {
  id: string
  name: string
  phone: string
  amount: number
  description?: string
  payment_status: 'pending' | 'success' | 'failed'
  transaction_id?: string
  created_at: string
}

export interface AppSetting {
  key: string
  value: string
}

-- 1. Profiles & Roles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
  full_name TEXT NOT NULL,
  phone_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

-- 2. Dynamic Form Templates
CREATE TABLE public.form_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  fields JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Admission Applications
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES public.form_templates(id),
  applicant_user_id UUID REFERENCES auth.users(id),
  submission_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Students & Teachers
CREATE TABLE public.students (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  roll_number TEXT UNIQUE,
  class_name TEXT,
  batch_year INTEGER,
  admission_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.teachers (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  specialization TEXT,
  designation TEXT,
  joining_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

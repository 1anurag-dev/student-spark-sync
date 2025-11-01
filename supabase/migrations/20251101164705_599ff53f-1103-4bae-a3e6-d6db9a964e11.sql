-- Create tables for form submissions
CREATE TABLE public.student_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  followers TEXT NOT NULL,
  platform TEXT NOT NULL,
  profile_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.brand_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  campaign_details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.student_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for student_submissions
-- Anyone can insert (public form)
CREATE POLICY "Anyone can insert student submissions"
ON public.student_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view student submissions"
ON public.student_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for brand_submissions
-- Anyone can insert (public form)
CREATE POLICY "Anyone can insert brand submissions"
ON public.brand_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view brand submissions"
ON public.brand_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles
-- Only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_student_submissions_created_at ON public.student_submissions(created_at DESC);
CREATE INDEX idx_brand_submissions_created_at ON public.brand_submissions(created_at DESC);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
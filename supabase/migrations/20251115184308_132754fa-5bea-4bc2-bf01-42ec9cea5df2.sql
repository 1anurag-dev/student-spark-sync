-- Add phone number and status fields to student_submissions table
ALTER TABLE public.student_submissions
ADD COLUMN phone text,
ADD COLUMN status text DEFAULT 'pending',
ADD COLUMN approved_at timestamp with time zone;

-- Create index for faster status lookups
CREATE INDEX idx_student_submissions_status ON public.student_submissions(status);
CREATE INDEX idx_student_submissions_email ON public.student_submissions(email);
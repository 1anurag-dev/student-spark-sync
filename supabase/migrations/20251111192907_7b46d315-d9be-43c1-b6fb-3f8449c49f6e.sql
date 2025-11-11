-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('creator', 'brand');

-- Create enum for campaign status
CREATE TYPE public.campaign_status AS ENUM ('draft', 'active', 'in_progress', 'completed', 'cancelled');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');

-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type user_type NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create creator_profiles table for creator-specific data
CREATE TABLE public.creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  niche TEXT,
  instagram_handle TEXT,
  instagram_followers INTEGER,
  tiktok_handle TEXT,
  tiktok_followers INTEGER,
  youtube_handle TEXT,
  youtube_subscribers INTEGER,
  twitter_handle TEXT,
  twitter_followers INTEGER,
  portfolio_urls TEXT[],
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brand_profiles table for brand-specific data
CREATE TABLE public.brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create squads table
CREATE TABLE public.squads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  niche TEXT,
  total_followers INTEGER DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create squad_members junction table
CREATE TABLE public.squad_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  squad_id UUID NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(squad_id, creator_id)
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  budget DECIMAL(10, 2),
  target_audience TEXT,
  niche TEXT,
  status campaign_status DEFAULT 'draft',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  deliverables TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign_applications table
CREATE TABLE public.campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  squad_id UUID NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  proposal TEXT,
  proposed_rate DECIMAL(10, 2),
  status application_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, squad_id)
);

-- Create creator_earnings table
CREATE TABLE public.creator_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  squad_id UUID NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  squad_id UUID REFERENCES public.squads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squad_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for creator_profiles
CREATE POLICY "Anyone can view creator profiles"
  ON public.creator_profiles FOR SELECT
  USING (true);

CREATE POLICY "Creators can update own profile"
  ON public.creator_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Creators can insert own profile"
  ON public.creator_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for brand_profiles
CREATE POLICY "Anyone can view brand profiles"
  ON public.brand_profiles FOR SELECT
  USING (true);

CREATE POLICY "Brands can update own profile"
  ON public.brand_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Brands can insert own profile"
  ON public.brand_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for squads
CREATE POLICY "Anyone can view active squads"
  ON public.squads FOR SELECT
  USING (is_active = true OR created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all squads"
  ON public.squads FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for squad_members
CREATE POLICY "Anyone can view squad members"
  ON public.squad_members FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage squad members"
  ON public.squad_members FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for campaigns
CREATE POLICY "Anyone can view active campaigns"
  ON public.campaigns FOR SELECT
  USING (status = 'active' OR EXISTS (
    SELECT 1 FROM public.brand_profiles bp 
    WHERE bp.id = campaigns.brand_id AND bp.user_id = auth.uid()
  ) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Brands can create campaigns"
  ON public.campaigns FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.brand_profiles bp 
    WHERE bp.id = brand_id AND bp.user_id = auth.uid()
  ));

CREATE POLICY "Brands can update own campaigns"
  ON public.campaigns FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.brand_profiles bp 
    WHERE bp.id = campaigns.brand_id AND bp.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all campaigns"
  ON public.campaigns FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for campaign_applications
CREATE POLICY "Brands and squad members can view applications"
  ON public.campaign_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      JOIN public.brand_profiles bp ON c.brand_id = bp.id 
      WHERE c.id = campaign_applications.campaign_id AND bp.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.squad_members sm 
      JOIN public.creator_profiles cp ON sm.creator_id = cp.id 
      WHERE sm.squad_id = campaign_applications.squad_id AND cp.user_id = auth.uid()
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Squad members can create applications"
  ON public.campaign_applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.squad_members sm 
      JOIN public.creator_profiles cp ON sm.creator_id = cp.id 
      WHERE sm.squad_id = squad_id AND cp.user_id = auth.uid()
    )
  );

CREATE POLICY "Brands can update applications"
  ON public.campaign_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      JOIN public.brand_profiles bp ON c.brand_id = bp.id 
      WHERE c.id = campaign_applications.campaign_id AND bp.user_id = auth.uid()
    )
  );

-- RLS Policies for creator_earnings
CREATE POLICY "Creators can view own earnings"
  ON public.creator_earnings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.creator_profiles cp 
      WHERE cp.id = creator_earnings.creator_id AND cp.user_id = auth.uid()
    ) OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can manage earnings"
  ON public.creator_earnings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for messages
CREATE POLICY "Users can view own messages"
  ON public.messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.squad_members sm 
      JOIN public.creator_profiles cp ON sm.creator_id = cp.id 
      WHERE sm.squad_id = messages.squad_id AND cp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update own messages"
  ON public.messages FOR UPDATE
  USING (recipient_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_creator_profiles_user_id ON public.creator_profiles(user_id);
CREATE INDEX idx_brand_profiles_user_id ON public.brand_profiles(user_id);
CREATE INDEX idx_squad_members_squad_id ON public.squad_members(squad_id);
CREATE INDEX idx_squad_members_creator_id ON public.squad_members(creator_id);
CREATE INDEX idx_campaigns_brand_id ON public.campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaign_applications_campaign_id ON public.campaign_applications(campaign_id);
CREATE INDEX idx_campaign_applications_squad_id ON public.campaign_applications(squad_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- Create trigger for updating updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_creator_profiles_updated_at
  BEFORE UPDATE ON public.creator_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_brand_profiles_updated_at
  BEFORE UPDATE ON public.brand_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_squads_updated_at
  BEFORE UPDATE ON public.squads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_applications_updated_at
  BEFORE UPDATE ON public.campaign_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
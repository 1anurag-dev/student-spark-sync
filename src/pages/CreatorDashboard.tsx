import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSetup } from '@/components/creator/ProfileSetup';
import { SquadBrowser } from '@/components/creator/SquadBrowser';
import { MySquads } from '@/components/creator/MySquads';
import { MyEarnings } from '@/components/creator/MyEarnings';
import { MessagingInterface } from '@/components/creator/MessagingInterface';
import { User, Users, DollarSign, MessageSquare, LogOut, Sparkles } from 'lucide-react';

export default function CreatorDashboard() {
  const { user, signOut } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    if (user) {
      checkProfile();
    }
  }, [user]);

  const checkProfile = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profile) {
        setProfileName(profile.full_name);
      }

      const { data: creatorProfile } = await supabase
        .from('creator_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      setHasProfile(!!creatorProfile);
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Creator Dashboard</h1>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <ProfileSetup onComplete={() => setHasProfile(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Creator Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {profileName}!</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="squads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="squads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Browse Squads</span>
            </TabsTrigger>
            <TabsTrigger value="my-squads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">My Squads</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Earnings</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="squads">
            <div>
              <h2 className="text-2xl font-bold mb-4">Browse Squads</h2>
              <p className="text-muted-foreground mb-6">
                Find and join squads that match your niche and audience
              </p>
              <SquadBrowser />
            </div>
          </TabsContent>

          <TabsContent value="my-squads">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Squads</h2>
              <p className="text-muted-foreground mb-6">
                View and manage your squad memberships
              </p>
              <MySquads />
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Earnings</h2>
              <p className="text-muted-foreground mb-6">
                Track your earnings from campaigns
              </p>
              <MyEarnings />
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div>
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <p className="text-muted-foreground mb-6">
                Communicate with brands and squad members
              </p>
              <MessagingInterface />
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div>
              <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
              <p className="text-muted-foreground mb-6">
                Keep your profile and social media stats up to date
              </p>
              <ProfileSetup onComplete={() => {}} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

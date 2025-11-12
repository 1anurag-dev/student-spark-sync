import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Instagram, Twitter } from 'lucide-react';

export function ProfileSetup({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    niche: '',
    instagramHandle: '',
    instagramFollowers: '',
    tiktokHandle: '',
    tiktokFollowers: '',
    youtubeHandle: '',
    youtubeSubscribers: '',
    twitterHandle: '',
    twitterFollowers: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('creator_profiles').upsert({
        user_id: user.id,
        bio: formData.bio,
        niche: formData.niche,
        instagram_handle: formData.instagramHandle || null,
        instagram_followers: parseInt(formData.instagramFollowers) || null,
        tiktok_handle: formData.tiktokHandle || null,
        tiktok_followers: parseInt(formData.tiktokFollowers) || null,
        youtube_handle: formData.youtubeHandle || null,
        youtube_subscribers: parseInt(formData.youtubeSubscribers) || null,
        twitter_handle: formData.twitterHandle || null,
        twitter_followers: parseInt(formData.twitterFollowers) || null,
      });

      if (error) throw error;

      toast({ title: "Profile saved!", description: "Your creator profile has been updated." });
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Creator Profile</CardTitle>
        <CardDescription>
          Tell us about yourself and connect your social media accounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your content..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche">Niche</Label>
            <Input
              id="niche"
              placeholder="e.g., Fashion, Tech, Gaming, Lifestyle"
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram Handle</Label>
              <Input
                id="instagram"
                placeholder="@username"
                value={formData.instagramHandle}
                onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-followers">Instagram Followers</Label>
              <Input
                id="instagram-followers"
                type="number"
                placeholder="10000"
                value={formData.instagramFollowers}
                onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok Handle</Label>
              <Input
                id="tiktok"
                placeholder="@username"
                value={formData.tiktokHandle}
                onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok-followers">TikTok Followers</Label>
              <Input
                id="tiktok-followers"
                type="number"
                placeholder="10000"
                value={formData.tiktokFollowers}
                onChange={(e) => setFormData({ ...formData, tiktokFollowers: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube Handle</Label>
              <Input
                id="youtube"
                placeholder="@username"
                value={formData.youtubeHandle}
                onChange={(e) => setFormData({ ...formData, youtubeHandle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube-subs">YouTube Subscribers</Label>
              <Input
                id="youtube-subs"
                type="number"
                placeholder="10000"
                value={formData.youtubeSubscribers}
                onChange={(e) => setFormData({ ...formData, youtubeSubscribers: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Handle</Label>
              <Input
                id="twitter"
                placeholder="@username"
                value={formData.twitterHandle}
                onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter-followers">Twitter Followers</Label>
              <Input
                id="twitter-followers"
                type="number"
                placeholder="10000"
                value={formData.twitterFollowers}
                onChange={(e) => setFormData({ ...formData, twitterFollowers: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

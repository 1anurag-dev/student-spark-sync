import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface Squad {
  id: string;
  name: string;
  description: string | null;
  niche: string | null;
  total_followers: number;
}

export function MySquads() {
  const { user } = useAuth();
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMySquads();
    }
  }, [user]);

  const fetchMySquads = async () => {
    if (!user) return;

    try {
      const { data: creatorProfile } = await supabase
        .from('creator_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!creatorProfile) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('squad_members')
        .select('squads(*)')
        .eq('creator_id', creatorProfile.id)
        .eq('is_active', true);

      if (error) throw error;

      const squadData = data?.map((item: any) => item.squads).filter(Boolean) || [];
      setSquads(squadData);
    } catch (error) {
      console.error('Error fetching squads:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading your squads...</div>;
  }

  if (squads.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">You haven't joined any squads yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {squads.map((squad) => (
        <Card key={squad.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{squad.name}</CardTitle>
              {squad.niche && (
                <Badge variant="secondary">{squad.niche}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{squad.description}</CardDescription>
            <p className="text-sm text-muted-foreground mt-2">
              {squad.total_followers.toLocaleString()} total followers
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

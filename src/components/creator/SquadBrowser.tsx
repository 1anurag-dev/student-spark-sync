import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Squad {
  id: string;
  name: string;
  description: string | null;
  niche: string | null;
  total_followers: number;
  image_url: string | null;
}

export function SquadBrowser() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSquads();
  }, []);

  const fetchSquads = async () => {
    try {
      const { data, error } = await supabase
        .from('squads')
        .select('*')
        .eq('is_active', true)
        .order('total_followers', { ascending: false });

      if (error) throw error;
      setSquads(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading squads",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading squads...</div>;
  }

  if (squads.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No squads available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {squads.map((squad) => (
        <Card key={squad.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{squad.name}</CardTitle>
                {squad.niche && (
                  <Badge variant="secondary" className="mt-2">
                    {squad.niche}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="line-clamp-2">
              {squad.description || 'No description available'}
            </CardDescription>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{squad.total_followers.toLocaleString()} total followers</span>
            </div>

            <Button className="w-full" variant="outline">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

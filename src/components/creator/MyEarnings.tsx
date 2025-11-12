import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp } from 'lucide-react';

interface Earning {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  campaigns: {
    title: string;
  };
}

export function MyEarnings() {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEarnings();
    }
  }, [user]);

  const fetchEarnings = async () => {
    if (!user) return;

    try {
      const { data: creatorProfile } = await supabase
        .from('creator_profiles')
        .select('id, total_earnings')
        .eq('user_id', user.id)
        .single();

      if (!creatorProfile) {
        setLoading(false);
        return;
      }

      setTotalEarnings(Number(creatorProfile.total_earnings) || 0);

      const { data, error } = await supabase
        .from('creator_earnings')
        .select('*, campaigns(title)')
        .eq('creator_id', creatorProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEarnings(data || []);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading earnings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Total Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalEarnings.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground mt-1">
            All time earnings from campaigns
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold">Recent Earnings</h3>
        {earnings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No earnings yet. Start applying to campaigns!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {earnings.map((earning) => (
              <Card key={earning.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{earning.campaigns.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(earning.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${Number(earning.amount).toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        earning.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {earning.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

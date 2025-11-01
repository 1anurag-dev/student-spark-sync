import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, Megaphone } from "lucide-react";

interface StudentSubmission {
  id: string;
  name: string;
  email: string;
  followers: string;
  platform: string;
  profile_url: string;
  created_at: string;
}

interface BrandSubmission {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  campaign_details: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [studentSubmissions, setStudentSubmissions] = useState<StudentSubmission[]>([]);
  const [brandSubmissions, setBrandSubmissions] = useState<BrandSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin/login");
      return;
    }

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      toast({
        title: "Unauthorized",
        description: "Admin access required",
        variant: "destructive",
      });
    }
  };

  const fetchSubmissions = async () => {
    try {
      const [studentsRes, brandsRes] = await Promise.all([
        supabase
          .from("student_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("brand_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (studentsRes.error) throw studentsRes.error;
      if (brandsRes.error) throw brandsRes.error;

      setStudentSubmissions(studentsRes.data || []);
      setBrandSubmissions(brandsRes.data || []);
    } catch (error: any) {
      toast({
        title: "Error loading submissions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground py-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentSubmissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Brand Submissions</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brandSubmissions.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Student Submissions</TabsTrigger>
            <TabsTrigger value="brands">Brand Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <div className="space-y-4">
              {studentSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold">{submission.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{submission.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Platform</p>
                        <p className="font-semibold">{submission.platform}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Followers</p>
                        <p className="font-semibold">{submission.followers}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Profile URL</p>
                        <a
                          href={submission.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {submission.profile_url}
                        </a>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p>{new Date(submission.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {studentSubmissions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No student submissions yet
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="brands" className="mt-6">
            <div className="space-y-4">
              {brandSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Company Name</p>
                        <p className="font-semibold">{submission.company_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Name</p>
                        <p className="font-semibold">{submission.contact_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{submission.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold">{submission.phone || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Campaign Details</p>
                        <p className="whitespace-pre-wrap">{submission.campaign_details}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p>{new Date(submission.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {brandSubmissions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No brand submissions yet
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

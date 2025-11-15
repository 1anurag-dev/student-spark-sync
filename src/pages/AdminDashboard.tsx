import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Building2, MessageSquare, FileText, LogOut, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StudentSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  platform: string;
  profile_url: string;
  followers: string;
  status: string;
  created_at: string;
}

interface BrandSubmission {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  campaign_details: string;
  created_at: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  creator_email: string;
  creator_name: string;
  join_link: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studentSubmissions, setStudentSubmissions] = useState<StudentSubmission[]>([]);
  const [brandSubmissions, setBrandSubmissions] = useState<BrandSubmission[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [showCommunitySuccess, setShowCommunitySuccess] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

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
      const [studentsResponse, brandsResponse, communitiesResponse, blogPostsResponse] = await Promise.all([
        supabase.from("student_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("brand_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("communities").select("*").order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("id, title, excerpt, published, created_at").order("created_at", { ascending: false }),
      ]);

      if (studentsResponse.error) throw studentsResponse.error;
      if (brandsResponse.error) throw brandsResponse.error;
      if (communitiesResponse.error) throw communitiesResponse.error;
      if (blogPostsResponse.error) throw blogPostsResponse.error;

      setStudentSubmissions(studentsResponse.data || []);
      setBrandSubmissions(brandsResponse.data || []);
      setCommunities(communitiesResponse.data || []);
      setBlogPosts(blogPostsResponse.data || []);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleApproveCreator = async (application: StudentSubmission) => {
    setApprovingId(application.id);
    
    try {
      const { error } = await supabase.functions.invoke('send-creator-approval', {
        body: {
          applicationId: application.id,
          email: application.email,
          name: application.name,
        }
      });

      if (error) throw error;

      toast({
        title: "Creator Approved!",
        description: `Approval email sent to ${application.email}`,
      });

      // Refresh submissions
      fetchSubmissions();
    } catch (error: any) {
      console.error('Approval error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve creator",
        variant: "destructive",
      });
    } finally {
      setApprovingId(null);
    }
  };

  const handleCreateCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingCommunity(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const creatorName = formData.get("creatorName") as string;
      const creatorEmail = formData.get("creatorEmail") as string;

      const joinLink = `${window.location.origin}/community/${crypto.randomUUID()}`;

      const { data, error } = await supabase
        .from("communities")
        .insert({
          name,
          description,
          creator_email: creatorEmail,
          creator_name: creatorName,
          join_link: joinLink,
        })
        .select()
        .single();

      if (error) throw error;

      // Send email invitation
      const { error: emailError } = await supabase.functions.invoke('send-community-invite', {
        body: {
          communityName: name,
          creatorName,
          creatorEmail,
          joinLink,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        toast({
          title: "Community Created",
          description: "Community created but email could not be sent.",
          variant: "destructive",
        });
      } else {
        setShowCommunitySuccess(true);
        setTimeout(() => setShowCommunitySuccess(false), 5000);
      }

      fetchSubmissions();
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingCommunity(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingBlog(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;
      const excerpt = formData.get("excerpt") as string;

      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error("Not authenticated");

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const { error } = await supabase
        .from("blog_posts")
        .insert({
          title,
          content,
          excerpt,
          slug,
          author_id: user.data.user.id,
          published: false,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Blog post created successfully!",
      });

      fetchSubmissions();
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingBlog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your community and content</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Students</CardTitle>
                <Users className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{studentSubmissions.length}</p>
              <p className="text-sm opacity-80 mt-1">Total creators</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Brands</CardTitle>
                <Building2 className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{brandSubmissions.length}</p>
              <p className="text-sm opacity-80 mt-1">Total brands</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Communities</CardTitle>
                <MessageSquare className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{communities.length}</p>
              <p className="text-sm opacity-80 mt-1">Active communities</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Blog Posts</CardTitle>
                <FileText className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{blogPosts.length}</p>
              <p className="text-sm opacity-80 mt-1">Total posts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>View and manage student creator applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone || 'N/A'}</TableCell>
                        <TableCell>{submission.followers}</TableCell>
                        <TableCell>
                          <a href={submission.profile_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            View IG
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {submission.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {submission.status === 'pending' && (
                            <Button size="sm" onClick={() => handleApproveCreator(submission)} disabled={approvingId === submission.id}>
                              {approvingId === submission.id ? 'Approving...' : 'Approve'}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Submissions</CardTitle>
                <CardDescription>Manage brand collaboration requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Campaign Details</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandSubmissions.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell className="font-medium">{brand.company_name}</TableCell>
                        <TableCell>{brand.contact_name}</TableCell>
                        <TableCell>{brand.email}</TableCell>
                        <TableCell>{brand.phone || "N/A"}</TableCell>
                        <TableCell className="max-w-xs truncate">{brand.campaign_details}</TableCell>
                        <TableCell>{new Date(brand.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Communities</CardTitle>
                    <CardDescription>Manage and create communities</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                        <Plus className="h-4 w-4" />
                        Create Community
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Community</DialogTitle>
                        <DialogDescription>
                          Fill in the details to create a new community. An invitation email will be sent.
                        </DialogDescription>
                      </DialogHeader>
                      {showCommunitySuccess ? (
                        <div className="py-8 text-center space-y-4">
                          <div className="text-6xl">✉️</div>
                          <h3 className="text-xl font-semibold">Please check your email!</h3>
                          <p className="text-muted-foreground">
                            An invitation to join the Nano Community has been sent from <strong>boringscool</strong> powered by <strong>lovable</strong>.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleCreateCommunity} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Community Name</Label>
                            <Input id="name" name="name" required />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" />
                          </div>
                          <div>
                            <Label htmlFor="creatorName">Creator Name</Label>
                            <Input id="creatorName" name="creatorName" required />
                          </div>
                          <div>
                            <Label htmlFor="creatorEmail">Creator Email</Label>
                            <Input id="creatorEmail" name="creatorEmail" type="email" required />
                          </div>
                          <Button type="submit" disabled={isCreatingCommunity} className="w-full">
                            {isCreatingCommunity ? "Creating..." : "Create Community"}
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Link</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communities.map((community) => (
                      <TableRow key={community.id}>
                        <TableCell className="font-medium">{community.name}</TableCell>
                        <TableCell>{community.creator_name}</TableCell>
                        <TableCell>{community.creator_email}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          <a href={community.join_link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            {community.join_link}
                          </a>
                        </TableCell>
                        <TableCell>{new Date(community.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>Manage and create blog posts</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-gradient-to-r from-pink-600 to-purple-600">
                        <Plus className="h-4 w-4" />
                        Create Blog Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Blog Post</DialogTitle>
                        <DialogDescription>
                          Write a new blog post for your community.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateBlog} className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" name="title" required />
                        </div>
                        <div>
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Textarea id="excerpt" name="excerpt" rows={2} />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea id="content" name="content" rows={10} required />
                        </div>
                        <Button type="submit" disabled={isCreatingBlog} className="w-full">
                          {isCreatingBlog ? "Creating..." : "Create Blog Post"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Excerpt</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{post.excerpt || "No excerpt"}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

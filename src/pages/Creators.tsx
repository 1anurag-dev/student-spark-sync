import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, DollarSign, Users, TrendingUp, Instagram } from "lucide-react";
import Footer from "@/components/Footer";

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    followers: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("student_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          followers: formData.followers,
          platform: "Instagram",
          profile_url: formData.instagram,
        });

      if (error) throw error;

      toast.success("Application submitted! We'll reach out soon.");
      setFormData({ name: "", email: "", instagram: "", followers: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize Your Following",
      description: "Start earning money from your social media presence"
    },
    {
      icon: Users,
      title: "Power in Numbers",
      description: "Join groups of nano-influencers to create massive impact"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Brand",
      description: "Gain exposure to top brands and expand your reach"
    },
    {
      icon: CheckCircle2,
      title: "Authentic Partnerships",
      description: "Work with brands that align with your values"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground mb-8 leading-none animate-fade-in-up">
            TURN YOUR
            <br />
            FOLLOWERS
            <br />
            INTO INCOME
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl animate-fade-in delay-100">
            You don't need millions of followers to start making money. Join our network of nano-influencers and monetize your authentic voice.
          </p>
          <div className="flex gap-4 animate-scale-in delay-200">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-background font-bold text-lg px-10 py-7 rounded-full hover:scale-105 transition-transform"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-bold text-lg px-10 py-7 rounded-full hover:scale-105 transition-transform"
              onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-foreground animate-fade-in">
            WHY JOIN US
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card border border-border p-10 rounded-3xl hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-12 text-foreground animate-fade-in">
            THE POWER OF
            <br />
            NANO-INFLUENCERS
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto animate-fade-in delay-100">
            We group multiple nano-influencers together to create powerful collective reach. Your authentic engagement matters more than follower count.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-card border border-border p-8 rounded-3xl animate-fade-in delay-200 hover:border-primary/50 transition-all">
              <div className="text-6xl font-black text-primary mb-4">1</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Sign Up</h3>
              <p className="text-muted-foreground text-lg">Join our creator network and complete your profile</p>
            </div>
            <div className="bg-card border border-border p-8 rounded-3xl animate-fade-in delay-300 hover:border-primary/50 transition-all">
              <div className="text-6xl font-black text-primary mb-4">2</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Get Matched</h3>
              <p className="text-muted-foreground text-lg">We pair you with relevant brand campaigns</p>
            </div>
            <div className="bg-card border border-border p-8 rounded-3xl animate-fade-in delay-400 hover:border-primary/50 transition-all">
              <div className="text-6xl font-black text-primary mb-4">3</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Earn Money</h3>
              <p className="text-muted-foreground text-lg">Create authentic content and get paid</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section id="join-form" className="py-32 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground animate-fade-in">
            READY TO START?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in delay-100">
            Fill out the form below and join our creator community today!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-card border-2 border-border p-10 rounded-3xl animate-scale-in delay-200">
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">Full Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="your.email@college.edu"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Instagram Handle
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  required
                  className="w-full pl-12 bg-background border-border rounded-xl py-6"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
            <div>
              <label htmlFor="followers" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Follower Count
              </label>
              <Input
                id="followers"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="e.g., 1000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Tell us about yourself
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-background border-border rounded-xl"
                placeholder="What type of content do you create?"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg py-7 bg-primary hover:bg-primary/90 text-background font-bold rounded-full hover:scale-105 transition-transform" 
              disabled={loading}
            >
              {loading ? "Submitting..." : "Join the Network"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Students;

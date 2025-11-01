import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, DollarSign, Users, TrendingUp, Instagram } from "lucide-react";

const Students = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    followers: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll reach out soon.");
    setFormData({ name: "", email: "", instagram: "", followers: "", message: "" });
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize Your Following",
      description: "Start earning money from your social media presence, no matter your follower count"
    },
    {
      icon: Users,
      title: "Power in Numbers",
      description: "Join groups of nano-influencers to create massive impact for brand campaigns"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Brand",
      description: "Gain exposure to top brands and expand your personal brand reach"
    },
    {
      icon: CheckCircle2,
      title: "Authentic Partnerships",
      description: "Work with brands that align with your values and resonate with your audience"
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Turn Your Followers Into Income
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
            You don't need millions of followers to start making money. Join our network of nano-influencers and monetize your authentic voice.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="animate-scale-in delay-200 text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Earning Today
          </Button>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-secondary-foreground animate-fade-in">
            Why Student Creators Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary-foreground animate-fade-in">
            The Power of Nano-Influencers
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in delay-100">
            We understand that not everyone has 100k+ followers, and that's perfectly fine! We group multiple nano-influencers together to create powerful collective reach. Your authentic engagement matters more than follower count.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl animate-fade-in delay-200">
              <div className="text-4xl font-bold text-primary-foreground mb-2">1</div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">Sign Up</h3>
              <p className="text-primary-foreground/80">Join our creator network and complete your profile</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl animate-fade-in delay-300">
              <div className="text-4xl font-bold text-primary-foreground mb-2">2</div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">Get Matched</h3>
              <p className="text-primary-foreground/80">We pair you with relevant brand campaigns</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl animate-fade-in delay-400">
              <div className="text-4xl font-bold text-primary-foreground mb-2">3</div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">Earn Money</h3>
              <p className="text-primary-foreground/80">Create authentic content and get paid</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section id="join-form" className="py-20 px-6 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-secondary-foreground animate-fade-in">
            Ready to Start Earning?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in delay-100">
            Fill out the form below and join our creator community today!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-2xl shadow-xl animate-scale-in delay-200">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
                placeholder="your.email@college.edu"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium mb-2 text-foreground">
                Instagram Handle
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  required
                  className="w-full pl-10"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
            <div>
              <label htmlFor="followers" className="block text-sm font-medium mb-2 text-foreground">
                Approximate Follower Count
              </label>
              <Input
                id="followers"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                required
                className="w-full"
                placeholder="e.g., 1000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Tell us about yourself
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full"
                placeholder="What type of content do you create? What niches do you cover?"
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-lg py-6">
              Join the Network
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Students;

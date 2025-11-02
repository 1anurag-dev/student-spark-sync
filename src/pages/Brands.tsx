import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Target, Zap, Shield, BarChart3, Users2, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("brand_submissions")
        .insert({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone || null,
          campaign_details: formData.message,
        });

      if (error) throw error;

      toast.success("Thank you! Our team will contact you shortly.");
      setFormData({ companyName: "", contactName: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const advantages = [
    {
      icon: Target,
      title: "Reach Gen Z",
      description: "Connect with college students through authentic voices they trust"
    },
    {
      icon: Users2,
      title: "Collective Power",
      description: "Access groups of nano-influencers for massive reach"
    },
    {
      icon: Sparkles,
      title: "Authentic Content",
      description: "Get real, relatable content that resonates with audiences"
    },
    {
      icon: BarChart3,
      title: "Data-Driven",
      description: "Track campaign performance with detailed analytics"
    },
    {
      icon: Shield,
      title: "Vetted Creators",
      description: "Work with pre-screened creators who align with your brand"
    },
    {
      icon: Zap,
      title: "Fast Launch",
      description: "Launch campaigns quickly with streamlined onboarding"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground mb-8 leading-none animate-fade-in-up">
            AUTHENTIC
            <br />
            MARKETING
            <br />
            THAT WORKS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl animate-fade-in delay-100">
            Connect with college students through verified nano-influencers who create genuine content your target audience trusts.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-background font-bold text-lg px-10 py-7 rounded-full animate-scale-in delay-200 hover:scale-105 transition-transform"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Campaign
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-foreground animate-fade-in">
            WHY PARTNER WITH US
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-card border border-border p-10 rounded-3xl hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <advantage.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{advantage.title}</h3>
                <p className="text-muted-foreground text-lg">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Nano-Influencer Advantage */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground">
                THE POWER OF
                <br />
                NANO-INFLUENCERS
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Traditional influencer marketing is expensive and often feels inauthentic. We've solved this by grouping nano-influencers (1k-10k followers) who have genuine connections with their audiences.
              </p>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-4 text-2xl font-bold">•</span>
                  <span>Higher engagement rates than mega-influencers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-4 text-2xl font-bold">•</span>
                  <span>More authentic, relatable content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-4 text-2xl font-bold">•</span>
                  <span>Better ROI for your marketing budget</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-4 text-2xl font-bold">•</span>
                  <span>Direct access to college-age demographics</span>
                </li>
              </ul>
            </div>
            <div className="bg-card border-2 border-border p-12 rounded-3xl animate-fade-in delay-200">
              <div className="space-y-10">
                <div className="border-l-4 border-primary pl-8">
                  <div className="text-6xl font-black text-foreground mb-3">5-10x</div>
                  <p className="text-muted-foreground text-lg">Higher engagement vs traditional influencers</p>
                </div>
                <div className="border-l-4 border-primary pl-8">
                  <div className="text-6xl font-black text-foreground mb-3">50%</div>
                  <p className="text-muted-foreground text-lg">Lower cost per engagement</p>
                </div>
                <div className="border-l-4 border-primary pl-8">
                  <div className="text-6xl font-black text-foreground mb-3">100+</div>
                  <p className="text-muted-foreground text-lg">Vetted student creators ready to partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-32 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground animate-fade-in">
            LET'S CREATE
            <br />
            TOGETHER
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in delay-100">
            Tell us about your brand and campaign goals. We'll connect you with the perfect creator network.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-card border-2 border-border p-10 rounded-3xl animate-scale-in delay-200">
            <div>
              <label htmlFor="companyName" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Company Name
              </label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="Your company"
              />
            </div>
            <div>
              <label htmlFor="contactName" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Contact Name
              </label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-background border-border rounded-xl py-6"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-3 text-foreground uppercase tracking-wide">
                Campaign Details
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-background border-border rounded-xl"
                placeholder="Tell us about your brand and campaign goals..."
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg py-7 bg-primary hover:bg-primary/90 text-background font-bold rounded-full hover:scale-105 transition-transform" 
              disabled={loading}
            >
              {loading ? "Submitting..." : "Get Started"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brands;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Target, Zap, Shield, BarChart3, Users2, Sparkles } from "lucide-react";

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
      title: "Reach Gen Z Where They Are",
      description: "Connect with college students through authentic voices they actually trust and follow"
    },
    {
      icon: Users2,
      title: "Collective Influence Power",
      description: "Access groups of nano-influencers for massive reach with genuine engagement"
    },
    {
      icon: Sparkles,
      title: "Authentic Content",
      description: "Get real, relatable content that resonates with young audiences, not polished ads"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Results",
      description: "Track campaign performance and ROI with detailed analytics and reporting"
    },
    {
      icon: Shield,
      title: "Vetted Creators",
      description: "Work with pre-screened student creators who align with your brand values"
    },
    {
      icon: Zap,
      title: "Fast Campaign Launch",
      description: "Launch campaigns quickly with our streamlined matching and onboarding process"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-95"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Authentic Marketing That Actually Works
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
            Connect with college students through verified nano-influencers who create genuine content your target audience trusts.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="animate-scale-in delay-200 text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Campaign
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-secondary-foreground animate-fade-in">
            Why Brands Partner With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <advantage.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{advantage.title}</h3>
                <p className="text-muted-foreground text-lg">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Nano-Influencer Advantage */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                The Power of Nano-Influencers
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-6">
                Traditional influencer marketing is expensive and often feels inauthentic. We've solved this by grouping nano-influencers (1k-10k followers) who have genuine connections with their audiences.
              </p>
              <p className="text-xl text-primary-foreground/90 mb-6">
                When combined, these creators deliver:
              </p>
              <ul className="space-y-4 text-lg text-primary-foreground/90">
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-2xl">•</span>
                  <span>Higher engagement rates than mega-influencers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-2xl">•</span>
                  <span>More authentic, relatable content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-2xl">•</span>
                  <span>Better ROI for your marketing budget</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-2xl">•</span>
                  <span>Direct access to college-age demographics</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl animate-fade-in delay-200">
              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <div className="text-5xl font-bold text-primary-foreground mb-2">5-10x</div>
                  <p className="text-primary-foreground/80 text-lg">Higher engagement vs traditional influencers</p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <div className="text-5xl font-bold text-primary-foreground mb-2">50%</div>
                  <p className="text-primary-foreground/80 text-lg">Lower cost per engagement</p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <div className="text-5xl font-bold text-primary-foreground mb-2">100+</div>
                  <p className="text-primary-foreground/80 text-lg">Vetted student creators ready to partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-secondary-foreground animate-fade-in">
            Let's Create Something Authentic
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in delay-100">
            Tell us about your brand and campaign goals. We'll connect you with the perfect creator network.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-2xl shadow-xl animate-scale-in delay-200">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2 text-foreground">
                Company Name
              </label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                className="w-full"
                placeholder="Your company"
              />
            </div>
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium mb-2 text-foreground">
                Contact Name
              </label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                required
                className="w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Campaign Details
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full"
                placeholder="Tell us about your brand, target audience, and campaign goals..."
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={loading}>
              {loading ? "Submitting..." : "Get Started"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Brands;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Megaphone, TrendingUp, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-95"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <span className="text-primary-foreground/90 text-sm font-medium">
              Authentic Creator Marketing Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Connect Creators
            <br />
            With Brands
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto animate-fade-in delay-100">
            Bridging college student creators and brands for authentic, impactful marketing campaigns that resonate with Gen Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-200">
            <Link to="/students">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                For Creators
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/brands">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:scale-105 transition-transform">
                For Brands
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-secondary-foreground animate-fade-in">
            Revolutionizing Student Creator Marketing
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto animate-fade-in delay-100">
            We connect brands with networks of nano-influencers—college students with authentic voices and engaged audiences—to create marketing campaigns that actually work.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fade-in delay-200">
              <h3 className="text-3xl font-bold mb-4 text-foreground">The Challenge</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Traditional influencer marketing is expensive, often feels fake, and doesn't reach college-age audiences effectively. Meanwhile, thousands of student creators with genuine followings struggle to monetize their content.
              </p>
              <p className="text-lg text-muted-foreground">
                We saw an opportunity to solve both problems at once.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl animate-fade-in delay-300">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Authentic Content</h4>
                    <p className="text-muted-foreground">Real students creating relatable content</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Collective Power</h4>
                    <p className="text-muted-foreground">Groups of nano-influencers = massive reach</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">Better ROI</h4>
                    <p className="text-muted-foreground">Higher engagement at lower costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary-foreground animate-fade-in">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in delay-100">
              <div className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">Build Creator Networks</h3>
              <p className="text-primary-foreground/80 text-lg">
                We vet and group nano-influencers by niche, audience, and engagement quality to create powerful collective reach.
              </p>
            </div>
            <div className="text-center animate-fade-in delay-200">
              <div className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">Match With Brands</h3>
              <p className="text-primary-foreground/80 text-lg">
                Brands tell us their goals, and we connect them with creator networks that align with their target audience.
              </p>
            </div>
            <div className="text-center animate-fade-in delay-300">
              <div className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">Launch Campaigns</h3>
              <p className="text-primary-foreground/80 text-lg">
                Creators produce authentic content, brands reach engaged audiences, and everyone wins with measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-foreground animate-fade-in">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in delay-100">
            Whether you're a student creator looking to monetize your following or a brand seeking authentic Gen Z engagement, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in delay-200">
            <Link to="/students" className="flex-1 max-w-sm">
              <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">I'm a Creator</h3>
                <p className="text-muted-foreground mb-4">
                  Start monetizing your social media presence
                </p>
                <Button className="w-full group-hover:scale-105 transition-transform">
                  Join Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Link>
            <Link to="/brands" className="flex-1 max-w-sm">
              <div className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <Megaphone className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">I'm a Brand</h3>
                <p className="text-muted-foreground mb-4">
                  Launch authentic campaigns with student creators
                </p>
                <Button className="w-full group-hover:scale-105 transition-transform">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

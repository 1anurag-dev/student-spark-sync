import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Megaphone, TrendingUp, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-32 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-8 animate-fade-in">
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Authentic Creator Marketing Platform
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none animate-fade-in-up">
                CONNECT
                <br />
                <span className="relative inline-block">
                  CREATORS
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-background" />
                  </div>
                </span>
                <br />
                WITH BRANDS
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl animate-fade-in delay-100">
                Bridging college student creators and brands for authentic, impactful marketing campaigns that resonate with Gen Z.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 animate-scale-in delay-200">
                <Link to="/students">
                  <Button size="lg" className="text-lg px-10 py-7 rounded-full bg-primary hover:bg-primary/90 text-background font-bold hover:scale-105 transition-transform">
                    LET'S TALK
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/brands">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 rounded-full border-2 border-foreground/20 text-foreground hover:bg-foreground/5 hover:scale-105 transition-transform font-bold">
                    FOR BRANDS
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="relative flex justify-center items-center animate-fade-in delay-300">
              {/* Money Elements Floating Around */}
              <div className="absolute -top-8 -left-8 text-4xl animate-bounce">💸</div>
              <div className="absolute top-16 -right-4 text-3xl animate-pulse delay-100">💰</div>
              <div className="absolute -bottom-4 left-8 text-3xl animate-bounce delay-200">🤑</div>
              <div className="absolute bottom-20 -right-8 text-2xl animate-pulse">💵</div>
              
              {/* Phone Frame */}
              <div className="relative w-[320px] h-[650px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Instagram Status Bar */}
                  <div className="bg-background px-6 py-3 flex justify-between items-center border-b border-border/50">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>

                  {/* Instagram Profile Header */}
                  <div className="px-4 py-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <Users className="w-10 h-10 text-background" />
                      </div>
                      <div className="flex gap-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">127</div>
                          <div className="text-xs text-muted-foreground">Posts</div>
                        </div>
                        <div className="text-center relative">
                          <div className="text-2xl font-bold text-primary">1.2K</div>
                          <div className="text-xs text-muted-foreground">Followers</div>
                          {/* Highlight Effect */}
                          <div className="absolute -inset-2 bg-primary/20 rounded-lg -z-10 animate-pulse"></div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">892</div>
                          <div className="text-xs text-muted-foreground">Following</div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="mb-4">
                      <h3 className="font-bold text-foreground mb-1">@college_creator</h3>
                      <p className="text-sm text-muted-foreground">Student Creator 📚✨</p>
                      <p className="text-sm text-muted-foreground">Making content & earning 💰</p>
                    </div>

                    {/* Earning Indicator */}
                    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">Monthly Earnings</span>
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-3xl font-black text-primary mb-1">$2,450</div>
                      <div className="text-xs text-muted-foreground">+32% from last month</div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-primary text-background font-bold py-3 rounded-xl mt-4 hover:bg-primary/90 transition-colors">
                      Start Earning
                    </button>
                  </div>
                </div>

                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground animate-fade-in">
            REVOLUTIONIZING
            <br />
            CREATOR MARKETING
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto animate-fade-in delay-100">
            We connect brands with networks of nano-influencers—college students with authentic voices and engaged audiences.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-10 rounded-3xl hover:border-primary/50 transition-all animate-fade-in delay-200">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-foreground">Authentic Content</h4>
              <p className="text-muted-foreground text-lg">Real students creating relatable content that resonates with Gen Z audiences.</p>
            </div>
            <div className="bg-card border border-border p-10 rounded-3xl hover:border-primary/50 transition-all animate-fade-in delay-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-foreground">Collective Power</h4>
              <p className="text-muted-foreground text-lg">Groups of nano-influencers combine for massive reach and impact.</p>
            </div>
            <div className="bg-card border border-border p-10 rounded-3xl hover:border-primary/50 transition-all animate-fade-in delay-400">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-foreground">Better ROI</h4>
              <p className="text-muted-foreground text-lg">Higher engagement rates at lower costs than traditional influencers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-foreground animate-fade-in">
            HOW IT WORKS
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group animate-fade-in delay-100">
              <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-background" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Build Networks</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We vet and group nano-influencers by niche, audience, and engagement quality to create powerful collective reach.
              </p>
            </div>
            <div className="group animate-fade-in delay-200">
              <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Megaphone className="w-12 h-12 text-background" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Match Brands</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Brands tell us their goals, and we connect them with creator networks that align with their target audience.
              </p>
            </div>
            <div className="group animate-fade-in delay-300">
              <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-12 h-12 text-background" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Launch Campaigns</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Creators produce authentic content, brands reach engaged audiences, and everyone wins with measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground animate-fade-in">
            READY TO START?
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in delay-100">
            Whether you're a student creator looking to monetize your following or a brand seeking authentic Gen Z engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center animate-scale-in delay-200">
            <Link to="/students" className="flex-1 max-w-md">
              <div className="bg-card border-2 border-border p-10 rounded-3xl hover:border-primary transition-all duration-300 cursor-pointer group h-full">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Users className="w-10 h-10 text-primary group-hover:text-background transition-colors" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">I'm a Creator</h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Start monetizing your social media presence
                </p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-background font-bold rounded-full py-6 group-hover:scale-105 transition-transform">
                  Join Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Link>
            <Link to="/brands" className="flex-1 max-w-md">
              <div className="bg-card border-2 border-border p-10 rounded-3xl hover:border-primary transition-all duration-300 cursor-pointer group h-full">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Megaphone className="w-10 h-10 text-primary group-hover:text-background transition-colors" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">I'm a Brand</h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Launch authentic campaigns with student creators
                </p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-background font-bold rounded-full py-6 group-hover:scale-105 transition-transform">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

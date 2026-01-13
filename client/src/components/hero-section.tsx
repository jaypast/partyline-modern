import { Link } from "wouter";
import { Phone, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Your voice matters.{" "}
                <span className="text-primary">We're listening.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Late nights, quiet afternoons, or just those moments when you need someone there. 
                PartyLine connects you with real people who genuinely want to hear your story.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call now to start</p>
                    <a 
                      href="tel:1-800-727-8954" 
                      className="font-serif text-2xl sm:text-3xl font-bold text-primary hover:underline"
                      data-testid="link-hero-phone"
                    >
                      1-800-PARTYLN
                    </a>
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-border" />
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">
                    Quick voice menu gets you connected in under 2 minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:1-800-727-8954">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14" data-testid="button-hero-call-now">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <Link href="/companions">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-14" data-testid="button-hero-browse">
                  Browse Companions
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Adults Only (18+)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Vetted Companions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Voice Only</span>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl bg-gradient-to-br from-card to-muted p-8 lg:p-10 border">
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-center">How It Works</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-background/50">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
                    <div>
                      <p className="font-medium">Call 1-800-PARTYLN</p>
                      <p className="text-sm text-muted-foreground">Our friendly voice menu answers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-background/50">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
                    <div>
                      <p className="font-medium">Tell us what you need</p>
                      <p className="text-sm text-muted-foreground">Pick a topic, type of companion</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-background/50">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
                    <div>
                      <p className="font-medium">Start talking</p>
                      <p className="text-sm text-muted-foreground">60 min free, or add a card for longer</p>
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-serif font-bold text-primary">60 min</p>
                    <p className="text-sm text-muted-foreground">Free calls</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-serif font-bold text-primary">$1-5</p>
                    <p className="text-sm text-muted-foreground">Per min after</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

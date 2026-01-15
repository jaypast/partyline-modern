import { Link } from "wouter";
import { Phone, Users, Shield, Clock, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card dark:bg-card/80 px-4 py-2 rounded-full border border-secondary/40 dark:border-secondary/60" data-testid="badge-free-trial">
                <span className="text-sm font-semibold text-secondary dark:text-secondary">Try it free</span>
                <span className="text-sm text-foreground dark:text-foreground/90">— Your first 60 minutes, no card required</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Real Conversations with{" "}
                <span className="text-primary">Interesting People</span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-foreground/75 leading-relaxed max-w-xl">
                Vetted companions. Voice only. Available right now.
              </p>
              <div className="inline-flex items-center gap-2" data-testid="badge-live-conversations">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/80">847 conversations happening now</span>
              </div>
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
                  Call Now — First Hour Free
                </Button>
              </a>
              <Link href="/companions">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-14" data-testid="button-hero-browse">
                  Or Browse Companions First
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2" data-testid="badge-available-24/7">
                <Clock className="h-4 w-4 text-accent dark:text-accent" />
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/70">Available 24/7</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-background-checked">
                <Shield className="h-4 w-4 text-accent dark:text-accent" />
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/70">Background Checked</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-adults-only">
                <Users className="h-4 w-4 text-accent dark:text-accent" />
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/70">Adults Only (18+)</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-first-hour-free">
                <Heart className="h-4 w-4 text-accent dark:text-accent" />
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/70">First Hour Free</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-voice-only">
                <Check className="h-4 w-4 text-accent dark:text-accent" />
                <span className="text-sm font-medium text-muted-foreground dark:text-foreground/70">Voice Only</span>
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
                    <p className="text-2xl font-serif font-bold text-primary">24/7</p>
                    <p className="text-sm text-muted-foreground">Available</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-serif font-bold text-primary">60 min</p>
                    <p className="text-sm text-muted-foreground">Free to start</p>
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

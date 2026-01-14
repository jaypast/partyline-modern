import { Heart, Clock, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Heart,
    title: "Someone to Talk To",
    description: "Real people who genuinely want to listen. When you feel lonely, we're here with a friendly voice—no bots, no scripts.",
  },
  {
    icon: Clock,
    title: "Talk to Someone Now",
    description: "Whether it's 3 AM or Sunday afternoon, companions are ready when you need someone to talk to.",
  },
  {
    icon: Shield,
    title: "Safe & Platonic",
    description: "Voice-only calls with vetted, background-checked companions. No video, no explicit content—just safe conversation.",
  },
  {
    icon: Users,
    title: "Zero Judgment",
    description: "Talk about your day, your worries, or nothing at all. Our phone line is for adults who just need a friendly ear.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Why People Choose Our Party Line
          </h2>
          <p className="text-lg text-muted-foreground">
            This isn't therapy, dating, or a crisis hotline. It's a phone chat line for adults who feel lonely and want someone to talk to—simple as that.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="hover-elevate" data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/20">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Heart, Clock, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Heart,
    title: "Genuine Listeners",
    description: "Real people who want to hear your story. No scripts, no bots—just authentic human connection.",
  },
  {
    icon: Clock,
    title: "Always Here",
    description: "Whether it's 3 AM or Sunday afternoon, someone is ready to talk when you are.",
  },
  {
    icon: Shield,
    title: "Safe & Confidential",
    description: "Every companion is vetted and background-checked. What you share stays between you.",
  },
  {
    icon: Users,
    title: "Zero Judgment",
    description: "Talk about your day, your worries, or nothing at all. We're here to listen, not to fix.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            More Than Just a Phone Call
          </h2>
          <p className="text-lg text-muted-foreground">
            This isn't speed dating, therapy, or a hotline. It's something simpler: a friendly voice when you need one.
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

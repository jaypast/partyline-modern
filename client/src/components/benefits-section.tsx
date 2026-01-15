import { Heart, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Whether it's 3 AM or Sunday afternoon, interesting people are ready to chat when you are.",
  },
  {
    icon: Shield,
    title: "Vetted Companions",
    description: "Every companion passes identity verification and background checks. Real people, verified.",
  },
  {
    icon: Heart,
    title: "First Hour Free",
    description: "No credit card needed. Try a conversation and see if it's for you—no strings attached.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Why People Choose PartyLine
          </h2>
          <p className="text-lg text-muted-foreground">
            Good conversation shouldn't be hard to find. We make it easy.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
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

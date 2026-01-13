import { Check, Phone, Clock, Star } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Free Calls",
    price: "$0",
    period: "up to 60 min",
    description: "Start talking at no cost. Really.",
    features: [
      "Full hour of conversation",
      "Interest-based matching",
      "Group calls up to 5",
      "No credit card needed",
    ],
    cta: "Start Free",
    href: "/companions",
    popular: false,
  },
  {
    name: "Extended Time",
    price: "$5",
    period: "per hour",
    description: "When one hour isn't enough.",
    features: [
      "Keep talking past 60 min",
      "Simple per-hour pricing",
      "No subscription required",
      "Pay only when you extend",
    ],
    cta: "Learn More",
    href: "#how-it-works",
    popular: true,
  },
  {
    name: "Premium Companions",
    price: "$1-5",
    period: "per minute",
    description: "Connect with your favorites.",
    features: [
      "Choose your companion",
      "Priority availability",
      "Schedule ahead",
      "Build lasting connections",
    ],
    cta: "Meet Companions",
    href: "/companions",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Honest, Simple Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Your first hour is free. After that, pay only for the time you want.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? "border-secondary" : ""}`}
              data-testid={`card-pricing-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <h3 className="font-serif text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl lg:text-5xl font-serif font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={plan.href}>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                    data-testid={`button-pricing-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone & Web
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Available 24/7
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              No Commitments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

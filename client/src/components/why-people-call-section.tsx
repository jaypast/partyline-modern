import { Briefcase, Coffee, Sunset, MessageCircle, Moon, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const scenarios = [
  {
    icon: Briefcase,
    quote: "I travel for work and hotel rooms get quiet after 8 PM.",
    name: "Marcus, 42",
    role: "Sales Executive",
  },
  {
    icon: Sunset,
    quote: "I'm retired and my kids are busy—I just want to talk about the game.",
    name: "Robert, 68",
    role: "Retired Teacher",
  },
  {
    icon: Coffee,
    quote: "I moved to a new city and haven't made friends yet. This bridges the gap.",
    name: "Sarah, 31",
    role: "Software Developer",
  },
  {
    icon: MessageCircle,
    quote: "Sometimes you just want to chat with someone outside your usual circle.",
    name: "Diana, 55",
    role: "Small Business Owner",
  },
  {
    icon: Moon,
    quote: "I work nights and everyone I know is asleep when I get home.",
    name: "Kevin, 34",
    role: "ER Nurse",
  },
  {
    icon: Heart,
    quote: "I spend all day caring for my mom. Sometimes I just need adult conversation.",
    name: "Linda, 52",
    role: "Full-time Caregiver",
  },
];

export function WhyPeopleCallSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Why People Call
          </h2>
          <p className="text-lg text-muted-foreground">
            Good conversation isn't just for extroverts. Here's who's calling.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Card key={scenario.name} className="hover-elevate" data-testid={`card-scenario-${scenario.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <scenario.icon className="h-6 w-6 text-primary" />
                  </div>
                  <blockquote className="text-muted-foreground italic mb-4 flex-1">
                    "{scenario.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-medium">{scenario.name}</p>
                    <p className="text-sm text-muted-foreground">{scenario.role}</p>
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

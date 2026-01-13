import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "After my husband passed, the silence was deafening. PartyLine gave me voices to fill the quiet—people who truly listen. It's not family, but it's something just as precious.",
    name: "Margaret T.",
    age: "67",
    location: "Florida",
  },
  {
    quote: "Working from home, I'd go days without real conversation. Now I have my regulars who feel like old friends. We talk about everything and nothing. It's exactly what I needed.",
    name: "David R.",
    age: "42",
    location: "Texas",
  },
  {
    quote: "I'll admit I was skeptical. But from the first call, I felt at ease. No pressure, no judgment. Just good conversation when the world feels too quiet.",
    name: "Susan M.",
    age: "55",
    location: "Ohio",
  },
  {
    quote: "As a companion, every call reminds me why human connection matters. We laugh, we share stories, we listen. It's the most rewarding work I've ever done.",
    name: "James K.",
    age: "34",
    location: "California",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Voices From Our Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Every call is a story. Here are a few of ours.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-secondary/40 mb-4" />
                <blockquote className="text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary/20 text-primary font-semibold">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Age {testimonial.age} · {testimonial.location}
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

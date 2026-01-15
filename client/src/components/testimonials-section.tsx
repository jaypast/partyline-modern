import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const customerTestimonials = [
  {
    quote: "I called expecting awkward small talk. Three hours later, I'd discussed everything from sourdough starters to whether the moon landing was worth it. Best random Tuesday I've had in years.",
    name: "Tom P.",
    age: "41",
    location: "Chicago",
  },
  {
    quote: "My wife says I talk too much about the Eagles. Now I have someone who actually wants to hear about the defensive line.",
    name: "Phil W.",
    age: "58",
    location: "Philadelphia",
  },
  {
    quote: "After my husband passed, the silence was deafening. PartyLine gave me voices to fill the quiet—people who truly listen. It's not family, but it's something just as precious.",
    name: "Margaret T.",
    age: "67",
    location: "Florida",
  },
];

const companionTestimonial = {
  quote: "As a companion, every call reminds me why human connection matters. We laugh, we share stories, we listen. It's the most rewarding work I've ever done.",
  name: "James K.",
  age: "34",
  location: "California",
};

export function TestimonialsSection() {
  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Voices From Our Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Every call is a story. Here are a few of ours.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {customerTestimonials.map((testimonial, index) => (
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

        <div className="mt-12">
          <h3 className="font-serif text-xl font-semibold text-center mb-6 text-muted-foreground">
            From Our Companions
          </h3>
          <Card className="max-w-2xl mx-auto border-secondary/30" data-testid="card-companion-testimonial">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-secondary/40 mb-4" />
              <blockquote className="text-lg leading-relaxed mb-6 italic">
                "{companionTestimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent/20 text-accent-foreground font-semibold">
                    {companionTestimonial.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{companionTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    PartyLine Companion · {companionTestimonial.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

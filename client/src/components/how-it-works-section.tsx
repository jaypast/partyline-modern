import { UserPlus, Search, Phone } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Call or Sign Up",
    description: "Dial 1-800-PARTYLN or create a quick profile online. Just a nickname and a few interests—we keep it simple.",
  },
  {
    icon: Search,
    title: "Find Someone to Talk To",
    description: "Tell us what you'd like to talk about. We'll connect you with a friendly, vetted companion who's ready to listen.",
  },
  {
    icon: Phone,
    title: "Talk to Someone Now",
    description: "Start your voice-only conversation instantly. Your first 60 minutes are free—no video, no explicit content.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            How Our Phone Chat Line Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Need someone to talk to? Our modern party line connects you with real people in under 2 minutes. No complicated setup—just conversation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center" data-testid={`step-${index + 1}`}>
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-secondary/20 mb-6">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              
              <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              
              <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

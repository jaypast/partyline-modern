import { Shield, UserCheck, Phone } from "lucide-react";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Background Checked",
    description: "Every companion passes identity verification and comprehensive background checks before they join.",
  },
  {
    icon: Shield,
    title: "Adults Only (18+)",
    description: "Age verification required. This is a platform for adults having real conversations.",
  },
  {
    icon: Phone,
    title: "Voice Only",
    description: "No video means no performance. No photos means no judgment. Just two people talking.",
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/20 mb-6">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            How We Keep It Real
          </h2>
          <p className="text-lg text-muted-foreground">
            Quality conversation requires quality people. Here's what we do.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-background border"
              data-testid={`safety-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="text-primary font-medium hover:underline"
            data-testid="link-safety-policies"
          >
            Read our full safety commitment
          </a>
        </div>
      </div>
    </section>
  );
}

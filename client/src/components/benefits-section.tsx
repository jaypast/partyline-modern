import { Heart, Clock, Shield, Check, Users } from "lucide-react";

const trustBadges = [
  { icon: Clock, label: "Available 24/7" },
  { icon: Shield, label: "Background Checked" },
  { icon: Users, label: "Adults Only (18+)" },
  { icon: Heart, label: "First Hour Free" },
  { icon: Check, label: "Voice Only" },
];

export function BenefitsSection() {
  return (
    <section className="py-8 border-b bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-muted-foreground"
              data-testid={`badge-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <badge.icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

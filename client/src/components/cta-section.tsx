import { Link } from "wouter";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 lg:p-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
          
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready When You Are
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Your first hour is free. No credit card, no pressure. 
              Just pick up the phone and start talking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-lg px-8 h-14"
                  data-testid="button-cta-get-started"
                >
                  Let's Talk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/companions">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8 h-14 border-white/30 text-white bg-white/10 backdrop-blur-sm"
                  data-testid="button-cta-browse"
                >
                  Meet Our Companions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

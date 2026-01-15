import { Link } from "wouter";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 lg:p-20 text-center">
          
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Your First Hour Is Free. Seriously.
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              No credit card. No commitment. Just pick up the phone.
            </p>
            
            <div className="flex flex-col gap-3 justify-center pt-4 max-w-sm mx-auto">
              <a href="tel:1-800-727-8954" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-white text-primary border-white"
                  data-testid="button-cta-call-now"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now — First Hour Free
                </Button>
              </a>
              <Link href="/companions" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/40 text-white bg-transparent"
                  data-testid="button-cta-browse"
                >
                  Or Browse Companions First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

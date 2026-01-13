import { Link } from "wouter";
import { Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">PartyLine</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
              Real voices. Real connection. A safe place to talk when you need someone to listen.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/companions" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-browse">
                  Meet Companions
                </Link>
              </li>
              <li>
                <Link href="/become-listener" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-become-listener">
                  Become a Listener
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-how-it-works">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Call Us</h3>
            <div className="space-y-4">
              <a
                href="tel:1-800-727-8954"
                className="inline-flex items-center gap-2 text-xl font-serif font-bold text-primary hover:underline"
                data-testid="link-footer-phone"
              >
                <Phone className="h-5 w-5" />
                1-800-PARTYLN
              </a>
              <p className="text-sm text-muted-foreground">
                Quick voice menu connects you in under 2 minutes
              </p>
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">In crisis? Please reach out:</p>
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  data-testid="link-crisis-hotline"
                >
                  <Heart className="h-4 w-4" />
                  988 Suicide & Crisis Lifeline
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PartyLine. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-primary" /> for connection
          </p>
        </div>
      </div>
    </footer>
  );
}

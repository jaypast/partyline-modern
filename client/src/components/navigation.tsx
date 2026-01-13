import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/companions", label: "Companions" },
  { href: "/become-listener", label: "Become a Listener" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight">PartyLine</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-base font-medium transition-colors hover-elevate rounded-md ${
                  location === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="default" data-testid="button-login">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="default" data-testid="button-get-started">
                  Let's Talk
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className="border-t lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover-elevate rounded-md"
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full" size="lg" data-testid="button-mobile-login">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="lg" data-testid="button-mobile-get-started">
                  Let's Talk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

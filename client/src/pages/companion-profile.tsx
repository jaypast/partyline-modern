import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Phone, Star, Clock, Globe, Calendar } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Companion } from "@shared/schema";

export default function CompanionProfile() {
  const [, params] = useRoute("/companion/:id");
  const companionId = params?.id;

  const { data: companion, isLoading } = useQuery<Companion>({
    queryKey: ["/api/companions", companionId],
    enabled: !!companionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-8 lg:py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-6">
                <Skeleton className="h-48 w-48 rounded-full mx-auto" />
                <Skeleton className="h-6 w-40 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!companion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-8 lg:py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Companion not found</h1>
            <p className="text-muted-foreground mb-6">The companion you're looking for doesn't exist.</p>
            <Link href="/companions">
              <Button data-testid="button-back-to-companions">Browse Companions</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const initials = companion.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <Link href="/companions">
            <Button variant="ghost" className="mb-8" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Companions
            </Button>
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 text-center lg:text-left">
              <div className="relative inline-block">
                <Avatar className="h-48 w-48 border-4 border-border mx-auto">
                  <AvatarImage src={companion.avatarUrl || undefined} alt={companion.name} />
                  <AvatarFallback className="text-5xl font-semibold bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {companion.isOnline && (
                  <span 
                    className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-status-online border-4 border-card"
                    data-testid="status-online"
                  />
                )}
              </div>

              <div>
                <h1 className="font-serif text-2xl font-bold" data-testid="text-companion-name">
                  {companion.name}
                </h1>
                <p className="text-muted-foreground">{companion.ageGroup}</p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-lg font-semibold">{companion.rating?.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({companion.totalCalls} calls)
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{companion.languages.join(", ")}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{companion.isOnline ? "Available now" : "Currently offline"}</span>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-3xl font-bold text-primary mb-2" data-testid="text-price">
                  ${companion.pricePerMinute.toFixed(2)}
                  <span className="text-base font-normal text-muted-foreground">/min</span>
                </p>
                <Button className="w-full" size="lg" data-testid="button-call-now">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full mt-2" size="lg" data-testid="button-schedule">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-bio">
                    {companion.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    {companion.bio}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {companion.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-base px-4 py-1">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">What to Expect</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Voice-only calls—no video or images for your privacy and comfort</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Friendly, platonic conversation—we're here to listen, not to judge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Flexible timing—talk for as long or short as you'd like</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Safe and respectful—all companions follow our community guidelines</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

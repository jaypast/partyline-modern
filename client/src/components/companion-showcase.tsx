import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CompanionCard } from "@/components/companion-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Companion } from "@shared/schema";

export function CompanionShowcase() {
  const { data: companions, isLoading } = useQuery<Companion[]>({
    queryKey: ["/api/companions"],
  });

  const featuredCompanions = companions?.slice(0, 3) || [];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
              Meet Some of Our Companions
            </h2>
            <p className="text-lg text-muted-foreground">
              Real people ready to listen. Each one vetted, each one genuine.
            </p>
          </div>
          <Link href="/companions">
            <Button variant="outline" className="shrink-0" data-testid="button-view-all-companions">
              See Everyone
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border rounded-xl space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCompanions.map((companion) => (
              <CompanionCard key={companion.id} companion={companion} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

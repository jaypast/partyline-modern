import { Link } from "wouter";
import { Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Companion } from "@shared/schema";

interface CompanionCardProps {
  companion: Companion;
}

export function CompanionCard({ companion }: CompanionCardProps) {
  const initials = companion.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-visible hover-elevate active-elevate-2 transition-all" data-testid={`card-companion-${companion.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={companion.avatarUrl || undefined} alt={companion.name} />
              <AvatarFallback className="text-xl font-serif font-semibold bg-secondary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            {companion.isOnline && (
              <span 
                className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-accent border-2 border-card"
                data-testid={`status-online-${companion.id}`}
              />
            )}
          </div>
          {companion.isOnline ? (
            <span className="text-xs font-medium text-accent" data-testid={`text-availability-${companion.id}`}>
              Available now
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground" data-testid={`text-availability-${companion.id}`}>
              Next available: 2 hours
            </span>
          )}

          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold" data-testid={`text-companion-name-${companion.id}`}>
              {companion.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-companion-tagline-${companion.id}`}>
              {companion.tagline}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium">{companion.rating?.toFixed(1)}</span>
            <span className="text-muted-foreground">
              · {Math.floor(Math.random() * 4) + 2} slots today
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            {companion.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {companion.interests.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{companion.interests.length - 3}
              </Badge>
            )}
          </div>

          <div className="w-full pt-2 space-y-3">
            <p className="text-2xl font-serif font-bold text-primary" data-testid={`text-price-${companion.id}`}>
              ${companion.pricePerMinute.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/min</span>
            </p>
            
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full" data-testid={`button-call-${companion.id}`}>
                <Phone className="h-4 w-4 mr-2" />
                Talk to {companion.name.split(" ")[0]}
              </Button>
              <Link href={`/companion/${companion.id}`} className="w-full">
                <Button variant="ghost" className="w-full text-muted-foreground" data-testid={`button-view-profile-${companion.id}`}>
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

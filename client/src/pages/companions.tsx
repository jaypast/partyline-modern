import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, X } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CompanionCard } from "@/components/companion-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Companion } from "@shared/schema";
import { interestTags, ageGroups } from "@shared/schema";


function FilterSidebar({
  selectedInterests,
  setSelectedInterests,
  selectedAgeGroup,
  setSelectedAgeGroup,
  onlineOnly,
  setOnlineOnly,
  priceRange,
  setPriceRange,
}: {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  selectedAgeGroup: string;
  setSelectedAgeGroup: (ageGroup: string) => void;
  onlineOnly: boolean;
  setOnlineOnly: (onlineOnly: boolean) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
}) {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-serif font-semibold text-lg">Availability</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="online-only"
            checked={onlineOnly}
            onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
            data-testid="checkbox-online-only"
          />
          <Label htmlFor="online-only" className="cursor-pointer">
            Online now only
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif font-semibold text-lg">Age Group</h3>
        <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
          <SelectTrigger data-testid="select-age-group">
            <SelectValue placeholder="All ages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ages</SelectItem>
            {ageGroups.map((age) => (
              <SelectItem key={age} value={age}>
                {age}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif font-semibold text-lg">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger data-testid="select-price-range">
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any price</SelectItem>
            <SelectItem value="low">Under $1.50/min</SelectItem>
            <SelectItem value="medium">$1.50 - $2.50/min</SelectItem>
            <SelectItem value="high">$2.50+/min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif font-semibold text-lg">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interestTags.map((interest) => (
            <Badge
              key={interest}
              variant={selectedInterests.includes(interest) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => toggleInterest(interest)}
              data-testid={`badge-interest-${interest.toLowerCase()}`}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Companions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [priceRange, setPriceRange] = useState("all");

  const { data: companions, isLoading } = useQuery<Companion[]>({
    queryKey: ["/api/companions"],
  });

  const displayCompanions = companions || [];

  const filteredCompanions = displayCompanions.filter((companion) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = companion.name.toLowerCase().includes(query);
      const matchesTagline = companion.tagline.toLowerCase().includes(query);
      const matchesInterests = companion.interests.some((i) =>
        i.toLowerCase().includes(query)
      );
      if (!matchesName && !matchesTagline && !matchesInterests) return false;
    }

    if (onlineOnly && !companion.isOnline) return false;

    if (selectedAgeGroup !== "all" && companion.ageGroup !== selectedAgeGroup) return false;

    if (selectedInterests.length > 0) {
      const hasMatchingInterest = companion.interests.some((i) =>
        selectedInterests.includes(i)
      );
      if (!hasMatchingInterest) return false;
    }

    if (priceRange !== "all") {
      if (priceRange === "low" && companion.pricePerMinute >= 1.5) return false;
      if (priceRange === "medium" && (companion.pricePerMinute < 1.5 || companion.pricePerMinute > 2.5)) return false;
      if (priceRange === "high" && companion.pricePerMinute < 2.5) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedInterests([]);
    setSelectedAgeGroup("all");
    setOnlineOnly(false);
    setPriceRange("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedInterests.length > 0 ||
    selectedAgeGroup !== "all" ||
    onlineOnly ||
    priceRange !== "all";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
              Find Your Voice
            </h1>
            <p className="text-lg text-muted-foreground">
              Every companion here has been vetted and is genuinely ready to listen. Take your time.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>

                <FilterSidebar
                  selectedInterests={selectedInterests}
                  setSelectedInterests={setSelectedInterests}
                  selectedAgeGroup={selectedAgeGroup}
                  setSelectedAgeGroup={setSelectedAgeGroup}
                  onlineOnly={onlineOnly}
                  setOnlineOnly={setOnlineOnly}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="w-full"
                    data-testid="button-clear-filters"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </aside>

            <div className="flex-1">
              <div className="lg:hidden flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-mobile"
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" data-testid="button-filters-mobile">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        selectedInterests={selectedInterests}
                        setSelectedInterests={setSelectedInterests}
                        selectedAgeGroup={selectedAgeGroup}
                        setSelectedAgeGroup={setSelectedAgeGroup}
                        onlineOnly={onlineOnly}
                        setOnlineOnly={setOnlineOnly}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                  {filteredCompanions.length} companion{filteredCompanions.length !== 1 ? "s" : ""} found
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="lg:hidden"
                    data-testid="button-clear-filters-mobile"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
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
              ) : filteredCompanions.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    No companions found matching your criteria.
                  </p>
                  <Button variant="outline" onClick={clearFilters} data-testid="button-clear-filters-empty">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCompanions.map((companion) => (
                    <CompanionCard key={companion.id} companion={companion} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

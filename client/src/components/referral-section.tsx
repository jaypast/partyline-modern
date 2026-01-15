import { Gift, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ReferralSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <Card className="overflow-hidden border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <Gift className="h-10 w-10 text-secondary" />
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold">
                  Give 60 Minutes, Get 60 Minutes
                </h3>
                <p className="text-muted-foreground text-lg">
                  Know someone who could use a friendly voice? Share PartyLine with them. 
                  When they try it, you both get an extra hour free.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Button size="lg" variant="secondary" className="text-lg px-6" data-testid="button-referral-share">
                  <Users className="mr-2 h-5 w-5" />
                  Share with a Friend
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

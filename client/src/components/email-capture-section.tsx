import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function EmailCaptureSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "You're on the list!",
      description: "We'll send you conversation tips and companion spotlights weekly.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="mx-auto max-w-2xl px-6 lg:px-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-2">
          Not Ready to Call?
        </h3>
        <p className="text-muted-foreground mb-6">
          Get conversation tips + companion spotlights weekly. No spam, unsubscribe anytime.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12"
            required
            data-testid="input-email-capture"
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-12"
            disabled={isSubmitting}
            data-testid="button-email-subscribe"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

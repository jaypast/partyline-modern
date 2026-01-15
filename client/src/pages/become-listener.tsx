import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mic, ArrowRight, ArrowLeft, Check, DollarSign, Heart, Users } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ageGroups, interestTags } from "@shared/schema";

const listenerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  ageGroup: z.enum(ageGroups, { required_error: "Please select your age group" }),
  tagline: z.string().min(10, "Tell us a bit more about yourself").max(100, "Keep it under 100 characters"),
  bio: z.string().min(50, "Please write at least 50 characters about yourself").max(500, "Keep it under 500 characters"),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  pricePerMinute: z.number().min(1, "Minimum $1 per minute").max(5, "Maximum $5 per minute"),
  backgroundCheck: z.boolean().refine(val => val === true, { message: "Background check consent is required" }),
  termsAccept: z.boolean().refine(val => val === true, { message: "You must accept the terms" }),
});

type ListenerForm = z.infer<typeof listenerSchema>;

const languages = ["English", "Spanish", "French", "German", "Mandarin", "Japanese", "Korean", "Portuguese", "Italian", "Arabic"];

export default function BecomeListener() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ListenerForm>({
    resolver: zodResolver(listenerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      ageGroup: undefined,
      tagline: "",
      bio: "",
      interests: [],
      languages: ["English"],
      pricePerMinute: 2,
      backgroundCheck: false,
      termsAccept: false,
    },
  });

  const onSubmit = async (data: ListenerForm) => {
    try {
      await apiRequest("POST", "/api/companions", {
        name: data.name,
        tagline: data.tagline,
        bio: data.bio,
        pricePerMinute: data.pricePerMinute,
        interests: data.interests,
        languages: data.languages,
        ageGroup: data.ageGroup,
        isOnline: false,
        totalCalls: 0,
        rating: 5.0,
      });

      toast({
        title: "Application Submitted",
        description: "We'll be in touch soon to complete your background check.",
      });

      setLocation("/");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const valid = await form.trigger(["name", "phone", "email", "ageGroup"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await form.trigger(["tagline", "bio", "interests", "languages"]);
      if (valid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest: string) => {
    const current = form.getValues("interests");
    if (current.includes(interest)) {
      form.setValue("interests", current.filter((i) => i !== interest), { shouldValidate: true });
    } else {
      form.setValue("interests", [...current, interest], { shouldValidate: true });
    }
  };

  const toggleLanguage = (lang: string) => {
    const current = form.getValues("languages");
    if (current.includes(lang)) {
      if (current.length > 1) {
        form.setValue("languages", current.filter((l) => l !== lang), { shouldValidate: true });
      }
    } else {
      form.setValue("languages", [...current, lang], { shouldValidate: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Mic className="h-4 w-4" />
              <span className="text-sm font-medium">Join Our Companion Network</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
              Get Paid to Have Great Conversations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn money as a phone companion. Voice-only, no explicit content, flexible hours. Set your own rate ($1-5/min) and connect with adults who appreciate good conversation.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
                <p className="font-serif font-semibold">Earn $1-5/min</p>
                <p className="text-sm text-muted-foreground">Set your own rate</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <p className="font-serif font-semibold">Make an Impact</p>
                <p className="text-sm text-muted-foreground">Help people connect</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="font-serif font-semibold">Flexible Hours</p>
                <p className="text-sm text-muted-foreground">Work when you want</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-lg px-6">
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-16 rounded-full transition-colors ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                  data-testid={`progress-step-${s}`}
                />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">
                  {step === 1 && "About You"}
                  {step === 2 && "Your Profile"}
                  {step === 3 && "Pricing & Agreement"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Let's start with the basics"}
                  {step === 2 && "Tell callers what makes you a great listener"}
                  {step === 3 && "Set your rate and complete the application"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                      <>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Your Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="How callers will see you"
                                  {...field}
                                  className="h-12"
                                  data-testid="input-listener-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="(555) 123-4567"
                                  {...field}
                                  className="h-12"
                                  data-testid="input-listener-phone"
                                />
                              </FormControl>
                              <FormDescription>We'll use this to connect you with callers</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  {...field}
                                  className="h-12"
                                  data-testid="input-listener-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Your Age Range</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12" data-testid="select-listener-age">
                                    <SelectValue placeholder="Select your age range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ageGroups.map((age) => (
                                    <SelectItem key={age} value={age}>
                                      {age}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <FormField
                          control={form.control}
                          name="tagline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Your Tagline</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 'A warm voice for your toughest days'"
                                  {...field}
                                  className="h-12"
                                  data-testid="input-listener-tagline"
                                />
                              </FormControl>
                              <FormDescription>A short intro that appears on your profile</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">About You</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell callers about yourself, your background, and why you love to listen..."
                                  {...field}
                                  className="min-h-32 resize-none"
                                  data-testid="input-listener-bio"
                                />
                              </FormControl>
                              <FormDescription>{field.value.length}/500 characters</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="interests"
                          render={() => (
                            <FormItem>
                              <FormLabel className="font-serif">Topics You Love to Discuss</FormLabel>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {interestTags.map((interest) => (
                                  <Button
                                    key={interest}
                                    type="button"
                                    variant={form.watch("interests").includes(interest) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleInterest(interest)}
                                    className="toggle-elevate"
                                    data-testid={`button-listener-interest-${interest.toLowerCase()}`}
                                  >
                                    {form.watch("interests").includes(interest) && (
                                      <Check className="mr-1 h-4 w-4" />
                                    )}
                                    {interest}
                                  </Button>
                                ))}
                              </div>
                              <FormDescription>Select at least 3 topics</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="languages"
                          render={() => (
                            <FormItem>
                              <FormLabel className="font-serif">Languages You Speak</FormLabel>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {languages.map((lang) => (
                                  <Button
                                    key={lang}
                                    type="button"
                                    variant={form.watch("languages").includes(lang) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleLanguage(lang)}
                                    className="toggle-elevate"
                                    data-testid={`button-listener-lang-${lang.toLowerCase()}`}
                                  >
                                    {form.watch("languages").includes(lang) && (
                                      <Check className="mr-1 h-4 w-4" />
                                    )}
                                    {lang}
                                  </Button>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <FormField
                          control={form.control}
                          name="pricePerMinute"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif">Your Rate Per Minute</FormLabel>
                              <div className="space-y-4">
                                <div className="text-center">
                                  <span className="font-serif text-4xl font-bold text-primary">
                                    ${field.value.toFixed(2)}
                                  </span>
                                  <span className="text-muted-foreground">/minute</span>
                                </div>
                                <FormControl>
                                  <Slider
                                    min={1}
                                    max={5}
                                    step={0.25}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="py-4"
                                    data-testid="slider-listener-price"
                                  />
                                </FormControl>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>$1.00</span>
                                  <span>$5.00</span>
                                </div>
                              </div>
                              <FormDescription>
                                You keep 70% of each paid minute. Free calls (up to 60 min) don't pay out.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="backgroundCheck"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-background-check"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="font-serif">
                                  I consent to a background check
                                </FormLabel>
                                <FormDescription>
                                  All companions must pass a background check before being listed
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="termsAccept"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-listener-terms"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="font-serif">
                                  I agree to the Companion Terms of Service
                                </FormLabel>
                                <FormDescription>
                                  Including the platonic-only and respectful communication policies
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      {step > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1"
                          data-testid="button-listener-prev"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="flex-1"
                          data-testid="button-listener-next"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={form.formState.isSubmitting}
                          data-testid="button-listener-submit"
                        >
                          {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

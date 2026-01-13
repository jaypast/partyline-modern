import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ageGroups, interestTags } from "@shared/schema";

const signupSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  ageGroup: z.enum(ageGroups, { required_error: "Please select your age group" }),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  ageConfirm: z.literal(true, { errorMap: () => ({ message: "You must confirm you are 18 or older" }) }),
  termsAccept: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: "",
      phone: "",
      email: "",
      ageGroup: undefined,
      interests: [],
      ageConfirm: undefined,
      termsAccept: undefined,
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await apiRequest("POST", "/api/users", {
        username: data.phone,
        password: "temp-password",
        nickname: data.nickname,
        phone: data.phone,
        email: data.email || null,
        ageGroup: data.ageGroup,
      });

      toast({
        title: "Welcome to PartyLine",
        description: "You're all set. Let's find someone to talk to.",
      });

      setLocation("/companions");
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
      const valid = await form.trigger(["nickname", "phone", "email"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await form.trigger(["ageGroup", "ageConfirm"]);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-lg px-6">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" data-testid="link-signup-logo">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="font-serif text-3xl font-bold mb-2">Join the Conversation</h1>
            <p className="text-muted-foreground">
              A few quick details and you'll be ready to connect.
            </p>
          </div>

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
                {step === 1 && "Tell Us About You"}
                {step === 2 && "Just Checking"}
                {step === 3 && "What Do You Like to Talk About?"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Nothing fancy, just the basics"}
                {step === 2 && "We need to make sure you're 18+"}
                {step === 3 && "Pick a few topics that interest you"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif">What should we call you?</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your nickname"
                                {...field}
                                className="h-14 text-lg"
                                data-testid="input-nickname"
                              />
                            </FormControl>
                            <FormDescription>
                              This is how companions will know you
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif">Your Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                {...field}
                                className="h-14 text-lg"
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormDescription>
                              We'll send you a quick verification
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif">Email (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                className="h-14 text-lg"
                                data-testid="input-email"
                              />
                            </FormControl>
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
                        name="ageGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif">What's your age range?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg" data-testid="select-age-group">
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

                      <FormField
                        control={form.control}
                        name="ageConfirm"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-age-confirm"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-serif">
                                I'm 18 years or older
                              </FormLabel>
                              <FormDescription>
                                PartyLine is for adults only
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                          <FormItem>
                            <FormLabel className="font-serif">Pick Your Interests</FormLabel>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {interestTags.map((interest) => (
                                <Button
                                  key={interest}
                                  type="button"
                                  variant={form.watch("interests").includes(interest) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleInterest(interest)}
                                  className="toggle-elevate"
                                  data-testid={`button-interest-${interest.toLowerCase()}`}
                                >
                                  {form.watch("interests").includes(interest) && (
                                    <Check className="mr-1 h-4 w-4" />
                                  )}
                                  {interest}
                                </Button>
                              ))}
                            </div>
                            <FormDescription>
                              These help us match you with the right companions
                            </FormDescription>
                            <FormMessage />
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
                                data-testid="checkbox-terms"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-serif">
                                I agree to the Terms and Privacy Policy
                              </FormLabel>
                              <FormDescription>
                                This is a platonic, respectful community
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
                        data-testid="button-prev-step"
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
                        data-testid="button-next-step"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-create-account"
                      >
                        {form.formState.isSubmitting ? "Creating..." : "Let's Talk"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline" data-testid="link-login">
              Welcome back
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

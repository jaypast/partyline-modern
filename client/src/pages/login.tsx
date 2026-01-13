import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
  code: z.string().min(4, "Please enter the verification code"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    toast({
      title: "Welcome back",
      description: "Good to hear your voice again.",
    });
    setLocation("/companions");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-lg px-6">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" data-testid="link-login-logo">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="font-serif text-3xl font-bold mb-2">Good to See You</h1>
            <p className="text-muted-foreground">
              Pick up right where you left off.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Sign In</CardTitle>
              <CardDescription>
                We'll text you a quick verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            className="h-14 text-lg"
                            data-testid="input-login-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-serif">Verification Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter 6-digit code"
                            {...field}
                            className="h-14 text-lg"
                            data-testid="input-login-code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-login-submit"
                  >
                    {form.formState.isSubmitting ? "Signing in..." : "Let's Talk"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New here?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline" data-testid="link-signup">
              Join us
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

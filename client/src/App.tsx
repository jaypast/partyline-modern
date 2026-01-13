import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import Companions from "@/pages/companions";
import CompanionProfile from "@/pages/companion-profile";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import BecomeListener from "@/pages/become-listener";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/companions" component={Companions} />
      <Route path="/companion/:id" component={CompanionProfile} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/become-listener" component={BecomeListener} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="partyline-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

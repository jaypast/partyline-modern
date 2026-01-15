import { Phone, Clock, Shield, Users, DollarSign, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does this phone party line work?",
    answer: "It's simple: call 1-800-PARTYLN or use our web app. Our friendly voice menu will ask who you'd like to talk to and what topics interest you. Within 2 minutes, you'll be connected with a real person who genuinely wants to listen and chat.",
    icon: Phone,
  },
  {
    question: "Can I talk to someone right now?",
    answer: "Yes! Our companions are available around the clock. Just call 1-800-PARTYLN or browse our online companions to find someone who's online and ready to talk. Your first 60 minutes are completely free.",
    icon: Clock,
  },
  {
    question: "Is Party Line Modern anonymous?",
    answer: "Your privacy matters to us. You can use a nickname, and we never share your personal information. All calls are voice-only—no video, no photos, no file sharing. Just genuine conversation.",
    icon: Lock,
  },
  {
    question: "How much does it cost to talk?",
    answer: "Your first 60 minutes are free. After that, premium companions set their own rates—browse our companion profiles to see individual prices. You can add a card during your call to continue, or hang up anytime—no pressure, no commitments.",
    icon: DollarSign,
  },
  {
    question: "Who are the companions?",
    answer: "Our companions are friendly, vetted adults who enjoy conversation and genuinely want to help. Every companion passes a background check and agrees to our community guidelines. They're here to listen, chat, and be a friendly voice when you need one.",
    icon: Users,
  },
  {
    question: "Is this safe for adults?",
    answer: "Absolutely. Party Line Modern is 18+ only with age verification. We have zero tolerance for explicit content or harassment. All companions are background-checked, and our platform is designed for safe, platonic conversation.",
    icon: Shield,
  },
  {
    question: "Is this… a sex thing?",
    answer: "No. PartyLine is voice-only, platonic conversation. No explicit content, no exceptions. We're the opposite of that—we're where you go when you want a real conversation, not a performance. Think of it as a phone call with an interesting stranger who actually wants to listen.",
    icon: Phone,
  },
];

export function FAQSection() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30" id="faq">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold">
            Questions? We've Got Answers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about talking to someone on the phone through Party Line Modern.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6"
              data-testid={`accordion-faq-${index}`}
            >
              <AccordionTrigger className="text-left py-6 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <faq.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-base lg:text-lg">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-14 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

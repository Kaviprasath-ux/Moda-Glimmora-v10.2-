import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadgeGrid } from "@/components/shared/TrustBadge";
import { SITE_NAME } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-muted" />
            <span className="font-display text-xl font-semibold text-noir">
              {SITE_NAME}
            </span>
          </div>
          <Link href="/signin">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-display text-display-xl text-noir animate-fade-in">
            Fashion Intelligence,
            <br />
            <span className="text-gradient-gold">Not Fashion Commerce.</span>
          </h1>

          <div className="bg-surface-elevated rounded-xl border border-sand/50 p-8 shadow-moda-md animate-slide-up">
            <p className="font-display text-2xl text-noir mb-6">
              We don&apos;t sell fashion.
              <br />
              We understand it.
            </p>

            <p className="text-stone leading-relaxed mb-8">
              ModaGlimmora is a Fashion Intelligence Platform that:
            </p>

            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-gold-muted mt-1">✦</span>
                <span className="text-noir">Learns your unique style identity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-muted mt-1">✦</span>
                <span className="text-noir">Provides availability intelligence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-muted mt-1">✦</span>
                <span className="text-noir">Offers cultural brand exploration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-muted mt-1">✦</span>
                <span className="text-noir">Enables silent, considered commerce</span>
              </li>
            </ul>

            <Link href="/create">
              <Button size="lg" className="gap-2">
                Begin Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Principles */}
      <section className="bg-ivory-warm py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl text-noir text-center mb-10">
            Trust Principles
          </h2>
          <TrustBadgeGrid className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Not E-Commerce */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-display text-display-sm text-noir">
            Not E-Commerce
          </h2>
          <p className="text-stone leading-relaxed">
            ModaGlimmora is not like Net-a-Porter, Farfetch, or any shopping
            platform. We are fashion intelligence infrastructure — comparable to
            Bloomberg for finance or Palantir for data.
          </p>
          <blockquote className="font-display text-xl text-gold-deep italic pt-4">
            &ldquo;When fashion stops guessing — intelligence begins.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand/50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs text-stone text-center">
            © {new Date().getFullYear()} Baarez Technology Solutions Pvt. Ltd.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

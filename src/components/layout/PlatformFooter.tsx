"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE_NAME, NAVIGATION } from "@/lib/constants";

export function PlatformFooter() {
  return (
    <footer className="border-t border-sand/50 bg-ivory-warm">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-muted" />
              <span className="font-display text-xl font-semibold text-noir">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-sm text-stone max-w-xs">
              Fashion Intelligence Platform. We don&apos;t sell fashion — we
              understand it.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-noir">Platform</h4>
              <div className="flex flex-col gap-2">
                {NAVIGATION.main.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-stone hover:text-noir transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/selections"
                  className="text-sm text-stone hover:text-noir transition-colors"
                >
                  Wishlist
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-noir">Legal</h4>
              <div className="flex flex-col gap-2">
                {NAVIGATION.footer.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-stone hover:text-noir transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sand/50">
          <p className="text-xs text-stone text-center">
            © {new Date().getFullYear()} Baarez Technology Solutions Pvt. Ltd.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

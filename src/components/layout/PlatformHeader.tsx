"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, User, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAVIGATION, SITE_NAME } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";

export function PlatformHeader() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand/50 bg-surface-base/95 backdrop-blur supports-[backdrop-filter]:bg-surface-base/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-muted" />
            <span className="font-display text-xl font-semibold text-noir">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-noir",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-noir"
                      : "text-stone"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/account">
                <Avatar className="h-9 w-9 border border-sand">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-sand text-stone text-xs">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-sand/50">
            <div className="flex flex-col gap-3">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium px-2 py-2 rounded-lg transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-noir bg-sand-light"
                      : "text-stone hover:text-noir hover:bg-sand-light"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

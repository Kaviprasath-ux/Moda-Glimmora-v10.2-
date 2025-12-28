import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Sparkles className="h-5 w-5 text-gold-muted" />
          <span className="font-display text-xl font-semibold text-noir">
            {SITE_NAME}
          </span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6">
        <p className="text-xs text-stone text-center">
          © {new Date().getFullYear()} Baarez Technology Solutions Pvt. Ltd.
        </p>
      </footer>
    </div>
  );
}

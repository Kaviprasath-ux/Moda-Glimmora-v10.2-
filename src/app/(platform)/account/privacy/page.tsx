"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountPrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Privacy Controls</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Controls</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone space-y-3 leading-relaxed">
          <p>
            Manage consent, visibility, retention, and data-sharing controls.
          </p>
          <p>
            Review the platform’s trust posture and policies:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/trust">
              <Button variant="secondary" size="sm">Trust Principles</Button>
            </Link>
            <Link href="/privacy">
              <Button variant="secondary" size="sm">Privacy Policy</Button>
            </Link>
            <Link href="/terms">
              <Button variant="secondary" size="sm">Terms</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



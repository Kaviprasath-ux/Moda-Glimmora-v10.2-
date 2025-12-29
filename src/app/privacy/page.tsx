import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-display text-display-md text-noir">Privacy Policy</h1>
        <p className="text-stone">
          {SITE_NAME} is built around privacy-first intelligence and user control.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Core Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-stone leading-relaxed">
          <p>
            ModaGlimmora is intelligence infrastructure. We collect the minimum data needed to
            provide fashion intelligence, and you remain in control.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personalization is optional and configurable.</li>
            <li>You can reset or delete your intelligence at any time.</li>
            <li>No dark patterns. No artificial urgency.</li>
            <li>No sale of personal data.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Notice</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone leading-relaxed">
          Availability, pricing, and provenance signals are presented as intelligence and may vary by
          geography and time. You remain in control of preferences and memory.
        </CardContent>
      </Card>
    </div>
  );
}



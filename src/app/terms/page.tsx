import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-display text-display-md text-noir">Terms of Service</h1>
        <p className="text-stone">
          These terms describe how {SITE_NAME} provides intelligence and user-controlled workflows.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Intelligence, Not Guarantees</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone leading-relaxed space-y-3">
          <p>
            ModaGlimmora provides fashion intelligence and availability probability signals. It does
            not guarantee availability, delivery times, fit outcomes, or commercial results.
          </p>
          <p>
            “Begin Acquisition” is a user-controlled workflow and requires explicit confirmation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">User Control</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone leading-relaxed">
          You can modify or delete your data and preferences at any time in Account settings.
        </CardContent>
      </Card>
    </div>
  );
}



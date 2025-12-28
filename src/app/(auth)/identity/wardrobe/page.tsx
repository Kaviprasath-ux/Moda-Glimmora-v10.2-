"use client";

import { useRouter } from "next/navigation";
import { Upload, Link as LinkIcon, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIdentityStore } from "@/stores/identityStore";

export default function WardrobePage() {
  const router = useRouter();
  const { completeStep } = useIdentityStore();

  const handleNext = () => {
    completeStep("wardrobe");
    router.push("/identity/preferences");
  };

  const handleSkip = () => {
    completeStep("wardrobe");
    router.push("/identity/preferences");
  };

  const importOptions = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Upload Photos",
      description: "Share photos of your current wardrobe",
    },
    {
      icon: <LinkIcon className="h-6 w-6" />,
      title: "Connect Retailers",
      description: "Import purchase history from connected stores",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Take Photos",
      description: "Photograph items directly with your camera",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-sm text-noir">
          Wardrobe Context
        </h1>
        <p className="text-stone">
          Share your existing wardrobe so we can provide better styling intelligence.
        </p>
      </div>

      <div className="space-y-4">
        {importOptions.map((option, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:border-gold-soft/50 transition-colors"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-lg bg-sand-light flex items-center justify-center text-stone">
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-noir">{option.title}</h3>
                <p className="text-sm text-stone">{option.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-stone" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-ivory-warm rounded-xl p-6 text-center">
        <p className="text-sm text-stone mb-2">
          Your wardrobe data helps us:
        </p>
        <ul className="text-sm text-noir space-y-1">
          <li>• Identify gaps in your wardrobe</li>
          <li>• Suggest items that pair with what you own</li>
          <li>• Build complete outfit combinations</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button onClick={handleNext}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

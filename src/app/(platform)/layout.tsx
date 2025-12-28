import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { PlatformFooter } from "@/components/layout/PlatformFooter";
import { FloatingAgent } from "@/components/layout/FloatingAgent";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <PlatformHeader />
      <main className="flex-1">{children}</main>
      <PlatformFooter />
      <FloatingAgent />
    </div>
  );
}

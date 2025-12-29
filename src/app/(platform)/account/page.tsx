"use client";

import Link from "next/link";
import { User, Sparkles, Shield, Database, Calendar, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const ACCOUNT_LINKS = [
  {
    href: "/account/identity",
    icon: <User className="h-5 w-5" />,
    title: "Fashion Identity",
    description: "Your style philosophy, cultural affinities, and preferences",
  },
  {
    href: "/account/agent",
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI Agent Configuration",
    description: "Proactivity, alerts, and communication preferences",
  },
  {
    href: "/account/memory",
    icon: <Sparkles className="h-5 w-5" />,
    title: "Agent Memory",
    description: "View, edit, and reset what the agent learns",
  },
  {
    href: "/account/calendar",
    icon: <Calendar className="h-5 w-5" />,
    title: "Calendar",
    description: "Connect events for automatic preparation",
  },
  {
    href: "/account/privacy",
    icon: <Shield className="h-5 w-5" />,
    title: "Privacy Controls",
    description: "Data sharing, visibility, and consent settings",
  },
  {
    href: "/account/data",
    icon: <Database className="h-5 w-5" />,
    title: "Data Management",
    description: "Export or delete your data",
  },
];

export default function AccountPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-display text-display-md text-noir mb-8">Account</h1>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-display text-xl font-medium text-noir">{user?.name}</h2>
              <p className="text-stone">{user?.email}</p>
              <p className="text-xs text-stone mt-1">Member since {user?.createdAt}</p>
            </div>
            <Link href="/account/identity">
              <Button variant="secondary" size="sm">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Account Links */}
      <div className="space-y-3">
        {ACCOUNT_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-moda-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-sand-light flex items-center justify-center text-stone">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-noir">{link.title}</h3>
                  <p className="text-sm text-stone">{link.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-stone" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      <div className="mt-12 pt-6 border-t border-sand/50">
        <Button
          variant="ghost"
          className="text-error gap-2"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

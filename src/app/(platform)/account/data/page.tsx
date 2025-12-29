"use client";

import { useState } from "react";
import { Database, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEYS = [
  "moda-auth",
  "moda-selections",
  "moda-identity",
  "moda-discovery-preferences",
  "moda-calendar",
  "moda-availability-subs",
  "moda-agent-memory",
  "moda-feedback",
];

export default function AccountDataPage() {
  const [message, setMessage] = useState<string>("");

  const exportData = () => {
    try {
      const payload: Record<string, unknown> = {};
      for (const key of STORAGE_KEYS) {
        payload[key] = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "modaglimmora-export.json";
      a.click();
      URL.revokeObjectURL(url);
      setMessage("Exported your data.");
    } catch {
      setMessage("Export failed.");
    }
  };

  const deleteData = () => {
    for (const key of STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
    setMessage("Deleted your local data. Refreshing…");
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Data Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-stone">
            Exports data stored in your browser for this environment.
          </p>
          <Button variant="secondary" className="gap-2" onClick={exportData}>
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </CardContent>
      </Card>

      <Card className="border-error-soft/40">
        <CardHeader>
          <CardTitle className="text-base">Delete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-stone">
            Clears locally stored data in your browser for this environment.
          </p>
          <Button variant="ghost" className="text-error gap-2" onClick={deleteData}>
            <Trash2 className="h-4 w-4" />
            Delete Local Data
          </Button>
          {message && <p className="text-xs text-stone">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}



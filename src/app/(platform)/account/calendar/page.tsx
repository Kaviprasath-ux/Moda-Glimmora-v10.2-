"use client";

import { useMemo, useState } from "react";
import { Calendar, Upload, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalendarStore } from "@/stores/calendarStore";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AccountCalendarPage() {
  const { events, selectedEventId, importICS, loadExampleEvents, clear, selectEvent } =
    useCalendarStore();
  const [status, setStatus] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const selected = useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? null,
    [events, selectedEventId]
  );

  const handleFile = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    const res = importICS(text);
    setStatus(`Imported ${res.imported} upcoming events.`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Calendar</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connect your calendar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-stone leading-relaxed">
          <p>
            Import a calendar file (.ics) to enable automatic event-based preparation. We only use
            event title, time, and optional location to generate outfit directions.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="file"
                accept=".ics,text/calendar"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
              <Button variant="secondary" className="gap-2" type="button">
                <Upload className="h-4 w-4" />
                Import .ics
              </Button>
            </label>
            <Button
              variant="secondary"
              className="gap-2"
              type="button"
              onClick={() => {
                loadExampleEvents();
                setStatus("Loaded example upcoming events.");
              }}
            >
              <Sparkles className="h-4 w-4" />
              Use example events
            </Button>
            <Button
              variant="ghost"
              className="text-error gap-2"
              type="button"
              onClick={() => {
                clear();
                setStatus("Cleared calendar events.");
              }}
              disabled={events.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
          {status && <p className="text-xs text-stone">{status}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.length === 0 ? (
            <p className="text-sm text-stone">No events imported yet.</p>
          ) : (
            <div className="space-y-2">
              {events.slice(0, showAll ? events.length : 15).map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => selectEvent(evt.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    evt.id === selectedEventId
                      ? "border-noir bg-sand-light"
                      : "border-sand hover:border-gold-soft/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-noir">{evt.title}</p>
                      <p className="text-xs text-stone">{formatDateTime(evt.start)}</p>
                      {evt.location && <p className="text-xs text-stone">Location: {evt.location}</p>}
                    </div>
                    {evt.id === selectedEventId && (
                      <span className="text-xs px-2 py-1 rounded-full bg-noir text-ivory-cream">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {events.length > 15 && (
            <div className="pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Show less" : `Show all (${events.length})`}
              </Button>
            </div>
          )}

          {selected && (
            <div className="pt-3 border-t border-sand/50 text-sm text-stone">
              Default event used for preparation:{" "}
              <span className="text-noir font-medium">{selected.title}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



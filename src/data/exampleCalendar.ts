import type { CalendarEvent } from "@/types";

export function createExampleCalendarEvents(now = Date.now()): CalendarEvent[] {
  const day = 24 * 60 * 60 * 1000;
  const mk = (offsetMs: number) => new Date(now + offsetMs).toISOString();

  const events: CalendarEvent[] = [
    {
      id: "evt_example_client_meeting",
      title: "Client meeting",
      start: mk(day + 9 * 60 * 60 * 1000),
      end: mk(day + 10 * 60 * 60 * 1000),
      location: "Downtown",
      description: "External meeting — professional, confident, understated.",
      source: "ics_import",
    },
    {
      id: "evt_example_gallery_opening",
      title: "Gallery opening",
      start: mk(3 * day + 19 * 60 * 60 * 1000),
      end: mk(3 * day + 22 * 60 * 60 * 1000),
      location: "City gallery",
      description: "Evening cultural setting — refined presence.",
      source: "ics_import",
    },
    {
      id: "evt_example_travel",
      title: "Weekend trip",
      start: mk(10 * day + 8 * 60 * 60 * 1000),
      end: mk(12 * day + 18 * 60 * 60 * 1000),
      location: "Airport",
      description: "Travel capsule — comfortable, elegant, packable layers.",
      source: "ics_import",
    },
    {
      id: "evt_example_wedding",
      title: "Wedding reception",
      start: mk(20 * day + 17 * 60 * 60 * 1000),
      end: mk(20 * day + 23 * 60 * 60 * 1000),
      location: "Venue",
      description: "Special occasion — formal, culturally appropriate, discreet luxury.",
      source: "ics_import",
    },
  ];

  return events.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}



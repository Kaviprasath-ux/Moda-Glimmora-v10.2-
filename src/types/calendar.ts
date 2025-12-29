export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO
  end: string | null; // ISO
  location: string | null;
  description: string | null;
  source: "ics_import";
}



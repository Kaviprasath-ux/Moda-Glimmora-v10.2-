import type { CalendarEvent } from "@/types";

function parseICalDate(value: string): string | null {
  // Supports:
  // - 20260130
  // - 20260130T183000Z
  // - 20260130T183000
  const v = value.trim();
  if (!v) return null;

  if (/^\d{8}$/.test(v)) {
    // All-day date → treat as local midnight.
    const y = v.slice(0, 4);
    const m = v.slice(4, 6);
    const d = v.slice(6, 8);
    return new Date(`${y}-${m}-${d}T00:00:00`).toISOString();
  }

  if (/^\d{8}T\d{6}Z$/.test(v)) {
    const y = v.slice(0, 4);
    const m = v.slice(4, 6);
    const d = v.slice(6, 8);
    const hh = v.slice(9, 11);
    const mm = v.slice(11, 13);
    const ss = v.slice(13, 15);
    return new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}Z`).toISOString();
  }

  if (/^\d{8}T\d{6}$/.test(v)) {
    const y = v.slice(0, 4);
    const m = v.slice(4, 6);
    const d = v.slice(6, 8);
    const hh = v.slice(9, 11);
    const mm = v.slice(11, 13);
    const ss = v.slice(13, 15);
    // Floating local time
    return new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}`).toISOString();
  }

  return null;
}

function unfoldLines(text: string): string[] {
  // RFC 5545 line unfolding: lines beginning with space/tab are continuations.
  const raw = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const out: string[] = [];
  for (const line of raw) {
    if (!line) continue;
    if ((line.startsWith(" ") || line.startsWith("\t")) && out.length > 0) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

function getValue(line: string): string {
  const idx = line.indexOf(":");
  if (idx === -1) return "";
  return line.slice(idx + 1);
}

export function parseICS(text: string): CalendarEvent[] {
  const lines = unfoldLines(text);
  const events: CalendarEvent[] = [];

  let inEvent = false;
  let uid: string | null = null;
  let summary: string | null = null;
  let dtStart: string | null = null;
  let dtEnd: string | null = null;
  let location: string | null = null;
  let description: string | null = null;

  const flush = () => {
    if (!uid && !summary && !dtStart) return;
    if (!dtStart) return;
    const id = uid || `evt_${summary || "event"}_${dtStart}`;
    events.push({
      id,
      title: summary || "Event",
      start: dtStart,
      end: dtEnd,
      location: location || null,
      description: description || null,
      source: "ics_import",
    });
  };

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      uid = null;
      summary = null;
      dtStart = null;
      dtEnd = null;
      location = null;
      description = null;
      continue;
    }
    if (line === "END:VEVENT") {
      flush();
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith("UID")) uid = getValue(line).trim() || uid;
    if (line.startsWith("SUMMARY")) summary = getValue(line).trim() || summary;
    if (line.startsWith("DTSTART")) dtStart = parseICalDate(getValue(line)) || dtStart;
    if (line.startsWith("DTEND")) dtEnd = parseICalDate(getValue(line)) || dtEnd;
    if (line.startsWith("LOCATION")) location = getValue(line).trim() || location;
    if (line.startsWith("DESCRIPTION")) description = getValue(line).trim() || description;
  }

  const now = Date.now();
  return events
    .filter((e) => !Number.isNaN(Date.parse(e.start)))
    .filter((e) => Date.parse(e.start) >= now - 1000 * 60 * 60 * 24) // keep from yesterday onward
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}



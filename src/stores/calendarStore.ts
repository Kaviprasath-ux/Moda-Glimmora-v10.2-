import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parseICS } from "@/lib/ics";
import type { CalendarEvent } from "@/types";
import { createExampleCalendarEvents } from "@/data/exampleCalendar";

interface CalendarState {
  events: CalendarEvent[];
  selectedEventId: string | null;
  loadExampleEvents: () => void;
  importICS: (icsText: string) => { imported: number };
  clear: () => void;
  selectEvent: (eventId: string | null) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: [],
      selectedEventId: null,
      loadExampleEvents: () => {
        const events = createExampleCalendarEvents();
        set({ events, selectedEventId: events[0]?.id ?? null });
      },
      importICS: (icsText) => {
        const events = parseICS(icsText);
        set({ events, selectedEventId: events[0]?.id ?? null });
        return { imported: events.length };
      },
      clear: () => set({ events: [], selectedEventId: null }),
      selectEvent: (selectedEventId) => set({ selectedEventId }),
    }),
    { name: "moda-calendar" }
  )
);



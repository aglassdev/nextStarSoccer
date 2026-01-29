import { functions } from "./appwrite";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  dateOnly?: boolean;
}

export const isEventCancelled = (event: CalendarEvent): boolean => {
  if (!event.description) return false;

  const desc = event.description.trim().toLowerCase();
  const cancelVariants = [
    "cancel",
    "cancelled",
    "canceled",
    "cancellation",
    "event cancelled",
    "event canceled",
    "session cancelled",
    "session canceled",
  ];

  if (cancelVariants.includes(desc)) {
    return true;
  }

  if (desc.startsWith("cancel")) {
    return true;
  }

  const words = desc.split(/\s+/);
  return words.some(
    (word) =>
      word === "cancel" ||
      word === "cancelled" ||
      word === "canceled" ||
      word === "cancellation"
  );
};

class GoogleCalendarService {
  private readonly FUNCTION_ID = "68c373b50026f961bdc4";

  private transformCalendarEvent(rawEvent: any): CalendarEvent {
    const title = rawEvent.summary || rawEvent.title || "Untitled Event";

    let startDateTime: string;
    let endDateTime: string;
    let dateOnly = false;

    if (rawEvent.start) {
      if (rawEvent.start.dateTime) {
        startDateTime = rawEvent.start.dateTime;
      } else if (rawEvent.start.date) {
        startDateTime = rawEvent.start.date + "T00:00:00";
        dateOnly = true;
      } else {
        startDateTime = new Date().toISOString();
      }
    } else {
      startDateTime = new Date().toISOString();
    }

    if (rawEvent.end) {
      if (rawEvent.end.dateTime) {
        endDateTime = rawEvent.end.dateTime;
      } else if (rawEvent.end.date) {
        endDateTime = rawEvent.end.date + "T23:59:59";
        dateOnly = true;
      } else {
        endDateTime = new Date().toISOString();
      }
    } else {
      endDateTime = new Date().toISOString();
    }

    return {
      id: rawEvent.id || `event-${Date.now()}`,
      title: title,
      description: rawEvent.description || undefined,
      location: rawEvent.location || undefined,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      dateOnly: dateOnly,
    };
  }

  async getEventsForMonth(
    year: number,
    month: number,
    calendarType: "public" | "private" = "public"
  ): Promise<CalendarEvent[]> {
    try {
      console.log(`🔍 Fetching ${calendarType} events for ${year}-${month + 1}`);

      const payload = {
        service: "google-calendar",
        action: "getEventsForMonth",
        year,
        month,
        calendarType,
      };

      console.log("📤 Payload:", JSON.stringify(payload));

      const response = await functions.createExecution(
        this.FUNCTION_ID,
        JSON.stringify(payload),
        false,
        "/",
        "POST"
      );

      console.log(`📬 Status: ${response.status}, Code: ${response.responseStatusCode}`);

      if (response.status !== "completed" || response.responseStatusCode !== 200) {
        console.error("❌ Function failed");
        return [];
      }

      const result = JSON.parse(response.responseBody);

      if (!result.success) {
        console.error("❌ API error:", result.error);
        return [];
      }

      const rawEvents = result.data || [];
      console.log(`✅ Got ${rawEvents.length} raw events`);

      const events = rawEvents.map((e: any) => this.transformCalendarEvent(e));
      return events;
    } catch (error) {
      console.error("❌ Error:", error);
      return [];
    }
  }

  formatEventDateTime(startDateTime: string, endDateTime: string, dateOnly: boolean) {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (dateOnly) {
      return {
        date: startDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: "All Day",
        shortDate: startDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      };
    }

    const date = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const time = `${startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })} - ${endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;

    const shortDate = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { date, time, shortDate };
  }

  async getTodaysEvents(): Promise<CalendarEvent[]> {
    const now = new Date();
    const events = await this.getEventsForMonth(now.getFullYear(), now.getMonth());
    const today = now.toISOString().split("T")[0];
    return events.filter((event) => event.startDateTime.split("T")[0] === today);
  }

  async getCurrentMonthEvents(): Promise<CalendarEvent[]> {
    const now = new Date();
    return await this.getEventsForMonth(now.getFullYear(), now.getMonth());
  }
}

export const googleCalendarService = new GoogleCalendarService();
export default googleCalendarService;

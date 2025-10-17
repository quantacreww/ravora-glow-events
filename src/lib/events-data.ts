export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  location: string;
}

export const eventsData: Event[] = [
  {
    id: "e-oct-26",
    title: "Sunday Glow — Special Night",
    date: "Oct 26, 2025",
    time: "8 PM - 1 AM",
    description: "Signature cocktails, curated sound, and neon-dark ambience.",
    image: "event-1",
    location: "Hyderabad",
  },
];

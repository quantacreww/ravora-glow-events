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
    id: "e1",
    title: "Saturday Night Fever",
    date: "Dec 23, 2024",
    time: "9 PM - 2 AM",
    description: "DJ beats, neon lights, and electrifying vibes all night long",
    image: "event-1",
    location: "Hyderabad",
  },
  {
    id: "e2",
    title: "Friday Celebration",
    date: "Dec 22, 2024",
    time: "8 PM - 1 AM",
    description: "Kick off the weekend with champagne, sparklers, and non-stop music",
    image: "event-2",
    location: "Hyderabad",
  },
  {
    id: "e3",
    title: "New Year's Eve Bash",
    date: "Dec 31, 2024",
    time: "10 PM - 4 AM",
    description: "Ring in 2025 with the biggest party of the year",
    image: "event-1",
    location: "Hyderabad",
  },
];

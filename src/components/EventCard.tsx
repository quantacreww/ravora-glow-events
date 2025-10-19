import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Event } from "@/lib/events-data";

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const getImage = (imageName: string) => {
    try {
      return new URL(`../assets/events/${imageName}.jpg`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex-shrink-0 w-72 sm:w-80 md:w-96 glass rounded-2xl overflow-hidden group hover:glow-pink hover-tilt"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImage(event.image)}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gradient-primary">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-secondary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-accent" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{event.description}</p>

        <a
          href="#book-now"
          className="block w-full py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold text-center glow-pink hover:scale-105 transition-transform animate-glow-pulse"
        >
          Book Now
        </a>
      </div>
    </motion.div>
  );
};

export default EventCard;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import EventCard from "./EventCard";
import { eventsData } from "@/lib/events-data";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Upcoming</span> Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get ready for the hottest weekend parties in Hyderabad
          </p>
        </motion.div>

        <div className="flex flex-wrap xs:flex-nowrap overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-center">
          {eventsData.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

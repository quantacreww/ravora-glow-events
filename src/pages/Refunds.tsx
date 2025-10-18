import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

const Refunds = () => (
  <motion.div {...pageTransition}>
    <Navbar />
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Cancellation & Refund Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Cancellations</h2>
              <p>Bookings can be cancelled up to 24 hours before the event start time. Late cancellations may not be eligible for a refund.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Refunds</h2>
              <p>Eligible refunds will be processed to the original payment method within 5–7 business days.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">No-shows</h2>
              <p>No-shows are not eligible for refunds.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Event Changes</h2>
              <p>If an event is postponed or cancelled by us, you may opt for a full refund or reschedule, as available.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
    <Footer />
  </motion.div>
);

export default Refunds;

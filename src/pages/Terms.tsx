import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => (
  <motion.div {...pageTransition}>
    <Navbar />
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Bookings</h2>
              <p>Reservations are confirmed only after successful payment. Entry is subject to venue rules and capacity.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Age & ID</h2>
              <p>Valid government ID may be required. Alcohol service complies with local laws and age restrictions.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Changes & Cancellations</h2>
              <p>Changes are subject to availability. Cancellation and refund policy applies as described on the policy page.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Conduct</h2>
              <p>We reserve the right to deny entry or service to anyone for safety or policy violations.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Liability</h2>
              <p>We are not responsible for loss of personal belongings or damages unless required by law.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
    <Footer />
  </motion.div>
);

export default Terms;

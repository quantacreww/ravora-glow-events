import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => (
  <motion.div {...pageTransition}>
    <Navbar />
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-sm text-muted-foreground">We’d love to hear from you.</p>

            <div className="space-y-2">
              <p>Email: <a className="underline" href="mailto:info@ravoraevents.com">info@ravoraevents.com</a></p>
              <p>Phone: <a className="underline" href="tel:+919999999999">+91 99999 99999</a></p>
              <p>Address: Hyderabad, Telangana, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
    <Footer />
  </motion.div>
);

export default Contact;

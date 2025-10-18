import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Introduction</h2>
                <p>
                  This Privacy Policy describes how Ravora Events ("we", "our", "us") collects, uses, and protects your information when you visit our
                  website, make a booking, and complete payments.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contact information: name, email address, phone number</li>
                  <li>Booking details: date, time, number of people, package selections</li>
                  <li>Payment metadata processed by our payment partner (Razorpay)</li>
                  <li>Technical data such as IP address and device information for security and analytics</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To manage and confirm your bookings</li>
                  <li>To process payments and generate e‑tickets/QR codes</li>
                  <li>To communicate updates related to your reservation</li>
                  <li>To improve our services and ensure site security</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Payments</h2>
                <p>
                  We use Razorpay as our payment gateway. Your payment information is processed securely by Razorpay in accordance with their policies. We do not
                  store your complete card or bank details on our servers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Data Retention</h2>
                <p>We retain booking and payment records for legal and operational purposes for as long as required by applicable laws.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Sharing</h2>
                <p>
                  We do not sell your personal information. We may share limited information with service providers (e.g., payment gateway) solely to provide our
                  services and with authorities if required by law.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Your Rights</h2>
                <p>You may request access, correction, or deletion of your personal information where applicable.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Contact</h2>
                <p>
                  For privacy questions, contact us at <a className="underline" href="mailto:info@ravoraevents.com">info@ravoraevents.com</a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Privacy;

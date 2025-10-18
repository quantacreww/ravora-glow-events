import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";

const Shipping = () => (
    <motion.div {...pageTransition}>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <h1 className="text-3xl font-bold">Shipping & Delivery Policy</h1>
                        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                        <section className="space-y-2">
                            <h2 className="text-xl font-semibold">Digital Delivery</h2>
                            <p>All bookings are delivered digitally as confirmation and a QR code accessible on the website and via email/SMS where applicable.</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-semibold">No Physical Shipping</h2>
                            <p>We do not ship physical goods for event bookings.</p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </main>
        <Footer />
    </motion.div>
);

export default Shipping;

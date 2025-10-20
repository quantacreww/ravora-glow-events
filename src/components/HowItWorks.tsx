import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, CreditCard, PartyPopper } from "lucide-react";

const steps = [
  {
    id: "explore",
    title: "Explore Packages",
    desc: "Browse Alcohol (₹2399) & Non‑Alcohol (₹1599) unlimited options",
    Icon: Search,
  },
  {
    id: "reserve",
    title: "Reserve & Pay",
    desc: "Pick date/time, split packages, and checkout securely with Razorpay",
    Icon: CreditCard,
  },
  {
    id: "celebrate",
    title: "Celebrate the Night",
    desc: "Show your QR on arrival and enjoy the Ravora experience",
    Icon: PartyPopper,
  },
];

export default function HowItWorks() {
  return (
  <section className="relative my-16 w-full max-w-[100vw] overflow-x-hidden">
      {/* subtle brand glow */}
  <div className="pointer-events-none absolute inset-0 opacity-20 contain-transforms">
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient-primary mb-2">Plan Your Night</h2>
      <p className="text-center text-muted-foreground mb-10">Lock in your table, settle payments, and party on—quick and easy 🍸</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-border hover:glow-pink hover:border-primary transition-shadow transition-transform">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] grid place-items-center">
                  <s.Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[22rem]">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

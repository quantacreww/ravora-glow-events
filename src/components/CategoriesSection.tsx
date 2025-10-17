import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import imgEvent1 from "@/assets/events/event-1.jpg";

const categories = [
  { id: "alcohol", title: "Alcohol", price: 2399, img: imgEvent1 },
  { id: "non-alcohol", title: "Non‑Alcohol", price: 1599, img: imgEvent1 },
];

export default function CategoriesSection() {
  return (
    <section className="relative my-16">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient-primary mb-2">Popular Categories</h2>
      <p className="text-center text-muted-foreground mb-8">Explore our most ordered packages 🥂🍹</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="overflow-hidden border border-border hover:shadow-glow-primary transition">
              <div className="relative h-40">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gradient-primary">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">Unlimited Package</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gradient-secondary">₹{c.price}</div>
                  <div className="text-xs text-muted-foreground">per person + tax</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

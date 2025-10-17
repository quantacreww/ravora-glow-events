import { PACKAGE_OPTIONS } from "@/lib/packages";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import imgEvent1 from "@/assets/events/event-1.jpg";
import imgEvent2 from "@/assets/events/event-2.jpg";

const pkgImages = [imgEvent1, imgEvent2];

const PackageOptions = () => {
  return (
    <section className="relative my-16">
      {/* ambient glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <h2 className="text-4xl font-bold mb-3 text-center">
        <span className="text-gradient-primary">Package Options</span>
      </h2>
      <p className="text-center text-muted-foreground mb-10">Unlimited packages · Taxes extra</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {PACKAGE_OPTIONS.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="h-full"
          >
            <Card className="overflow-hidden border-border group h-full flex flex-col hover:shadow-glow-primary transition">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkgImages[i % pkgImages.length]}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-background/70 border border-border">
                  Unlimited
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-gradient-primary mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                {pkg.includes && (
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1 flex-1">
                    {pkg.includes.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
                {pkg.note && (
                  <p className="text-xs text-muted-foreground mt-3">Note: {pkg.note}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PackageOptions;

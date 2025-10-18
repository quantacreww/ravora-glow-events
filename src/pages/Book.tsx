import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { PACKAGE_OPTIONS } from "@/lib/packages";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Split = { pkg1: number; pkg2: number };

const clamp = (n: number, min = 0, max = Infinity) => Math.max(min, Math.min(max, n));

const Book = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState<number>(2);
  const [split, setSplit] = useState<Split>({ pkg1: 2, pkg2: 0 });
  const [lastEdited, setLastEdited] = useState<"pkg1" | "pkg2">("pkg1");
  const [notes, setNotes] = useState("");

  // Ensure split sums to people
  const normalizedSplit = useMemo(() => {
    let p1 = clamp(Math.round(split.pkg1), 0, people);
    let p2 = clamp(Math.round(split.pkg2), 0, people);
    if (lastEdited === "pkg1") {
      p2 = clamp(people - p1, 0, people);
    } else {
      p1 = clamp(people - p2, 0, people);
    }
    return { pkg1: p1, pkg2: p2 } as Split;
  }, [split, people, lastEdited]);

  const totalAmount = useMemo(() => {
    const price1 = PACKAGE_OPTIONS[0].pricePerPerson * normalizedSplit.pkg1;
    const price2 = PACKAGE_OPTIONS[1].pricePerPerson * normalizedSplit.pkg2;
    return price1 + price2;
  }, [normalizedSplit]);

  const canSubmit = useMemo(() => {
    return (
      name.trim() && email.trim() && phone.trim() && people > 0 &&
      normalizedSplit.pkg1 + normalizedSplit.pkg2 === people
    );
  }, [name, email, phone, date, time, people, normalizedSplit]);

  const handleProceedToPay = async () => {
    // Placeholder Razorpay integration: create order on backend then open checkout
    // Here we only navigate to a mock payment route with state or query params
    const details = {
      name,
      email,
      phone,
      date,
      time,
      people,
      split: normalizedSplit,
      amount: totalAmount,
    };
    const params = new URLSearchParams({
      name: details.name,
      email: details.email,
      phone: details.phone,
      date: details.date,
      time: details.time,
      people: String(details.people),
      p1: String(details.split.pkg1),
      p2: String(details.split.pkg2),
      amount: String(details.amount),
    });
    window.location.href = `/payment?${params.toString()}`;
  };

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Book Now
          </motion.h1>

          <p className="text-center text-muted-foreground mb-10">
            Choose packages for your group and share your details. We’ll hold your reservation and direct you to payment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9XXXXXXXXX" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" required />
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                      </div>
                    </div> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label htmlFor="people">Total People</Label>
                      <Input
                        id="people"
                        type="number"
                        min={1}
                        value={people}
                        onChange={(e) => setPeople(clamp(parseInt(e.target.value || "0", 10), 1))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pkg1">{PACKAGE_OPTIONS[0].name.split(" — ")[0]}</Label>
                      <Input
                        id="pkg1"
                        type="number"
                        min={0}
                        max={people}
                        value={normalizedSplit.pkg1}
                        onChange={(e) => {
                          setLastEdited("pkg1");
                          const val = clamp(parseInt(e.target.value || "0", 10), 0, people);
                          setSplit((s) => ({ ...s, pkg1: val }));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pkg2">{PACKAGE_OPTIONS[1].name.split(" — ")[0]}</Label>
                      <Input
                        id="pkg2"
                        type="number"
                        min={0}
                        max={people}
                        value={normalizedSplit.pkg2}
                        onChange={(e) => {
                          setLastEdited("pkg2");
                          const val = clamp(parseInt(e.target.value || "0", 10), 0, people);
                          setSplit((s) => ({ ...s, pkg2: val }));
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Occasion, preferences, allergies, etc." />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Summary</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Date: {date || "—"}</div>
                    <div>Time: {time || "—"}</div>
                    <div>People: {people}</div>
                    <div>Split: {normalizedSplit.pkg1} in Option 1, {normalizedSplit.pkg2} in Option 2</div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{PACKAGE_OPTIONS[0].name}</span>
                      <span>₹{PACKAGE_OPTIONS[0].pricePerPerson} × {normalizedSplit.pkg1}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{PACKAGE_OPTIONS[1].name}</span>
                      <span>₹{PACKAGE_OPTIONS[1].pricePerPerson} × {normalizedSplit.pkg2}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-semibold mt-2">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                  <Button className="w-full" disabled={!canSubmit} onClick={handleProceedToPay}>
                    Proceed to Payment
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    You will be redirected to the payment screen. Pricing includes applicable taxes where required.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Book;

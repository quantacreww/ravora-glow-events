"use client";
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
import NumberStepper from "@/components/NumberStepper";
import { useNavigate } from "react-router-dom";

type Split = { pkg1: number; pkg2: number };
const clamp = (n: number, min = 0, max = Infinity) => Math.max(min, Math.min(max, n));

const Book = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState<number>(2);
  const [split, setSplit] = useState<Split>({ pkg1: 1, pkg2: 1 });
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure split sums to people
  const normalizedSplit = useMemo(() => {
    let p1 = clamp(Math.round(split.pkg1), 0, people);
    let p2 = people - p1;
    return { pkg1: p1, pkg2: p2 };
  }, [split, people]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    const price1 = PACKAGE_OPTIONS[0].pricePerPerson * normalizedSplit.pkg1;
    const price2 = PACKAGE_OPTIONS[1].pricePerPerson * normalizedSplit.pkg2;
    return price1 + price2;
  }, [normalizedSplit]);

  const canSubmit = useMemo(() => {
    return (
      name.trim() &&
      email.trim() &&
      phone.trim() &&
      people > 0 &&
      normalizedSplit.pkg1 + normalizedSplit.pkg2 === people
    );
  }, [name, email, phone, date, time, people, normalizedSplit]);

  // ✅ Proceed button: send booking data to backend
 // ✅ Proceed button: send booking data to backend
const handleProceedToPay = async () => {
  if (!canSubmit) return;
  setLoading(true);

  try {
    // Build the body to match backend expectations
    const body = {
      name,
      email,
      phone,
      totalPeople: people,
      menuSelection: [
        { menuType: PACKAGE_OPTIONS[0].name, quantity: normalizedSplit.pkg1 },
        { menuType: PACKAGE_OPTIONS[1].name, quantity: normalizedSplit.pkg2 },
      ],
      amount: totalAmount * 100, // convert to paise (₹2500 → 250000)
    };

    // Call backend /api/create (localhost for now)
    const res = await fetch("http://localhost:5000/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to create order");
    const data = await res.json();

    // Redirect to /payment page with order info
    navigate(
      `/payment?orderId=${data.order.id}&token=${data.token}&amount=${body.amount}&name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`
    );
  } catch (err) {
    console.error("Booking creation failed:", err);
    alert("Something went wrong while creating your booking. Please try again.");
  } finally {
    setLoading(false);
  }
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
            Choose packages for your group and share your details. We’ll direct you to secure payment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9XXXXXXXXX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label htmlFor="people">Total People</Label>
                      <NumberStepper
                        id="people"
                        value={people}
                        min={1}
                        onChange={(v) => {
                          const newPeople = clamp(v, 1);
                          setPeople(newPeople);
                          const ratio = normalizedSplit.pkg1 / (normalizedSplit.pkg1 + normalizedSplit.pkg2 || 1);
                          const newPkg1 = Math.round(ratio * newPeople);
                          setSplit({ pkg1: newPkg1, pkg2: newPeople - newPkg1 });
                        }}
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
                        min={0}
                        max={people}
                        onChange={(v) => setSplit({ pkg1: clamp(v, 0, people), pkg2: people - clamp(v, 0, people) })}
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
                        min={0}
                        max={people}
                        onChange={(v) => setSplit({ pkg1: people - clamp(v, 0, people), pkg2: clamp(v, 0, people) })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Occasion, preferences, allergies, etc."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                  <div className="text-sm text-muted-foreground">
                    Contact: {name || "—"} · {phone || "—"}
                  </div>

                  <div className="border border-border rounded-md divide-y divide-border overflow-hidden">
                    {PACKAGE_OPTIONS.map((pkg, idx) => (
                      <div key={idx} className="flex items-start justify-between p-4">
                        <div>
                          <div className="font-medium">{pkg.name.split(" — ")[0]}</div>
                          <div className="text-xs text-muted-foreground">
                            ₹{pkg.pricePerPerson} × {idx === 0 ? normalizedSplit.pkg1 : normalizedSplit.pkg2}
                          </div>
                        </div>
                        <div className="font-semibold">
                          ₹{pkg.pricePerPerson * (idx === 0 ? normalizedSplit.pkg1 : normalizedSplit.pkg2)}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-4 bg-muted/20">
                      <div className="text-sm">Subtotal</div>
                      <div className="font-medium">₹{totalAmount}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>You Pay</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <Button className="w-full" disabled={!canSubmit || loading} onClick={handleProceedToPay}>
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Unlimited packages. Taxes may apply as per venue policy.
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

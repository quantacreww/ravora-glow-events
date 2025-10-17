import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

const PaymentSuccess = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const info = useMemo(() => ({
    amount: Number(params.get("amount") || 0),
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    people: Number(params.get("people") || 0),
    p1: Number(params.get("p1") || 0),
    p2: Number(params.get("p2") || 0),
    orderId: params.get("order_id") || "",
    paymentId: params.get("payment_id") || "",
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [search]);

  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    const payload = {
      type: "RavoraEventsBooking",
      name: info.name,
      email: info.email,
      phone: info.phone,
      date: info.date,
      time: info.time,
      people: info.people,
      split: { p1: info.p1, p2: info.p2 },
      amount: info.amount,
      orderId: info.orderId,
      paymentId: info.paymentId,
    };
    QRCode.toDataURL(JSON.stringify(payload), { width: 256 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [info]);

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
              <p className="text-muted-foreground text-sm">
                Your booking is confirmed.
              </p>
              <div className="flex items-center justify-between">
                <span>Total Paid</span>
                <span className="text-xl font-semibold">₹{info.amount}</span>
              </div>
              {qr && (
                <div className="flex flex-col items-center gap-2 pt-2">
                  <img src={qr} alt="Booking QR" className="h-64 w-64" />
                  <p className="text-xs text-muted-foreground">Show this QR at the venue.</p>
                </div>
              )}
              <div className="grid gap-2 text-sm">
                <div>Order ID: {info.orderId || "—"}</div>
                <div>Payment ID: {info.paymentId || "—"}</div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => window.print()} variant="secondary">Print</Button>
                <Button onClick={() => (window.location.href = "/")}>Go to Home</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PaymentSuccess;

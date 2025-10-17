import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import RazorpayButton from "@/components/RazorpayButton";

function errorToString(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e && "message" in e) {
    const m = (e as { message?: unknown }).message;
    return typeof m === "string" ? m : String(m);
  }
  return String(e);
}

const Payment = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const amount = Number(params.get("amount") || 0);
  const details = useMemo(() => ({
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    people: Number(params.get("people") || 0),
    p1: Number(params.get("p1") || 0),
    p2: Number(params.get("p2") || 0),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [search]);

  const notes = useMemo(() => ({
    date: details.date,
    time: details.time,
    p1: details.p1,
    p2: details.p2,
  }), [details.date, details.time, details.p1, details.p2]);

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold">Payment</h1>
              <p className="text-muted-foreground text-sm">
                You are paying for a booking for {details.people} people.
              </p>
              <div className="flex items-center justify-between">
                <span>Total Amount</span>
                <span className="text-xl font-semibold">₹{amount}</span>
              </div>
              <RazorpayButton
                amount={amount}
                className="w-full"
                prefill={{ name: details.name, email: details.email, contact: details.phone }}
                notes={notes}
                onSuccess={(ok, payload) => {
                  if (ok) {
                    const pr = payload?.paymentResponse as {
                      razorpay_order_id?: string;
                      razorpay_payment_id?: string;
                    };
                    const successParams = new URLSearchParams({
                      amount: String(amount),
                      name: details.name,
                      email: details.email,
                      phone: details.phone,
                      date: details.date,
                      time: details.time,
                      people: String(details.people),
                      p1: String(details.p1),
                      p2: String(details.p2),
                      order_id: pr?.razorpay_order_id || "",
                      payment_id: pr?.razorpay_payment_id || "",
                    });
                    window.location.href = `/payment/success?${successParams.toString()}`;
                  } else {
                    alert("Payment verification failed");
                  }
                }}
                onError={(e) => {
                  alert(`Payment error: ${errorToString(e)}`);
                }}
              />
              <p className="text-xs text-muted-foreground">
                This is a test integration. In production, orders must be created server-side and validated via webhook.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Payment;

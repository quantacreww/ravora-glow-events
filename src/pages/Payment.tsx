import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const Payment = () => {
  const params = new URLSearchParams(window.location.search);
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
  }), [params.toString()]);

  useEffect(() => {
    // Optionally preload Razorpay script here for faster checkout
    // const script = document.createElement('script');
    // script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    // script.async = true;
    // document.body.appendChild(script);
    // return () => { document.body.removeChild(script); };
  }, []);

  const handlePay = async () => {
    // In production: call backend to create an order and get order_id
    // Example POST /api/create-order { amount }
    // const { orderId } = await fetch('/api/create-order', { method:'POST', body: JSON.stringify({ amount })}).then(r=>r.json());

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // set in .env
      amount: amount * 100, // paise
      currency: "INR",
      name: "Ravora Events",
      description: `Booking for ${details.people} (${details.p1} + ${details.p2})`,
      // order_id: orderId,
      prefill: { name: details.name, email: details.email, contact: details.phone },
      notes: { date: details.date, time: details.time },
      theme: { color: "#14b8a6" },
      handler: function () {
        // On success you can navigate to a confirmation page
        window.location.href = "/?payment=success";
      },
    };

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => new window.Razorpay(options).open();
      document.body.appendChild(script);
    } else {
      new window.Razorpay(options).open();
    }
  };

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold">Payment</h1>
              <p className="text-muted-foreground text-sm">
                You are paying for a booking on {details.date} at {details.time} for {details.people} people.
              </p>
              <div className="flex items-center justify-between">
                <span>Total Amount</span>
                <span className="text-xl font-semibold">₹{amount}</span>
              </div>
              <Button onClick={handlePay} className="w-full">Pay with Razorpay</Button>
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

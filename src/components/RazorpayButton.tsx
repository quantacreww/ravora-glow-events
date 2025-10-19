import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createOrder, openCheckout, verifyPayment, type RazorpayPaymentResponse } from "@/lib/razorpay";

type Props = {
    amount: number; // rupees
    label?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, string | number | boolean>;
    onSuccess?: (verifyOk: boolean, payload: { paymentResponse: RazorpayPaymentResponse; verify: { valid: boolean; message?: string } }) => void;
    onError?: (err: unknown) => void;
    className?: string;
};

export default function RazorpayButton({ amount, label = "Pay with Razorpay", prefill, notes, onSuccess, onError, className }: Props) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            // 1) Create order via backend
            const order = await createOrder({ amount, metadata: notes });

            // 2) Open checkout
            await openCheckout({
                orderId: order.orderId,
                amountRupees: order.amount,
                currency: order.currency,
                prefill,
                notes,
                onSuccess: async (paymentResponse) => {
                    try {
                        const verify = await verifyPayment(paymentResponse);
                        onSuccess?.(verify.valid, { paymentResponse, verify });
                    } catch (e) {
                        onError?.(e);
                    }
                },
                onFailure: (err) => onError?.(err),
            });
        } catch (e) {
            onError?.(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button className={className} onClick={handleClick} disabled={loading || amount <= 0}>
            {loading ? "Processing…" : label}
        </Button>
    );
}

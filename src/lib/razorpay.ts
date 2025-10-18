// Lightweight Razorpay helpers for a Vite + React app

export type CreateOrderRequest = {
    amount: number; // in INR rupees
    currency?: string; // default INR
    metadata?: Record<string, string | number | boolean>;
};

export type CreateOrderResponse = {
    orderId: string;
    amount: number; // rupees (for UI display)
    currency: string; // e.g., "INR"
};

export type VerifyPaymentResponse = {
    valid: boolean;
    message?: string;
};

declare global {
    interface Window {
        Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

export const loadRazorpay = (): Promise<boolean> =>
    new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // same-origin by default

export async function createOrder(payload: CreateOrderRequest): Promise<CreateOrderResponse> {
    const res = await fetch(`${API_BASE}/api/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: payload.amount,
            currency: payload.currency || "INR",
            metadata: payload.metadata || {},
        }),
    });
    if (!res.ok) {
        throw new Error(`Order creation failed: ${res.status}`);
    }
    return (await res.json()) as CreateOrderResponse;
}

export type RazorpayPaymentResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

export async function verifyPayment(response: RazorpayPaymentResponse): Promise<VerifyPaymentResponse> {
    const res = await fetch(`${API_BASE}/api/razorpay/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
    });
    if (!res.ok) {
        throw new Error(`Verification failed: ${res.status}`);
    }
    return (await res.json()) as VerifyPaymentResponse;
}

export type RazorpayOpenOptions = {
    orderId: string;
    amountRupees: number; // for display only; Razorpay expects paise internally
    currency?: string;
    name?: string;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, string | number | boolean>;
    themeColor?: string;
    onSuccess?: (paymentResponse: RazorpayPaymentResponse) => void;
    onFailure?: (err: RazorpayFailure) => void;
};

type RazorpayOptions = {
    key: string;
    order_id: string;
    amount: number;
    currency?: string;
    name?: string;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, string | number | boolean>;
    theme?: { color?: string };
    handler: (response: RazorpayPaymentResponse) => void;
};

type RazorpayFailure = {
    error: {
        code: string;
        description?: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: { order_id?: string; payment_id?: string };
    };
};

type RazorpayInstance = {
    open: () => void;
    on: (event: "payment.failed", cb: (err: RazorpayFailure) => void) => void;
};

export async function openCheckout(opts: RazorpayOpenOptions) {
    const loaded = await loadRazorpay();
    if (!loaded) throw new Error("Failed to load Razorpay SDK");

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
    if (!key) throw new Error("Missing VITE_RAZORPAY_KEY_ID env");

    const options: RazorpayOptions = {
        key,
        order_id: opts.orderId,
        amount: Math.round((opts.amountRupees || 0) * 100), // paise
        currency: opts.currency || "INR",
        name: opts.name || "Ravora Events",
        description: opts.description || "Event Booking",
        prefill: opts.prefill,
        notes: opts.notes,
        theme: { color: opts.themeColor || "#FF0066" },
        handler: (response) => opts.onSuccess?.(response),
    };

    const rzp = new window.Razorpay!(options);
    if (opts.onFailure && rzp.on) {
        rzp.on("payment.failed", opts.onFailure);
    }
    rzp.open();
}

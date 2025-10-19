'use client';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE_URL as string, []);

  // Load Razorpay SDK once
  useEffect(() => {
    const loadRazorpay = async () => {
      if (window.Razorpay) return;
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  useEffect(() => {
    const data = {
      orderId: searchParams.get('orderId'),
      amount: parseInt(searchParams.get('amount') || '0', 10),
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
      token: searchParams.get('token') || '',
    };
    setOrderData(data);
  }, [searchParams]);

  const handlePayment = async () => {
    if (!orderData) return;
    setLoading(true);

    try {
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!key) throw new Error('Missing VITE_RAZORPAY_KEY_ID env');

      const options = {
        key,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Ravora Events',
        description: 'Event Booking Payment',
        order_id: orderData.orderId,
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone,
        },
        theme: { color: '#F37254' },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${apiBase}/api/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === 'Booking confirmed') {
              alert('✅ Payment successful! Booking confirmed.');
             navigate('/payment-success', {
  state: {
    name: orderData.name,
    email: orderData.email,
    phone: orderData.phone,
    amount: orderData.amount,
    qrCode: verifyData.qrCode,
    token: verifyData.token,
  },
});
            } else {
              alert('❌ Payment verification failed.');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Error verifying payment.');
          }
        },
      };

      console.log("Opening Razorpay with options:", options);
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong while initializing payment.');
    } finally {
      setLoading(false);
    }
  };

  if (!orderData)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading payment details...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Payment</h1>
      <div className="bg-gray-800 p-6 rounded-lg w-80 text-center">
        <p><strong>Name:</strong> {orderData.name}</p>
        <p><strong>Email:</strong> {orderData.email}</p>
        <p><strong>Phone:</strong> {orderData.phone}</p>
        <p><strong>Amount:</strong> ₹{orderData.amount / 100}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
        >
          {loading ? 'Processing...' : 'Pay with Razorpay'}
        </button>
      </div>
    </div>
  );
}

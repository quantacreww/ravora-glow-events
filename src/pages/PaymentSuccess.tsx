'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';

export default function PaymentSuccess() {
  const location = useLocation();
  const [ticketData, setTicketData] = useState<{
    name: string;
    email: string;
    phone: string;
    amount: number;
    qrCode: string;
    token: string;
  } | null>(null);

  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expecting state passed from PaymentPage after verification
    if (location.state) {
      setTicketData(location.state);
    } else {
      // fallback: redirect or show message
      console.warn('No ticket data found');
    }
  }, [location.state]);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.download = `RavoraEventTicket_${ticketData?.token}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading ticket...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">🎉 Payment Successful!</h1>
        <p className="mb-4 text-center text-muted-foreground">
          Your booking is confirmed. Show this ticket at the event entrance.
        </p>

        <div
          ref={ticketRef}
          className="bg-white text-black p-6 rounded-xl shadow-xl flex flex-col items-center w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Ravora Events</h2>
          <div className="mb-4 text-center">
            <p><strong>Name:</strong> {ticketData.name}</p>
            <p><strong>Email:</strong> {ticketData.email}</p>
            <p><strong>Phone:</strong> {ticketData.phone}</p>
            <p><strong>Amount Paid:</strong> ₹{ticketData.amount / 100}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={ticketData.qrCode}
              alt="QR Code"
              className="w-40 h-40 mb-4"
            />
            <p className="text-sm text-center">Booking Token: <strong>{ticketData.token}</strong></p>
          </div>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            Take a screenshot or download this ticket for entry.
          </p>
        </div>

        <Button onClick={downloadTicket} className="mt-6 bg-green-600 hover:bg-green-700">
          Download Ticket
        </Button>
      </main>
      <Footer />
    </div>
  );
}

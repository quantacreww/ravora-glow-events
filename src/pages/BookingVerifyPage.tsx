'use client';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Booking = {
  name: string;
  email: string;
  phone: string;
  totalPeople: number;
  menuSelection: { menuType: string; quantity: number }[];
  amount: number;
  status: string;
  qrCode?: string;
  token: string;
  scannedAt?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BookingVerifyPage() {
  const { token } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminToken = localStorage.getItem("adminToken");
    setIsAdmin(!!adminToken);

    if (!token) return;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/${token}`);
        setBooking(res.data.booking);
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.status || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [token]);

  const handleMarkUsed = async () => {
    if (!booking) return;
    const confirmMark = window.confirm(
      `Mark booking for ${booking.name} as USED?`
    );
    if (!confirmMark) return;

    try {
      setMarking(true);
      const res = await axios.post(
        `${API_BASE}/api/mark-used/${booking.token}`,
        {},
        {
          headers: {
            Authorization: isAdmin ? `Bearer ${localStorage.getItem("adminToken")}` : "",
          },
        }
      );
      setBooking(res.data.booking);
      alert("Booking marked as used successfully ✅");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.status || "Failed to mark booking as used");
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Booking not found
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white pt-28 pb-20 px-4">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Total People:</strong> {booking.totalPeople}</p>
          
          <div className="text-left bg-gray-700 rounded-md p-4 mt-4">
            <h3 className="font-semibold mb-2 text-center">Menu Selection</h3>
            <div className="space-y-2">
              {booking.menuSelection.map((menu, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
                  <span className="capitalize">{menu.menuType}:</span>
                  <span className="font-semibold">{menu.quantity} {menu.quantity === 1 ? 'person' : 'people'}</span>
                </div>
              ))}
            </div>
          </div>

          <p><strong>Amount:</strong> ₹{(booking.amount / 100).toFixed(2)}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${booking.status === 'paid' ? 'text-green-400' : booking.status === 'used' ? 'text-red-400' : 'text-yellow-400'}`}>{booking.status.toUpperCase()}</span></p>

          {booking.qrCode && (
            <div className="flex flex-col items-center mt-4">
              <img
                src={booking.qrCode}
                alt="QR Code"
                className="w-40 h-40 mb-2"
              />
              <p className="text-sm text-center">Booking Token: <strong>{booking.token}</strong></p>
            </div>
          )}

          {isAdmin && booking.status !== "used" && (
            <Button
              className="mt-4 w-full bg-red-600 hover:bg-red-700"
              onClick={handleMarkUsed}
              disabled={marking}
            >
              {marking ? "Marking..." : "Mark as Used"}
            </Button>
          )}

          {!isAdmin && booking.status === "used" && (
            <p className="mt-2 text-red-500 font-semibold">Booking already used</p>
          )}
          
          {booking.scannedAt && (
            <p className="text-xs text-gray-400 mt-2">Scanned at: {new Date(booking.scannedAt).toLocaleString()}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    date: "",
  });
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate booking submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate QR code with booking data
      const bookingData = JSON.stringify({
        name: formData.name,
        email: formData.email,
        guests: formData.guests,
        date: formData.date,
        bookingId: `RVR-${Date.now()}`,
      });

      const qr = await QRCode.toDataURL(bookingData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#FF006E",
          light: "#0A0A1A",
        },
      });

      setQrCode(qr);
      toast.success("Booking confirmed! Show this QR code at the venue.");
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", guests: "", date: "" });
    setQrCode(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary">
            {qrCode ? "Your Booking" : "Book Your Spot"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!qrCode ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent glow-pink"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <img
                  src={qrCode}
                  alt="Booking QR Code"
                  className="rounded-lg glow-pink"
                />
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Show this QR code at the venue entrance
                </p>
                <p className="text-sm text-muted-foreground">
                  Booking for: <strong>{formData.name}</strong>
                </p>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Book Another Event
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

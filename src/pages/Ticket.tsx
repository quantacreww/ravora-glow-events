import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, fetchTicketById, lookupTicket, isExpired } from "@/lib/tickets";

const POLL_MS = 5000; // poll every 5s to reflect redemption/expiry

const TicketPage = () => {
    const search = window.location.search;
    const params = useMemo(() => new URLSearchParams(search), [search]);
    const ticketId = params.get("ticketId") || undefined;
    const orderId = params.get("orderId") || undefined;
    const paymentId = params.get("paymentId") || undefined;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const timerRef = useRef<number | null>(null);

    const load = async () => {
        try {
            setError(null);
            setLoading(true);
            let t: Ticket;
            if (ticketId) {
                t = await fetchTicketById(ticketId);
            } else if (orderId || paymentId) {
                t = await lookupTicket({ orderId, paymentId });
            } else {
                throw new Error("Missing ticketId or order/payment reference");
            }
            setTicket(t);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Simple polling to update status until redeemed/expired
    useEffect(() => {
        if (!ticket) return;
        if (ticket.status === "active" && !isExpired(ticket)) {
            timerRef.current = window.setTimeout(() => {
                load();
            }, POLL_MS);
        }
    }, [ticket]);

    const expired = ticket ? isExpired(ticket) : false;

    return (
        <motion.div {...pageTransition}>
            <Navbar />
            <main className="min-h-screen pt-28 pb-20 px-4">
                <div className="container mx-auto max-w-2xl">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h1 className="text-2xl font-bold">Your Ticket</h1>
                            {loading && <p className="text-sm text-muted-foreground">Loading ticket…</p>}
                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}
                            {ticket && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Ticket ID</span>
                                        <span className="font-mono">{ticket.id}</span>
                                    </div>
                                    {ticket.orderId && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Order ID</span>
                                            <span className="font-mono">{ticket.orderId}</span>
                                        </div>
                                    )}
                                    {ticket.paymentId && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Payment ID</span>
                                            <span className="font-mono">{ticket.paymentId}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Status</span>
                                        <span className="capitalize">{expired ? "expired" : ticket.status}</span>
                                    </div>
                                    {ticket.eventDateISO && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Event</span>
                                            <span>{new Date(ticket.eventDateISO).toLocaleString()}</span>
                                        </div>
                                    )}
                                    {ticket.expiresAtISO && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Expires</span>
                                            <span>{new Date(ticket.expiresAtISO).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="pt-2 flex flex-col items-center gap-2">
                                        {ticket.qrImageUrl ? (
                                            <img src={ticket.qrImageUrl} alt="Ticket QR" className="h-64 w-64" />
                                        ) : (
                                            <div className="h-64 w-64 grid place-items-center border rounded-md text-sm text-muted-foreground">
                                                QR unavailable
                                            </div>
                                        )}
                                        <p className="text-xs text-muted-foreground">Show this QR at the venue. It will be marked redeemed when scanned.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" onClick={() => window.print()}>Print</Button>
                                        <Button onClick={() => load()} disabled={loading}>Refresh</Button>
                                        <Button variant="ghost" onClick={() => (window.location.href = "/")}>Home</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
};

export default TicketPage;

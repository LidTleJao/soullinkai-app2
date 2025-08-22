"use client";
import { useEffect, useState } from "react";
import {
  createCheckout,
  getSubscriptionStatus,
} from "../services/subscriptionService";

interface Subscription {
  plan: string;
  status: string;
}
export default function SubscriptionForm() {
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await getSubscriptionStatus();
        setSub(r.subscription as Subscription); // type assertion
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const go = async () => {
    const r = await createCheckout();
    // ตรวจสอบว่ามี url ก่อนใช้
    if (r && typeof r.url === "string") {
      window.location.href = r.url;
    } else {
      alert("Checkout error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-lg font-semibold mb-2">Your plan</div>
      <div className="text-white/80">
        Status: {sub ? `${sub.plan} / ${sub.status}` : "Free / inactive"}
      </div>
      <button className="mt-3 bg-indigo-600 px-4 py-2 rounded" onClick={go}>
        Subscribe / Upgrade
      </button>
    </div>
  );
}

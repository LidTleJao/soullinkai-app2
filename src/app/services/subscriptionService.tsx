// src/services/subscriptionService.ts
import { api } from "./api";

export async function getSubscriptionStatus() {
  const r = await api.get("/subscription/status");
  return r.data;
}

export async function createCheckout(priceId?: string) {
  const r = await api.post("/subscription/create-checkout", { priceId });
  return r.data;
}

// src/app/services/adminService.ts
import { api } from "./api";

/* ---------- Types ---------- */
export interface AdminStats {
  users: number;
  personas: number;
  subscriptions: number;
  aiRequests: number;
}

export interface AiUsagePoint {
  date: string; // 'YYYY-MM-DD'
  tokens: number;
  requests: number;
}

export interface RevenuePoint {
  month: string; // 'YYYY-MM'
  amount: number; // USD (หรือหน่วยที่ backend คำนวณ)
}

export interface PageResult<T> {
  items: T[];
  nextCursor: string | null;
}

/* ---------- Core Admin APIs ---------- */

// 1) Overview stats
export async function getAdminStats(): Promise<AdminStats> {
  const r = await api.get("/admin/stats");
  return r.data as AdminStats;
}

// 2) AI usage (line chart)
export async function getAiUsage(days = 14): Promise<AiUsagePoint[]> {
  const r = await api.get("/admin/ai-usage", { params: { days } });
  return r.data as AiUsagePoint[];
}

// 3) Revenue (bar chart)
export async function getRevenue(months = 6): Promise<RevenuePoint[]> {
  const r = await api.get("/admin/revenue", { params: { months } });
  return r.data as RevenuePoint[];
}

// 4) Users (table)
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  // Add other fields as needed
}

export async function listAdminUsers(
  limit = 20,
  cursor?: string
): Promise<PageResult<AdminUser>> {
  const r = await api.get("/admin/users", { params: { limit, cursor } });
  return r.data as PageResult<AdminUser>;
}

// 5) Personas (table)
export interface AdminPersona {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  // Add other fields as needed
}

export async function listAdminPersonas(
  limit = 20,
  cursor?: string
): Promise<PageResult<AdminPersona>> {
  const r = await api.get("/admin/personas", { params: { limit, cursor } });
  return r.data as PageResult<AdminPersona>;
}

// 6) Feedback (table)
export interface FeedbackItem {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  // Add other fields as needed
}

export async function listAdminFeedback(
  limit = 20,
  cursor?: string
): Promise<PageResult<FeedbackItem>> {
  const r = await api.get("/admin/feedback", { params: { limit, cursor } });
  return r.data as PageResult<FeedbackItem>;
}


"use client";
import { useEffect, useState } from "react";
import {
  getAdminStats,
  getAiUsage,
  getRevenue,
  listAdminUsers,
  listAdminPersonas,
  listAdminFeedback,
  AdminStats,
  AiUsagePoint,
  RevenuePoint,
  AdminUser,
  AdminPersona,
  FeedbackItem,
} from "../services/adminService";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import { toast } from "react-toastify";

export default function CardAdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [aiUsage, setAiUsage] = useState<AiUsagePoint[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [personas, setPersonas] = useState<AdminPersona[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [s, ai, rev, u, p, f] = await Promise.all([
          getAdminStats(),
          getAiUsage(14),
          getRevenue(6),
          listAdminUsers(5),
          listAdminPersonas(5),
          listAdminFeedback(5),
        ]);
        setStats(s);
        setAiUsage(ai);
        setRevenue(rev);
        setUsers(u.items);
        setPersonas(p.items);
        setFeedback(f.items);
      } catch (err) {
        console.error("load admin dashboard failed:", err);
        toast.error("โหลดข้อมูลแดชบอร์ดล้มเหลว", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div
      className="min-h-screen w-full p-6 space-y-8"
      // สีคงที่ (ไม่อิงธีม)
      style={{ backgroundColor: "#0B0D10", color: "#EAF2FF" }}
    >
      <h1 className="text-2xl lg:text-4xl font-bold no-caret">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Users" value={stats?.users} loading={loading} />
        <StatCard title="Personas" value={stats?.personas} loading={loading} />
        <StatCard title="Subscriptions" value={stats?.subscriptions} loading={loading} />
        <StatCard title="AI Requests (Today)" value={stats?.aiRequests} loading={loading} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardFixed>
          <h2 className="text-lg font-semibold no-caret mb-3">AI Usage (14 days)</h2>
          <div className="w-full h-64">
            {loading ? (
              <SkeletonBlock />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiUsage}>
                  <CartesianGrid stroke="#2A2F3A" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    stroke="#A9B4C7"
                    tick={{ fill: "#A9B4C7", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#A9B4C7"
                    tick={{ fill: "#A9B4C7", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#13161B",
                      border: "1px solid #2A2F3A",
                      color: "#EAF2FF",
                    }}
                    labelStyle={{ color: "#A9B4C7" }}
                  />
                  <Line type="monotone" dataKey="requests" stroke="#7DB3FF" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tokens" stroke="#4EE6A0" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardFixed>

        <CardFixed>
          <h2 className="text-lg font-semibold no-caret mb-3">Revenue (6 months)</h2>
          <div className="w-full h-64">
            {loading ? (
              <SkeletonBlock />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenue}>
                  <CartesianGrid stroke="#2A2F3A" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    stroke="#A9B4C7"
                    tick={{ fill: "#A9B4C7", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#A9B4C7"
                    tick={{ fill: "#A9B4C7", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#13161B",
                      border: "1px solid #2A2F3A",
                      color: "#EAF2FF",
                    }}
                    labelStyle={{ color: "#A9B4C7" }}
                  />
                  <Bar dataKey="amount" fill="#7DB3FF" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardFixed>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ListCard
          title="Latest Users"
          loading={loading}
          items={users}
          renderItem={(u) => (
            <span className="truncate" title={u.email || u.id}>
              {u.email || u.id}
            </span>
          )}
        />
        <ListCard
          title="Latest Personas"
          loading={loading}
          items={personas}
          renderItem={(p) => (
            <span className="truncate" title={p.name}>
              {p.name}
            </span>
          )}
        />
        <ListCard
          title="Feedback"
          loading={loading}
          items={feedback}
          renderItem={(f) => (
            <span className="truncate" title={f.message || "—"}>
              {f.message || "—"}
            </span>
          )}
        />
      </div>
    </div>
  );
}

/* ---------- Subcomponents with fixed colors ---------- */

function CardFixed({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: "#111419",       // การ์ด
        borderColor: "#2A2F3A",      // เส้นขอบ
      }}
    >
      {children}
    </div>
  );
}

function SkeletonBlock() {
  return (
    <div
      className="w-full h-full rounded-lg animate-pulse"
      style={{ background: "#151922" }}
    />
  );
}

function StatCard({
  title,
  value,
  loading,
}: {
  title: string;
  value?: number | null;
  loading: boolean;
}) {
  return (
    <CardFixed>
      <span className="text-sm opacity-80 no-caret" style={{ color: "#A9B4C7" }}>
        {title}
      </span>
      {loading ? (
        <div
          className="h-8 w-24 mt-2 rounded animate-pulse"
          style={{ background: "#151922" }}
        />
      ) : (
        <div className="text-3xl font-bold" style={{ color: "#EAF2FF" }}>
          {value ?? "—"}
        </div>
      )}
    </CardFixed>
  );
}

function ListCard<T>({
  title,
  loading,
  items,
  renderItem,
}: {
  title: string;
  loading: boolean;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <CardFixed>
      <h2 className="text-lg font-semibold no-caret mb-2">{title}</h2>
      {loading ? (
        <div className="space-y-2 mt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded animate-pulse" style={{ background: "#151922" }} />
          ))}
        </div>
      ) : (
        <ul className="text-sm space-y-2">
          {items.length === 0 ? (
            <li className="opacity-70" style={{ color: "#A9B4C7" }}>No data</li>
          ) : (
            items.map((it, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span
                  className="inline-block rounded-full"
                  style={{ width: 8, height: 8, background: "#2A2F3A" }}
                />
                {renderItem(it)}
              </li>
            ))
          )}
        </ul>
      )}
    </CardFixed>
  );
}

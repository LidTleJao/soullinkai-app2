import CardAdminDashboard from "../components/CardAdminDashboard";
import NavbarAdmin from "../components/NavbarAdmin";
import Protected from "../components/Protected";

export default function AdminDashboardPage() {
  return (
    <>
      <Protected>
        <NavbarAdmin />
        <CardAdminDashboard />
      </Protected>
    </>
  );
}

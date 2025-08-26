import CardAdminDashboard from "../components/CardAdminDashboard";
import NavbarAdmin from "../components/NavbarAdmin";



export default function AdminDashboardPage() {
  return (
    <>
      <NavbarAdmin />
      <CardAdminDashboard />
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p> */}
    </>
  );
}
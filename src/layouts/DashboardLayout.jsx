import { logout } from "../store/auth";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] font-serif">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={logout}
          className="text-sm border border-neutral-800 px-4 py-1 hover:bg-neutral-800 hover:text-white"
        >
          Logout
        </button>
      </header>

      <main className="p-10">{children}</main>
    </div>
  );
}

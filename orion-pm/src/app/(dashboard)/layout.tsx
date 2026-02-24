import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
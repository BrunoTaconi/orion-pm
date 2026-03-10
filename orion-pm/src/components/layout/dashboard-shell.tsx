"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { WorkspaceProvider } from "@/context/workspace-context";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <WorkspaceProvider>
      <div className="flex h-screen overflow-hidden w-full bg-bg-primary">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />

        <main className="flex-1 flex flex-col h-full overflow-hidden p-6">
          {children}
        </main>
      </div>
    </WorkspaceProvider>
  );
}

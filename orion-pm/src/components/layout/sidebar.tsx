import { Icons } from "@/components/icons";
import { SidebarItem } from "./sidebar-item";
import { SidebarUser } from "./sidebar-user";

type SidebarItemConfig = {
  icon: keyof typeof Icons;
  label: string;
  href: string;
};

export function Sidebar() {
  const sidebarItems: SidebarItemConfig[] = [
    { icon: "Dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "Project", label: "Projects", href: "/projects" },
    { icon: "Team", label: "Teams", href: "/teams" },
  ];

  return (
    <aside className="w-64 h-screen bg-bg-primary border-border border-r flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="font-bold text-lg mb-4">Orion PM</div>

        <SidebarUser name="Bruno" />
      </div>

      {/* Nav */}
      <nav className="px-3 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
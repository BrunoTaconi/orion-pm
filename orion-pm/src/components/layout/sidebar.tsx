import { Icons } from "@/components/icons";
import { SidebarItem } from "./sidebar-item";
import { SidebarUser } from "./sidebar-user";

type SidebarItemConfig = {
  icon: keyof typeof Icons;
  label: string;
  href: string;
};

type SidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const sidebarItems: SidebarItemConfig[] = [
    { icon: "Search", label: "Search", href: "/search" },
    { icon: "Recent", label: "Recents", href: "/recents" },
    { icon: "Favorite", label: "Favorites", href: "/favorites" },
    { icon: "Project", label: "Projects", href: "/project" },
    { icon: "Home", label: "Home", href: "/s" },
    { icon: "Dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "Team", label: "Teams", href: "/teams" },
  ];

  return (
    <aside
      className={`
        h-screen bg-bg-secondary border-border border-r flex flex-col
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-center px-2 py-2 border-b border-border">
        {!isCollapsed && <SidebarUser name="Bruno" isCollapsed={isCollapsed} />}

        <button
          onClick={onToggle}
          className="p-1 hover:bg-bg-darker rounded text-text-secondary transition cursor-pointer"
        >
          <Icons.Collapse
            className={`transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-1 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";

type SidebarItemProps = {
  icon: keyof typeof Icons;
  label: string;
  href: string;
  isCollapsed: boolean;
};

export function SidebarItem({
  icon,
  label,
  href,
  isCollapsed,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      className={`
      group flex items-center rounded-sm px-2 py-2
      transition-colors
      ${isCollapsed ? "justify-center" : "gap-3"}
      ${
        isActive
          ? "bg-accent-primary/10 text-accent-primary"
          : "text-text-secondary hover:bg-bg-darker hover:text-text-primary"
      }
    `}
    >
      {/* Outline */}
      <Icon
        size={18}
        className={`${isActive ? "hidden" : "group-hover:hidden"}`}
      />

      {/* Filled */}
      <Icon
        size={18}
        filled
        className={`${isActive ? "block" : "hidden group-hover:block"}`}
      />

      <span
        className={`
          text-sm font-medium whitespace-nowrap
          transition-all duration-200
          ${isCollapsed ? "opacity-0 w-0 ml-0 overflow-hidden" : "opacity-100 ml-0"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}

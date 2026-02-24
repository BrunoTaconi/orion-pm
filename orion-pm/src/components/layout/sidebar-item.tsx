"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";

type SidebarItemProps = {
  icon: keyof typeof Icons;
  label: string;
  href: string;
};

export function SidebarItem({ icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      className={`
        group flex items-center gap-3 rounded-md px-3 py-2
        transition-colors
        ${
          isActive
            ? "bg-accent-primary/10 text-accent-primary"
            : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
        }
      `}
    >
      {/* Outline */}
      <Icon
        size={20}
        className={`${isActive ? "hidden" : "group-hover:hidden"}`}
      />

      {/* Filled */}
      <Icon
        size={20}
        filled
        className={`${isActive ? "block" : "hidden group-hover:block"}`}
      />

      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
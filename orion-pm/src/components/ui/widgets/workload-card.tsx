import React from "react";
import { Icons } from "@/components/icons";

export type WorkloadItem = {
  name: string;
  value: number; // Percentual (0 a 100)
};

export interface WorkloadCardProps {
  title: string;
  subtitle: string;
  headerIcon: keyof typeof Icons;
  headerIconBg?: string;
  headerIconColor?: string;
  items: WorkloadItem[];
}

export function WorkloadCard({
  title,
  subtitle,
  headerIcon,
  headerIconBg = "bg-bg-light-gray",
  headerIconColor = "text-gray-icon",
  items,
}: WorkloadCardProps) {
  const HeaderIcon = Icons[headerIcon];

  return (
    <div className="bg-bg-primary not-first:rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`${headerIconBg} p-2 rounded-md ${headerIconColor}`}>
          {HeaderIcon && <HeaderIcon size={22} />}
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-lg">{title}</h3>
          <p className="text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-md">
            <div className="flex items-center gap-2 w-32 truncate">
              <div className="w-7 h-8 rounded-sm bg-gray-300 flex items-center justify-center text-sm font-bold text-white uppercase">
                {item.name.charAt(0)}
              </div>
              <span className="text-text-primary truncate">{item.name}</span>
            </div>
            <div className="flex-1 bg-bg-secondary h-2.5 rounded-sm overflow-hidden flex">
              <div className="bg-accent-primary h-full" style={{ width: `${item.value}%` }}></div>
            </div>
            <span className="w-8 text-right text-sm text-text-secondary">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
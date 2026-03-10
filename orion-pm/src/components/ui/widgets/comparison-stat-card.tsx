import React from "react";
import { Icons } from "@/components/icons";

export interface ComparisonStatCardProps {
  title: string;
  footerText: string;
  icon: keyof typeof Icons;
  iconColor?: string;
  value1: number | string;
  value1Color?: string;
  value1Height?: string; 
  value1BgColor?: string;
  value2: number | string;
  value2Color?: string;
  value2Height?: string; 
  value2BgColor?: string;
}

export function ComparisonStatCard({
  title,
  footerText,
  icon,
  iconColor = "text-yellow-500",
  value1,
  value1Color = "text-green-500",
  value1Height = "40px",
  value1BgColor = "bg-green-500",
  value2,
  value2Color = "text-text-primary",
  value2Height = "60px",
  value2BgColor = "bg-bg-secondary",
}: ComparisonStatCardProps) {
  const CardIcon = Icons[icon];

  return (
    <div className="bg-bg-primary border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm gap-2">
      <div className="flex items-center gap-2 mb-2 w-full justify-start">
        <div className="bg-bg-light-yellow p-2 rounded-sm">
          {CardIcon && <CardIcon size={20} className={iconColor} filled />}
        </div>
        <span className="font-bold text-md text-text-primary">{title}</span>
      </div>
      <div className="flex items-end gap-2 mt-2 h-18">
        <div className="flex flex-col items-center gap-1">
          <span className={`text-sm font-bold ${value1Color}`}>{value1}</span>
          <div
            className={`w-4 rounded-t-sm ${value1BgColor}`}
            style={{ height: value1Height }}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className={`text-sm font-bold ${value2Color}`}>{value2}</span>
          <div
            className={`w-4 rounded-t-sm ${value2BgColor}`}
            style={{ height: value2Height }}
          ></div>
        </div>
      </div>
      <span className="text-sm text-text-secondary mt-1">{footerText}</span>
    </div>
  );
}

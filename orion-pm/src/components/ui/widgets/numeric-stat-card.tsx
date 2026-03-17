import React from "react";
import { Icons } from "@/components/icons";

export interface NumericStatCardProps {
  title: string;
  value: string | number;
  footerText: string;
  icon: keyof typeof Icons;
  iconColor?: string;
  iconBgColor?: string;
  valueColor?: string;
  valueBgColor?: string;
}

export function NumericStatCard({
  title,
  value,
  footerText,
  icon,
  iconColor = "text-orange-500",
  iconBgColor = "bg-bg-light-orange",
  valueColor = "text-accent-primary",
  valueBgColor = "bg-bg-light-blue",
}: NumericStatCardProps) {
  const CardIcon = Icons[icon];

  return (
    <div className="bg-bg-primary rounded-xl p-4 flex flex-col items-center justify-start text-center shadow-sm gap-2 ">
      <div className="flex items-center gap-2 mb-4 w-full justify-start">
        <div className={`${iconBgColor} p-2 rounded-sm`}>
          {CardIcon && <CardIcon size={20} className={iconColor} filled />}
        </div>
        <span className="font-bold text-md text-text-primary">{title}</span>
      </div>
      <div
        className={`text-2xl font-bold px-4 py-2 flex items-center justify-center rounded-md ${valueBgColor} ${valueColor}`}
      >
        {value}
      </div>
      <span className="text-sm text-text-secondary mt-1">{footerText}</span>
    </div>
  );
}

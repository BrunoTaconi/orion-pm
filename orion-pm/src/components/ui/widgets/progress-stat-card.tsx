import React from "react";
import { Icons } from "@/components/icons";

export interface ProgressStatCardProps {
  title: string;
  percentage: number;
  footerText: string;
  icon: keyof typeof Icons;
  iconColor?: string;
  progressColor?: string;
}

export function ProgressStatCard({
  title,
  percentage,
  footerText,
  icon,
  iconColor = "text-purple-500",
  progressColor = "bg-green-500",
}: ProgressStatCardProps) {
  const CardIcon = Icons[icon];

  return (
    <div className="bg-bg-primary rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm gap-2">
      <div className="flex items-center gap-2 mb-2 w-full justify-start">
        <div className="bg-bg-light-purple p-2 rounded-sm">
          {CardIcon && <CardIcon size={20} className={iconColor} />}
        </div>
        <span className="font-bold text-md text-text-primary">{title}</span>
      </div>
      <h2 className="text-3xl font-bold text-text-primary mt-2">
        {percentage}%
      </h2>
      <div className="w-full bg-bg-secondary h-2 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm text-text-secondary mt-2">{footerText}</span>
    </div>
  );
}

import React from "react";
import { Icons } from "@/components/icons";

export type AlertItem = {
  text: string;
  icon: keyof typeof Icons;
  iconColor?: string;
};

export interface AlertListCardProps {
  title: string;
  subtitle: string;
  headerIcon: keyof typeof Icons;
  headerIconBg?: string;
  headerIconColor?: string;
  alerts: AlertItem[];
}

export function AlertListCard({
  title,
  subtitle,
  headerIcon,
  headerIconBg = "bg-bg-light-red",
  headerIconColor = "text-red-icon",
  alerts,
}: AlertListCardProps) {
  const HeaderIcon = Icons[headerIcon];

  return (
    <div className="bg-bg-primary  rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`${headerIconBg} p-2 rounded-md ${headerIconColor}`}>
          {HeaderIcon && <HeaderIcon size={24} />}
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-lg">{title}</h3>
          <p className="text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {alerts.map((alert, i) => {
          const AlertIcon = Icons[alert.icon];
          return (
            <div key={i} className="flex gap-3 items-center">
              <div className={`bg-bg-light-yellow p-2 rounded-sm`}>
                {AlertIcon && (
                  <AlertIcon
                    size={20}
                    className={`text-yellow-icon`}
                  />
                )}
              </div>
              <span className="text-md text-text-primary">{alert.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

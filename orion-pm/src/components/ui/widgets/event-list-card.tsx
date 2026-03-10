import React from "react";
import { Icons } from "@/components/icons";

export type EventItem = {
  date: string;
  title: string;
  time: string;
};

export interface EventListCardProps {
  title: string;
  subtitle: string;
  headerIcon: keyof typeof Icons;
  headerIconBg?: string;
  headerIconColor?: string;
  events: EventItem[];
  footerActionText?: string;
  onFooterActionClick?: () => void;
}

export function EventListCard({
  title,
  subtitle,
  headerIcon,
  headerIconBg = "bg-bg-light-green",
  headerIconColor = "text-green-icon",
  events,
  footerActionText,
  onFooterActionClick,
}: EventListCardProps) {
  const HeaderIcon = Icons[headerIcon];

  return (
    <div className="bg-bg-primary rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`${headerIconBg} p-2 rounded-md ${headerIconColor}`}>
          {HeaderIcon && <HeaderIcon size={22} />}
        </div>
        <div>
          <h3 className="font-bold text-text-primary text-md">{title}</h3>
          <p className="text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {events.map((event, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-bg-secondary text-accent-primary font-bold text-sm p-2 rounded text-center">
              {event.date}
            </div>
            <div className="text-md">
              <span className="font-medium text-text-primary">{event.title} </span>
              <span className="text-text-secondary">{event.time}</span>
            </div>
          </div>
        ))}
      </div>

      {footerActionText && (
        <div className="mt-auto pt-2 flex justify-end">
          <button onClick={onFooterActionClick} className="text-accent-primary text-sm font-medium hover:underline flex items-center gap-1 cursor-pointer">
            {footerActionText} →
          </button>
        </div>
      )}
    </div>
  );
}
import { Icons } from "@/components/icons";

export interface ProjectStatusCardProps {
  title: string;
  subtitle: string;
  subtitleLinkText?: string;
  onSubtitleLinkClick?: () => void;
  actionText?: string;
  onActionClick?: () => void;
  headerIcon: keyof typeof Icons;
  headerIconBg?: string;
  headerIconColor?: string;
  statusIcon: keyof typeof Icons;
  statusIconColor?: string;
  statusText: string;
  dateStart?: string;
  dateEnd?: string;
  description: string;
  footerActionText?: string;
  onFooterActionClick?: () => void;
}

export function ProjectStatusCard({
  title,
  subtitle,
  subtitleLinkText,
  onSubtitleLinkClick,
  actionText,
  onActionClick,
  headerIcon,
  headerIconBg = "bg-bg-light-blue",
  headerIconColor = "text-blue-icon",
  statusIcon,
  statusIconColor = "text-green-500",
  statusText,
  dateStart,
  dateEnd,
  description,
  footerActionText,
  onFooterActionClick,
}: ProjectStatusCardProps) {
  const HeaderIcon = Icons[headerIcon];
  const StatusIcon = Icons[statusIcon];

  return (
    <div className="bg-bg-primary rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`${headerIconBg} p-2 rounded-md ${headerIconColor}`}>
            {HeaderIcon && <HeaderIcon size={24} />}
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">{title}</h3>
            <p className="text-sm text-text-secondary">
              {subtitle}{" "}
              {subtitleLinkText && (
                <span
                  onClick={onSubtitleLinkClick}
                  className="text-accent-primary cursor-pointer hover:underline  font-medium"
                >
                  {subtitleLinkText}
                </span>
              )}
            </p>
          </div>
        </div>
        {actionText && (
          <button
            onClick={onActionClick}
            className="text-sm text-text-secondary hover:text-text-primary transition cursor-pointer font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
      <div className="flex items-center gap-4 text-md font-medium  text-text-primary mt-2">
        <div className="p-2 rounded-md bg-bg-light-green">
          {StatusIcon && <StatusIcon size={20} className={statusIconColor} />}
        </div>
        <span>{statusText}</span>
      </div>

      {(dateStart || dateEnd) && (
        <div className="flex items-center gap-4 text-md text-text-secondary">
          <div className="p-2 rounded-md bg-bg-light-gray">
            <Icons.Calendar size={20} />
          </div>
          <div className="flex gap-2 items-center">
            {dateStart && (
              <span className="font-medium text-text-primary text-md">{dateStart}</span>
            )}
            {dateStart && dateEnd && <span>→</span>}
            {dateEnd && (
              <span className="font-medium text-text-primary">{dateEnd}</span>
            )}
          </div>
        </div>
      )}

      <p className="text-md text-text-secondary mt-2">{description}</p>

      {footerActionText && (
        <div className="mt-auto pt-2 flex justify-end">
          <button
            onClick={onFooterActionClick}
            className="text-accent-primary text-sm font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            {footerActionText} →
          </button>
        </div>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";
import { DynamicIcons, Icons } from "../icons";
import { Methodology } from "@/mocks/mock";
import Avatar from "boring-avatars";

type HomeCardVariant = "create" | "project" | "team";

export type HomeCardAction =
  | "create-project"
  | "create-team"
  | "enter-project"
  | "enter-team";

interface HomeCardProps {
  projectId?: string;
  variant: HomeCardVariant;
  title: string;
  subtitle?: string;
  icon?: keyof typeof Icons;
  methodology?: Methodology;
  action?: HomeCardAction;
  payload?: any;
  onAction?: (action: HomeCardAction, payload?: any) => void;
  progress?: number;
  memberCount?: number;
  ownerName?: string;
  teamName?: string;
  teamAvatarUrl?: string;
}

type MethodologyConfig = {
  icon: keyof typeof Icons;
  iconBgColor: string;
  iconColor: string;
};

const HomeCard = ({
  variant,
  title,
  methodology,
  action,
  payload,
  onAction,
  progress,
  memberCount,
  ownerName,
  teamName,
  teamAvatarUrl,
}: HomeCardProps) => {
  const isCreate = variant === "create";
  const isProject = variant === "project";
  const isTeam = variant === "team";
  const NewIcon = Icons["Add"];

  const handleClick = () => {
    if (!action || !onAction) return;
    onAction(action, payload);
  };

  const getMethodologyConfig = (
    methodology?: Methodology,
  ): MethodologyConfig => {
    switch (methodology) {
      case "SCRUM":
        return {
          icon: "Scrum",
          iconBgColor: "bg-bg-light-purple",
          iconColor: "text-purple-icon",
        };
      case "KANBAN":
        return {
          icon: "Kanban",
          iconBgColor: "bg-bg-light-green",
          iconColor: "text-green-icon",
        };
      case "CASCADE":
        return {
          icon: "Waterfall",
          iconBgColor: "bg-bg-light-blue",
          iconColor: "text-blue-icon",
        };
      case "XP":
        return {
          icon: "CloudComputer",
          iconBgColor: "bg-bg-light-green",
          iconColor: "text-green-icon",
        };
      case "SPIRAL":
        return {
          icon: "Spiral",
          iconBgColor: "bg-bg-light-yellow",
          iconColor: "text-yellow-icon",
        };
      case "INCREMENTAL":
        return {
          icon: "Incremental",
          iconBgColor: "bg-bg-light-red",
          iconColor: "text-red-icon",
        };
      default:
        return {
          icon: "Project",
          iconBgColor: "bg-bg-secondary",
          iconColor: "text-text-secondary",
        };
    }
  };

  const methodologyConfig = getMethodologyConfig(methodology);
  const MethodologyIcon = Icons[methodologyConfig.icon];

  const Icon = Icons["Project"];
  const avatarColors = ["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"];
  return (
    <div
      onClick={handleClick}
      className={`
        w-46
        h-46
        relative
        group
        cursor-pointer
        rounded-2xl
        border-bg-secondary
        bg-white
        shadow-sm
        transition
        hover:shadow-md
        hover:-translate-y-1
    `}
    >
      {isCreate && (
        <>
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            rounded-t-2xl
            h-13
            bg-bg-secondary
            flex
            items-center
            justify-left
            pl-4
        "
          >
            <NewIcon size={24} className={"text-text-secondary"} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 h-full pt-11">
            <Icon size={24} className="text-text-primary" />
            <h3
              className={`
            font-semibold
            text-text-primary
            pl-3
            pr-3
            z-20
        `}
            >
              {title}
            </h3>
          </div>
        </>
      )}
      {isProject && (
        <>
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            rounded-t-2xl
            h-13
            bg-bg-secondary
            flex
            items-center
            justify-left
            pl-4
        "
          >
            <div className="absolute">
              <h3
                className={`
            font-semibold
            text-text-primary
            pl-1
            pt-6
            pr-10
        `}
              >
                {title}
              </h3>
            </div>
          </div>

          <div className="absolute top-[14] right-3">
            <div
              className={`w-7 h-7 p-1 ${methodologyConfig.iconBgColor} ${methodologyConfig.iconColor} rounded-sm flex items-center justify-center`}
            >
              <MethodologyIcon size={20} />
            </div>
          </div>
          <div className="w-full mt-25 px-3">
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress ?? 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-normal text-text-secondary mt-1">
              <span>Tasks done</span>
              <span>{progress} %</span>
            </div>
          </div>
          <div className="absolute bottom-0 p-3 flex gap-2 w-full overflow-x-hidden">
            <Avatar
              size={20}
              name={teamName}
              variant="marble"
              colors={avatarColors}
            />
            <p className="text-sm font-medium text-text-secondary truncate min-w-0">
              {teamName}
            </p>
          </div>
        </>
      )}
      {isTeam && (
        <>
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            rounded-t-2xl
            h-13
            bg-bg-secondary
            flex
            items-center
            justify-left
            pl-4
        "
          >
            <Icon size={22} className={"text-text-secondary"} />
          </div>
          <div className="absolute top-13 left-0 right-0 px-4 pt-2">
            <h3 className="font-semibold text-text-primary line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="absolute bottom-0 p-3 flex gap-3 w-full items-center">
            <Avatar
              name={title}
              size={20}
              variant="marble"
              colors={avatarColors}
            />
            <div className="flex items-center gap-1">
              <p className="font-black text-lg text-text-primary">
                {memberCount}
              </p>
              <p className="text-sm font-normal text-text-secondary">
                Team Members
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCard;

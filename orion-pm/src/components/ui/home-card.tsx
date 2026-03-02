"use client";
import React, { ReactNode } from "react";
import { DynamicIcons, Icons } from "../icons";

type HomeCardVariant = "create" | "project" | "team";

interface HomeCardProps {
  variant: HomeCardVariant;
  title: string;
  subtitle?: string;
  icon: keyof typeof Icons;
  onClick?: () => void;
  progress?: number;
}

const HomeCard = ({
  variant,
  title,
  subtitle,
  icon,
  onClick,
  progress,
}: HomeCardProps) => {
  const isCreate = variant === "create";
  const isProject = variant === "project";
  const isTeam = variant === "team";
  const showProgress = variant === "project" && progress !== undefined;
  const Icon = Icons[icon];
  const NewIcon = Icons["Add"];

  return (
    <div
      onClick={onClick}
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
            <Icon size={22} className={"text-text-secondary"} />
          </div>
          <div className="absolute">
            <h3
              className={`
            font-semibold
            text-text-primary
            pl-12
            pt-3
            pr-3
        `}
            >
              {title}
            </h3>
          </div>
          <div className="w-full mt-25 px-3">
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: "60%" }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-text-secondary mt-1">
              <span>Tasks done</span>
              <span>60%</span>
            </div>
          </div>
          <div className="absolute bottom-0 p-3 flex gap-2 w-full overflow-x-hidden">
            {
              <DynamicIcons.Letter
                text={"Bruno Taconi"}
                size={22}
                className="text-sm"
                bgColor="bg-red-600"
                textColor="text-white"
              />
            }
            <p className="text-sm font-medium text-text-secondary">
              Bruno Taconi's Team
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
          <div className="absolute">
            <h3
              className={`
            font-semibold
            text-text-primary
            pl-12
            pt-18
            pr-4
        `}
            >
              {title}
            </h3>
          </div>
          <div className="absolute bottom-0 p-3 flex gap-2 w-full">
            {
              <p className="w-6 h-6 bg-accent-primary text-bg-primary rounded-sm flex items-center text-sm text-center justify-center font-medium">
                13
              </p>
            }
            <p className="text-sm font-medium text-text-secondary">members</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCard;

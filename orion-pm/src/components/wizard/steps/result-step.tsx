"use client";
import React, { useState } from "react";
import { WizardData } from "../project-wizard";
import { calculateRecommendation } from "@/lib/modelRecommendation";
import { BoxedIcon, Icons } from "@/components/icons";
import Image from "next/image";

type ResultStepProps = {
  data: WizardData;
  back: () => void;
  createProject: (selectedMethodology?: string) => void;
};

type MethodologyDetail = {
  id: string;
  name: string;
  desc: string;
  pillars: string;
  whenToUse: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
  iconColor: string;
};

const methodologiesDetails: MethodologyDetail[] = [
  {
    id: "SCRUM",
    name: "Scrum",
    desc: "Iterative agile framework focused on short sprints and continuous improvement.",
    pillars: "Daily stand-ups, sprints, visual tracking, constant feedback.",
    whenToUse:
      "Projects with changing requirements and active customer involvement.",
    icon: "Scrum",
    iconBgColor: "bg-bg-light-purple",
    iconColor: "text-purple-icon",
  },
  {
    id: "KANBAN",
    name: "Kanban",
    desc: "Agile method focused on continuous delivery and visual workflow management.",
    pillars: "Visual board, limited WIP (Work In Progress), stable flow.",
    whenToUse:
      "Continuous operations or teams that need to reduce bottlenecks.",
    icon: "Kanban",
    iconBgColor: "bg-bg-light-green",
    iconColor: "text-green-icon",
  },
  {
    id: "CASCADE",
    name: "Waterfall",
    desc: "Linear and highly structured process, with well-defined sequential stages.",
    pillars: "Rigid sequence, strong documentation, predictability.",
    whenToUse: "Very clear requirements and regulatory projects.",
    icon: "Waterfall",
    iconBgColor: "bg-bg-light-blue",
    iconColor: "text-blue-icon",
  },
  {
    id: "XP",
    name: "Extreme Programming (XP)",
    desc: "Agile framework focusing on high technical quality and frequent releases.",
    pillars: "Constant testing, refactoring, continuous integration.",
    whenToUse:
      "Complex technical projects requiring robust code and frequent changes.",
    icon: "CloudComputer",
    iconBgColor: "bg-bg-light-green",
    iconColor: "text-green-icon",
  },
  {
    id: "SPIRAL",
    name: "Spiral",
    desc: "Risk-driven model combining iterative development with systematic aspects.",
    pillars: "Risk analysis, validation cycles, controlled evolution.",
    whenToUse:
      "Large, expensive projects or those with high technical uncertainty.",
    icon: "Spiral",
    iconBgColor: "bg-bg-light-yellow",
    iconColor: "text-yellow-icon",
  },
  {
    id: "INCREMENTAL",
    name: "Incremental",
    desc: "System is developed in consecutive chunks, adding functionality over time.",
    pillars: "Modular division, fast deliveries, gradual evolution.",
    whenToUse: "Projects that need to launch core features early.",
    icon: "Incremental",
    iconBgColor: "bg-bg-light-red",
    iconColor: "text-red-icon",
  },
];

export default function ResultStep({
  data,
  back,
  createProject,
}: ResultStepProps) {
  const [selectedDetails, setSelectedDetails] =
    useState<MethodologyDetail | null>(null);

  const result = calculateRecommendation(data);

  const otherOptions = methodologiesDetails.filter((m) => m.id !== result);

  const getReasons = () => {
    const reasons = [];

    if (data.scopeClarity) {
      const scopeMap: Record<string, string> = {
        clear: "Well defined scope",
        partial: "Partially defined scope",
        undefined: "Undefined scope",
      };
      reasons.push({
        text: scopeMap[data.scopeClarity] || "Scope analyzed",
        icon: "Clipboard",
        bgColor: "bg-bg-light-yellow",
        iconColor: "text-yellow-icon",
      });
    }

    if (data.teamSize) {
      const teamMap: Record<string, string> = {
        small: "Small team (1 - 4)",
        medium: "Medium team (5 - 8)",
        big: "Large team (8+)",
      };
      reasons.push({
        text: teamMap[data.teamSize] || "Team size analyzed",
        icon: "TeamFilled",
        bgColor: "bg-bg-light-green",
        iconColor: "text-green-icon",
      });
    }

    if (data.stability) {
      const stabilityMap: Record<string, string> = {
        "pretty-stable": "High stability",
        "always-changing": "High need for adaptation",
      };
      reasons.push({
        text: stabilityMap[data.stability] || "Adaptability analyzed",
        icon: "Cycle",
        bgColor: "bg-bg-light-purple",
        iconColor: "text-purple-icon",
      });
    }

    if (data.customerParticipation) {
      const customerMap: Record<string, string> = {
        constant: "Constant customer participation",
        weekly: "Weekly customer participation",
        rare: "Rare customer participation",
      };
      reasons.push({
        text:
          customerMap[data.customerParticipation] || "Customer participation",
        icon: "Calendar",
        bgColor: "bg-bg-light-orange",
        iconColor: "text-orange-icon",
      });
    }

    return reasons.slice(0, 4);
  };

  const userReasons = getReasons();

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wide mb-6">
          {result}!
        </h2>

        <div className="w-64 h-40 rounded-lg flex items-center justify-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/result_svg.svg"
              alt="Ilustração de pessoas colaborando"
              width={200}
              height={200}
              priority
            />
          </div>
        </div>

        <p className="text-md text-text-secondary text-center mb-4 max-w-sm">
          Based on your answers, we suggest this model!
        </p>

        <div className="w-full flex flex-col gap-4 mb-4">
          <h4 className="font-semibold text-text-primary">Reasons</h4>
          <div className="flex justify-between items-start w-full gap-2">
            {userReasons.map((reason, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center flex-1 gap-2">
                  <BoxedIcon
                    icon={reason.icon as any}
                    bgColor={reason.bgColor}
                    iconColor={reason.iconColor}
                    size={20}
                  />
                  <span className="text-sm text-text-primary leading-tight">
                    {reason.text}
                  </span>
                </div>
                {idx < userReasons.length - 1 && (
                  <div className="hidden sm:block w-8 h-px bg-border mt-3"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-8">
          <h4 className="font-semibold text-text-primary">
            Other considered options
          </h4>

          <div className="flex overflow-x-auto gap-4 pb-2 w-full snap-x snap-mandatory hide-scrollbar">
            {otherOptions.map((option) => (
              <div
                key={option.id}
                className="min-w-50 flex-1 border border-border rounded-xl p-4 flex flex-col items-center text-center shadow-sm snap-center"
              >
                <h5 className="font-bold text-text-primary mb-2">
                  {option.name}
                </h5>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 grow">
                  {option.desc}
                </p>
                <button
                  onClick={() => setSelectedDetails(option)}
                  className="mt-auto w-full bg-accent-primary text-bg-primary text-sm font-normal py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-8 mt-4 w-full">
          <button
            onClick={back}
            className="p-2 text-text-secondary hover:text-black cursor-pointer transition"
          >
            Choose another model
          </button>
          <button
            onClick={() => createProject(result)}
            className="bg-accent-primary text-bg-primary py-2 px-4 rounded-sm cursor-pointer hover:bg-blue-700 transition font-medium"
          >
            Accept recommendation and create project
          </button>
        </div>
      </div>

      {selectedDetails && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-[rgb(15_23_42/0.6)] backdrop-blur-sm p-4">
          <div className="bg-bg-primary w-full max-w-md rounded-xl shadow-2xl p-6 flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-4">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-lg ${selectedDetails.iconBgColor}`}
              >
                {(() => {
                  const DetailIcon = Icons[selectedDetails.icon];
                  return DetailIcon ? (
                    <DetailIcon
                      size={28}
                      className={selectedDetails.iconColor}
                    />
                  ) : null;
                })()}
              </div>
            </div>

            <h3 className="text-xl font-bold text-center text-text-primary mb-6">
              {selectedDetails.name}
            </h3>

            <div className="flex flex-col gap-4 text-sm text-text-secondary mb-8">
              <p>
                <strong className="text-text-primary font-semibold">
                  Description:
                </strong>{" "}
                {selectedDetails.desc}
              </p>
              <p>
                <strong className="text-text-primary font-semibold">
                  Pillars:
                </strong>{" "}
                {selectedDetails.pillars}
              </p>
              <p>
                <strong className="text-text-primary font-semibold">
                  When to use:
                </strong>{" "}
                {selectedDetails.whenToUse}
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => setSelectedDetails(null)}
                className="flex-1 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => createProject(selectedDetails.id)}
                className="flex-1 py-2 bg-accent-primary text-bg-primary rounded-sm font-medium text-sm hover:bg-blue-700 transition cursor-pointer"
              >
                Choose this model
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

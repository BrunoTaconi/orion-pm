import React from "react";
import { WizardData } from "../project-wizard";
import { calculateRecommendation } from "@/lib/modelRecommendation";
import { BoxedIcon } from "@/components/icons";
import Image from "next/image";

type ResultStepProps = {
  data: WizardData;
  back: () => void;
  createProject: () => void;
};

const methodologiesDetails = [
  {
    id: "SCRUM",
    name: "Scrum",
    desc: "Iterative agile framework focused on short sprints and continuous improvement.",
  },
  {
    id: "KANBAN",
    name: "Kanban",
    desc: "Agile method focused on continuous delivery and visual workflow management.",
  },
  {
    id: "CASCADE",
    name: "Waterfall",
    desc: "Linear and highly structured process, with well-defined sequential stages.",
  },
  {
    id: "XP",
    name: "XP (Extreme Programming)",
    desc: "Agile framework focusing on high technical quality and frequent releases.",
  },
  {
    id: "SPIRAL",
    name: "Spiral",
    desc: "Risk-driven model combining iterative development with systematic aspects.",
  },
  {
    id: "INCREMENTAL",
    name: "Incremental",
    desc: "System is developed in consecutive chunks, adding functionality over time.",
  },
];

export default function ResultStep({
  data,
  back,
  createProject,
}: ResultStepProps) {
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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wide mb-6">
        {result}!
      </h2>

      <div className="w-64 h-40  rounded-lg flex items-center justify-center mb-6">
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
                  size={16}
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
              <h5 className=" font-bold text-text-primary mb-2">
                {option.name}
              </h5>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 grow">
                {option.desc}
              </p>
              <button
                onClick={() =>
                  console.log(`Abrir modal de info do ${option.name}`)
                }
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
          onClick={createProject}
          className="  bg-accent-primary
        text-bg-primary
        py-2
        px-4
        rounded-sm
        cursor-pointer
        hover:bg-blue-700
        transition"
        >
          Accept recommendation and create project
        </button>
      </div>
    </div>
  );
}

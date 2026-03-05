"use client";
import React from "react";
import { Icons } from "@/components/icons";

type ExplanationStepProps = {
  next: () => void;
  back: () => void;
};

const stepsCards = [
  {
    id: 1,
    title: "Project Profile",
    description: "Here we begin to shape the style of your workflow.",
    icon: "Clipboard",
    bgClass: "bg-bg-light-yellow",
    iconClass: "text-yellow-icon",
  },

  {
    id: 2,
    title: "Risks and Requirements",
    description:
      "You tell us the challenges, constraints, and essential requirements.",
    icon: "Warning",
    bgClass: "bg-bg-light-orange",
    iconClass: "text-orange-icon",
  },

  {
    id: 3,
    title: "Team Size",
    description:
      "Inform who will be part of the project and the team's capacity.",
    icon: "TeamFilled",
    bgClass: "bg-bg-light-green",
    iconClass: "text-green-icon",
  },

  {
    id: 4,
    title: "Recommended Models",
    description: "Based on your answers, we suggest the ideal model!",
    icon: "Cycle",
    bgClass: "bg-bg-light-blue",
    iconClass: "text-blue-icon",
  },
];

const ExplanationStep = ({ next, back }: ExplanationStepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-md text-text-primary">
        <p>
          We want to learn more about your project in order to recommend the
          most suitable work format.
        </p>
        <p>It only takes a few moments. 😊</p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <h4 className="text-md font-normal text-text-secondary">Next steps</h4>

        <div className="grid grid-cols-2 gap-4">
          {stepsCards.map((card) => {
            const CardIcon =
              Icons[card.icon as keyof typeof Icons] || Icons.Project;

            return (
              <div
                key={card.id}
                className={`flex flex-col items-center text-center p-9 rounded-xl ${card.bgClass}`}
              >
                <div className={`mb-3 ${card.iconClass}`}>
                  <CardIcon size={28} />
                </div>
                <h3 className="text-md font-semibold text-text-primary mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-5">
        <button
          className="p-2 text-text-secondary hover:text-black cursor-pointer transition"
          onClick={back}
        >
          Back
        </button>
        <button
          className="
        bg-accent-primary
        text-bg-primary
        p-2
        rounded-sm
        cursor-pointer
        hover:bg-blue-700
        transition
        "
          onClick={next}
        >
          Advance to the assistant
        </button>
      </div>
    </div>
  );
};

export default ExplanationStep;

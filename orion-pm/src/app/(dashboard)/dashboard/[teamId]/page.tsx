"use client";
import HomeCard from "@/components/ui/home-card";

export default function WorkspaceHome() {
  return (
    <div className="flex gap-4">
      <HomeCard
        variant={"create"}
        title={"New Project"}
        icon={"Project"}
        onClick={() => {}}
      />
      <HomeCard
        variant={"create"}
        title={"New Team"}
        icon={"Team"}
        onClick={() => {}}
      />
      <HomeCard
        variant={"project"}
        title={"Software Engineering Project"}
        icon={"Project"}
        onClick={() => {}}
      />
      <HomeCard
        variant={"team"}
        title={"Bruno Taconi's Team"}
        icon={"Team"}
        onClick={() => {}}
      />
    </div>
  );
}

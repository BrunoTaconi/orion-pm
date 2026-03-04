"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard, { HomeCardAction } from "../ui/home-card";
import { ProjectMock, TeamMock, UserMock } from "@/mocks/mock";
import ProjectWizard from "../wizard/project-wizard";
import { Icons } from "../icons";
import { getTeamMembersCount } from "@/mocks/repositories";

interface DashboardClientProps {
  greeting: string;
  user: UserMock;
  teams: TeamMock[];
  projects: ProjectMock[];
}

export default function DashboardClient({
  greeting,
  user,
  teams,
  projects,
}: DashboardClientProps) {
  const router = useRouter();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const RecentIcon = Icons["Recent"];
  const ProjectIcon = Icons["Project"];
  const TeamIcon = Icons["Team"];

  const handleAction = (action: HomeCardAction, payload?: { id: string }) => {
    switch (action) {
      case "create-project":
        setIsWizardOpen(true);
        break;

      case "create-team":
        router.push("/teams/create");
        break;

      case "enter-project":
        router.push(`/projects/${payload?.id}`);
        break;

      case "enter-team":
        router.push(`/teams/${payload?.id}`);
        break;
    }
  };

  return (
    <>
      <div className="px-12">
        <header className="flex flex-col items-left gap-0 font-bold  border-b-2 border-bg-secondary mb-6 pb-2">
          <p className="text-2xl text-text-primary">{greeting},</p>
          <p className="text-lg text-text-secondary font-medium">{user.name}</p>
        </header>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center text-text-secondary">
              <RecentIcon size={22} />
              <p className="text-xl font-medium">Recents</p>
            </div>
            <div className="flex gap-4">
              {teams.map((team) => (
                <HomeCard
                  key={team.id}
                  variant="team"
                  title={team.name}
                  icon="Team"
                  action="enter-team"
                  payload={{ id: team.id }}
                  memberCount={getTeamMembersCount(team.id)}
                  onAction={handleAction}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center text-text-secondary">
              <ProjectIcon size={22} />
              <p className="text-xl font-medium">Your Projects</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {projects.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-10 text-text-secondary">
                  <p className="mb-4">You do not have any project yet.</p>

                  <HomeCard
                    variant="create"
                    title="Create your first project"
                    icon="Project"
                    action="create-project"
                    onAction={handleAction}
                  />
                </div>
              ) : (
                <>
                  {projects.map((project) => (
                    <HomeCard
                      key={project.id}
                      variant="project"
                      title={project.name}
                      icon="Project"
                      action="enter-project"
                      payload={{ id: project.id }}
                      ownerName={user.name}
                      teamName={"Bruno Taconi's team"}
                      progress={60}
                      onAction={handleAction}
                    />
                  ))}

                  <HomeCard
                    variant="create"
                    title="New Project"
                    icon="Project"
                    action="create-project"
                    onAction={handleAction}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center text-text-secondary">
              <TeamIcon size={22} />
              <p className="text-xl font-medium">Your Teams</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {teams.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-10 text-text-secondary">
                  <p className="mb-4">You do not have any team yet.</p>
                  <HomeCard
                    variant="create"
                    title="Create your first team"
                    icon="Team"
                    action="create-team"
                    onAction={handleAction}
                  />
                </div>
              ) : (
                <>
                  {teams.map((team) => (
                    <HomeCard
                      key={team.id}
                      variant="team"
                      title={team.name}
                      icon="Team"
                      action="enter-team"
                      payload={{ id: team.id }}
                      memberCount={getTeamMembersCount(team.id)}
                      onAction={handleAction}
                    />
                  ))}

                  <HomeCard
                    variant="create"
                    title="New team"
                    icon="Team"
                    action="create-team"
                    onAction={handleAction}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProjectWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </>
  );
}

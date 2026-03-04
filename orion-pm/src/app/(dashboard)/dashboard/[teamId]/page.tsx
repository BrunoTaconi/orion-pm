import DashboardClient from "@/components/dashboard/dashboard-client";
import { getCurrentUserMock } from "@/mocks/auth";
import { getProjectsByUser, getTeamsByUser } from "@/mocks/repositories";
import { getGreeting } from "@/utils/date/getGreeting";

export default function WorkspaceHome() {
  const greeting = getGreeting();
  const user = getCurrentUserMock();
  const teams = getTeamsByUser(user.id);
  const projects = getProjectsByUser(user.id);

  return (
    <DashboardClient
      greeting={greeting}
      user={user}
      teams={teams}
      projects={projects}
    />
  );
}

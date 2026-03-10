import { redirect } from "next/navigation";
import { getGreeting } from "@/utils/date/getGreeting";
import { getCurrentUserMock } from "@/mocks/auth";
import { getProjectsByUser, getTeamsByUser } from "@/mocks/repositories";
import DashboardClient from "@/components/dashboard/dashboard-client";

import { auth } from "@/lib/auth";

export default async function DashboardRedirect() {
  if (process.env.DEV_AUTH_BYPASS !== "true") {
    const session = await auth();

    if (!session) {
      redirect("/login");
    }
  }
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

import { redirect } from "next/navigation";
import { DEV_TEAM_ID } from "@/utils/dev";

export default async function DashboardRedirect() {
  if (process.env.DEV_AUTH_BYPASS === "true") {
    redirect(`/dashboard/${DEV_TEAM_ID}`);
  }

  return null;
}
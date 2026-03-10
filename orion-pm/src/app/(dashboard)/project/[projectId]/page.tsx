import { redirect } from "next/navigation";

export default async function ProjectIndexPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;

  redirect(`/project/${resolvedParams.projectId}/dashboard`);
}

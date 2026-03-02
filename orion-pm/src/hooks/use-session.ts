"use client";

import { useSession } from "next-auth/react";

export function useAppSession() {
  const session = useSession();

  return {
    user: session.data?.user,
    loading: session.status === "loading",
    authenticated: session.status === "authenticated",
  };
}

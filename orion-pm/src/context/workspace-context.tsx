import { createContext, useContext, useState } from "react";

type WorkspaceContextType = {
  teamId?: string;
  setTeamId: (id: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType>({
  setTeamId: () => {},
});

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [teamId, setTeamId] = useState<string>();

  return (
    <WorkspaceContext.Provider value={{ teamId, setTeamId }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);

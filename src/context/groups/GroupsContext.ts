import { createContext, useContext } from "react";
import { type CreateGroupPayload } from "../../api/groups/api";
import type { User } from "../../types/user";
import type { Group } from "../../types/groups";

type GroupContextType = {
  allUsers: User[];
  isLoadingUsers: boolean;
  fetchUsers: () => Promise<void>;
  createGroup: (payload: CreateGroupPayload) => Promise<void>;
  isCreatingGroup: boolean;
  groups: Group[];
  isLoadingGroups: boolean;
  fetchGroups: () => Promise<void>;
};

export const GroupContext = createContext<GroupContextType | null>(null);

export function useGroup() {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupsProvider");
  }
  return context;
}

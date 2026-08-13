import { useState, useCallback, type ReactNode, useEffect } from "react";
import type { User } from "../../types/user";
import { groupsAPI, type CreateGroupPayload } from "../../api/groups/api";
import { GroupContext } from "./GroupsContext";
import type { Group } from "../../types/groups";
import { getFriendlyError } from "../../utils/getFriendlyError";

export function GroupProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const users = await groupsAPI.getUsers();
      setAllUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  const fetchGroups = useCallback(async () => {
    setIsLoadingGroups(true);
    setGroupsError(null);
    try {
      const data = await groupsAPI.getGroups();
      setGroups(data);
    } catch (error) {
      setGroupsError(getFriendlyError(error));
    } finally {
      setIsLoadingGroups(false);
    }
  }, []);

  const createGroup = useCallback(
    async (payload: CreateGroupPayload) => {
      setIsCreatingGroup(true);
      try {
        await groupsAPI.createGroup(payload);
        await fetchGroups();
      } catch (error) {
        console.error("Failed to create group:", error);
        throw error;
      } finally {
        setIsCreatingGroup(false);
      }
    },
    [fetchGroups],
  );

  useEffect(() => {
    void Promise.resolve().then(fetchGroups);
  }, [fetchGroups]);

  return (
    <GroupContext.Provider
      value={{
        allUsers,
        isLoadingUsers,
        fetchUsers,
        groups,
        isLoadingGroups,
        groupsError,
        fetchGroups,
        createGroup,
        isCreatingGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export { GroupProvider as GroupsProvider };

import type { Group, User } from "../../types/groups";
import { apiRequest } from "../request";

export type CreateGroupPayload = {
  name: string;
  members: string[];
};

export const groupsAPI = {
  searchMembers: async (query: string): Promise<User[]> => {
    const res = await apiRequest<{ users: User[] }>({
      method: "GET",
      url: "/api/users/search",
      params: { query },
    });

    return res.users ?? [];
  },

  getUsers: async (): Promise<User[]> => {
    const res = await apiRequest<{ users: User[] }>({
      method: "GET",
      url: "/api/users",
    });

    return res.users ?? [];
  },

  createGroup: async (payload: CreateGroupPayload): Promise<Group> => {
    const res = await apiRequest<{ group: Group }>({
      method: "POST",
      url: "/api/groups",
      data: payload,
    });

    if (!res.group) {
      throw new Error("Create group response did not include a group");
    }

    return res.group;
  },

  getGroups: async (): Promise<Group[]> => {
    const res = await apiRequest<{ groups: Group[] }>({
      method: "GET",
      url: "/api/groups",
    });

    return res.groups ?? [];
  },

  getGroupById: async (groupId: string): Promise<Group> => {
    const res = await apiRequest<{ group: Group }>({
      method: "GET",
      url: `/api/groups/${groupId}`,
    });

    if (!res.group) {
      throw new Error("Group not found");
    }

    return res.group;
  },
};
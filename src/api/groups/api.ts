import type { Group, User } from "../../types/groups";

const BASE_URL = import.meta.env.VITE_API_URL;

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "An unexpected error occurred");
  }

  return data as T;
}

export type CreateGroupPayload = {
  name: string;
  members: string[];
};

export const groupsAPI = {
  searchMembers: async (query: string): Promise<User[]> => {
    const res = await apiRequest<{ users: User[] }>(
      `/api/users/search?query=${encodeURIComponent(query)}`,
    );
    return res.users ?? [];
  },

  getUsers: async (): Promise<User[]> => {
    const res = await apiRequest<{ users: User[] }>(`/api/users`);
    return res.users ?? [];
  },

  createGroup: async (payload: CreateGroupPayload): Promise<Group> => {
    const res = await apiRequest<{ group: Group }>("/api/groups", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.group)
      throw new Error("Create group response did not include a group");
    return res.group;
  },

  getGroups: async (): Promise<Group[]> => {
    const res = await apiRequest<{ groups: Group[] }>(`/api/groups`);
    return res.groups ?? [];
  },

  getGroupById: async (groupId: string): Promise<Group> => {
    const res = await apiRequest<{ group: Group }>(`/api/groups/${groupId}`);
    if (!res.group) throw new Error("Group not found");
    return res.group;
  },
};

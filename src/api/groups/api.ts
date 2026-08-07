import type { Group } from "../../types/groups";
import type { User } from "../../types/user";

const BASE_URL = import.meta.env.VITE_API_URL;

export type CreateGroupPayload = {
  name: string;
  memberIds: string[];
};

export type SearchMembersResponse = {
  success: true;
  users: User[];
};

export type CreateGroupResponse = {
  success: true;
  group: Group;
};

export type GroupsResponse = {
  success: true;
  groups: Group[];
};

export const groupsAPI = {
  async searchMembers(query: string): Promise<User[]> {
    const response = await fetch(
      `${BASE_URL}/api/members/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = (await response.json()) as Partial<SearchMembersResponse> & {
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || "Failed to search members");
    }

    return data.users ?? [];
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/api/members/search?q=`, {
      method: "GET",
      credentials: "include",
    });

    const data = (await response.json()) as Partial<SearchMembersResponse> & {
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data.users ?? [];
  },

  async createGroup(payload: CreateGroupPayload): Promise<Group> {
    const response = await fetch(`${BASE_URL}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as Partial<CreateGroupResponse> & {
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || "Failed to create group");
    }

    if (!data.group) {
      throw new Error("Create group response did not include a group");
    }

    return data.group;
  },
  async getGroups(): Promise<Group[]> {
    const response = await fetch(`${BASE_URL}/api/groups`, {
      method: "GET",
      credentials: "include",
    });

    const data = (await response.json()) as Partial<GroupsResponse> & {
      message?: string;
    };
    if (!response.ok) throw new Error(data.message || "Failed to fetch groups");
    return data.groups ?? [];
  },
};

import type { User } from "../types/user";

export default function getName(user: User) {
  const userEmail = user?.email;
  const name = userEmail?.split("@")[0];
  return name;
}

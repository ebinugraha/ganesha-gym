"use client";

import { authClient } from "@/lib/auth-client";

const UserPage = () => {
  const { data } = authClient.useSession();
  return <div>{data?.user.name}</div>;
};

export default UserPage;

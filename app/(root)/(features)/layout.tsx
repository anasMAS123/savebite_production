import LayoutHeader from "@/components/layout/LayoutHeader";
import LayoutNavigationList from "@/components/layout/LayoutNavigationList";
import { decrypt } from "@/helpers/helpers";
import { cookies } from "next/headers";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const encryptedsession = (await cookies()).get("sessionData");
  const session = encryptedsession && (await decrypt(encryptedsession?.value));
  if (!session) throw new Error("there is no token");
  console.log(session.name);
  return (
    <div>
      <LayoutHeader name={session.name ?? ""} email={session.email ?? ""} />
      <div className="flex min-h-screen">
        <LayoutNavigationList />
        <div className="bg-[#f6f6f6] flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;

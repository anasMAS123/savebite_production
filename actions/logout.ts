"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const logout = async () => {
  (await cookies()).delete("session");
  (await cookies()).delete("sessionData");
  redirect("/login/with-img", RedirectType.replace);
};

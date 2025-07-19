"use server";
import { cookies } from "next/headers";

export async function languageSwitch(language: string) {
  (await cookies()).set("lang", language);
}

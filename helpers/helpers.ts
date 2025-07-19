//encrypt

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

if (!process.env.ENCRYPT_KEY || process.env.ENCRYPT_KEY.length < 32) {
  throw new Error(
    "Missing or insecure ENCRYPT_KEY. Must be at least 32 characters."
  );
}
const usedKey = new TextEncoder().encode(process.env.ENCRYPT_KEY);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(usedKey);
}

//decrypt

// get Current user
export async function currentUser() {
  //   const session = cookies().get("session")?.value;
  //   if (!session) return null;
  const encryptedUserData = (await cookies()).get("sessionData")!;
  const userData = await decrypt(encryptedUserData?.value);
  return await userData;
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, usedKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateCurrentUser() {
  //check if there any session and sessionData
  const sessionFound = (await cookies()).get("session")!;
  const sessionDataFound = (await cookies()).get("sessionData")!;
  if (!sessionFound && !sessionDataFound) return;
  // get encryptedSession
  const encryptedSession = (await cookies()).get("session")!.value;
  const encryptedSessionData = (await cookies()).get("sessionData")!.value;
  //decryptSession
  const decryptedSession = await decrypt(encryptedSession);
  const decryptedSessionData = await decrypt(encryptedSessionData);

  const res = NextResponse.next();

  //mutate the expires
  if (!decryptedSession && !decryptedSessionData) return;
  console.log(decryptedSession.expires);
  const newDate = new Date(
    new Date(decryptedSession.expires).getTime() + 60 * 60 * 1000
  );
  console.log("new date is -> " + newDate);
  decryptedSession.expires = newDate;
  decryptedSessionData.expires = newDate;
  // push the new changes
  const newSessionValue = await encrypt(decryptedSession);
  const newSessionDataValue = await encrypt(decryptedSessionData);

  res.cookies.set({
    name: "session",
    value: newSessionValue,
    expires: newDate,
    httpOnly: true,
    secure: true, // only over HTTPS
    sameSite: "strict", // prevents CSRF
    path: "/", // cookie available on all routes
  });
  res.cookies.set({
    name: "sessionData",
    value: newSessionDataValue,
    expires: newDate,
    httpOnly: true,
    secure: true, // only over HTTPS
    sameSite: "strict", // prevents CSRF
    path: "/", // cookie available on all routes
  });
  return res;
}

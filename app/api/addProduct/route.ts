// app/api/addProduct/route.ts
import { decrypt } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // get and decrypt the session cookie
  const session = (await cookies()).get("session");
  const encryptedSession = session?.value;
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.DATABASE_URL}/tracking-products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Failed to add product", message: errorText },
        { status: res.status }
      );
    }

    const result = await res.json();
    revalidatePath("/tracking");

    return NextResponse.json({ message: "Added", data: result });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", message: String(err) },
      { status: 500 }
    );
  }
}

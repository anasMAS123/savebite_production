import { decrypt } from "@/helpers/helpers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // get and decrypt the session cookie
  const session = (await cookies()).get("session");
  const encryptedSession = session?.value;
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");

  try {
    const response = await fetch(
      `${process.env.DATABASE_URL}/tracking-products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Failed to delete:", errText);
      return NextResponse.json(
        { error: "Failed to delete", message: errText },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Server error during deletion:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: String(error) },
      { status: 500 }
    );
  }
}

import { decrypt } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GET() {
  console.log("📡 Received request to /api/getProducts");

  // get and decrypt the session cookie
  const session = (await cookies()).get("session");
  const encryptedSession = session?.value;
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;

  if (!authToken) {
    return new Response(
      JSON.stringify({
        error: "Authentication failed",
        message: "Missing token",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await fetch(
      `${process.env.DATABASE_URL}/tracking-products`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ External API error ${response.status}:`, errorText);
      return new Response(
        JSON.stringify({
          error: "External API error",
          status: response.status,
          message: errorText,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    revalidatePath("/tracking");
    console.log("✅ Products fetched:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

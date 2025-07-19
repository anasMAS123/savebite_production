import { cookies } from "next/headers";

export async function POST(req: Request) {
  const otp_token = (await cookies()).get("otp-token")?.value;
  const auth_token = (await cookies()).get("auth-token")?.value;
  // const authHeader = req.headers.get("Authorization");
  if (!otp_token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // 2️⃣ Parse the request body (contains OTP data)
  const body = await req.json();

  const response = await fetch(`${process.env.DATABASE_URL}/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ ...body, otp_token }), // Forward the request body
  });
  return response;
}

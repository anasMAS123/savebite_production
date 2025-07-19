import { decrypt } from "@/helpers/helpers";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  // get and decrypt the session cookie
  const session = (await cookies()).get("session");
  const encryptedSession = session?.value;
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  const requiredFields = [
    "number_id",
    "name",
    "category",
    "quantity",
    "label",
    "start_date",
    "end_date",
    "status",
  ];

  const missing = requiredFields.filter((field) => !body[field]);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        message: `Missing required fields: ${missing.join(", ")}`,
      },
      { status: 422 }
    );
  }

  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}/tracking-products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend returned error:", data);
      return NextResponse.json(
        {
          status: res.status,
          message: data.message || "Update failed",
          data: data.errors || null,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unexpected error in PUT:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

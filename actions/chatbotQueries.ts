"use server";
import { decrypt } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { parse } from "path";
//store the message
export const storeMessage = async (message: string, is_bot: string) => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  //request the data cuz you are authenticated user
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/`, {
      method: "POST",
      body: JSON.stringify({
        message,
        is_bot,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res.status === 200 && res.message === "Success") {
      revalidatePath("/chatbite");
      return res.data;
    }
    return {};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get the stored messages

export const storedMessages = async () => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  //request the data cuz you are authenticated user
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const res = await req.json();
  if (res.status === 200 && res.message === "messages.messages") {
    return res;
  }
  return [];
};

//set as favourite

export const toggleFavourite = async (id: number) => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  //request the data cuz you are authenticated user
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/add-to-favourites/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res.status === 200) {
      revalidatePath("/chatbite");
      return res;
    }
    return {};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get Favourites
export const getfavourites = async () => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  //request the data cuz you are authenticated user
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/favorites`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res.status === 200) return res;
    return [];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get actual response from the AI model

export const getModelResponse = async (message: string) => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  //request the data cuz you are authenticated user
  try {
    const req = await fetch(`${process.env.CHATBOT_RESPONSE_MODEL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: message,
      }),
    });
    const res = await req.json();
    console.log(res);
    console.log("hola");

    const cleaned = res.result
      .replace(/```json\n?/, "")
      .replace(/```/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error: any) {
    console.error(error.message || "AI model request failed");
    return {
      result: "ERROR",
      msg: "sorry, I could not process your request at the moment.",
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const getLowStockItems = async () => {
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tracking-products?status=near-to-expire`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    return res.data;
  } catch (error) {
    return { error };
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////

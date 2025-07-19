"use server";
import { handleDataNames } from "@/helpers/dataUploadAndFetching";
import { decrypt, encrypt } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//important !!

/* trick: the idea behind this counter is to send a different error message everytime for example wrong1 then 
the counter increase to be wrong2 in the next error and so on 
now we capture the error using (includes method ) instead of trying to using (===) for exact error message
*/
let errorCounter = 0;

export async function handleLoginFormWithImage(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  if (!emailRegex.test(email)) return `email cannot be empty or wrong`;

  const inputImg = formData.get("image") as File;

  if (inputImg instanceof File) {
    if (inputImg.name === "undefined") return "file is not found";
  }
  if (!(inputImg instanceof File)) {
    return "file is not found";
  }
  const remember = formData.get("remember") as string;
  const options = {
    method: "POST",

    body: formData,
  };
  //send request
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign/in`,
      options
    );
    const data = await req.json();
    if (data.status === 200 && data.message === "Successfully authenticated.") {
      const { name, email, type, is_verified: isVerified, token } = data.data;
      //session length
      let expires: Date;
      if (typeof remember === "string") {
        expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      } else {
        expires = new Date(Date.now() + 60 * 60 * 1000);
      }
      //session token
      const session = { token, expires };
      //sessionData
      const sessionData = { name, email, type, isVerified, expires };
      //encrypt session
      const encryptedSession = await encrypt(session);
      //encrypt session data
      const encryptedSessionData = await encrypt(sessionData);

      //set cookies for session token
      (await cookies()).set("session", encryptedSession, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
      //set cookies for session data
      (await cookies()).set("sessionData", encryptedSessionData, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
    } else {
      throw new Error(`Invalid Credentials${++errorCounter}`);
    }
  } catch (error: any) {
    console.log(error?.message);
    return error?.message;
  }

  revalidatePath("/");

  redirect("/dashboard");
}

export async function handleLoginFormWithPass(
  _currentState: unknown,
  formData: FormData
) {
  //fetch data
  const email = formData.get("email") as string;
  if (!emailRegex.test(email)) return `email cannot be empty or wrong`;

  const password = formData.get("password") as string;
  if (password.length === 0) return "password cannot be empty";

  const remember = formData.get("remember");

  const options = {
    method: "POST",

    body: formData,
  };
  //send request
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign/in`,
      options
    );
    const data = await req.json();
    if (data.status === 200 && data.message === "Successfully authenticated.") {
      const { name, email, type, is_verified: isVerified, token } = data.data;

      let expires: Date;
      if (typeof remember === "string") {
        expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      } else {
        expires = new Date(Date.now() + 60 * 60 * 1000);
      }
      //session token
      const session = { token, expires };
      //sessionData
      const sessionData = { name, email, type, isVerified, expires };
      //encrypt session
      const encryptedSession = await encrypt(session);
      //encrypt session data
      const encryptedSessionData = await encrypt(sessionData);

      //set cookies for session token
      (await cookies()).set("session", encryptedSession, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
      //set cookies for session data
      (await cookies()).set("sessionData", encryptedSessionData, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
    } else {
      throw new Error(`Invalid Credentials${++errorCounter}`);
    }
  } catch (error: any) {
    console.log(error?.message);
    return error?.message;
  }

  revalidatePath("/");
  redirect("/dashboard");
}
export async function handleLostImg(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  if (!emailRegex.test(email)) return "email cannot be empty or wrong";

  const question = formData.get("question") as string;

  if (question === "") return "you must answer the question";

  const expires = new Date(Date.now() + 5 * 60 * 1000);
  if (email && question) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lost-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        answer: question,
      }),
    });
    const res = await req.json();
    if (res.status === 200) {
      (await cookies()).set("intermediate-session", res.data?.otp_token, {
        expires,
        httpOnly: false,
      });
      redirect(`/login/recovery-img/verify?email=${encodeURIComponent(email)}`);
    } else {
      return "you must answer the question correctly";
    }
  }
}

export const handleVerifyCode = async (otpCode: string, email: string) => {
  const intermediateSessionOTP = (await cookies()).get(
    "intermediate-session"
  )?.value;
  if (!intermediateSessionOTP && !email) return "Invalid Request";
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/lost-image-check-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_token: intermediateSessionOTP,
        otp: otpCode,
        email,
      }),
    }
  );
  const res = await req.json();
  if (res.status === 200) {
    redirect(
      `/login/recovery-img/img-verified?email=${encodeURIComponent(email!)}`
    );
  } else {
    return "The OTP is wrong , please try again";
  }
};
export async function handleSignupForm(
  _currentState: unknown,
  formData: FormData
) {
  let flag;
  const fields = [
    {
      name: "username",
      validate: (value: string) => value.trim().length > 0,
      error: "Username is required",
    },
    {
      name: "email",
      validate: (value: string) => emailRegex.test(value),
      error: "Invalid email format",
    },
    {
      name: "Phone-Number",
      validate: (value: string) => /^\d{11}$/.test(value),
      error: "Invalid phone number",
    },
    {
      name: "favorite-drink",
      validate: (value: string) => value !== "",

      error: "Question is required",
    },
    {
      name: "password",
      validate: (value: string) => value.trim().length >= 8,
      error: "Password must be 8 charchters at least",
    },
    {
      name: "confirm-password",
      validate: (value: string) => {
        if (
          value.trim().length >= 8 &&
          value === (formData.get("password") as string)
        )
          return true;
      },
      error: "Please confirm your password",
    },
    {
      name: "account-type",
      validate: (value: string) => value.trim().length > 0,
      error: "Account type is required",
    },
  ];

  for (const field of fields) {
    const value = formData.get(field.name) as string;
    if (!field.validate(value)) {
      return field.error;
    }
  }
  const image = formData.get("image") as File;
  if (image instanceof File) {
    if (image.name === "undefined") return "File is not found";
  }

  const sentFormData = new FormData();
  sentFormData.append("user_name", formData.get("username") as string);
  sentFormData.append("email", formData.get("email") as string);
  sentFormData.append("password", formData.get("password") as string);
  sentFormData.append(
    "password_confirmation",
    formData.get("confirm-password") as string
  );
  sentFormData.append("image", formData.get("image")!);
  sentFormData.append("answer", formData.get("favorite-drink") as string);
  sentFormData.append("type", formData.get("account-type") as string);
  sentFormData.append("phone", formData.get("Phone-Number") as string);
  const options = {
    method: "POST",
    body: sentFormData,
  };
  // send request
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign/up`,
      options
    );
    const data = await req.json();

    if (data.status === 200 && data.message === "Created successfully.") {
      flag = 1;
      const encryptedData = await encrypt(data);
      const expires = new Date(Date.now() + 60 * 60 * 1000);

      (await cookies()).set("intermediate-session", encryptedData, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
      (await cookies()).set("otp-token", data.data.otp_token, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
      (await cookies()).set("auth-token", data.data.token, {
        expires,
        httpOnly: true,
        secure: true, // in production only
        sameSite: "strict",
      });
    } else {
      errorCounter++;
      return `user is already found${errorCounter}`;
    }
  } catch (error: any) {
    console.error("Signup error:", error.message);
    return error.message;
  }
  if (flag === 1) {
    // redirect(`/signup/verify?email=${formData.get("email")}`);
    const sanitizedEmail = encodeURIComponent(
      (formData.get("email") as string)?.trim().toLowerCase()
    );
    redirect(`/signup/verify?email=${sanitizedEmail}`);
  }
  if (flag === 0) {
    errorCounter++;
    return `user is already found${errorCounter}`;
  }
}
/***************************************************************************************************************************/

export async function getPredict() {
  //get session
  const encryptedSession = (await cookies()).get("session")?.value;
  if (!encryptedSession) return;
  const session = await decrypt(encryptedSession);

  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/stock`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const res = await req.json();
  console.log(res);
  return res;
}

/***************************************************************************************************************************/
//upload products
export async function uploadProducts(formData: FormData) {
  //get the file
  const file = formData.get("csv_file") as File;

  //check if the file is csv
  if (file.type === "text/csv") {
    // get and decrypt the session cookie
    const session = (await cookies()).get("session");
    const encryptedSession = session?.value;
    const authToken =
      encryptedSession && (await decrypt(encryptedSession)).token;
    // error if no token is found
    if (!authToken) throw new Error("there is no token");

    // try to upload the file
    try {
      const uploadRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );
      const uploadRes = await uploadRequest.json();
      if (
        uploadRes.status === 200 &&
        uploadRes.message === "File Uploaded Successfully"
      ) {
        revalidatePath("/");
      } else {
        throw new Error("file not uploaded");
      }
    } catch (err: any) {
      console.log(err);
    }
  }
}
/***********************/
//fetch products
export async function fetchProducts(status: string) {
  try {
    //get session
    const session = (await cookies()).get("session");
    //get the value of the session but it is encrypted
    const encryptedSession = session?.value;
    //get the auth token
    const authToken =
      encryptedSession && (await decrypt(encryptedSession)).token;
    // error if no token is found
    if (!authToken) throw new Error("there is no token");
    //request the data cuz you are authenticated user
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products?${
        status !== "All" ? `status=${status}` : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    //the final result
    const res = await req.json();
    if (res.status === 200 && res.message === "Success") {
      const { statistics, products } = handleDataNames(res.data);
      if (products && statistics) {
        return { statistics, products };
      }
    }
    return { statistics: {}, products: [] };
  } catch (error) {
    console.log(error);
  }
}
/***********************/
//add product
export async function addProduct(prevState: any, formData: FormData) {
  //get date and get the month from it , append it to the formData
  const date = formData.get("Date") as string;
  const month = date.split("-").slice(0, 2).join("-");
  formData.append("Month", month);
  //authorization
  //get session
  const session = (await cookies()).get("session");
  //get the value of the session but it is encrypted
  const encryptedSession = session?.value;
  //get the auth token
  const authToken = encryptedSession && (await decrypt(encryptedSession)).token;
  // error if no token is found
  if (!authToken) throw new Error("there is no token");

  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if ((res.status === 200, res.message === "Success")) {
      revalidatePath("/");
      return { status: "SUCCESS", data: res.data, key: prevState.key + 1 };
    } else {
      return { status: "ERROR", data: res.data, key: prevState.key + 1 };
    }
  } catch (error) {
    console.log(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//analytics

// get analytics

export async function getAnalyticsData() {
  try {
    //get session
    const session = (await cookies()).get("session");
    //get the value of the session but it is encrypted
    const encryptedSession = session?.value;
    //get the auth token
    const authToken =
      encryptedSession && (await decrypt(encryptedSession)).token;
    // error if no token is found
    if (!authToken) throw new Error("there is no token");
    //request the data cuz you are authenticated user
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/analytics`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    //the final result
    const res = await req.json();
    if (res.status === 200 && res.message === "Success") return res.data;
    else throw new Error("fetching data failed ! ");
  } catch (error: any) {
    console.log(error.message);
    return {};
  }
}

export async function getAnalyticsPeridection() {
  try {
    //get session
    const session = (await cookies()).get("session");
    //get the value of the session but it is encrypted
    const encryptedSession = session?.value;
    //get the auth token
    const authToken =
      encryptedSession && (await decrypt(encryptedSession)).token;
    // error if no token is found
    if (!authToken) throw new Error("there is no token");
    //request the data cuz you are authenticated user
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/analytics/sales-predictions`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    //the final result
    const res = await req.json();
    if (res.status === 200 && res.message === "Success") return res.data;
    else throw new Error("fetching data failed ! ");
  } catch (error: any) {
    console.log(error.message);
    return {};
  }
}

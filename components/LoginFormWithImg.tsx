"use client";
import LoginInpLabel from "./LoginInplabel";
import UploadInput from "./UploadInput";
import CustomCheckbox from "./CustomCheckbox";
import Image from "next/image";
import Input from "./Input";
import { handleLoginFormWithImage } from "@/actions/actions";
import ReuseableButton from "./ReuseableButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserNotFound from "./UserNotFound";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

const LoginFormWithImg = () => {
  const t = useTranslations("Login-with-img");
  const [errorMessage, dispatch] = useActionState(
    handleLoginFormWithImage,
    undefined
  );
  const router = useRouter();

  function recoverYourImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push("/login/recovery-img");
  }
  function switchToLoginWithPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push("/login/with-password");
  }

  return (
    <>
      <div className="w-fit lg:w-[500px] absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
        <img
          src="/savebite.svg"
          alt="savebite.svg"
          width={200}
          height={100}
          className="hidden max-sm:block"
        />
        <span className="text-black-900 h4bold md:h3bold lg:h2bold">
          {t("loginToSaveBite")}
        </span>
        <form action={dispatch}>
          <div className="pt-[20px]">
            <LoginInpLabel required={true} htmlFor="email">
              {t("email")}
            </LoginInpLabel>
            <Input
              id="email"
              error={
                errorMessage === "email cannot be empty or wrong"
                  ? "email cannot be empty or wrong"
                  : ""
              }
            />
            <LoginInpLabel required={true} htmlFor="img">
              {t("uploadYourImage")}
            </LoginInpLabel>

            <UploadInput
              id="img"
              name="image"
              error={errorMessage === "file is not found" ? errorMessage : ""}
            />
          </div>
          <div className="flex justify-between items-center mt-[20px] max-w-[500px]">
            <CustomCheckbox id="remember" />
            <button
              onClick={recoverYourImage}
              className="font-[400] title2 relative after:content-[''] after:w-full after:h-[1px] after:bg-black-500 after:absolute after:left-0 after:bottom-[3px] "
            >
              {t("lostYourImage?")}
            </button>
          </div>
          <div className="mt-[32px]">
            <ReuseableButton>
              <div className="flex gap-4">
                <p>{t("login")}</p>
                <Image
                  className="fill-rose-500 text-blue"
                  src="/white_arrow.svg"
                  alt="rightArrow"
                  width={30}
                  height={30}
                />
              </div>
            </ReuseableButton>
            <ReuseableButton
              type="secondary"
              onclick={switchToLoginWithPassword}
            >
              {t("loginWithEmailAndPassword")}
            </ReuseableButton>
          </div>
        </form>
        <p className="text-center mt-[32px] ">
          {t("doNotHaveAnAccount?")}
          <Link href="/signup" className="text-primary-500 ml-[2px]">
            {t("signUp")}
          </Link>
        </p>
      </div>
      <div className="absolute bottom-[10px] right-[10px]">
        <UserNotFound flag={errorMessage} />
      </div>
    </>
  );
};

export default LoginFormWithImg;

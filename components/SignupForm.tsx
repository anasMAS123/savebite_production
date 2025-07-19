"use client";
import LoginInpLabel from "./LoginInplabel";
import PhoneNumberInput from "./PhoneNumberInput";
import UploadInput from "./UploadInput";
import Input from "./Input";
import Password from "./Password";
import { Checkbox } from "./ui/checkbox";
import CustomSelect from "./CustomSelect";
import ReuseableButton from "./ReuseableButton";
import { useFormState } from "react-dom";
import { handleSignupForm } from "@/actions/actions";
import { useActionState, useEffect, useState } from "react";
import { getLoginAnswers } from "@/helpers/loginAnswers";
import { useTranslations } from "next-intl";
import UserFoundBefore from "./UserFoundBefore";

const SignupForm = () => {
  const t = useTranslations("Sign-up-form");
  const [answersArr, setAnswersArr] = useState<
    { id: number; content: string }[] | never
  >([]);
  const [errorMessage, dispatch, isPending] = useActionState(
    handleSignupForm,
    undefined
  );

  useEffect(() => {
    async function fetchLoginAnswers() {
      const data: Array<{ id: number; content: string }> =
        await getLoginAnswers();
      console.log(data);

      if (data && data.length > 0) {
        setAnswersArr(data);
      }
    }

    fetchLoginAnswers();
  }, []);

  return (
    <>
      <form
        action={dispatch}
        className="mt-[32px] py-[32px] px-[68px] mx-auto w-[80%] shadow-md rounded-lg mb-[100px]"
      >
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="username">
            {t("userName")}
          </LoginInpLabel>
          <Input
            id="username"
            error={errorMessage === "Username is required" ? errorMessage : ""}
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="email">
            {t("email")}
          </LoginInpLabel>
          <Input
            id="email"
            error={errorMessage === "Invalid email format" ? errorMessage : ""}
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="Phone-Number">
            {t("phoneNumber")}
          </LoginInpLabel>
          <PhoneNumberInput
            error={
              errorMessage === "Phone number is required" ? errorMessage : ""
            }
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="image">
            {t("img")}
          </LoginInpLabel>
          <UploadInput
            id="image"
            name="image"
            error={errorMessage === "File is not found" ? errorMessage : ""}
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="favorite-drink">
            {t("question")}
          </LoginInpLabel>
          <CustomSelect
            name="favorite-drink"
            placeholder={t("drinkQuestion")}
            arr={answersArr}
            error={errorMessage === "Question is required" ? errorMessage : ""}
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="password">
            {t("password")}
          </LoginInpLabel>
          <Password
            id="password"
            error={
              errorMessage === "Password must be 8 charchters at least"
                ? errorMessage
                : ""
            }
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="confirm-password">
            {t("confirmPassword")}
          </LoginInpLabel>
          <Password
            id="confirm-password"
            error={
              errorMessage === "Please confirm your password"
                ? errorMessage
                : ""
            }
          />
        </div>
        <div className="mb-[16px]">
          <LoginInpLabel required={true} htmlFor="type">
            {t("accountType")}
          </LoginInpLabel>
          <CustomSelect
            name="account-type"
            placeholder={t("select")}
            arr={[
              { id: "user", content: t("user") },
              { id: "restaurant", content: t("restaurant") },
              { id: "super_market", content: t("superMarket") },
            ]}
            error={
              errorMessage === "Account type is required" ? errorMessage : ""
            }
          />
        </div>
        <div className="mb-[40px] flex items-center gap-2">
          <Checkbox className="w-[20px] h-[20px] outline-none border-black-300" />
          <div>
            <LoginInpLabel
              htmlFor="terms"
              required={false}
              inline={true}
              color="black"
            >
              {t("agree")}
            </LoginInpLabel>
            <span className="text-green-500"> {t("terms")}</span>
          </div>
        </div>
        <ReuseableButton type="secondary" isLoading={isPending}>
          {t("create")}
        </ReuseableButton>
      </form>
      <UserFoundBefore flag={errorMessage} />
    </>
  );
};

export default SignupForm;

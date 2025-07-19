"use client";
import Image from "next/image";
import LoginInpLabel from "./LoginInplabel";
import Input from "./Input";
import { handleLostImg } from "@/actions/actions";
import { useFormState } from "react-dom";
import CustomSelect from "./CustomSelect";
import ReuseableButton from "./ReuseableButton";
import { useEffect, useState } from "react";
import { getLoginAnswers } from "@/helpers/loginAnswers";
import { useTranslations } from "next-intl";

const LostImgForm = () => {
  const t = useTranslations("recovery-img");
  const [errorMessage, dispatch] = useFormState(handleLostImg, undefined);
  const [answersArr, setAnswersArr] = useState<
    { id: number; content: string }[] | never
  >([]);

  useEffect(() => {
    async function fetchLoginAnswers() {
      const data: Array<{ id: number; content: string }> =
        await getLoginAnswers();

      if (data && data.length > 0) {
        setAnswersArr(data);
      }
    }

    fetchLoginAnswers();
  }, []);

  return (
    <div className="w-fit lg:w-[500px] absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
      <img
        src="/savebite.svg"
        alt="savebite.svg"
        width={200}
        height={100}
        className="hidden max-sm:block"
      />
      <div className="flex flex-col">
        <span className="text-black-900 h4bold md:h3bold lg:h2bold">
          {t("lostYourImage")}
        </span>
        <span className="text-black-300 title1">{t("sentMessage")}</span>
      </div>
      <form action={dispatch}>
        <div className="pt-[20px]">
          <LoginInpLabel required={true} htmlFor="email">
            {t("email")}
          </LoginInpLabel>
          <Input
            id="email"
            error={
              errorMessage === "email cannot be empty or wrong"
                ? errorMessage
                : ""
            }
          />
          <LoginInpLabel required={true} htmlFor="question">
            {t("pleaseAnswerTheQuestion")}
          </LoginInpLabel>
          <CustomSelect
            name="question"
            placeholder="what is your favourite drink ?"
            arr={answersArr}
            error={
              errorMessage === "you must answer the question correctly"
                ? errorMessage
                : ""
            }
          />
        </div>

        <div className="mt-[32px]">
          <ReuseableButton>
            <div className="flex gap-4">
              {t("send")}
              <Image
                className="fill-rose-500 text-blue"
                src="/white_arrow.svg"
                alt="rightArrow"
                width={30}
                height={30}
              />
            </div>
          </ReuseableButton>
        </div>
      </form>
    </div>
  );
};

export default LostImgForm;

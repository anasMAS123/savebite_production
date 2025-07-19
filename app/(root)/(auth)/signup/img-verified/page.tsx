"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";

function Page() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const t = useTranslations("img-verified");
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");

  // protect the page from random access -> .../verify?email=anything
  // if (!emailRegex.test(email!)) {
  //   redirect("/login");
  // }
  if (!email || !emailRegex.test(email)) {
    redirect("/login");
  }

  function handleOnClick() {
    router.push("/login");
  }

  return (
    <div className="flex-1 relative">
      <div className="w-fit lg:w-[500px] absolute top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="sm:hidden w-fit mx-auto mb-[20px]">
          <Image src="/SaveBite.svg" width={330} height={120} alt="saveBite" />
        </div>
        <Image
          src="/verified.svg"
          alt="verified"
          width={95}
          height={99}
          className="mx-auto"
        />
        <p className="text-[28px] lg:text-[48px] font-[600] text-center">
          {t("checkYourEmail")}
        </p>

        <div className="mx-auto mt-[20px] w-[300px] lg:w-[400px] text-center text-[19px] font-[500]">
          <span className="text-black-400">
            {t("WeHaveSentAnEmailTo")}{" "}
            <span className="text-black-900">{email}</span> {t("checkTheEmail")}{" "}
          </span>
          <span className="block"></span>
          <button
            className="mt-[10px] text-primary-500 relative after:content-[''] after:w-full after:h-[1px] after:bg-primary-500 after:absolute after:left-0 after:bottom-[3px]"
            onClick={handleOnClick}
          >
            {t("backToLogin")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

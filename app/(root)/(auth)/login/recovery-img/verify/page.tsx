"use client";
import { handleVerifyCode } from "@/actions/actions";
import Otp from "@/components/Otp";
import { useVerifyOTP } from "@/contexts/VerifyOTPContext";
import { encodeEmail, sanitize } from "@/helpers/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";

function Page() {
  const t = useTranslations("verify-img");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  // protect the page from random access -> .../verify?email=anything
  if (!emailRegex.test(email!)) {
    redirect("/login");
  }

  const { otpCode, setOTPCode, error, setError } = useVerifyOTP()!;

  // otp handler
  async function handleOTP() {
    if (otpCode.length === 4) {
      setError(false);
      const response = await handleVerifyCode(otpCode, email ?? "");
      if (typeof response === "string") setError(true);
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex-1 relative">
      <div className="w-fit lg:w-[500px] absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="sm:hidden w-fit mx-auto">
          <Image src="/SaveBite.svg" width={330} height={120} alt="saveBite" />
        </div>
        <p className="text-black-900 text-[40px] font-[600]  text-center pb-[40px]">
          {t("verification")}
        </p>
        <p className="text-black-300 font-[400] title1 text-center pb-[40px] mb-auto">
          {t("theEnteredCodeWillBeSentTo")} {sanitize(encodeEmail(email!))}
        </p>
        {/* so for the otp code we need three picecs of states the setter of the value , the handler , and the error flag 
            and we pass the three of them through the component tree */}
        <Otp setOTPCode={setOTPCode} handleOTP={handleOTP} error={error} />
      </div>
    </div>
  );
}

export default Page;

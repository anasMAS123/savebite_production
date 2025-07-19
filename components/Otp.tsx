"use client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import ReuseableButton from "./ReuseableButton";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
interface Props {
  handleOTP: () => void;
  setOTPCode: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
}
const Otp = ({ setOTPCode, handleOTP, error }: Props) => {
  const t = useTranslations("verify-img");
  const { pending } = useFormStatus();
  return (
    <div>
      <div className="w-fit mx-auto">
        <InputOTP maxLength={6} onChange={(e) => setOTPCode(e)}>
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className={`sm:p-4 md:p-8 lg:p-12 ${
                error
                  ? "border-error-500 text-error-500"
                  : "border-primary-500 text-primary-500"
              } focus:ring-0 mr-[10px]`}
            />
            <InputOTPSlot
              index={1}
              className={`sm:p-4 md:p-8 lg:p-12 ${
                error
                  ? "border-error-500 text-error-500"
                  : "border-primary-500 text-primary-500"
              } border-l-2 focus:ring-0 mr-[10px]`}
            />
            <InputOTPSlot
              index={2}
              className={`sm:p-4 md:p-8 lg:p-12 ${
                error
                  ? "border-error-500 text-error-500"
                  : "border-primary-500 text-primary-500"
              } border-l-2 focus:ring-0 mr-[10px]`}
            />
            <InputOTPSlot
              index={3}
              className={`sm:p-4 md:p-8 lg:p-12 ${
                error
                  ? "border-error-500 text-error-500"
                  : "border-primary-500 text-primary-500"
              } border-l-2 focus:ring-0 mr-[10px]`}
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="pt-[40px]">
        <ReuseableButton onclick={handleOTP}>Verify</ReuseableButton>

        <div className="flex flex-col gap-[8px] text-center mt-[80px]">
          <p>{t("didNotGetTheCode")}</p>
          <button
            className="text-error-500"
            onClick={() => console.log("hello world")}
          >
            {pending ? "loading..." : t("clickToResend")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;

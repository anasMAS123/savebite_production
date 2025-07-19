import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function NavBar() {
  const t = useTranslations("Sign-up");

  return (
    <div className="flex max-sm:flex-col max-sm:items-center flex-row shadow-md justify-between px-[120px]">
      <div className="logo p-[14px]">
        <Image src="/SaveBite.svg" alt="alt" width={149} height={50} />
      </div>
      <div className="my-[20px] flex justify-center">
        <Link href="/login" className="p-[10px] mr-[20px]">
          {t("login")}
        </Link>
        <Link
          href={"/signup"}
          className="bg-primary-500 rounded text-white p-[10px]"
        >
          {t("signup")}
        </Link>
      </div>
    </div>
  );
}

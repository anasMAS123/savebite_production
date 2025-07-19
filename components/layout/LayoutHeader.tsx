import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import Profile from "./Profile";
import { useTranslations } from "next-intl";
import Link from "next/link";
interface Props {
  name: string;
  email: string;
}
const LayoutHeader = ({ name, email }: Props) => {
  const t = useTranslations("Layout");
  return (
    <div className="h-20 w-full border-solid border border-extra-gray-border bg-[#FFFFFF] flex items-center">
      <div className="min-w-[200px] h-full border-solid border relative">
        <Link href="/">
          <Image
            className="absolute left-[10px] top-1/2 -translate-y-1/2"
            src="/SaveBite.svg"
            alt="savebite.svg"
            width={140}
            height={140}
          />
        </Link>
      </div>
      <div className="flex-1 flex justify-between p-[20px] max-md:justify-end">
        <Input
          className="max-md:hidden max-w-[300px] rounded-l-full rounded-r-full  transition-all ease-in-out duration-500"
          placeholder={t("searchAnything")}
        />
        <Profile name={name} email={email} />
      </div>
    </div>
  );
};

export default LayoutHeader;

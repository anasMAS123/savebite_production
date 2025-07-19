"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
interface Props {
  name: string;
  filter: () => void;
}

function Filter({ name, filter }: Props) {
  const t = useTranslations("Dashboard");
  return (
    <div
      className="flex-1 flex justify-between px-[20px] py-[8px] gap-6 bg-[#f8fff6] items-center cursor-pointer border-solid border-[1px] border-[#ede4e4]"
      onClick={filter}
    >
      <span className="title2medium">{t(name)}</span>
      <Image
        src="/dashboard/upDownArrow.svg"
        alt="upDownArrow"
        width={10}
        height={10}
      />
    </div>
  );
}

export default Filter;

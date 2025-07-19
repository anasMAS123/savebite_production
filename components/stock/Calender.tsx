import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Calender = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const t = useTranslations("Stock");

  return (
    <div className="flex gap-2">
      <div className="flex py-[8px] px-[12px] bg-white border-[1px] border-extra-gray-border rounded-lg gap-2">
        <Image
          src="/stock/calender.svg"
          alt="caleder.svg"
          width={20}
          height={20}
        />
        <span className="title2medium text-black-400">{t("fourWeeks")}</span>
      </div>
      <div className="flex py-[8px] px-[12px] bg-white border-[1px] border-extra-gray-border rounded-lg gap-2">
        <Image
          src="/stock/calender.svg"
          alt="caleder.svg"
          width={20}
          height={20}
        />
        <span className="title2medium text-black-400" dir="ltr">
          {startDate} - {endDate}
        </span>
      </div>
    </div>
  );
};

export default Calender;

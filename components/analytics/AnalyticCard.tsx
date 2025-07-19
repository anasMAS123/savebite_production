import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
interface Props {
  attributeName: string;
  rate: string;
  rateChange: number;
  attributeImage: string;
  color: string;
  msg: string;
}
export const AnalyticCard = ({
  attributeName,
  rate,
  rateChange,
  attributeImage,
  color,
  msg,
}: Props) => {
  console.log(parseFloat(rate));
  const t = useTranslations("Analytics");
  return (
    <div className="group h-[150px]  bg-white rounded-lg shadow-sm  py-[14px] px-[16px] relative  basis-1/3  ">
      <div className={`relative h-[80%] px-6 flex flex-col gap-1 group `}>
        <div className=" opacity-0 transition-all flex items-center group-hover:opacity-100  w-[60%] h-[80px] shadow-sm bg-black-500/50 absolute top-[40%] -translate-y-1/2 ltr:left-[30%] rtl:right-[30%] z-50 rounded-lg p-[5px] text-white  text-[11px] text-wrap">
          <div className=" opacity-0 transition-all  group-hover:opacity-100 w-0 h-0 border-solid border-[12px] ltr:border-l-transparent ltr:border-r-black-500/50 rtl:border-l-black-500/50 rtl:border-r-transparent border-t-transparent border-b-transparent absolute top-1/2 ltr:-left-[24px] rtl:-right-[24px] -translate-y-1/2"></div>
          {t(msg)}
        </div>
        <div
          className="absolute ltr:left-0 rtl:right-0 top-0 w-[8px] h-[85%]"
          style={{ backgroundColor: color }}
        ></div>
        <span className="title1">{t(attributeName)}</span>
        <span className="sm:title2bold md:title1bold lg:h5bold">
          {attributeName === "revenue"
            ? `${rate} EGP`
            : attributeName === "stockTurnoverRate" ||
              attributeName === "reorderAccuracyRate" ||
              attributeName === "spoilageRate"
            ? `${parseFloat(rate * 100).toFixed(3)}%`
            : rate}
        </span>
      </div>
      <span className="h-[20%] flex  items-center gap-[4px]">
        {rateChange > 0 ? (
          <Image
            src="/analytics/redArrow.png"
            alt="arrow"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src="/analytics/greenArrow.png"
            alt="arrow"
            width={20}
            height={20}
          />
        )}
        <span
          className={
            rateChange > 0
              ? "text-green-400"
              : rateChange < 0
              ? "text-error-400"
              : "text-gray-500"
          }
        >
          {rateChange * 100}%
        </span>
        <span className="body text-black-300">{t("sinceLastMonth")}</span>
      </span>
      <Image
        src={`/analytics/${attributeImage}`}
        alt="icon"
        className="absolute ltr:right-4 rtl:left-4 bottom-4 "
        width={50}
        height={50}
      />
    </div>
  );
};

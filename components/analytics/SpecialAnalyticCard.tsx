"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
interface Props {
  attributeName: string;
  rateObject: Record<string, string>;
  rateChangeObject: Record<string, number>;
  attributeImage: string;
  color: string;
  msg: string;
}
export const SpecialAnalyticCard = ({
  attributeName,
  rateObject,
  rateChangeObject,
  attributeImage,
  color,
  msg,
}: Props) => {
  const t = useTranslations("Analytics");
  const itemsArray: string[] = [];
  for (const key in rateObject) {
    itemsArray.push(key);
  }
  const [item, setItem] = useState(itemsArray[0] ?? "no items yet");

  function handleOnChange(e: string) {
    setItem(e);
  }

  return (
    <div className="h-[150px] bg-white rounded-lg shadow-sm py-[14px] px-[16px] relative basis-1/3 ">
      <div className={`relative h-[80%] px-6 flex flex-col gap-1 group`}>
        <div className=" opacity-0 transition-all flex items-center group-hover:opacity-100  w-[60%] h-[80px] shadow-sm bg-black-500/50 absolute top-[40%] -translate-y-1/2 ltr:left-[30%] rtl:right-[30%] z-50 rounded-lg p-[5px] text-white  text-[11px]">
          <div className=" opacity-0 transition-all  group-hover:opacity-100 w-0 h-0 border-solid border-[12px] ltr:border-l-transparent ltr:border-r-black-500/50 rtl:border-l-black-500/50 rtl:border-r-transparent border-t-transparent border-b-transparent absolute top-1/2 ltr:-left-[24px] rtl:-right-[24px] -translate-y-1/2"></div>
          {t(msg)}
        </div>
        <div
          className="absolute ltr:left-0 rtl:right-0 top-0 w-[8px] h-[85%]"
          style={{ backgroundColor: color }}
        ></div>
        <span className="title1">{t(attributeName)}</span>
        <span className="h5bold">{parseFloat(rateObject[item])}</span>
      </div>
      <span className="h-[20%] flex items-center gap-[4px]">
        {rateChangeObject[item] > 0 ? (
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
            rateChangeObject[item] > 0
              ? "text-green-400"
              : rateChangeObject[item] < 0
              ? "text-error-400"
              : "text-gray-500"
          }
        >
          {rateChangeObject[item] * 100}%
        </span>
        <span className="body text-black-300">{t("sinceLastMonth")}</span>
      </span>
      <Image
        src={`/analytics/${attributeImage}`}
        alt="icon"
        className="absolute ltr:right-4 rtl:left-4 bottom-4"
        width={50}
        height={50}
      />
      <div className="absolute top-2 ltr:right-2 rtl:left-2 z-50">
        <select
          onChange={(e) => handleOnChange(e.target.value)}
          className="w-[170px] text-[15px] text-gray-500 z-50"
        >
          {itemsArray.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

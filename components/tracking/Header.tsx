"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
type HeaderProps = {
  selected: string;
  setSelected: (tab: string) => void;
  productCount: number;
  allCount: number;
  expiredCount: number;
  nearCount: number;
};
const Header = ({
  selected,
  setSelected,
  productCount,
  allCount,
  expiredCount,
  nearCount,
}: HeaderProps) => {
  const t = useTranslations("tracking");
  
  return (
    <>
      <div className="bg-white w-full">
        <div className="flex justify-between w-[95%] m-auto py-[20px]">
          <p className="h3medium">{t("tracking")}</p>

          <div className="flex gap-2">
            <div
              className="rounded-none bg-primary-500 text-white flex gap-2 items-center justify-center cursor-pointer p-[12px]"
              onClick={() => setSelected("add")}
            >
              <Image
                src="/tracking/add.svg"
                alt="add.svg"
                width={20}
                height={20}
              />
              {t("import")}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-5 w-[100%] pt-[28px] border-extra-gray-border border-b-2  mb-[60px] text-gray-400">
        <div
          onClick={() => setSelected("all")}
          className={`ml-[30px] w-[135px] border-b-4 text-center  cursor-pointer ${
            selected === "all"
              ? "border-primary-500 text-primary-500"
              : "border-transparent "
          }`}
        >
          {t("allItem")}
          <span
            className={` text-white ml-[2px] rounded-sm px-[6px] ${
              selected === "all" ? "bg-primary-500" : "bg-gray-400"
            }`}
          >
            {allCount}
          </span>
        </div>

        <div
          onClick={() => setSelected("expired")}
          className={`w-[135px] border-b-4 text-center cursor-pointer ${
            selected === "expired"
              ? "border-primary-500 text-primary-500"
              : "border-transparent"
          }`}
        >
          {t("expired")}
          <span
            className={`text-white ml-[2px] rounded-sm px-[6px] ${
              selected === "expired" ? "bg-primary-500" : "bg-gray-400"
            }`}
          >
            {expiredCount}
          </span>
        </div>

        <div
          onClick={() => setSelected("near")}
          className={` border-b-4 text-center  cursor-pointer px-[2px] ${
            selected === "near"
              ? "border-primary-500 text-primary-500"
              : "border-transparent"
          }`}
        >
          {t("nearToExpire")}
          <span
            className={`text-white ml-[2px] rounded-sm px-[6px] ${
              selected === "near" ? "bg-primary-500" : "bg-gray-400"
            }`}
          >
            {nearCount}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;

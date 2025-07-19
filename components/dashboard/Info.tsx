"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

const Info = () => {
  const t = useTranslations("Dashboard");
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <div className="bg-primary-50 w-[80%] h-[177px] flex p-[10px] gap-[10px] items-center m-auto">
          <div className="w-[20px] h-full relative">
            <Image fill src="/dashboard/info.svg" alt="info.svg" />
          </div>
          <div className="flex-1">
            <span className="max-sm:text-xs sm:text-md md:text-lg lg:text-xl overflow-auto">
              {t("message")}
            </span>
          </div>
          <div
            className="w-[20px] h-full relative cursor-pointer"
            onClick={() => setShow(false)}
          >
            <Image fill src="/x.svg" alt="x.svg" />
          </div>
        </div>
      )}
    </>
  );
};

export default Info;

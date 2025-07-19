import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Landing = () => {
  const t = useTranslations("LandingPage");
  const locale = useLocale();
  return (
    <main
      className="px-12 md:px-24 py-10 h-[700px] flex flex-col items-center md:flex-row md:items-starts"
      dir="ltr"
    >
      <div
        className="flex flex-col gap-3"
        dir={locale === "en" ? "ltr" : "rtl"}
      >
        <span className="text-primary-500 title2bold">
          {t("cut_costs_reduce_waste")}
        </span>
        <h2 className="text-black-800 h2bold">{t("headline")}</h2>
        <h3 className="text-black-800 text-[19px] max-w-[400px]">
          {t("description")}
        </h3>
        <button className="bg-primary-500 px-2 py-4 rounded-lg title1bold text-white max-w-[200px]">
          {t("cta_button")}
        </button>
      </div>
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={"/landing/frame.svg"}
          alt="frame.svg"
          fill
          className="object- w-full h-full"
        />
      </div>
    </main>
  );
};

export default Landing;

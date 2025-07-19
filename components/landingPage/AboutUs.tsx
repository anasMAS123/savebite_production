import { useTranslations } from "next-intl";
import React from "react";

const AboutUs = () => {
  const t = useTranslations("LandingPage");

  return (
    <section className="relative" id="about-us">
      <div className="opacity-50 bg-[url(/landing/column.svg)] z-10 inset-0 w-full h-full absolute "></div>
      <div className="bg-primary-50  flex flex-col md:flex-row justify-between px-24 py-20">
        <span className="h2bold flex-1">{t("About Us")}</span>
        <span className="flex-1 max-w-[560px]">
          {t(
            `We are dedicated to minimizing food waste in supermarkets by providing tools to track inventory, monitor expiration dates, and ensure that surplus food is repurposed or donated to those in need`
          )}
        </span>
      </div>
    </section>
  );
};

export default AboutUs;

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NavMenu = () => {
  const t = useTranslations("LandingPage");
  return (
    <nav className="gap-3 hidden tablet:flex">
      <Link href="#home" scroll={true}>
        <span>{t("Home")}</span>
      </Link>
      <Link href="#about-us" scroll={true}>
        <span>{t("About us")}</span>
      </Link>
      <Link href="#features" scroll={true}>
        <span>{t("Features")}</span>
      </Link>
      <Link href="#blog">
        <span>{t("Blog")}</span>
      </Link>
      <Link href="#contact-us" scroll={true}>
        <span>{t("Contact us")}</span>
      </Link>
    </nav>
  );
};

export default NavMenu;

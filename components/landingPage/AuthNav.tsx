import Link from "next/link";
import React from "react";
import DropDownMenu from "./DropDownMenu";
import { useTranslations } from "next-intl";

const AuthNav = () => {
  const t = useTranslations("LandingPage");
  return (
    <div className="flex items-center">
      <nav className="hidden tablet:flex gap-2  ">
        <Link href="/login/with-img">
          <span>{t("Login")}</span>
        </Link>
        <Link href="/signup/signup">
          <span className="bg-primary-500 p-3 text-white rounded-lg">
            {t("Sign up")}
          </span>
        </Link>
      </nav>
      <DropDownMenu />
    </div>
  );
};

export default AuthNav;

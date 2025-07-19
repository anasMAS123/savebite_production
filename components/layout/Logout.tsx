"use client";
import { logout } from "@/actions/logout";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Logout = () => {
  const t = useTranslations("Layout");
  return (
    <div
      className={`py-[20px] px-[6px] cursor-pointer transition-all duration-300 hover:bg-error-500/40 text-error-400 hover:text-white`}
      onClick={async () => {
        await logout();
      }}
    >
      <div className="flex gap-4">
        <Image
          src={`/layout/logout.svg`}
          alt={`logout.svg`}
          width={27}
          height={27}
        />
        <span className="hidden md:block">{t("logout")}</span>
      </div>
    </div>
  );
};

export default Logout;

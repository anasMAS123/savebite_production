"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  const t = useTranslations("Not-found");

  return (
    <div className="h-[100vh] relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Image src="/SaveBite.svg" alt="SaveBite" width={400} height={300} />
        <p className="text-[25px]">{t("weAreSorryYouFaceThatProblem")}</p>
        <Link href="/" className="text-primary-500 text-[20px] font-bold">
          {t("takeMeHome")}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

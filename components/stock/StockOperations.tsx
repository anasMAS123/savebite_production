"use client";
import React from "react";
import { Input } from "../ui/input";
import Calender from "./Calender";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const StockOperations = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const t = useTranslations("Stock");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  return (
    <div className="w-[90%] flex max-lg:flex-col max-lg:items-center flex-row gap-2 justify-between items-center mx-auto my-[30px] ">
      <div className="flex flex-1 justify-between items-center gap-2">
        <Input
          className="flex-1"
          placeholder="Search Product Name or Category"
          onChange={(e) => {
            newSearchParams.set("search", e.target.value);

            router.push(`${pathname}?${newSearchParams.toString()}`, {
              scroll: false,
            });
          }}
        />
        <Calender startDate={startDate} endDate={endDate} />
      </div>
      <div className="flex justify-between items-center gap-2">
        <Button className="flex gap-2 text-black-400 bg-white border-[1px] border-extra-gray-border hover:bg-white">
          <Image
            src="/dashboard/copy.svg"
            alt="copy.svg"
            width={20}
            height={20}
          />
          <span>{t("print")}</span>
        </Button>
        <Button className="flex gap-2 text-black-400 bg-white border-[1px] border-extra-gray-border hover:bg-white">
          <Image
            src="/dashboard/print.svg"
            alt="print.svg"
            width={20}
            height={20}
          />
          <span>{t("copy")}</span>
        </Button>
        <Button className="flex gap-2 text-white bg-primary-500 border-[1px]  hover:bg-white hover:text-primary-500">
          <Image src="/stock/export.svg" alt="add.svg" width={20} height={20} />
          <span>{t("export")}</span>
        </Button>
      </div>
    </div>
  );
};

export default StockOperations;

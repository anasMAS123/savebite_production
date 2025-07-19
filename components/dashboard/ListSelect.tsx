"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ListSelect() {
  const t = useTranslations("Dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  return (
    <Select
      onValueChange={(e) => {
        newSearchParams.set("dashboardStock", e);
        router.push(`${pathname}?${newSearchParams}`, { scroll: false });
      }}
      defaultValue={searchParams.get("dashboardStock") ?? "All"}
    >
      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="focus:bg-blue-500 focus:text-white" value="All">
          {t("all")}
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="PositiveStock"
        >
          {t("positiveStock")}
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="NegativeStock"
        >
          {t("negativeStock")}
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="BelowPar"
        >
          {t("belowPar")}
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="BelowMinimum"
        >
          {t("belowMinimum")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ListSelect;

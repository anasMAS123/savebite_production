import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Filter } from "lucide-react";

const StockHeader = () => {
  const t = useTranslations("Stock");
  return (
    <div className="flex justify-between items-center w-[90%] mx-auto py-[10px]">
      <span className="h3medium">{t("stock")}</span>
    </div>
  );
};

export default StockHeader;

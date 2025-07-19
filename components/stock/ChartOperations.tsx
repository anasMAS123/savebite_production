import React from "react";
import ChartFilters from "./ChartFilters";
import { useTranslations } from "next-intl";

const ChartOperations = ({ predictData }: { predictData: any }) => {
  const t = useTranslations("Stock");
  return (
    <div className="flex justify-between items-center">
      <span className="title1bold">{t("reorderQuantity")}</span>
      <ChartFilters predictData={predictData} />
    </div>
  );
};

export default ChartOperations;

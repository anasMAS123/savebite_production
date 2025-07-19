import React from "react";
import { TimeFilter } from "./TimeFilter";
import ProductsFilter from "./ProductsFilter";

const ChartFilters = ({ predictData }: { predictData: any }) => {
  return (
    <div className="flex items-center gap-2">
      <ProductsFilter predictData={predictData} />
      <TimeFilter />
    </div>
  );
};

export default ChartFilters;

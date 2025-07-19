import ChartOperations from "@/components/stock/ChartOperations";
import LinearChart from "@/components/stock/LinearChart";
import StockItemsTable from "@/components/stock/StockItemsTable";
import StockHeader from "@/components/stock/StockHeader";
import StockOperations from "@/components/stock/StockOperations";
import React from "react";
import { getPredict } from "@/actions/actions";

const Page = async () => {
  const predictData = (await getPredict()).data ?? [];
  console.log("predicted data : ", predictData);

  return (
    <div className="flex-1">
      <StockHeader />
      <div className="mx-auto  px-[40px] py-[20px] mt-[30px] bg-white w-[90%] h-[400px] rounded-lg">
        <ChartOperations predictData={predictData} />
        <div className="w-full h-[300px] pl-6 pr-6">
          <LinearChart predictData={predictData} />
        </div>
      </div>
      <StockOperations
        startDate={predictData.start_date}
        endDate={predictData.end_date}
      />
      <StockItemsTable predictData={predictData} />
    </div>
  );
};

export default Page;

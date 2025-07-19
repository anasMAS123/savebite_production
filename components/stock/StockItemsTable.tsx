import SortList from "./SortList";
import StockTableContent from "./StockTableContent";

function StockItemsTable({ predictData }: { predictData: any }) {
  return (
    <div className="flex flex-col gap-1 w-[90%] mx-auto">
      <SortList />
      <StockTableContent predictData={predictData} />
    </div>
  );
}

export default StockItemsTable;

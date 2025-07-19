"use client";
import { useSearchParams } from "next/navigation";
import StockItemCell from "./StockItemCell";

interface Props {
  predictData: any;
}

function StockTableContent({ predictData }: Props) {
  const query = useSearchParams().get("query") || "";
  const order = useSearchParams().get("order") || "";
  const searchQuery = useSearchParams().get("search") || "";
  console.log(query);
  console.log(order);
  console.log(searchQuery);
  return (
    <div className="flex flex-col gap-1 w-[100%] mx-auto">
      {predictData?.data
        .sort((a: any, b: any) => {
          if (query == "productName" && order == "desc") {
            return b.ProductName.localeCompare(a.ProductName);
          } else if (query == "productName" && order == "asc") {
            return a.ProductName.localeCompare(b.ProductName);
          } else if (query == "category" && order == "desc") {
            return b.Category.localeCompare(a.Category);
          } else if (query == "category" && order == "asc") {
            return a.Category.localeCompare(b.Category);
          } else if (query == "reorderQuantity" && order == "desc") {
            return b.ReorderQuantities[0] - a.ReorderQuantities[0];
          } else {
            return a.ReorderQuantities[0] - b.ReorderQuantities[0];
          }
        })
        .filter((item: any) =>
          searchQuery
            ? item.ProductName.toLowerCase().startsWith(
                searchQuery.toLowerCase()
              )
            : item.ProductName
        )
        .map((item: any, index: number) => (
          <StockItemCell item={item} key={index} />
        ))}
    </div>
  );
}

export default StockTableContent;

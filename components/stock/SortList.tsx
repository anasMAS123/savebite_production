"use client";
import StockSortFilter from "./StockSortFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SortList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  return (
    <div className="flex flex-wrap gap-1 w-[100%] mx-auto">
      <StockSortFilter
        name="productName"
        filter={() => {
          newSearchParams.set("query", "productName");
          if (searchParams.get("order") === "desc") {
            newSearchParams.set("order", "asc");
          } else {
            newSearchParams.set("order", "desc");
          }

          router.push(`${pathname}?${newSearchParams.toString()}`, {
            scroll: false,
          });
        }}
      />
      <StockSortFilter
        name="category"
        filter={() => {
          newSearchParams.set("query", "category");
          if (searchParams.get("order") === "desc") {
            newSearchParams.set("order", "asc");
          } else {
            newSearchParams.set("order", "desc");
          }

          router.push(`${pathname}?${newSearchParams.toString()}`, {
            scroll: false,
          });
        }}
      />

      <StockSortFilter
        name="reorderQuantity"
        filter={() => {
          newSearchParams.set("query", "reorderQuantity");
          if (searchParams.get("order") === "desc") {
            newSearchParams.set("order", "asc");
          } else {
            newSearchParams.set("order", "desc");
          }

          router.push(`${pathname}?${newSearchParams.toString()}`, {
            scroll: false,
          });
        }}
      />
    </div>
  );
}

export default SortList;

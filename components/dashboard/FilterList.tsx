"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "./Filter";

function FilterList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  function handleFilter(filter: string) {
    newSearchParams.set("dashboardFilter", filter);
    if (newSearchParams.get("dashboardOrder") === "desc") {
      newSearchParams.set("dashboardOrder", "asc");
    } else {
      newSearchParams.set("dashboardOrder", "desc");
    }
    router.push(`${pathname}?${newSearchParams}`, { scroll: false });
  }
  return (
    <div className="flex flex-wrap gap-1 w-[100%] mx-auto">
      <Filter name="date" filter={() => handleFilter("date")} />
      <Filter name="productName" filter={() => handleFilter("productName")} />
      <Filter name="category" filter={() => handleFilter("category")} />
      <Filter name="price" filter={() => handleFilter("price")} />
      <Filter name="quantity" filter={() => handleFilter("quantity")} />
      <Filter name="reorderLevel" filter={() => handleFilter("reorderLevel")} />
      <Filter
        name="reorderQuantity"
        filter={() => handleFilter("reorderQuantity")}
      />
      <Filter name="unitsSold" filter={() => handleFilter("unitsSold")} />
      <Filter name="salesValue" filter={() => handleFilter("salesValue")} />
    </div>
  );
}

export default FilterList;

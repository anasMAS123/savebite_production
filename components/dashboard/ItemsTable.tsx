import { Item } from "@/types";
import FilterList from "./FilterList";
import TableContent from "./TableContent";

function ItemsTable({ products }: { products: Item[] }) {
  return (
    <div className="flex flex-col gap-1 w-[90%] mx-auto pb-6">
      <FilterList />
      <TableContent data={products} />
    </div>
  );
}

export default ItemsTable;

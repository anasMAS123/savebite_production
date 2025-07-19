interface Props {
  item: {
    ProductName: string;
    Category: string;
    ReorderQuantities: number[];
  };
}

function StockItemCell({ item }: Props) {
  const {
    ProductName: productName,
    Category: category,
    ReorderQuantities: reorderQuantities,
  } = item;
  return (
    <div className="w-full flex bg-white">
      <span className="flex-1 py-[8px] px-[20px]">{productName}</span>
      <span className="flex-1 py-[8px] px-[20px]">{category}</span>
      <span className="flex-1 py-[8px] px-[20px] flex">
        {reorderQuantities.map((quantity, index) => (
          <span key={index} className="flex-1">
            {quantity}
          </span>
        ))}
      </span>
    </div>
  );
}

export default StockItemCell;

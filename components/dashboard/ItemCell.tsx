interface Props {
  item: {
    date: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
    reorderLevel: number;
    reorderQuantity: number;
    unitsSold: number;
    salesValue: number;
  };
}

function ItemCell({ item }: Props) {
  const {
    date,
    productName,
    category,
    price,
    quantity,
    reorderLevel,
    reorderQuantity,
    unitsSold,
    salesValue,
  } = item;
  return (
    <div className="w-full flex flex-wrap max-lg:flex-col max-lg:items-center items-center bg-white">
      <span className="flex-1 py-[8px] px-[20px]">{date}</span>
      <span className="flex-1 py-[8px] px-[20px]">{productName}</span>
      <span className="flex-1 py-[8px] px-[20px]">{category}</span>
      <span className="flex-1 py-[8px] px-[20px]">{price}</span>
      <span className="flex-1 py-[8px] px-[20px]">{quantity}</span>
      <span className="flex-1 py-[8px] px-[20px]">{reorderLevel}</span>
      <span className="flex-1 py-[8px] px-[20px]">{reorderQuantity}</span>
      <span className="flex-1 py-[8px] px-[20px]">{unitsSold}</span>
      <span className="flex-1 py-[8px] px-[20px]">{salesValue}</span>
    </div>
  );
}

export default ItemCell;

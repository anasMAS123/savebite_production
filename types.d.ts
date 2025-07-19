export type AllowedProperitiesForString = "productName" | "category";
export type AllowedProperitiesForNumber =
  | "price"
  | "quantity"
  | "reorderLevel"
  | "reorderQuantity"
  | "unitsSold"
  | "salesValue";

export interface Item {
  date: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  reorderQuantity: number;
  unitsSold: number;
  salesValue: number;
}

export interface statistics {
  stockInHand: string;
  belowMinimum: number;
  belowPar: number;
  negativeStock: number;
  positiveStock: number;
}

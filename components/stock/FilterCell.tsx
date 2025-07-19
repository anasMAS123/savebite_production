import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const FilterCell = ({
  item,
  onCheck,
}: {
  item: string;
  onCheck: (status: boolean, item: string) => void;
}) => {
  return (
    <div key={item} className="py-2 ">
      {
        <Label htmlFor="email" className="flex gap-4 items-center">
          <Checkbox
            className="w-[20px] h-[20px] border-black-300 data-[state=checked]:border-0"
            onCheckedChange={(e: boolean) => onCheck(e, item)}
          />
          <span className="title2 text-black-600">{item}</span>
        </Label>
      }
    </div>
  );
};

export default FilterCell;

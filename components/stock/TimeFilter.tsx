import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const TimeFilter = () => {
  return (
    <Select defaultValue="weekly">
      <SelectTrigger className="w-[90px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="weekly"
        >
          Weekly
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="monthly"
        >
          Monthly
        </SelectItem>
        <SelectItem
          className="focus:bg-blue-500 focus:text-white"
          value="yearly"
        >
          Yearly
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

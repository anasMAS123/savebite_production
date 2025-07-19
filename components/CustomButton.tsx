"use client";
import React from "react";
import { Button } from "./ui/button";
interface Props {
  type?: string;
  children: React.ReactNode;
}
const CustomButton = ({ type = "primary", children }: Props) => {
  return (
    <Button
      className={`h-[72px] mt-[16px] w-[300px] md:w-[350px] lg:w-[500px] text-[19px] font-[500] ${
        type === "primary" &&
        "bg-primary-500 border-none text-white hover:bg-white hover:text-primary-400"
      }
      ${
        type === "secondary" &&
        "bg-white border-[1px] border-primary-500 text-primary-500 hover:bg-primary-400 hover:text-white"
      }
      `}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
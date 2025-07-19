"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FilterCell from "./FilterCell";

interface Props {
  name: string;
  list: string[];
  itemCheckAction: (status: boolean, item: string) => void;
}
const DrobDownList = ({ name, list, itemCheckAction }: Props) => {
  const [drop, setDrop] = useState(false);
  useEffect(() => {}, [list]);
  function handleDropDown() {
    setDrop(!drop);
  }
  return (
    <div>
      <div
        className="px-[20px] py-[10px] flex justify-between items-center h-[50px] cursor-pointer bg-extra-box-gray"
        onClick={handleDropDown}
      >
        <p className="title1medium">{name}</p>
        <Image
          src={drop ? `/stock/arrow-down.svg` : `/stock/arrow-up.svg`}
          alt="arrow"
          width={30}
          height={30}
        />
      </div>
      <div
        className={`bg-extra-box-gray px-[12px] py-[10px] transition-all overflow-auto  duration-500 ease-in-out flex flex-col ${
          drop ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        } `}
      >
        {list.map((item) => (
          <FilterCell key={item} item={item} onCheck={itemCheckAction} />
        ))}
      </div>
    </div>
  );
};

export default DrobDownList;

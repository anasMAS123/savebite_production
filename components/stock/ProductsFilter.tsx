"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import DrobDownList from "./DrobDownList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductsFilter = ({ predictData }: { predictData: any }) => {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const chartQuery = searchParams.get("chartQuery");
  const chartCategoryList = searchParams.getAll("chartCategoryList");

  //categories array
  const categoriesArray: any[] = Array.from(
    new Set(predictData.data.map((item: any) => item.Category))
  ).filter((element: any) =>
    chartQuery
      ? element.toLowerCase().startsWith(chartQuery.toLowerCase())
      : element
  );
  //products Array
  const productsArray: any[] = Array.from(
    new Set(
      predictData.data
        .filter((item: any) => {
          if (chartCategoryList.length !== 0)
            return chartCategoryList.includes(item.Category);
          else return item;
        })
        .filter((item: any) => {
          if (chartQuery)
            return item.ProductName.toLowerCase().startsWith(
              chartQuery.toLowerCase()
            );
          else return item;
        })
        .map((item: any) => item.ProductName)
    )
  );

  return (
    <>
      <Button
        onClick={() => setShowFilters(true)!}
        className="bg-white border-solid border-[2px] border-extra-gray rounded-lg px-[10px] hover:bg-white"
      >
        <Image
          src="/stock/filters.svg"
          alt="filters.svg"
          width={30}
          height={30}
        />
      </Button>
      {/* the filter */}
      <div
        className={`shadow-xl rounded-lg  w-[400px] max-h-[90%]  transition-all h-[1000px] overflow-auto bg-[#ffffff] fixed ${
          showFilters === false ? `-right-[500px]` : `right-0`
        } z-[100] top-[60px]`}
      >
        <div className="flex justify-between items-center px-[20px] pt-[24px]">
          <span className="h5medium">Filter</span>
          <Image
            src="/x.svg"
            alt="x.svg"
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={() => setShowFilters(false)}
          />
        </div>
        <p className="text-extra-text-gray title2 mb-[40px] px-[20px]">
          Select the filter according to what you want.
        </p>
        <div className="relative w-[90%] mx-auto">
          <Image
            src="/stock/magnifier.svg"
            alt="magnifier.svg"
            width={30}
            height={30}
            className="absolute top-1/2 -translate-y-1/2 left-4"
          />
          <Input
            className="focus:border-primary-500  mx-auto transition-all py-[30px] px-[50px] rounded-lg mb-[30px]"
            onChange={(e) => {
              newSearchParams.set("chartQuery", e.target.value);
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            }}
          />
        </div>
        <DrobDownList
          name="Category"
          list={categoriesArray}
          itemCheckAction={(e, item) => {
            if (e === true) {
              newSearchParams.append("chartCategoryList", item);
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            } else {
              newSearchParams.delete("chartCategoryList", item);
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            }
          }}
        />
        <DrobDownList
          name="Products"
          list={productsArray}
          itemCheckAction={(e, item) => {
            if (e === true) {
              newSearchParams.append("chartProductList", item);
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            } else {
              newSearchParams.delete("chartProductList", item);
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              });
            }
          }}
        />
      </div>
    </>
  );
};

export default ProductsFilter;

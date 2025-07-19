"use client";
import Image from "next/image";
import { toast } from "sonner";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { addProduct } from "@/actions/actions";

const AddItemModal = () => {
  const t = useTranslations("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const [state, formActionss, isPending] = useActionState(addProduct, {
    status: "",
    key: 0,
    data: null,
  });

  useEffect(() => {
    console.log(state);
    if (state?.status === "SUCCESS") {
      setShowModal(false);
      toast.success("the item has been added successfully.");
    } else {
      if (!state?.data) return;
      const errorMessages = (state?.data as string[]).join(" , ");
      toast.error(errorMessages);
    }
  }, [state]);

  function handleModal() {
    setShowModal(!showModal);
  }
  function handleOpenedModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLElement).classList.contains("overlay")) {
      setShowModal(false);
    }
  }

  return (
    <>
      <Button
        onClick={handleModal}
        className="flex gap-2 text-primary-500 bg-white border-[1px] border-primary-500 hover:bg-white"
      >
        <Image src="/dashboard/add.svg" alt="add.svg" width={20} height={20} />
        <span>{t("addItem")}</span>
      </Button>
      {showModal && (
        <div
          className=" overlay fixed top-0 left-0 w-full h-full bg-[#000000]/25  flex items-center justify-center"
          onClick={(e) => handleOpenedModal(e)}
        >
          <div className="w-[70%] h-[80%] rounded-lg bg-white flex flex-col gap-4 p-6">
            <h2 className="h4bold">{t("addItem")}</h2>
            <form action={formActionss} className="flex flex-col gap-4">
              <div>
                <label htmlFor="date" className="text-black-600">
                  {t("date")}
                </label>
                <input
                  required
                  type="date"
                  name="Date"
                  id="date"
                  className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                />
              </div>
              <div>
                <label htmlFor="productName" className="text-black-600">
                  {t("productName")}
                </label>
                <input
                  required
                  type="text"
                  name="ProductName"
                  id="productName"
                  className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label htmlFor="category" className="text-black-600">
                    {t("category")}
                  </label>
                  <input
                    type="text"
                    name="Category"
                    id="category"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="price" className="text-black-600">
                    {t("unitPrice")}
                  </label>
                  <input
                    required
                    type="number"
                    name="UnitPrice"
                    id="price"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label htmlFor="quantity" className="text-black-600">
                    {t("stockQuantity")}
                  </label>
                  <input
                    required
                    step="any"
                    type="number"
                    name="StockQuantity"
                    id="quantity"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="reorderLevel" className="text-black-600">
                    {t("reorderLevel")}
                  </label>
                  <input
                    required
                    type="number"
                    name="ReorderLevel"
                    id="reorderLevel"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label htmlFor="reorderQuantity" className="text-black-600">
                    {t("reorderQuantity")}
                  </label>
                  <input
                    required
                    type="number"
                    name="ReorderQuantity"
                    id="reorderQuantity"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="unitsSold" className="text-black-600">
                    {t("unitsSold")}
                  </label>
                  <input
                    required
                    type="number"
                    name="UnitsSold"
                    id="unitsSold"
                    className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="salesValue" className="text-black-600">
                  {t("salesValue")}
                </label>
                <input
                  required
                  type="number"
                  name="SalesValue"
                  id="salesValue"
                  className="w-full h-[50px] border-solid border-[1px] border-[#cccccc] p-2 text-black"
                />
              </div>
              <div className="mt-6">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full h-[72px] transition-all h5bold"
                >
                  {t("addItem")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItemModal;

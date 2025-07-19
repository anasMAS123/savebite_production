"use client";
import React, { useEffect, useState } from "react";
import AllItems from "./AllItems";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import Header from "./Header";
import Info from "./Info";
import axios from "axios";
import { useTranslations } from "next-intl";

export type Product = {
  id: number;
  name: string;
  numberId: string;
  category: string;
  quantity: number;
  label: string;
  start_date: string;
  end_date: string;
  status: string;
  image: string;
};

const Content = () => {
  const [selected, setSelected] = useState("all");

  const t = useTranslations("tracking");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/getProducts")
      .then((res) => {
        console.log("Loaded products:", res.data);
        const items = res.data?.data?.data || res.data?.data || res.data;
        setProducts(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        console.error("Failed to load products:", {
          message: err.message,
          status: err?.response?.status,
          data: err?.response?.data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate counts
  const allCount = products.length;
  const expiredCount = products.filter((p) => p.status === "expired").length;
  const nearCount = products.filter((p) => p.status === "near").length;

  const renderContent = () => {
    if (loading) return <div className="p-4">{t("loading")}</div>;

    let filteredProducts: Product[] = products;
    if (selected === "expired") {
      filteredProducts = products.filter((p) => p.status === "expired");
    } else if (selected === "near") {
      filteredProducts = products.filter((p) => p.status === "near");
    }

    if (
      (selected === "all" || selected === "expired" || selected === "near") &&
      filteredProducts.length === 0
    ) {
      return (
        <>
          <Header
            selected={selected}
            setSelected={setSelected}
            productCount={0}
            allCount={allCount}
            expiredCount={expiredCount}
            nearCount={nearCount}
          />
          <div className="p-4 text-center text-gray-500">{t("noItems")}</div>
        </>
      );
    }

    switch (selected) {
      case "all":
      case "expired":
      case "near":
        return (
          <>
            <Header
              selected={selected}
              setSelected={setSelected}
              productCount={filteredProducts.length}
              allCount={allCount}
              expiredCount={expiredCount}
              nearCount={nearCount}
            />
            <Info />
            <AllItems
              selected={selected}
              setSelected={setSelected}
              setEditProduct={setEditProduct}
              products={filteredProducts}
              setProducts={setProducts}
            />
          </>
        );
      case "add":
        return <AddItem selected={selected} setSelected={setSelected} />;
      case "edit":
        return (
          editProduct && (
            <EditItem
              selected={selected}
              setSelected={setSelected}
              product={editProduct}
            />
          )
        );
    }
  };

  return <div className="w-full mx-auto">{renderContent()}</div>;
};

export default Content;

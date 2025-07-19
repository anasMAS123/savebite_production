import React from "react";
import Info from "@/components/dashboard/Info";
import Header from "@/components/dashboard/Header";
import ManageOperations from "@/components/dashboard/ManageOperations";
import CardList from "@/components/dashboard/CardList";
import ItemsTable from "@/components/dashboard/ItemsTable";
import { fetchProducts } from "@/actions/actions";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const {
    dashboardFilter,
    dashboardOrder,
    dashboardSearchQuery,
    dashboardStock,
  } = await searchParams;
  const { statistics, products } = (await fetchProducts(
    dashboardStock ?? "All"
  )) || {
    statistics: {},
    products: [],
  };

  const filteredProducts = [...products]
    .sort((a: any, b: any) => {
      if (dashboardFilter === "productName" || dashboardFilter === "category") {
        if (dashboardOrder === "desc") {
          return a[dashboardFilter]
            .toLowerCase()
            .localeCompare(b[dashboardFilter].toLowerCase());
        } else {
          return b[dashboardFilter]
            .toLowerCase()
            .localeCompare(a[dashboardFilter].toLowerCase());
        }
      } else if (dashboardFilter === "date") {
        if (dashboardOrder === "desc") {
          return (
            new Date(a[dashboardFilter]).getTime() -
            new Date(b[dashboardFilter]).getTime()
          );
        } else {
          return (
            new Date(b[dashboardFilter]).getTime() -
            new Date(a[dashboardFilter]).getTime()
          );
        }
      } else {
        if (dashboardOrder === "desc") {
          return a[dashboardFilter] - b[dashboardFilter];
        } else {
          return b[dashboardFilter] - a[dashboardFilter];
        }
      }
    })
    .filter((item: any) =>
      dashboardSearchQuery
        ? item.productName
            .toLowerCase()
            .includes(dashboardSearchQuery.toLowerCase())
        : item
    );

  return (
    <div>
      <Header />
      <Info />
      <CardList statistics={statistics} />
      <ManageOperations />
      <ItemsTable products={filteredProducts} />
    </div>
  );
};

export default Page;


"use client";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import Details from "./Details";
import type { Product } from "./Content";
import axios from "axios";
import { useTranslations } from "next-intl";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "in-date":
      return "bg-green-100 text-green-500";
    case "expired":
      return "bg-red-100 text-red-500";
    case "near-to-expire":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const ITEMS_PER_PAGE = 5;

const AllItems = ({
  selected,
  setSelected,
  setEditProduct,
  products,
  setProducts,
}: {
  selected: string;
  setSelected: (tab: string) => void;
  setEditProduct: (product: Product) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
    const t = useTranslations("tracking");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const currentItems = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
  
    try {
      await axios.delete(`/api/deleteProduct/${selectedProduct.id}`);
  
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    } catch (error) {
      console.error("❌ Failed to delete from backend:", error);
      alert("Failed to delete item from server. Please try again.");
    }
  
    setShowDeleteModal(false);
    setSelectedProduct(null);
    setActiveActionIndex(null);
  };
  

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-[90%] mx-auto rounded-lg">
      <div className="py-3 bg-white rounded-lg flex justify-between items-center mb-4">
        {[
          t("idNo"),
          t("product"),
          t("status"),
          t("quantity"),
          t("startDate"),
          t("endDate"),
          t("details"),
          t("actions"),
        ].map((label) => (
          <div key={label} className="w-32 text-center text-gray-400 font-bold text-base">
            {label}
          </div>
        ))}
      </div>

      {currentItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No products available.</div>
      ) : (
        currentItems.map((product, index) => {
          const statusClass = getStatusStyle(product.status);
          const isFirst = index === 0;
          const isLast = index === currentItems.length - 1;
          const roundedClass = isFirst
            ? "rounded-t-lg"
            : isLast
            ? "rounded-b-lg"
            : "";

          return (
            <div
              key={product.id}
              className={`relative px-2 bg-white flex justify-between items-center ${roundedClass}`}
            >
              <div className="w-32 text-center text-gray-400 font-bold">{product.id}</div>
              <div className="w-32 text-center text-zinc-800 font-medium">{product.name}</div>
              <div className="w-32 flex justify-center">
                <div className={`px-2 py-1 rounded ${statusClass} text-base`}>
                  {product.status}
                </div>
              </div>
              <div className="w-32 text-center text-gray-400 font-bold">{product.quantity}</div>
              <div className="w-32 text-center text-gray-400 font-bold">{product.start_date}</div>
              <div className="w-32 text-center text-gray-400 font-bold">{product.end_date}</div>
              <div className="w-32 flex justify-center">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDetails(true);
                  }}
                  className="px-4 my-4 bg-gray-100 rounded text-zinc-900 font-medium"
                >
                  {t("viewDetails")}
                </button>
              </div>
              <div className="w-32 flex justify-center relative">
                <button
                  onClick={() =>
                    setActiveActionIndex(activeActionIndex === index ? null : index)
                  }
                  className="bg-gray-100 px-2 py-1 rounded"
                >
                  ...
                </button>
                {activeActionIndex === index && (
                  <div className="absolute right-0 top-10 w-28 bg-white shadow-md rounded z-50 font-medium">
                    <button
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setEditProduct(product);
                        setSelected("edit");
                      }}
                    >
                      <span className="ml-2 text-gray-800">{t("edit")}</span>
                    </button>
                    <button
                      className="w-full flex items-center px-3 py-2 hover:bg-red-100 text-red-500"
                      onClick={() => handleDelete(product)}
                    >
                      <span className="ml-2"> {t("delete")} </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}

 
      {showDeleteModal && selectedProduct && (
        <DeleteModal
          product={selectedProduct}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}

      {showDetails && selectedProduct && (
        <Details product={selectedProduct} onClose={() => setShowDetails(false)} />
      )}

      {products.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 mx-1 rounded text-sm font-medium ${
                page === currentPage
                  ? "bg-primary-500 text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AllItems;

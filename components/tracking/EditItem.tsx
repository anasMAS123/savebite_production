"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

type Product = {
  id: string | number;
  number_id?: string;
  name: string;
  category: string;
  quantity: number;
  label?: string;
  start_date: string;
  end_date: string;
  status?: string;
};

const EditItem = ({
  selected,
  setSelected,
  product,
}: {
  selected: string;
  setSelected: (tab: string) => void;
  product: Product;
}) => {
  const t = useTranslations("tracking");

  const [formData, setFormData] = useState({
    ...product,
    number_id: String(product.number_id || product.id || ""),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const payload = {
      number_id: formData.number_id,
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      label: formData.label || "",
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status || "active",
    };

    try {
      const res = await fetch(`/api/updateProduct/${formData.number_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Failed to update product: ${result.message}`);
        return;
      }
      setSelected("all");
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleDiscard = () => {
    setFormData({
      ...product,
      number_id: String(product.number_id || product.id || ""),
    });
  };

  return (
    <div className="space-y-8 mb-5">
      <div
        className="bg-white border-b p-6 flex items-center gap-4 cursor-pointer"
        onClick={() => setSelected("all")}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded border">
          <svg
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.80205 0.736228L0.552256 8.98602C0.27886 9.2595 0.125277 9.63036 0.125277 10.0171C0.125277 10.4038 0.27886 10.7746 0.552256 11.0481L8.80205 19.2979C9.07709 19.5635 9.44547 19.7105 9.82784 19.7072C10.2102 19.7039 10.576 19.5505 10.8464 19.2801C11.1168 19.0097 11.2701 18.644 11.2734 18.2616C11.2768 17.8792 11.1298 17.5109 10.8641 17.2358L5.10371 11.4754H24.4164C24.8032 11.4754 25.1741 11.3217 25.4476 11.0483C25.7211 10.7748 25.8748 10.4038 25.8748 10.0171C25.8748 9.63029 25.7211 9.25935 25.4476 8.98586C25.1741 8.71237 24.8032 8.55873 24.4164 8.55873H5.10371L10.8641 2.79831C11.0034 2.66378 11.1145 2.50286 11.1909 2.32494C11.2674 2.14702 11.3076 1.95566 11.3093 1.76202C11.311 1.56838 11.2741 1.37635 11.2007 1.19713C11.1274 1.0179 11.0191 0.855079 10.8822 0.718152C10.7453 0.581225 10.5825 0.472939 10.4032 0.399613C10.224 0.326287 10.032 0.289388 9.83834 0.291071C9.6447 0.292753 9.45334 0.332983 9.27542 0.409413C9.09749 0.485843 8.93657 0.596942 8.80205 0.736228Z"
              fill="#999999"
            />
          </svg>
        </div>
        <h2 className="text-primary-500 text-2xl font-semibold">
          {t("editItem")}
        </h2>
      </div>

      <div className="w-[95%] mx-auto bg-white p-6 rounded-lg border space-y-6 font-medium">
        <div>
          <h3 className="text-2xl font-medium text-gray-900">
            {t("editItem")}
          </h3>
          <p className="text-gray-500">{t("modify")}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg border space-y-6">
            <Input
              label={t("productName")}
              value={formData.name}
              onChange={(v) => handleChange("name", v)}
            />
            <Input
              label={t("idNo")}
              value={formData.number_id}
              onChange={(v) => handleChange("number_id", v)}
            />
            <Input
              label={t("category")}
              value={formData.category}
              onChange={(v) => handleChange("category", v)}
            />
            <Input
              label={t("quantity")}
              value={String(formData.quantity)}
              onChange={(v) => handleChange("quantity", v)}
            />
            <Textarea
              label={t("label")}
              value={formData.label || ""}
              onChange={(v) => handleChange("label", v)}
              counter={`${(formData.label || "").length}/1000`}
            />
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg border space-y-6">
            <div className="space-y-2">
              <label className="text-lg text-gray-800">
                {t("expirationDate")}
              </label>
              <div className="rounded border p-3 space-y-2 border-primary-200">
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src="https://placehold.co/600x400"
                    alt="product"
                    className="object-cover h-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-lg font-bold">
                    {t("scan")}
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold">
                    {t("delete")}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border space-y-4">
              <div className="flex gap-4">
                <Input
                  label={t("startDate")}
                  value={formData.start_date}
                  onChange={(v) => handleChange("start_date", v)}
                  small
                />
                <Input
                  label={t("endDate")}
                  value={formData.end_date}
                  onChange={(v) => handleChange("end_date", v)}
                  small
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-s text-gray-500">{t("editTheDates")}</p>
                <button
                  disabled={
                    !formData.start_date.trim() || !formData.end_date.trim()
                  }
                  className={`px-4 py-2 rounded-lg font-bold ${
                    formData.start_date.trim() && formData.end_date.trim()
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-white cursor-not-allowed"
                  }`}
                >
                  {t("save")}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-bold"
              >
                {t("confirm")}
              </button>
              <button
                onClick={handleDiscard}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-bold"
              >
                {t("discard")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Input({
  label,
  value,
  onChange,
  small = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  small?: boolean;
}) {
  return (
    <div className={`space-y-1 w-full`}>
      <label className="text-gray-700 text-base">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          small ? "h-10" : "h-12"
        } px-4 border rounded-lg bg-transparent text-gray-900 font-medium`}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  counter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  counter?: string;
}) {
  return (
    <div className="space-y-1 w-full">
      <div className="flex justify-between text-black text-base">
        <label>{label}</label>
        {counter && <span className="text-sm text-gray-400">{counter}</span>}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full p-3 border rounded-lg bg-white text-gray-900 font-medium"
      />
    </div>
  );
}

export default EditItem;

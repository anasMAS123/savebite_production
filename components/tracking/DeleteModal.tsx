"use client";
import React from "react";
import type { Product } from "./Content";
import { useTranslations } from "next-intl";

interface DeleteModalProps {
  product: Product;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  product,
  onCancel,
  onConfirm,
}) => {
  const t = useTranslations("tracking");

  return (
    <div className="fixed inset-0 z-50 bg-black-500 bg-opacity-40 top-0 right-0">
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[1000]">
        <div className="w-[544px] h-[570px] relative bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden p-[24px]">
          <div className="w-full inline-flex justify-between items-center mb-6">
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.73 1.59585C17.4587 1.11073 17.0629 0.706744 16.5835 0.425541C16.1041 0.144337 15.5583 -0.00390625 15.0025 -0.00390625C14.4467 -0.00390625 13.9009 0.144337 13.4215 0.425541C12.942 0.706744 12.5463 1.11073 12.275 1.59585L0.392482 22.8509C0.126681 23.3263 -0.0102451 23.8629 -0.00472211 24.4075C0.0008009 24.9522 0.148581 25.4859 0.423968 25.9559C0.699355 26.4258 1.09278 26.8156 1.56525 27.0866C2.03772 27.3576 2.57281 27.5004 3.11748 27.5009H26.8775C27.4224 27.5008 27.9578 27.3583 28.4306 27.0875C28.9034 26.8167 29.2972 26.4269 29.5729 25.9569C29.8485 25.4869 29.9965 24.953 30.0022 24.4082C30.0078 23.8633 29.8709 23.3265 29.605 22.8509L17.73 1.59585ZM16.875 20.6259C16.875 21.1231 16.6774 21.6 16.3258 21.9517C15.9742 22.3033 15.4973 22.5009 15 22.5009C14.5027 22.5009 14.0258 22.3033 13.6742 21.9517C13.3225 21.6 13.125 21.1231 13.125 20.6259C13.125 20.1286 13.3225 19.6517 13.6742 19.3C14.0258 18.9484 14.5027 18.7509 15 18.7509C15.4973 18.7509 15.9742 18.9484 16.3258 19.3C16.6774 19.6517 16.875 20.1286 16.875 20.6259ZM13.75 15.0009V8.75085C13.75 8.41933 13.8817 8.10139 14.1161 7.86697C14.3505 7.63255 14.6685 7.50085 15 7.50085C15.3315 7.50085 15.6494 7.63255 15.8839 7.86697C16.1183 8.10139 16.25 8.41933 16.25 8.75085V15.0009C16.25 15.3324 16.1183 15.6503 15.8839 15.8847C15.6494 16.1192 15.3315 16.2509 15 16.2509C14.6685 16.2509 14.3505 16.1192 14.1161 15.8847C13.8817 15.6503 13.75 15.3324 13.75 15.0009Z"
                fill="#FF3333"
              />
            </svg>

            <div className="text-red-500 text-2xl font-bold font-['Noto_Sans'] leading-7">
              {t("delete")}
            </div>
            <div onClick={onCancel}>
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.7082 1.79102L1.2915 22.2077M1.2915 1.79102L21.7082 22.2077"
                  stroke="#999999"
                  strokeWidth="1.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="text-zinc-800 text-2xl font-bold font-['Noto_Sans'] leading-7 mb-5">
            {t("areYouSure")}
          </div>

          <div className="flex flex-col gap-3 text-sm">
            {[
             { label: t("idNo"), value: product.id.toString() },
             { label: t("productName"), value: product.name },
             { label: t("category"), value: product.category },
             { label: t("startDate"), value: product.start_date },
             { label: t("endDate"), value: product.end_date },
             { label: t("quantity"), value: product.quantity.toString() },
             { label: t("status"), value: product.status },
             { label:t("label"), value: product.label },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="inline-flex justify-start items-center gap-14">
                  <div className="w-28 text-neutral-600 text-base font-medium font-['Noto_Sans'] leading-tight">
                    {item.label}:
                  </div>
                  <div className="text-neutral-400 text-base font-medium font-['Noto_Sans'] leading-tight">
                    {item.value}
                  </div>
                </div>
                <div className="w-full h-px bg-zinc-100 my-1"></div>
              </div>
            ))}
          </div>

          <div className="absolute left-[308px] bottom-[24px] inline-flex justify-start items-center gap-3">
            <button
              onClick={onCancel}
              className="w-24 h-12 px-5 py-3 bg-neutral-100 rounded-lg flex justify-center items-center"
            >
              <div className="text-stone-500 text-lg font-bold font-['Noto_Sans'] leading-snug">
                {t("cancel")}
              </div>
            </button>
            <button
              onClick={onConfirm}
              className="w-24 h-12 px-5 py-3 bg-red-500 rounded-lg flex justify-center items-center"
            >
              <div className="text-white text-lg font-bold font-['Noto_Sans'] leading-snug">
                {t("yes")}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

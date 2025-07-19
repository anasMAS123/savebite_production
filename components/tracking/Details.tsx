import React from "react";
import type { Product } from "./Content";
import { useTranslations } from "next-intl";

type DetailsProps = {
  onClose: () => void;
  product: Product;
};

const Details: React.FC<DetailsProps> = ({ onClose, product }) => {
    const t = useTranslations("tracking");
  
  return (
    <div className="fixed inset-0 z-50 bg-black-500 bg-opacity-40 top-0 right-0">
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[1000]">
        <div className="w-[540px] h-[516px] relative bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="w-[496px] left-[22px] top-[32px] absolute inline-flex flex-col justify-start items-center gap-7">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-10 h-10 relative overflow-hidden">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.71375 0 0 6.71375 0 15C0 23.2863 6.71375 30 15 30C23.2863 30 30 23.2863 30 15C30 14.395 29.9562 13.8 29.8825 13.2075C29.3644 13.5605 28.752 13.7496 28.125 13.75C27.4864 13.7481 26.8637 13.5506 26.3407 13.1841C25.8178 12.8176 25.4197 12.2996 25.2 11.7C24.3952 12.2198 23.4581 12.4975 22.5 12.5C19.7375 12.5 17.5 10.2625 17.5 7.5C17.5 6.5825 17.7625 5.7325 18.1987 4.99C18.1746 4.99577 18.1499 4.99912 18.125 5C17.7145 5.00049 17.3079 4.92 16.9285 4.76313C16.5492 4.60626 16.2045 4.37609 15.9142 4.08581C15.6239 3.79553 15.3937 3.45083 15.2369 3.07147C15.08 2.6921 14.9995 2.28552 15 1.875C15 1.17625 15.235 0.5425 15.62 0.025C15.415 0.015 15.21 0 15 0ZM24.375 0C24.1288 -5.18888e-09 23.885 0.0484981 23.6575 0.142726C23.43 0.236953 23.2233 0.375065 23.0492 0.549175C22.8751 0.723284 22.737 0.929983 22.6427 1.15747C22.5485 1.38495 22.5 1.62877 22.5 1.875C22.5 2.12123 22.5485 2.36505 22.6427 2.59253C22.737 2.82002 22.8751 3.02672 23.0492 3.20083C23.2233 3.37494 23.43 3.51305 23.6575 3.60727C23.885 3.7015 24.1288 3.75 24.375 3.75C24.8723 3.75 25.3492 3.55246 25.7008 3.20083C26.0525 2.84919 26.25 2.37228 26.25 1.875C26.25 1.37772 26.0525 0.900805 25.7008 0.549175C25.3492 0.197544 24.8723 1.04794e-08 24.375 0ZM12.5625 2.735C12.6861 3.5165 12.9721 4.26343 13.402 4.92763C13.832 5.59182 14.3963 6.15855 15.0588 6.59125C15.0208 6.8927 15.0012 7.19617 15 7.5C15 11.6362 18.3638 15 22.5 15C23.12 15 23.74 14.9213 24.3363 14.765C25.1957 15.5582 26.2811 16.0637 27.4412 16.2113C26.8312 22.5375 21.485 27.5 15 27.5C8.105 27.5 2.5 21.895 2.5 15C2.5 8.94 6.83625 3.8725 12.5625 2.73375V2.735ZM22.5 6.25C21.8125 6.25 21.25 6.8125 21.25 7.5C21.25 8.1875 21.8125 8.75 22.5 8.75C23.1875 8.75 23.75 8.1875 23.75 7.5C23.75 6.8125 23.1875 6.25 22.5 6.25ZM12.5 7.5C11.8125 7.5 11.25 8.0625 11.25 8.75C11.25 9.4375 11.8125 10 12.5 10C13.1875 10 13.75 9.4375 13.75 8.75C13.75 8.0625 13.1875 7.5 12.5 7.5ZM28.75 7.5C28.0625 7.5 27.5 8.0625 27.5 8.75C27.5 9.4375 28.0625 10 28.75 10C29.4375 10 30 9.4375 30 8.75C30 8.0625 29.4375 7.5 28.75 7.5ZM8.75 11.25C8.08696 11.25 7.45107 11.5134 6.98223 11.9822C6.51339 12.4511 6.25 13.087 6.25 13.75C6.25 14.413 6.51339 15.0489 6.98223 15.5178C7.45107 15.9866 8.08696 16.25 8.75 16.25C9.41304 16.25 10.0489 15.9866 10.5178 15.5178C10.9866 15.0489 11.25 14.413 11.25 13.75C11.25 13.087 10.9866 12.4511 10.5178 11.9822C10.0489 11.5134 9.41304 11.25 8.75 11.25ZM15 13.75C14.3125 13.75 13.75 14.3125 13.75 15C13.75 15.6875 14.3125 16.25 15 16.25C15.6875 16.25 16.25 15.6875 16.25 15C16.25 14.3125 15.6875 13.75 15 13.75ZM10.625 18.75C10.1277 18.75 9.65081 18.9475 9.29917 19.2992C8.94754 19.6508 8.75 20.1277 8.75 20.625C8.75 21.1223 8.94754 21.5992 9.29917 21.9508C9.65081 22.3025 10.1277 22.5 10.625 22.5C11.1223 22.5 11.5992 22.3025 11.9508 21.9508C12.3025 21.5992 12.5 21.1223 12.5 20.625C12.5 20.1277 12.3025 19.6508 11.9508 19.2992C11.5992 18.9475 11.1223 18.75 10.625 18.75ZM19.375 20C18.8777 20 18.4008 20.1975 18.0492 20.5492C17.6975 20.9008 17.5 21.3777 17.5 21.875C17.5 22.3723 17.6975 22.8492 18.0492 23.2008C18.4008 23.5525 18.8777 23.75 19.375 23.75C19.8723 23.75 20.3492 23.5525 20.7008 23.2008C21.0525 22.8492 21.25 22.3723 21.25 21.875C21.25 21.3777 21.0525 20.9008 20.7008 20.5492C20.3492 20.1975 19.8723 20 19.375 20Z"
                    fill="#5EDA42"
                  />
                </svg>
              </div>
              <div className="justify-start text-zinc-800 text-2xl font-bold font-['Noto_Sans'] leading-7">
                {product.name}
              </div>
              <div
                className="w-9 h-9 relative overflow-hidden cursor-pointer"
                onClick={onClose}
              >
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.7083 1.79102L1.29167 22.2077M1.29167 1.79102L21.7083 22.2077"
                    stroke="#999999"
                    strokeWidth="1.875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-[492px] left-[24px] top-[100px] absolute inline-flex flex-col justify-start items-start gap-4">
            {[
              { label: t("idNo"), value: product.id.toString() },
              { label: t("productName"), value: product.name },
              { label: t("category"), value: product.category },
              { label: t("startDate"), value: product.start_date },
              { label: t("endDate"), value: product.end_date },
              { label: t("quantity"), value: product.quantity.toString() },
              { label: t("status"), value: product.status },
              { label:t("label"), value: product.label },
            ].map(({ label, value }, i) => (
              <React.Fragment key={i}>
                <div className="inline-flex justify-start items-center gap-14">
                  <div className="w-28 justify-start text-neutral-600 text-base font-medium font-['Noto_Sans'] leading-tight">
                    {label}
                  </div>
                  <div className="justify-start text-neutral-400 text-base font-medium font-['Noto_Sans'] leading-tight">
                    {value}
                  </div>
                </div>
                {i < 7 && (
                  <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-zinc-100"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

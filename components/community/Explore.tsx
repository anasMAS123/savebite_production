import React from "react";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

interface CardProps {
  title: string;
  image: string;
  location: string;
  description: string;
}

const Explore: React.FC = () => {
  const t = useTranslations("community");
  const cards: CardProps[] = [
    {
      title: t("misrElKheir"),
      image: "/community/MiseElkheirIIamge.jpg",
      location: t("misrElKheirLocation"),
      description: t("misrElKheirDescription"),
    },
    {
      title: t("amalCharity"),
      image: "/community/AlAmalCharity.jpg",
      location: t("amalCharityLocation"),
      description: t("amalCharityDescription"),
    },
    {
      title: t("takafulFoundation"),
      image: "/community/TakaFul.jpg",
      location: t("takafulFoundationLocation"),
      description: t("takafulFoundationDescription"),
    },
    {
      title: t("misrElKheir"),
      image: "/community/MiseElkheirIIamge.jpg",
      location: t("misrElKheirLocation"),
      description: t("misrElKheirDescription"),
    },
    {
      title: t("amalCharity"),
      image: "/community/AlAmalCharity.jpg",
      location: t("amalCharityLocation"),
      description: t("amalCharityDescription"),
    },
    {
      title: t("takafulFoundation"),
      image: "/community/TakaFul.jpg",
      location: t("takafulFoundationLocation"),
      description: t("takafulFoundationDescription"),
    },
  ];

  return (
    <div className="w-full px-6 py-6 flex flex-col gap-4">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Noto_Sans']">
          {t("explore")}
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 py-1 px-3 w-full sm:w-96 bg-white rounded-xl border border-stone-200">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.875 19.8752L15.351 15.3513M15.351 15.3513C16.1249 14.5774 16.7387 13.6587 17.1575 12.6477C17.5763 11.6366 17.7919 10.5529 17.7919 9.45855C17.7919 8.36417 17.5763 7.28051 17.1575 6.26944C16.7387 5.25836 16.1249 4.33968 15.351 3.56584C14.5772 2.792 13.6585 2.17815 12.6474 1.75935C11.6364 1.34055 10.5527 1.125 9.45833 1.125C8.36396 1.125 7.2803 1.34055 6.26922 1.75935C5.25815 2.17815 4.33947 2.792 3.56563 3.56584C2.00278 5.12868 1.12479 7.24835 1.12479 9.45855C1.12479 11.6687 2.00278 13.7884 3.56563 15.3513C5.12847 16.9141 7.24814 17.7921 9.45833 17.7921C11.6685 17.7921 13.7882 16.9141 15.351 15.3513Z"
                stroke="#B3B3B3"
                stroke-width="1.875"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <Input
              className="text-neutral-500 text-base font-normal font-['Noto_Sans'] border-none"
              placeholder={t("search")}
            />
          </div>
          <div className="flex items-center justify-between w-full sm:w-32 px-3 py-2 bg-white rounded-xl border border-stone-200">
            <span className="text-neutral-500 text-base font-medium font-['Noto_Sans']">
              {t("filter")}
            </span>

            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 24.0625V8.61875M12 3.1675V0.9375M12 3.1675C12.7227 3.1675 13.4158 3.4546 13.9269 3.96563C14.4379 4.47667 14.725 5.16979 14.725 5.8925C14.725 6.61522 14.4379 7.30833 13.9269 7.81937C13.4158 8.3304 12.7227 8.6175 12 8.6175C11.2773 8.6175 10.5842 8.3304 10.0731 7.81937C9.56211 7.30833 9.27501 6.61522 9.27501 5.8925C9.27501 5.16979 9.56211 4.47667 10.0731 3.96563C10.5842 3.4546 11.2773 3.1675 12 3.1675ZM3.74126 24.0625V16.8775M3.74126 16.8775C3.01838 16.8775 2.32449 16.5897 1.81333 16.0786C1.30218 15.5674 1.01501 14.8741 1.01501 14.1513C1.01501 13.4285 1.30336 12.7354 1.8144 12.2244C2.32543 11.7133 3.01855 11.4262 3.74126 11.4262M3.74126 16.8775C4.46415 16.8775 5.1568 16.5897 5.66795 16.0786C6.1791 15.5674 6.46626 14.8741 6.46626 14.1513C6.46626 13.4285 6.17917 12.7354 5.66813 12.2244C5.15709 11.7133 4.46398 11.4262 3.74126 11.4262M3.74126 11.4262V0.9375M20.2588 24.0625V20.1813M20.2588 14.73V0.9375M20.2588 14.73C20.9815 14.73 21.6746 15.0171 22.1856 15.5281C22.6967 16.0392 22.9838 16.7323 22.9838 17.455C22.9838 17.8129 22.9133 18.1672 22.7763 18.4978C22.6394 18.8284 22.4387 19.1288 22.1856 19.3819C21.9326 19.6349 21.6322 19.8356 21.3016 19.9726C20.971 20.1095 20.6166 20.18 20.2588 20.18C19.9009 20.18 19.5466 20.1095 19.216 19.9726C18.8853 19.8356 18.5849 19.6349 18.3319 19.3819C18.0789 19.1288 17.8781 18.8284 17.7412 18.4978C17.6042 18.1672 17.5338 17.8129 17.5338 17.455C17.5338 16.7323 17.8209 16.0392 18.3319 15.5281C18.8429 15.0171 19.536 14.73 20.2588 14.73Z"
                stroke="#5EDA42"
                stroke-width="1.875"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-3 flex flex-col gap-4"
          >
            <img
              className="w-full h-40 object-cover rounded-lg"
              src={card.image}
              alt={card.title}
            />
            <div className="flex items-center gap-2 px-2">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.03875 12.8338C5.03875 12.8338 0.5 9.01125 0.5 5.25C0.5 3.92392 1.02678 2.65215 1.96447 1.71447C2.90215 0.776784 4.17392 0.25 5.5 0.25C6.82608 0.25 8.09785 0.776784 9.03553 1.71447C9.97322 2.65215 10.5 3.92392 10.5 5.25C10.5 9.01125 5.96125 12.8338 5.96125 12.8338C5.70875 13.0663 5.29313 13.0638 5.03875 12.8338ZM5.5 7.4375C5.78727 7.4375 6.07172 7.38092 6.33712 7.27099C6.60252 7.16105 6.84367 6.99992 7.0468 6.7968C7.24992 6.59367 7.41105 6.35252 7.52099 6.08712C7.63092 5.82172 7.6875 5.53727 7.6875 5.25C7.6875 4.96273 7.63092 4.67828 7.52099 4.41288C7.41105 4.14748 7.24992 3.90633 7.0468 3.7032C6.84367 3.50008 6.60252 3.33895 6.33712 3.22901C6.07172 3.11908 5.78727 3.0625 5.5 3.0625C4.91984 3.0625 4.36344 3.29297 3.9532 3.7032C3.54297 4.11344 3.3125 4.66984 3.3125 5.25C3.3125 5.83016 3.54297 6.38656 3.9532 6.7968C4.36344 7.20703 4.91984 7.4375 5.5 7.4375Z"
                  fill="#EB4444"
                />
              </svg>

              <span className="text-red-500 text-xs font-normal">
                {card.location}
              </span>
            </div>
            <div className="px-2">
              <h3 className="text-lg font-bold text-zinc-900 font-['Noto_Sans']">
                {card.title}
              </h3>
              <p className="text-base text-neutral-500 font-normal mt-2">
                {card.description}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <button className="px-4 py-2 bg-primary-500 text-white rounded font-medium font-['Noto_Sans']">
                {t("donateNow")}
              </button>
              <button className="px-4 py-2 bg-green-50 text-primary-500 rounded font-medium font-['Noto_Sans']">
                {t("viewProfile")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;

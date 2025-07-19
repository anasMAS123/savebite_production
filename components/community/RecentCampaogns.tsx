import React from "react";
import { useTranslations } from "next-intl";

const RecentCampaigns = () => {
  const t = useTranslations("community");
  const campaigns = [
  {
    date: "27 " + t("may")+ " 2025",
    title: t("misrElKheir"),
    image: "/community/Misr El Kheir.png",
    donated: t("27KgVegetables"),
    location: t("giza") ,
    status: t("onProgress"),
    statusColor: "bg-gray-300",
    statusImage: `/community/onProgress.png`,
  },
  {
    date: "27 " + t("may")+ " 2025",
    title: t("bankElTaam"),
    image: "/community/Bank El Taam.png",
    donated: t("meatVegetables"),
    location: t("aswan"),
    status: t("onProgress"),
    statusColor: "bg-gray-300",
    statusImage: `/community/onProgress.png`,
  },
  {
    date: "24 " + t("may")+ " 2025",
    title: t("ahlMisr"),
    image: "/community/Ahl Misr.png",
    donated: t("BreadMilk"),
    location: t("aswan"),
    status: t("delivered"),
    statusColor: "bg-primary-500",
    statusImage: `/community/check.png`,
  },
];

const CampaignCard = ({ campaign }) => {
  return (
    <div className="w-full bg-white rounded shadow-md flex flex-col gap-2 ">
      <div className="flex justify-between items-center bg-green-50 px-2 py-2 rounded">
        <span className="text-neutral-400 text-sm">{campaign.date}</span>
        <span className="text-primary-500 text-sm font-bold cursor-pointer">
          {t("seeDetails")}
        </span>
      </div>

      <div className="flex items-center gap-2 px-4">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-12 h-12 rounded-full object-cover"
        />
        <h3 className="text-zinc-900 text-lg font-bold">{campaign.title}</h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-4">
          <svg
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.125 11.5423C0.125 14.0287 1.11272 16.4133 2.87087 18.1714C4.62903 19.9296 7.0136 20.9173 9.5 20.9173C9.5 18.4309 8.51228 16.0463 6.75413 14.2882C4.99597 12.53 2.6114 11.5423 0.125 11.5423ZM9.5 20.9173C11.9864 20.9173 14.371 19.9296 16.1291 18.1714C17.8873 16.4133 18.875 14.0287 18.875 11.5423C16.3886 11.5423 14.004 12.53 12.2459 14.2882C10.4877 16.0463 9.5 18.4309 9.5 20.9173ZM15.75 1.12565V6.33398C15.75 7.99159 15.0915 9.5813 13.9194 10.7534C12.7473 11.9255 11.1576 12.584 9.5 12.584C7.8424 12.584 6.25269 11.9255 5.08058 10.7534C3.90848 9.5813 3.25 7.99159 3.25 6.33398V1.12565C4.02083 1.12565 4.78125 1.25065 5.5 1.5319C6.07292 1.77148 6.58333 2.12565 7.01042 2.57357L9.5 0.0839844L11.9896 2.57357C12.4167 2.12565 12.9271 1.77148 13.5 1.5319C14.218 1.25694 14.9812 1.11914 15.75 1.12565Z"
              fill="#B3B3B3"
            />
          </svg>

          <span className="text-zinc-900 text-sm">
            {t("donated")}: {campaign.donated}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4">
          <svg
            width="17"
            height="22"
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.73127 21.0569C7.73127 21.0569 0.166687 14.6861 0.166687 8.41732C0.166687 6.20718 1.04466 4.08756 2.60746 2.52476C4.17027 0.961958 6.28988 0.0839844 8.50002 0.0839844C10.7102 0.0839844 12.8298 0.961958 14.3926 2.52476C15.9554 4.08756 16.8334 6.20718 16.8334 8.41732C16.8334 14.6861 9.26877 21.0569 9.26877 21.0569C8.84794 21.4444 8.15523 21.4402 7.73127 21.0569ZM8.50002 12.0632C8.9788 12.0632 9.45289 11.9688 9.89522 11.7856C10.3376 11.6024 10.7395 11.3339 11.078 10.9953C11.4166 10.6568 11.6851 10.2548 11.8683 9.81252C12.0516 9.37018 12.1459 8.8961 12.1459 8.41732C12.1459 7.93854 12.0516 7.46445 11.8683 7.02212C11.6851 6.57978 11.4166 6.17787 11.078 5.83932C10.7395 5.50078 10.3376 5.23223 9.89522 5.04901C9.45289 4.86579 8.9788 4.77148 8.50002 4.77148C7.53308 4.77148 6.60575 5.1556 5.92203 5.83932C5.2383 6.52305 4.85419 7.45038 4.85419 8.41732C4.85419 9.38425 5.2383 10.3116 5.92203 10.9953C6.60575 11.679 7.53308 12.0632 8.50002 12.0632Z"
              fill="#B3B3B3"
            />
          </svg>

          <span className="text-zinc-900 text-sm">
            {t("location")}: {campaign.location}
          </span>
        </div>
      </div>

      <div
        className={`mb-4 px-4 mx-4 inline-flex items-center gap-2 py-3 rounded-full ${campaign.statusColor} w-[160px]`}
      >
        <img src={campaign.statusImage} />
        <span className="text-white text-sm font-medium">
          {campaign.status}
        </span>
      </div>
    </div>
  );
};
  return (
    <div className="w-7xl px-5 flex flex-col gap-[12px]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-zinc-900">
          {t("recentCampaigns")}
        </h2>
        <button className="text-primary-500 text-lg font-medium">
          {t("viewAll")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default RecentCampaigns;

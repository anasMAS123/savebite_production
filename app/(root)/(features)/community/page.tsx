import Explore from "@/components/community/Explore";
import RecentCampaogns from "@/components/community/RecentCampaogns";
import React from "react";
import { useTranslations } from "next-intl";
function Page() {
  const t = useTranslations("community");
  return (
    <div>
      <div className="w-full p-[20px]">
        <p className="h3medium">{t("community")}</p>
      </div>
      <RecentCampaogns />
      <Explore />
    </div>
  );
}

export default Page;

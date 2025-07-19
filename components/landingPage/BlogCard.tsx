import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
interface Props {
  item: {
    title: string;
    description: string;
    image: string;
  };
}
const BlogCard = ({ item }: Props) => {
  const locale = useLocale();
  const t = useTranslations("LandingPage");
  return (
    <div className="w-full h-full flex-col gap-4 shadow-xl border-[#ffffff] rounded-lg border-4 border-t-primary-500   ">
      <div className="h-[40%] w-full relative">
        <Image
          src={`/landing/${item.image}.jpg`}
          alt={item.image}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 h4bold" dir={locale === "en" ? "ltr" : "rtl"}>
        {t(item.title)}
      </div>
      <div className="p-4" dir={locale === "en" ? "ltr" : "rtl"}>
        {t(item.description)}
      </div>
    </div>
  );
};

export default BlogCard;

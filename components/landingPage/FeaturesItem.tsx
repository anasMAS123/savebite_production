import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
interface Props {
  item: {
    name: string;
    description: string;
    image: string;
  };
}
const FeaturesItem = ({ item }: Props) => {
  const t = useTranslations("LandingPage");
  return (
    <div className="flex flex-col  items-center justify-center flex-1 min-w-[200px]">
      <Image
        src={`/landing/${item.image}.svg`}
        alt={item.image}
        width={60}
        height={60}
        className="mb-6"
      />
      <h3 className="h5medium text-center">{t(item.name)}</h3>
      <span className="max-w-[200px] text-center">{t(item.description)}</span>
    </div>
  );
};

export default FeaturesItem;

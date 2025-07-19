import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  title: string;
  data: string | number;
  icon: string;
}

function Card({ title, data, icon }: Props) {
  const t = useTranslations("Dashboard");
  return (
    <div className="flex-1 h-[120px] relative p-[10px] bg-white shadow-sm rounded-md">
      <div className="flex flex-col gap-2">
        <span className="body xl:title1">{t(title)}</span>
        <span className="bodybold xl:title1bold mb-0">{data}</span>
      </div>
      <Image
        src={icon}
        alt="icon"
        width={50}
        height={50}
        className="absolute bottom-[10px] ltr:right-[20px] rtl:left-[20px] hidden md:block"
      />
    </div>
  );
}

export default Card;

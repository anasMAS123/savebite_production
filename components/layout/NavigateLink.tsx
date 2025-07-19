"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  name: string;
}
const NavigateLink = ({ name }: Props) => {
  //usePathname to get the pathname in the client side
  const active = usePathname().split("/")[1];
  const t = useTranslations("Layout");
  return (
    <Link href={`/${name}`}>
      <div
        className={`py-[20px] px-[6px] transition-all duration-300 hover:bg-primary-500/40 text-black-400 hover:text-primary-500 ${
          active === name
            ? "bg-primary-200/40 text-primary-500 border-l-2 border-solid border-left-[3px] border-primary-500"
            : ""
        }`}
      >
        <div className="flex gap-4">
          <Image
            src={
              active === name
                ? `/layout/${name}-green.svg`
                : `/layout/${name}.svg`
            }
            alt={`${name}.svg`}
            width={27}
            height={27}
          />
          <span className="hidden md:block">{t(name)}</span>
        </div>
      </div>
    </Link>
  );
};

export default NavigateLink;

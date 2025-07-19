"use client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { languageSwitch } from "@/actions/language-switch";
import { useTranslations } from "next-intl";

function LanguageSwitcher() {
  const t = useTranslations("Layout");
  return (
    <div className="z-[30] fixed bottom-[40px] ltr:left-[10px] rtl:right-[10px] cursor-pointer">
      <Select onValueChange={languageSwitch}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={t(`lang`)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ar">
            <div className="flex gap-2">
              <Image
                src="/ar.svg"
                alt="ar"
                width={5}
                height={5}
                className="w-fit"
              />
              <span>ar</span>
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex gap-2">
              <Image
                src="/en.svg"
                alt="en"
                width={5}
                height={5}
                className="w-fit"
              />
              <span>en</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSwitcher;

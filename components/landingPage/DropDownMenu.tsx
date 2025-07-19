import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
const DropDownMenu = () => {
  const t = useTranslations("LandingPage");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="block tablet:hidden outline-none ">
        <List />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("Account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-primary-50 hover:bg-primary-300 hover:text-white transition-all">
          <Link href="/login/with-img">
            <span>{t("Login")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="bg-primary-50 hover:bg-primary-300 hover:text-white transition-all">
          <Link href="/signup/signup">
            <span>{t("Sign up")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("Sections")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-primary-300 hover:text-white transition-all">
          {" "}
          <Link href="#home" scroll={true}>
            <span>{t("Home")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-primary-300 hover:text-white transition-all">
          <Link href="#about-us" scroll={true}>
            <span>{t("About us")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-primary-300 hover:text-white transition-all">
          <Link href="#features" scroll={true}>
            <span>{t("Features")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-primary-300 hover:text-white transition-all">
          <Link href="#blog" scroll={true}>
            <span>{t("Blog")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-primary-300 hover:text-white transition-all">
          <Link href="#contact-us" scroll={true}>
            <span>{t("Contact us")}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;

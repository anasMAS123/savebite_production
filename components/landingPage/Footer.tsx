import { Item } from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
const siteSections = {
  Home: ["How It Works", "Testimonials", "Contact Us"],
  "About us": ["Our Mission", "SDG 12 Goal", "Meet the Team"],
  Features: [
    "Expiration Alerts",
    "Inventory Tracking",
    "Recipe Chatbot",
    "Donation Management",
    "Analytics Dashboard",
  ],
  Blog: [
    "Supermarkets vs Food Waste",
    "Why Food Donations Matter",
    "How AI Can Reduce Waste",
    "Supermarkets vs Food Waste: Who Holds the Power",
    "Why Food Donations Should Be Part of Every Retail Strategy",
    "How AI is Helping Stores Make Smarter Inventory Decisions",
    "5 Ways to Reuse Food Before It Goes to Waste",
    "Understanding Expiration Dates: Sell-By, Use-By & Best-By",
    "How to Start a Donation Partnership with Local Charities",
    "The Psychology Behind Food Waste in Retail",
    "Reducing Loss, Increasing Impact: How Tech Saves Food",
    "What the SDGs Say About Sustainable Food Systems",
  ],
};
const entries = Object.entries(siteSections);
const Footer = () => {
  const t = useTranslations("LandingPage");
  return (
    <footer
      className="px-12 md:px-24 py-28 bg-[#f2f2f2] flex flex-col gap-10"
      id="contact-us"
    >
      <div className="flex max-md:flex-col max-md:items-center sm:flex-row flex-wrap pb-20 border-b border-solid border-[#ccc]">
        <section className="flex-1 max-md:items-center max-md:pb-4 min-w-[260px]  w-full flex flex-col  gap-4 pb-4">
          <Image
            src="/landing/savebite.png"
            alt="savebite"
            width={200}
            height={50}
          />
          <div className="flex gap-8">
            <Image
              src="/landing/facebook.png"
              alt="facebook"
              width={20}
              height={20}
            />
            <Image
              src="/landing/linkedin.png"
              alt="linkedin"
              width={20}
              height={20}
            />
            <Image
              src="/landing/instagram.png"
              alt="instagram"
              width={20}
              height={20}
            />
            <Image src="/landing/x.png" alt="x" width={20} height={20} />
          </div>
        </section>

        {entries.map((list, index) => (
          <section key={index} className="flex-1 min-w-[260px] ">
            <h2 className="pb-5 title2bold text-center">{t(list[0])}</h2>
            <ul className="pb-3">
              {list[1].map((item, index) => (
                <li key={index} className="text-center">
                  {t(item)}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="flex justify-between items-start">
        <section>
          <span>{t("CopyrightNotice")}</span>
        </section>
        <section className="flex gap-4 flex-wrap">
          <span>{t("Terms of Services")}</span>
          <span>{t("Privacy Policy")}</span>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

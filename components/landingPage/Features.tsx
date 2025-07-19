import React from "react";
import FeaturesItem from "./FeaturesItem";
import { useTranslations } from "next-intl";
const features = [
  {
    name: "Inventory Tracking",
    description:
      "Get a clear overview of all products in stock and their shelf life",
    image: "inventory_tracking",
  },
  {
    name: "Expiration Alerts",
    description:
      "Receive instant alerts for items nearing their expiration dates to take early action",
    image: "expiration_alerts",
  },
  {
    name: "Recipe Chatbot",
    description:
      "Discover creative recipe ideas for items nearing expiration — instantly suggested by our smart chatbot",
    image: "recipe_chatbot",
  },
  {
    name: "Analytics & Reports",
    description:
      "Access insights on waste trends and make better restocking decisions",
    image: "analytics_and_reports",
  },
  {
    name: "Donation Managment",
    description:
      "Donate surplus food directly to local charities with just a few taps",
    image: "donation_managment",
  },
];
const Features = () => {
  const t = useTranslations("LandingPage");
  return (
    <section className="px-24 py-20 flex-col gap-20" id="features">
      <h2 className="h2bold">{t("Features")}</h2>
      <div className="flex flex-wrap items-start gap-4 pt-10">
        {features.map((item, index) => (
          <FeaturesItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Features;

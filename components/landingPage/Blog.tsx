import React from "react";
import BlogCarousel from "./BlogCarousel";
import { useTranslations } from "next-intl";

const Blog = () => {
  const t = useTranslations("LandingPage");
  return (
    <div className=" py-20 flex flex-col gap-10 bg-slate-50" id="blog">
      <h2 className="h2bold px-24">{t("From The Blog")}</h2>
      <BlogCarousel />
    </div>
  );
};

export default Blog;

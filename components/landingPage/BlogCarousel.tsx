"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";
import AutoScroll from "embla-carousel-auto-scroll";
const blogList = [
  {
    title:
      "How Supermarkets Can Become the Frontline Warriors Against Food Waste",
    description:
      "Food waste isn’t just a household problem — supermarkets play a massive role in what gets thrown away This article explores how smarter inventory practices, proactive expiration tracking, and local donation partnerships can empower supermarkets to lead the fight against food waste Learn how technology like SaveBite transforms daily operations into sustainable solutions",
    image: "blog1",
  },
  {
    title: "From Shelves to Shelters: Why Food Donations Matter More Than Ever",
    description:
      "Every day, tons of edible food are discarded while communities nearby go hungry This post highlights the impact of food donations, breaks down the logistics, and shows how platforms like SaveBite are making it easier than ever for supermarkets to connect with verified charities Learn how donating surplus isn't just good — it's necessary",
    image: "blog2",
  },
  {
    title:
      "Smarter Stock, Less Waste: How AI and Chatbots Are Changing Food Retail",
    description:
      "Artificial intelligence is no longer just a buzzword — it’s changing how food businesses operate In this article, we explore how SaveBite’s AI-powered chatbot helps reuse items nearing expiration by suggesting quick recipes, and how analytics can forecast demand to reduce overstocking Smart technology, real savings, and a better planet",
    image: "blog3",
  },
  {
    title:
      "How Supermarkets Can Become the Frontline Warriors Against Food Waste",
    description:
      "Food waste isn’t just a household problem — supermarkets play a massive role in what gets thrown away This article explores how smarter inventory practices, proactive expiration tracking, and local donation partnerships can empower supermarkets to lead the fight against food waste Learn how technology like SaveBite transforms daily operations into sustainable solutions",
    image: "blog1",
  },
  {
    title: "From Shelves to Shelters: Why Food Donations Matter More Than Ever",
    description:
      "Every day, tons of edible food are discarded while communities nearby go hungry This post highlights the impact of food donations, breaks down the logistics, and shows how platforms like SaveBite are making it easier than ever for supermarkets to connect with verified charities Learn how donating surplus isn't just good — it's necessary",
    image: "blog2",
  },
  {
    title:
      "Smarter Stock, Less Waste: How AI and Chatbots Are Changing Food Retail",
    description:
      "Artificial intelligence is no longer just a buzzword — it’s changing how food businesses operate In this article, we explore how SaveBite’s AI-powered chatbot helps reuse items nearing expiration by suggesting quick recipes, and how analytics can forecast demand to reduce overstocking Smart technology, real savings, and a better planet",
    image: "blog3",
  },
];
const BlogCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[AutoScroll({ stopOnInteraction: false })]}
    >
      <CarouselContent className="py-5" dir="ltr">
        {blogList.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-full md:basis-1/2 lg:basis-1/3 flex justify-center pl-5   border-solid h-[800px]"
          >
            {<BlogCard item={item} />}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BlogCarousel;

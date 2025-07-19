"use client";
import React, { useEffect, useState } from "react";
import { MessagesType } from "./ChatBot";
import { Heart } from "lucide-react";
import { toggleFavourite } from "@/actions/chatbotQueries";
import ChatMessage from "./ChatMessage";
import { getLocale } from "next-intl/server";
import { useLocale } from "next-intl";

const Message = ({ msg }: { msg: MessagesType }) => {
  const { id, message, created_at, favourite, me } = msg;
  const locale = useLocale();
  const handleOnToggle = async () => {
    const res = await toggleFavourite(id);
  };
  let readable: string = "";
  if (!me) {
    try {
      const parsed = JSON.parse(message);

      readable = parsed;
    } catch {
      readable = message;
    }
  }
  return (
    <li
      className={`flex items-start  ${
        me ? "flex-row-reverse" : "justify-start"
      } gap-3`}
    >
      <img
        src={me ? "/user.svg" : "/chatbite/chief.png"}
        alt="chatImage"
        className="rounded-full w-[50px] h-[50px]"
      />
      <div
        className={`p-6 rounded-[12px] ${
          me ? "bg-white" : "bg-primary-50"
        } flex items-start gap-3 shadow-md `}
      >
        <div className="max-w-[600px] break-words whitespace-pre-wrap relative rounded-[12px] p-3">
          {typeof readable !== "string" ? (
            <ChatMessage msg={readable} />
          ) : (
            message
          )}
          {!me && (
            <Heart
              width={20}
              height={20}
              className={`${
                favourite && "text-red-500 fill-red-500  "
              } cursor-pointer  absolute top-8 ${
                locale === "ar" ? "left-8" : "right-8"
              } `}
              onClick={handleOnToggle}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default Message;

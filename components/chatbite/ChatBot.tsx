"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import { getModelResponse, storeMessage } from "@/actions/chatbotQueries";
import Message from "./Message";
import FavouriteCard from "./FavouriteCard";
import { useTranslations } from "next-intl";
import ChatbiteModal from "./ChatbiteModal";
import ChatWaiting from "./chatWaiting";
export type QuestionType = { msg: string; image: string };
export type MessagesType = {
  created_at: string;
  favourite: boolean;
  id: number;
  me: boolean;
  message: string;
};
export type ItemNearExpire = { name: string };
const questions: QuestionType[] = [
  {
    msg: "What can I cook with rice, chicken, and carrots?",
    image: "book.png",
  },
  {
    msg: "Suggest a quick dinner recipe under 20 minutes.",
    image: "clock.png",
  },
  {
    msg: "How can I store leftover pasta to keep it fresh?",
    image: "guard.png",
  },
];
const ChatBot = ({
  messages,
  favourites,
  itemsNearExpire,
  locale,
}: {
  messages: MessagesType[];
  favourites: MessagesType[];
  itemsNearExpire: ItemNearExpire[];
  locale: string;
}) => {
  const [chatMessage, setChatMessage] = useState<string>("");
  const [lowStockProductsModal, setLowStockProductsModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const t = useTranslations("Chatbite");

  const scrollToBottom = () => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollToBottom();
    setIsLoading(true);
    const { created_at, favourite, id, me, message } = await storeMessage(
      chatMessage,
      "0"
    );
    setChatMessage("");

    const messageObject = await getModelResponse(message);
    setIsLoading(false);
    if (messageObject?.result === "ERROR") {
      // Handle error response from AI model
      const errorMessage = messageObject.msg || t("errorMessage");
      await storeMessage(errorMessage, "1");
      return;
    }
    if (messageObject?.title) {
      const {
        created_at: secCreatedAt,
        favourite: secFavlurite,
        id: secId,
        me: secMe,
        message: secMessage,
      } = await storeMessage(JSON.stringify(messageObject), "1");
    }
  };
  const handleLowStockProductModal = async (e) => {
    e.preventDefault();
    setLowStockProductsModal(true);
  };
  return (
    <>
      <div className="mx-auto">
        <span className="h3medium">{t("chatbite")}</span>
      </div>
      <div className="w-full h-[calc(100vh-160px)] border-4 border-solid border-black-100 rounded-2xl flex   gap-2  p-[20px]">
        <div
          className={`${
            favourites.length
              ? "w-[80%] ltr:border-r-[2px] rtl:border-l-[2px] border-solid border-black-100  "
              : "w-full"
          }  px-12  flex  flex-col gap-4 jus`}
        >
          <div className="h-[80%]">
            {messages.length > 0 ? (
              <div className="h-[100%]">
                <ul
                  className="max-h-full overflow-y-scroll scrollbar-hide space-y-2"
                  ref={ulRef}
                >
                  {messages.map((msg, i) => (
                    <Message msg={msg} key={i} />
                  ))}
                  {isLoading && <ChatWaiting />}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center py-[20px] basis-[800px]">
                <Image
                  src="/chatbite/chief.png"
                  alt="chief.png"
                  width={60}
                  height={60}
                />
                <h3 className="h5bold">Hi, there👋</h3>
                <span className="h5 text-black-300">
                  Here to help you with ideas, advice and more! What would you
                  like to cook today?
                </span>
                <div className="flex flex-col lg:flex-row gap-3">
                  {questions.map((item, i) => (
                    <QuestionCard
                      key={i}
                      item={item}
                      changeMessage={setChatMessage}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ////// */}
          <div className="mt-auto mb-[40px] mx-auto w-[90%] h-[80px] flex flex-col items-center gap-4 ">
            <form
              className="w-full h-full bg-white flex justify-between border border-solid border-[#e4e4e4] py-[20px] rounded-lg"
              onSubmit={handleOnSubmit}
            >
              <input
                className="h-full w-[90%] outline-none px-3 py-2 "
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <span
                onClick={handleLowStockProductModal}
                className="cursor-pointer"
              >
                <Image
                  src="/chatbite/list.png"
                  alt="chatbite_list"
                  width={30}
                  height={30}
                />
              </span>
              <button className="pl-1 pr-3" disabled={!chatMessage}>
                {chatMessage ? (
                  <Image
                    src="/chatbite/activeButton.png"
                    alt="/chatbite/activeButton.png"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    src="/chatbite/disabledButton.png"
                    alt="/chatbite/disabledButton.png"
                    width={30}
                    height={30}
                  />
                )}
              </button>
            </form>
            <span>
              Not sure What to cook ?{" "}
              <span className="font-bold">let chatbite help</span>
            </span>
          </div>
        </div>

        {/* /////////////////////////////// */}
        {favourites.length ? (
          <div className="flex-1 overflow-y-scroll scrollbar-hide">
            <h2 className="title2medium py-4 px-3 border-b-2 border-solid border-black-100">
              {t("favourite")}
            </h2>

            <div className="mt-4 flex flex-col gap-2">
              {favourites.map((item, i) => (
                <FavouriteCard item={item} key={i} />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ChatbiteModal
        trigger={lowStockProductsModal}
        setTrigger={setLowStockProductsModal}
        itemsNearExpire={itemsNearExpire}
      />
    </>
  );
};

export default ChatBot;

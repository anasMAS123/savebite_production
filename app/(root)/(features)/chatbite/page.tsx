import {
  getfavourites,
  getLowStockItems,
  storedMessages,
} from "@/actions/chatbotQueries";
import ChatBot from "@/components/chatbite/ChatBot";
import { getLocale } from "next-intl/server";
import React from "react";

const Page = async () => {
  const storedMessagesRes = await storedMessages();
  const favouriteMessagesRes = await getfavourites();
  const lowStockItems = await getLowStockItems();
  const locale = await getLocale();
  const lowStockItemsNames = lowStockItems?.map((item) => ({
    name: item.name,
  }));

  return (
    <div className=" mx-auto py-[20px] w-[90%]">
      <ChatBot
        locale={locale ?? "en"}
        favourites={favouriteMessagesRes.data ?? []}
        messages={storedMessagesRes.data ?? []}
        itemsNearExpire={lowStockItems}
      />
    </div>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import { MessagesType } from "./ChatBot";
import RecipeMessage from "./RecipeMessage";
export type RecipeType = {
  title: string;
  prep_time: string;
  ingredients: string[];
  instructions: string[];
};
const FavouriteCard = ({ item }: { item: MessagesType }) => {
  const [modal, setModal] = useState<boolean>(false);
  const { created_at, favourite, id, me, message } = item ?? {};
  let readable: string | RecipeType = "";
  try {
    const parsed = JSON.parse(message);
    readable = parsed as RecipeType;
  } catch {
    readable = message as string;
  }
  return (
    <>
      <div
        className="max-w-[300px] h-[70px] bg-white border-[2px] border-solid border-black-100 rounded-xl p-2 cursor-pointer"
        onClick={() => setModal(true)}
      >
        <h2 className="truncate break-words">
          {typeof readable === "string" ? message : readable?.title}
        </h2>
      </div>
      {modal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black-300/30 flex justify-center items-center "
          onClick={() => setModal(false)}
        >
          <div className="bg-white p-4 rounded-xl overflow-y-scroll scrollbar-hide max-h-[80%] max-w-[80%] shadow-xl">
            {typeof readable === "string" ? (
              <pre className=" break-words whitespace-pre-wrap text-4xl">
                {message}
              </pre>
            ) : (
              <RecipeMessage data={readable} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteCard;

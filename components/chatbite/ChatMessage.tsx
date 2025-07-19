import { Cairo } from "next/font/google";
import React from "react";
interface Recipe {
  title: string;
  prep_time: string;
  ingredients: string[];
  instructions: string[];
}
export const cairo = Cairo({
  subsets: ["latin"], // Add subsets as needed
  weight: ["400", "600", "700"], // Specify weights
  style: ["normal"], // Specify styles
});

const ChatMessage = ({ msg }: { msg: Recipe }) => {
  const { title, prep_time, ingredients, instructions } = msg;
  return (
    <div
      className={`rounded-[12px] shadow-lg text-black-500 text-md font-medium bg-white rounded0lg px-2 py-3 *:py-2 flex flex-col gap-2 [&>*:not(:first-child):not(:last-child)]:border-b-2 [&>*:not(:first-child):not(:last-child)]:border-solid [&>*:not(:first-child):not(:last-child)]:border-gray-300 ${cairo.className} `}
    >
      <span className="text-md font-bold flex gap-2">
        <span className="text-xl">🍽️</span>
        {title}
      </span>
      <span>🕓 Ready in: {prep_time}</span>
      <div className="flex flex-col gap-3">
        <span>🧂 Ingredients: </span>
        <ul>
          {ingredients.map((item, i) => (
            <li key={i}>{`${i + 1}. ${item}`}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <span>🍳 instructions: </span>
        <ul>
          {instructions.map((item, i) => (
            <li key={i}>{`${i + 1}. ${item}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatMessage;

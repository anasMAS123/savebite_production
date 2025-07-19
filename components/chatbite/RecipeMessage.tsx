import React from "react";
import { RecipeType } from "./FavouriteCard";

const RecipeMessage = ({ data }: { data: RecipeType }) => {
  const { title, prep_time, ingredients, instructions } = data;
  return (
    <div className="px-4 py-6 flex flex-col gap-3 items-start">
      <div className="flex gap-2 flex-row items-center justify-between w-full">
        <h2 className="text-4xl p-4 border-4 border-solid  border-primary-200 rounded-2xl">
          🍔Recipe : {title}🍕
        </h2>
        <h2 className="text-3xl p-4 border-4 border-solid  border-error-50 rounded-2xl">
          ⌛⏳ Preparation time : {prep_time}
        </h2>
      </div>
      <ul className="flex flex-col gap-2 border-4 border-dotted border-primary-500 rounded-2xl text-2xl p-6 w-full">
        <h3 className="text-3xl my-2">🛒 Ingredients</h3>
        {ingredients.map((item, i) => (
          <li key={i} className=" text-xl">
            {`${i + 1}- ${item}`}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 border-4 border-dotted border-primary-500 rounded-2xl text-2xl p-6 w-full">
        <h3 className="text-3xl my-2">📚 Instructions</h3>
        {instructions.map((item, i) => (
          <li key={i} className=" text-xl">
            {`${i + 1}- ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeMessage;

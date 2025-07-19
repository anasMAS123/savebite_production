"use client";
import React, { useState } from "react";
import { ItemNearExpire } from "./ChatBot";
import { Send } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  getModelResponse,
  handleLowStockItems,
  storeMessage,
} from "@/actions/chatbotQueries";
import { toast } from "sonner";
interface Props {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  itemsNearExpire: ItemNearExpire[];
}
const ChatbiteModal = ({ trigger, setTrigger, itemsNearExpire }: Props) => {
  const [recipeItems, setRecipeItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("overlay")) {
      setTrigger(false);
    }
  };
  const handleChangeItemSelect = (status: boolean, name: string) => {
    if (status) setRecipeItems((prev) => [...prev, name]);
    else setRecipeItems((prev) => prev.filter((item) => item !== name));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const message = `create a recipe using ${recipeItems.join(",")}`;
    setLoading(true);

    const messageObject = await getModelResponse(message);

    if (messageObject?.title) {
      console.log(messageObject);
      toast.success("we completed your recipe");
      const {
        created_at: secCreatedAt,
        favourite: secFavlurite,
        id: secId,
        me: secMe,
        message: secMessage,
      } = await storeMessage(JSON.stringify(messageObject), "1");
    }
    setLoading(false);
    setTrigger(false);

    setRecipeItems([]);
  };
  if (trigger) {
    return (
      <div
        className="overlay w-full h-full fixed top-0 left-0 bg-[#000000]/25 flex justify-center items-center"
        onClick={handleCloseModal}
      >
        <div className="bg-white w-1/2 h-[60%] p-6 rounded-lg">
          <form
            onSubmit={handleOnSubmit}
            className="h-full flex flex-col justify-between"
          >
            <div>
              <p className="h5bold pb-3">Choose Ingredients</p>
              <h3 className="title2 text-black-300 pb-4">
                These ingredients are aboute to expire
              </h3>
              <div className="flex flex-col gap-3 overflow-auto scrollbar-hide">
                {itemsNearExpire?.map((item, index) => (
                  <label key={index} className="flex gap-2">
                    <Checkbox
                      name={item.name}
                      className="size-6 border-gray-300 checked:border-transparent"
                      onCheckedChange={(status) =>
                        handleChangeItemSelect(status, item.name)
                      }
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
                {itemsNearExpire?.length === 0 && (
                  <p className="text-gray-500">No items near expiry</p>
                )}
              </div>
            </div>
            <button
              disabled={loading || recipeItems.length === 0}
              className={`w-full flex justify-center ${
                loading || recipeItems.length === 0
                  ? "bg-gray-400"
                  : "bg-primary-500"
              } py-6 text-white text-bold rounded-lg`}
            >
              {loading ? (
                <span>working on it ....</span>
              ) : (
                <>
                  <span>Make a recipe</span>
                  <Send />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ChatbiteModal;

import React from "react";
import { QuestionType } from "./ChatBot";
import Image from "next/image";
interface Props {
  item: QuestionType;
  changeMessage: React.Dispatch<React.SetStateAction<string>>;
}

const QuestionCard = ({ item, changeMessage }: Props) => {
  const { msg, image } = item;
  const handleOnClick = () => {
    changeMessage(msg);
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex-1  border border-solid border-[#e2e2e2] rounded-lg shadow-md flex flex-col gap-4 p-4 hover:scale-105 transition-all cursor-pointer"
    >
      <Image
        src={`/chatbite/${image}`}
        alt={`${image}`}
        width={40}
        height={40}
      />
      <span className="text-black-400">{msg}</span>
    </div>
  );
};

export default QuestionCard;

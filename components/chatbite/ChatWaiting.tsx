import React from "react";

const ChatWaiting = () => {
  return (
    <li
      className='flex items-start  
         "justify-start"
       gap-3'
    >
      <img
        src="/chatbite/chief.png"
        alt="chatImage"
        className="rounded-full w-[50px] h-[50px]"
      />
      <div className="p-6 rounded-[12px]  bg-white text-black flex items-start gap-3 shadow-md ">
        <div className="max-w-[600px]  break-words whitespace-pre-wrap relative rounded-[12px]">
          working on it...
        </div>
      </div>
    </li>
  );
};

export default ChatWaiting;

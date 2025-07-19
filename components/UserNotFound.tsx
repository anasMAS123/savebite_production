"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface props {
  flag: string;
}
const UserNotFound = ({ flag }: props) => {
  console.log(flag);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (flag?.includes("Invalid Credentials")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [flag]);

  // Optional: Hide the message after dismissing
  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="w-fit">
          <div className="animate-bounce border-solid border-l-[8px] border-l-error-50 shadow-md px-[8px] py-[10px]">
            <div className="flex justify-between  w-[300px]">
              <div className="flex gap-2 w-fit  ">
                <p className="p-[5px] rounded-full bg-error-50 w-fit h-fit">
                  <Image
                    src="/notFound.svg"
                    alt="not found"
                    width={12}
                    height={12}
                  />
                </p>
                <span>the user cannot be found</span>
              </div>
              <button onClick={handleDismiss}>
                <Image src="/x.svg" alt="not found" width={12} height={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNotFound;

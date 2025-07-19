"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  id: string;
  error?: string;
}

const Password = ({ id, error = "" }: Props) => {
  const [visibility, setVisibility] = useState("text");
  if (error) console.log(error);
  return (
    <>
      <div className="relative">
        <input
          type={visibility}
          className={`px-[12px] py-[26px] border-[1px] ${
            error ? "border-error-500" : "border-black-200"
          } rounded-sm min-w-[200px] w-[100%] outline-none caret-primary-500`}
          name={id}
          id={id}
        />

        <button
          className="absolute ltr:right-[2%] rtl:left-[2%] top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.preventDefault();
            if (visibility === "text") setVisibility("password");
            if (visibility === "password") setVisibility("text");
          }}
        >
          <Image
            src={`${
              visibility === "text" ? "/togglePassword.svg" : "/eye.svg"
            }`}
            alt="togglePassword"
            width={35}
            height={35}
          />
        </button>
      </div>
      {error && (
        <span className="text-error-400 font-[400] title2">{error}</span>
      )}
    </>
  );
};

export default Password;

"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const UploadInput = ({
  id,
  name,
  error = "",
}: {
  id: string;
  name: string;
  error?: string;
}) => {
  const [fileInfo, setFileInfo] = useState("");
  const fileRef = useRef<HTMLInputElement>(null)!;

  function handleOnChange() {
    const file = fileRef?.current?.files?.[0]?.name;
    if (file) setFileInfo(file);
  }
  return (
    <>
      <label htmlFor={id} className="relative cursor-pointer">
        <div
          className={`p-4 border-[1px] text-black-200 rounded-sm  min-w-[200px]   w-[100%] flex justify-between border-black-200 ${
            error && "border-error-500"
          }`}
        >
          <div>
            <button className="p-2 bg-black-100 px-[13px] py-[12px] pointer-events-none outline-none border-black-600 border-[1px] text-black-600  ">
              Choose file
            </button>
            <span className="pl-2">
              {fileInfo ? (
                <span className="text-black-800">{fileInfo}</span>
              ) : (
                <span className="text-black-200">no file choosen</span>
              )}
            </span>
          </div>
          <Image src="/upload.svg" alt="upload" width={32} height={32} />
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          name={name}
          id={id}
          className="outline-none hidden w-full"
          onChange={handleOnChange}
        />
      </label>
      {error && (
        <span className="text-error-400 font-[400] title2">{error}</span>
      )}
    </>
  );
};

export default UploadInput;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { uploadProducts } from "@/actions/actions";

const Header = () => {
  const t = useTranslations("Dashboard");
  const ref = useRef<HTMLInputElement | null>(null);
  const [insertedFile, setInsertedFile] = useState<string>("");

  const handleOnChange = () => {
    if (ref.current?.files && ref.current.files[0].name) {
      setInsertedFile(ref.current.files[0].name ?? "");
    }
  };
  const handleOnDelete = (e) => {
    e.preventDefault();
    setInsertedFile("");
  };

  return (
    <div className="flex justify-between max-w-[90%] m-auto py-[20px]">
      <p className="h3medium">{t("products")}</p>
      <form action={uploadProducts}>
        <input
          type="file"
          id="csv_file"
          name="csv_file"
          className="hidden"
          accept=".csv"
          ref={ref}
          onChange={handleOnChange}
        />
        <div className="flex gap-2 items-center">
          {insertedFile ? (
            <span>{insertedFile}</span>
          ) : (
            <label htmlFor="csv_file">
              <div className="rounded-lg bg-primary-500 text-white flex gap-2 items-center justify-center cursor-pointer p-[12px]">
                <Image
                  src="/dashboard/download.svg"
                  alt="download.svg"
                  width={20}
                  height={20}
                />
                {t("import")}
              </div>
            </label>
          )}
          {insertedFile && (
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-primary-500 text-white flex gap-2 items-center justify-center cursor-pointer p-[12px]"
              >
                {t("submit")}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-500 text-white flex gap-2 items-center justify-center cursor-pointer p-[12px]"
                onClick={handleOnDelete}
              >
                X
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Header;

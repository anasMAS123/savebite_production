import Image from "next/image";
import React from "react";
import NavMenu from "./NavMenu";
import AuthNav from "./AuthNav";

const Header = () => {
  return (
    <header className="px-16 sm:px-24 py-5 border-b border-solid border shadow-md flex items-center justify-between flex-wrap">
      <div className="flex gap-8 items-center ">
        <Image src="/landing/savebite.png" alt="none" width={159} height={52} />
        <NavMenu />
      </div>
      <AuthNav />
    </header>
  );
};

export default Header;

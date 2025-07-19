import React from "react";
import NavigateLink from "./NavigateLink";
import Logout from "./Logout";

const LayoutNavigationList = () => {
  return (
    <div className="max-w-[200px] min-w-[40px] md:w-[200px] min-h-full bg-[#FFFFFF] border border-r-[1px] border-extra-gray-border border-t-0">
      <ul>
        <NavigateLink name="dashboard" />
        <NavigateLink name="stock" />
        <NavigateLink name="analytics" />
        <NavigateLink name="tracking" />
        <NavigateLink name="chatbite" />
        <NavigateLink name="community" />
        <div className="w-[80%] h-[1px] bg-extra-gray-border mx-auto"></div>
        <NavigateLink name="account" />
        <NavigateLink name="support" />
        <Logout />
      </ul>
    </div>
  );
};

export default LayoutNavigationList;

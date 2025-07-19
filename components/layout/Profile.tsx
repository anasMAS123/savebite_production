import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  email: string;
}
const Profile = ({ name, email }: Props) => {
  return (
    <div className="max-w-full h-[80%] border-solid flex rtl:flex-row-reverse  items-center  ">
      <div className="pr-[20px]">
        <Image
          src="/layout/bell.svg"
          alt="bell.svg"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div className="border-l-[1px] border-[4px]- border-[#e4e4e4] pl-[20px] flex items-center gap-4">
        {/* image */}
        <div className="w-[30px] h-[30px] rounded-full relative">
          <Image
            src="/user.svg"
            alt="profile"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className=" flex-col max-md:hidden flex">
          <span className="title2medium">{name}</span>
          <span className="body text-gray-500">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;

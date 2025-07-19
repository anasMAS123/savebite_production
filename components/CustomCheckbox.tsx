// "use client";
// import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import LoginInpLabel from "./LoginInplabel";
import { useTranslations } from "next-intl";

const CustomCheckbox = ({ id }: { id: string }) => {
  const t = useTranslations("Login-with-img");

  //   const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        className="w-[20px] h-[20px] outline-none border-black-300"
        id={id}
        name={id}
        // checked={checked}
        // onCheckedChange={(checked) => setChecked(checked as boolean)}
      />
      <LoginInpLabel htmlFor={id} required={false} inline={true} color="black">
        {t(id)}
      </LoginInpLabel>
    </div>
  );
};

export default CustomCheckbox;

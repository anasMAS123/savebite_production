import React from "react";

const LoginInpLabel = ({
  children,
  required,
  htmlFor,
  inline,
  color,
}: {
  children: string;
  required: boolean;
  htmlFor: string;
  inline?: boolean;
  color?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        color ? `text-${color}` : "text-black-400"
      } title2 font-[400] py-1 ${inline ? "inline-block" : "block"}`}
    >
      {children}
      {required ? <span className="text-error-600">*</span> : ""}
    </label>
  );
};

export default LoginInpLabel;

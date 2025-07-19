"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
interface Props {
  type?: string;
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}
const ReuseableButton = ({
  type = "primary",
  onclick,
  children,
  isLoading,
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={isLoading}
      onClick={onclick ? onclick : () => console.log("only fire form")}
      className={`h-[72px] mt-[16px] w-[100%] text-[19px] font-[500] ${
        type === "primary" &&
        "bg-primary-500 border-none text-white hover:bg-white hover:text-primary-400"
      }
      ${
        type === "secondary" &&
        "bg-white border-[1px] border-primary-500 text-primary-500 hover:bg-primary-400 hover:text-white"
      }

      `}
    >
      {pending || isLoading ? (
        <div className="spinner animate-spin"></div>
      ) : (
        children
      )}
    </Button>
  );
};

export default ReuseableButton;

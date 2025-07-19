"use client";
interface Props {
  id: string;
  error?: string;
}

const Input = ({ id, error = "" }: Props) => {
  return (
    <>
      <input
        type="text"
        className={`px-[12px] py-[26px] border-[1px] ${
          error ? "border-error-500" : "border-black-200"
        } rounded-sm min-w-[200px] w-[100%] outline-none caret-primary-500`}
        name={id}
        id={id}
      />
      {error && (
        <span className="text-error-400 font-[400] title2">{error}</span>
      )}
    </>
  );
};

export default Input;

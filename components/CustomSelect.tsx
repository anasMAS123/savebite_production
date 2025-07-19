import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  arr: Array<{ id: number | string; content: string }>;
  placeholder: string;
  name: string;
  error?: string;
}

const CustomSelect = ({ name, arr, placeholder, error = "" }: Props) => {
  if (error) console.log("error form");
  return (
    <>
      <Select name={name}>
        <SelectTrigger
          className={`px-[12px] h-[78px] border-[1px] ${
            error ? "border-error-500" : "border-black-200"
          }  rounded-sm  min-w-[200px] w-[100%] outline-none caret-primary-500 focus:ring-0 focus:ring-offset-0`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {arr.map((choice) => (
            <SelectItem
              key={choice.id}
              className="hover:bg-[#2E70FE]"
              value={choice?.id?.toString()}
            >
              {choice.content}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-error-400 font-[400] title2">{error}</span>
    </>
  );
};

export default CustomSelect;

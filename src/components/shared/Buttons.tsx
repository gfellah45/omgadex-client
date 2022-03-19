import clsx from "clsx";
import { useTheme } from "next-themes";

interface Props {
  text: string;
  children?: React.ReactNode;
  primary?: boolean;
  icon?: React.ReactNode;
  action?: () => void;
}

export const FilledButtons = ({ text }: Props): JSX.Element => {
  return (
    <button className="w-full px-4 py-2 my-4 rounded-md shadow-md lg:px-2 lg:py-1 xl:px-4 xl:py-2 bg-primary text-offwhite hover:opacity-75 ">
      {text}
    </button>
  );
};

export const OutlinedButtons = ({ text }: Props): JSX.Element => {
  return (
    <button className="w-full px-4 py-2 my-4 bg-transparent rounded-md shadow-md lg:px-2 lg:py-1 xl:px-4 xl:py-2 text-links ring-2 ring-links hover:opacity-75 ">
      {text}
    </button>
  );
};

// className={`w-full px-4 py-3 flex justify-center items-center space-x-3 font-bold text-[16px] rounded-md lg:px-2 lg:py-3 xl:px-2 xl:py-3 ring-1 ${
//   primary
//     ? "text-white bg-primary ring-primary "
//     : "text-black bg-transparent ring-gray-300 "
// } hover:opacity-75 `}

export const TransactionButtons = ({
  text,
  primary,
  icon,
  action,
}: Props): JSX.Element => {
  const { theme } = useTheme();
  return (
    <button
      onClick={action}
      className={clsx(
        "w-full px-4 py-3 flex justify-center items-center space-x-3 font-bold text-[16px] rounded-md lg:px-2 lg:py-3 xl:px-2 xl:py-3 ring-1",
        primary
          ? "text-white bg-primary ring-primary"
          : "text-black bg-transparent ring-gray-300",
        theme === "dark" && "text-omgray2"
      )}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

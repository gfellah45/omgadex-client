interface Props {
  text: string;
  children?: React.ReactNode;
}

export const FilledButtons = ({ text }: Props): JSX.Element => {
  return (
    <button className="w-full px-4 py-2 my-4 rounded-md shadow-md lg:px-2 lg:py-1 xl:px-4 xl:py-2 bg-primary text-offwhite hover:opacity-75 ">
      {text}
    </button>
  );
};

export const OutlinedButtons = ({ text }: Props) => {
  return (
    <button className="w-full px-4 py-2 my-4 bg-transparent rounded-md shadow-md lg:px-2 lg:py-1 xl:px-4 xl:py-2 text-links ring-2 ring-links hover:opacity-75 ">
      {text}
    </button>
  );
};

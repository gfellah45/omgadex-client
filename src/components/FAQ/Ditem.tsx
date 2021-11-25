import React, { ReactElement } from "react";
import { Disclosure } from "@headlessui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface Props {}

export default function Ditem({}: Props): ReactElement {
  const item = [
    {
      question: "What is OmegaDex?",
      answer:
        "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptatibus in aliquid sapiente aperiam necessitatibus quasi veritatis recusandae numquam est impedit, dolore deleniti asperiores. Magnam, nobis? At veniam ex iste?",
    },
    {
      question: "What is OmegaDex?",
      answer:
        "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptatibus in aliquid sapiente aperiam necessitatibus quasi veritatis recusandae numquam est impedit, dolore deleniti asperiores. Magnam, nobis? At veniam ex iste?",
    },
    {
      question: "What is OmegaDex?",
      answer:
        "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptatibus in aliquid sapiente aperiam necessitatibus quasi veritatis recusandae numquam est impedit, dolore deleniti asperiores. Magnam, nobis? At veniam ex iste?",
    },
    {
      question: "What is OmegaDex?",
      answer:
        "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptatibus in aliquid sapiente aperiam necessitatibus quasi veritatis recusandae numquam est impedit, dolore deleniti asperiores. Magnam, nobis? At veniam ex iste?",
    },
  ];

  return (
    <div className="w-full px-4 pt-8">
      <div className="w-full max-w-4xl p-4 mx-auto lg:max-w-3xl rounded-2xl">
        {item.map((item) => (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex justify-between w-full ${
                    !open && "border-b"
                  } px-4 py-4 my-3 text-sm font-medium text-left transition-all hover:bg-primary hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75`}
                >
                  <span>{item.question}</span>
                  {open ? (
                    <AiOutlineMinus
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black hover:text-white`}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black hover:text-white`}
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 transition-all border-b-2 text-links">
                  {item.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

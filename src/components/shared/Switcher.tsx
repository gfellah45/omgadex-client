import React, { FC } from "react";
import { Switch } from "@headlessui/react";

import { useTheme } from "next-themes";

const Switcher: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex space-x-2 items-center">
      <div
        className={`text-sm ${
          theme === "light" ? "text-neutral-700" : "text-white"
        }`}
      >
        Dark
      </div>
      <Switch
        checked={theme === "light" ? false : true}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`${
          theme === "light" ? "bg-primary" : "bg-primary bg-opacity-70"
        }
          relative inline-flex flex-shrink-0 h-[20px] w-[40px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme === "light" ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
      <div
        className={`text-sm ${
          theme === "light" ? "text-neutral-700" : "text-white"
        }`}
      >
        Light
      </div>
    </div>
  );
};

export default Switcher;

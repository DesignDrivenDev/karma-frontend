import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

function Accordion({ title, children }: Props) {
  
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="py-3 ">
        <h4
          className={`cursor-pointer text-xl sm:text-2xl lg:text-2xl transition-all duration-300 font-bold bg-gray-200 py-3 px-5 flex justify-between hover:shadow-md
                ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
        >
          {title}
        </h4>
        <div
          className={`
                ${
                  isOpen
                    ? "max-h-[80rem] duration-500 transition-all ease-in"
                    : "max-h-0 duration-300 transition-all ease-out"
                }
                bg-white shadow-lg w-full rounded-b-lg overflow-hidden`}
        >
          <div className=" flex flex-wrap gap-x-10 gap-y-3 py-5 px-5 min-h-[15rem]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accordion;

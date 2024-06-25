import React, { useState } from "react";

const Accordion = ({title,answer}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="py-5 text-black dark:text-black">
      <button
        className="flex justify-between w-full"
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
      >
        <span className=" font-bold text-xl">{title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          data-accordion-icon
          class="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      <div
        className={` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden font-semibold text-lg pt-3">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;

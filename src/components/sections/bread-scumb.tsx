import React from "react";
import { twMerge } from "tailwind-merge";

const BREAD_SCRUMB_CLASS_NAME = "text-sm font-thin text-gray-400";

function BreadScrumb() {
  // for simplicity, the content in the bread scrumb menu is hard-coded and static.

  const hierarchy = [
    {
      title: "Markets",
      link: "", // no router configured for this demo project. Leaving it blank.
    },
    {
      title: "Crypto",
      isCurrent: true,
    },
  ];
  return (
    <div className="flex flex-row">
      {hierarchy.map((item) =>
        item.isCurrent ? (
          <span
            key={item.title}
            className={twMerge(
              BREAD_SCRUMB_CLASS_NAME,
              "text-foreground",
            )}
          >
            {item.title}
          </span>
        ) : (
          <React.Fragment
            key={item.title}
          >
            <a
              href={item.link}
              className={twMerge(
                BREAD_SCRUMB_CLASS_NAME,
                "hover:text-foreground",
              )}
            >
              {item.title}
            </a>
            <span
              className={twMerge(
                BREAD_SCRUMB_CLASS_NAME,
                "mx-3",
              )}
            >
              {">"}
            </span>
          </React.Fragment>
        ),
      )}
    </div>
  );
}

export default BreadScrumb;

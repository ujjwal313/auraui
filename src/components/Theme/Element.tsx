import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SourceCodeViewer from "../../utils/SourceCodeViewer"; // Ensure this path is correct
import {
  LuArrowUpRight,
  LuCircleDollarSign,
  LuMoon,
} from "react-icons/lu";
import { FaCode, FaWebAwesome } from "react-icons/fa6";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center justify-center px-6 py-2 transition-colors relative z-10";

type ElementWrapperProps = {
  element: React.ReactNode;
  componentPath: string;
  previewLink: string;
};

const ElementWrapper: React.FC<ElementWrapperProps> = ({
  element,
  componentPath,
  previewLink,
}) => {
  const tabs = [
    {
      name: "Preview",
      label: "Preview",
      icon: <FaWebAwesome />,
      component: <PreviewComponent element={element} />,
    },
    {
      name: "Code",
      label: "Code",
      icon: <FaCode />,
      component: <CodeComponent componentPath={componentPath} />,
    },
  ];

  const [selected, setSelected] = useState(tabs[0].name);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>(
    tabs.reduce((acc, tab) => {
      acc[tab.name] = React.createRef();
      return acc;
    }, {} as { [key: string]: React.RefObject<HTMLButtonElement> })
  );

  useEffect(() => {
    const currentTab = tabRefs.current[selected]?.current;
    if (currentTab) {
      setWidth(currentTab.offsetWidth);
      setLeft(currentTab.offsetLeft);
    }
  }, [selected]);

  const handleTabClick = (tabName: string) => {
    setSelected(tabName);
  };

  const handleLinkClick = () => {
    window.open(`/preview/${previewLink}`, "_blank");
  };

  const selectedTab = tabs.find((tab) => tab.name === selected);

  return (
    <div className="flex flex-col items-left">
      <div className="relative flex md:flex-row flex-col justify-between mt-3 items-center rounded-lg p-1 ">
        <div className="flex gap-2 ">
          <div className="bg-gray-200 flex  dark:bg-customDark  rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                ref={tabRefs.current[tab.name]}
                className={`${TOGGLE_CLASSES} ${
                  selected === tab.name
                    ? "text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => handleTabClick(tab.name)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative cursor-pointer p-3 rounded-lg dark:bg-customDark bg-gray-100 text-gray-500">
            <LuMoon className="w-4 h-4" />
          </div>
        </div>
        <motion.div
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="absolute top-1 bottom-1 bg-white dark:bg-[#373737] rounded-md shadow-md"
          style={{ width, left }}
        />
        <div className=" flex gap-2  ">
          <div className="relative cursor-pointer py-2 px-4 rounded-lg dark:bg-customDark bg-gray-100 text-gray-500 flex items-center">
            <LuCircleDollarSign className="w-4 h-4 mr-2" />
            Free component
          </div>
          <button
            className={` px-5 rounded-lg dark:bg-customDark bg-gray-200 text-gray-600 dark:text-gray-400 `}
            onClick={handleLinkClick}
          >
            <span>
              <LuArrowUpRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 w-full">{selectedTab?.component}</div>
    </div>
  );
};

type CodeComponentProps = {
  componentPath: string;
};

const CodeComponent: React.FC<CodeComponentProps> = ({ componentPath }) => (
  <div className="">
    <div className="h-8 dark:bg-customDark px-4 rounded-b-none rounded-2xl flex items-center space-x-2 bg-gray-100">
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
    </div>
    <div className="border-2 rounded-t-none border-gray-100 dark:border-customDark rounded-2xl">
      <SourceCodeViewer componentPath={componentPath} />
    </div>
  </div>
);

const PreviewComponent: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => (
  <div className="border-2 border-gray-100 dark:border-customDark rounded-2xl overflow-hidden">
    <div className="h-8 dark:bg-customDark px-4 flex items-center space-x-2 bg-gray-100">
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
      <div className="w-3 h-3 dark:bg-black bg-gray-300 rounded-full" />
    </div>
    {element}
  </div>
);

export default ElementWrapper;
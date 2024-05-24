import React from "react";
import Link from "next/link";
import One from "./One";

const AllArticle = () => {
  return (
    <div className="space-y-10 pt-10 ">
      <div className=" ">
        <div className="flex my-2 justify-between">
          <h3 className="text-[20px] font-medium ">ConnectSphere Component</h3>
          <Link href={"/components/Contact/Elements#connectsphere-contact"}>
            <button className="py-1 px-2 font-semibold  rounded-3xl text-[14px] bg-white text-blue-600">
              Get Code
            </button>
          </Link>
        </div>
        <One />
      </div>
    </div>
  );
};

export default AllArticle;
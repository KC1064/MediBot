import React from "react";
const Buttons = ({ name, type }) => {
  return (
    <button
      className={`w-20 h-8 rounded-md border-2 border-black ${
        type === "primary" ? "bg-[#EA9DC5]" : "bg-[#EEB9A6]"
      }`}
    >
      <p className="text-lg font-bold">{name}</p>
    </button>
  );
};

export default Buttons
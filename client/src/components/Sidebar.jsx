import {
  FaUser,
  FaBookmark,
  FaLeaf,
  FaRecycle,
  FaWater,
  FaExclamationCircle,
} from "react-icons/fa";
import React from 'react'
import { useNavigate } from "react-router";

const Sidebar = ({ handleReport }) => {
  return (
    <div className="hidden md:flex w-[20%] bg-green-900 text-white h-full flex-col items-center gap-6 py-6">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-wide">EcoLOGO</h1>

      {/* Options */}
      <div className="options bg-green-700 w-full flex flex-col gap-4 p-5 h-[80%] rounded-lg shadow-lg">
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-green-800 rounded-md transition duration-200">
          <FaUser />
          Your Profile
        </button>
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-green-800 rounded-md transition duration-200">
          <FaBookmark />
          Saved
        </button>
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-green-800 rounded-md transition duration-200">
          <FaLeaf />
          Your Reports
        </button>
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-green-800 rounded-md transition duration-200">
          <FaRecycle />
          Latest Reports
        </button>
      </div>

      {/* Report Button */}
      <button
        onClick={handleReport}
        className="mt-auto mb-6 w-[90%] bg-green-400 text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-200 flex items-center justify-center gap-3 shadow-md"
      >
        <FaExclamationCircle />
        REPORT
      </button>
    </div>
  );
};

export default Sidebar;

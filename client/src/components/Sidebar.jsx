import {
  FaUser,
  FaBookmark,
  FaLeaf,
  FaRecycle,
  FaWater,
  FaExclamationCircle,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { VscReport } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import axios from 'axios'
import React from 'react'
import { useNavigate } from "react-router";

const Sidebar = ({ handleReport,user }) => {
  
  const navigate = useNavigate()

  return (
    <div className="absolute md:static z-20 bottom-0 left-0  flex flex-row h-[60px]
      md:flex w-full md:w-[20%] bg-green-900 
       text-white md:h-full md:flex-col items-center gap-6 md:py-6  md:px-2">
      {/* Logo */}
      <h1 className="hidden md:flex text-3xl font-extrabold tracking-wide">EcoLOGO</h1>

      {/* Options */}
      <div className="options h-[60px] items-center justify-center flex-row bg-green-700 w-full flex md:flex-col gap-4 md:p-5 md:h-[80%] md:rounded-lg shadow-lg">
        {/* Home  */}
        <button className="option-button"
          onClick={() => navigate('/')}
        >
          <IoHome className="option-icon" />
          <h1 className="hidden md:flex">Home</h1>
        </button>

        {/* Your Profile */}
        <button
          onClick={() => navigate(`/profile/${user.username}`)}
          className="option-button">
          <CgProfile className="option-icon" />
          <h1 className="hidden md:flex">Profile</h1>
        </button>

        {/* Saved */}
        <button className="option-button" onClick={()=> navigate(`/profile/${user.username}/saved_reports`)}>
          <FaBookmark className="option-icon" />
          <h1 className="hidden md:flex">Saved</h1>
        </button>

        {/* Trending */}
        <button className="option-button">
          <FaArrowTrendUp className="option-icon" />
          <h1 className="hidden md:flex">Trending</h1>
        </button>

        {/* Report button */}
        <button
          onClick={handleReport}
          className="flex md:hidden items-center gap-3 px-4 py-2 hover:bg-green-800 rounded-md transition duration-200">
          <VscReport className="option-icon" />
          {/* Report */}
        </button>
      </div>


      {/* Report Button */}
      <button
        onClick={handleReport}
        className="hidden mt-auto mb-6 w-[90%] bg-green-400 text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-200 md:flex items-center justify-center gap-3 shadow-md"
      >
        <FaExclamationCircle />
        REPORT
      </button>
    </div>
  );
};

export default Sidebar;

import React, { useContext, useState } from 'react';
import search from "../assets/images/search.svg"
import { useLocation } from 'react-router-dom';
import { StudySetsContext } from '../context/StudySetsContext';

const StudySetsSearchBar = ({ value, onChange }) => {
    const { moduleId } = useContext(StudySetsContext);
    const location = useLocation();
    return (
      <form action="" className='flex justify-center w-full'>
        <div className={`flex justify-between basis-[100%] ${location.pathname === `/module/${moduleId}` ? "bg-[#F6F7FB] sm:basis-1/2" : "bg-white"} border-[1px] p-[8px] border-black rounded-[8px]`}>
          <input
            type="text"
            placeholder="Search for topics or keywords"
            value={value}
            onChange={onChange}
            className={`text-[12px] outline-none block w-full ${location.pathname === `/module/${moduleId}` ? "bg-[#F6F7FB]" : "bg-white"}`}
          />
          <img src={search} alt="" /> 
        </div>
      </form>
    );
  }

export default StudySetsSearchBar;

import React, { useState } from 'react';

function UserStudySetsSearchBar({ value, onChange }) {
  return (
    <>
     <div className="relative my-6 w-full md:w-[500px]">
    <input
    d="id-s03"
    type="search"
    name="id-s03"
    placeholder="Search here"
    aria-label="Search content"
    className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white  focus:border-black focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
    value={value}
    onChange={onChange}
    />
    <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 top-2.5 h-5 w-5 stroke-slate-400 peer-disabled:cursor-not-allowed"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          aria-label="Search icon"
          role="graphics-symbol"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
    </div>
      </>
  );
}

export default UserStudySetsSearchBar;

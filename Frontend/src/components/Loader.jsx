import React from "react";
import "./css/loader.css";

function Loader(props) {
  return (
    <div>
      {props.loader && (
        <div className='max-container padding-container flex flex-col justify-center absolute gap-2'>
          <div className='mt-10 sm:mx-[30vw] z-50 flex flex-col justify-center items-center gap-5  w-[316px] h-[279px] mb-6 rounded-lg bg-white  border border-gray-300 '>
            <div className='typewriter'>
              <div className='slide'>
                <i></i>
              </div>
              <div className='paper'></div>
              <div className='keyboard'></div>
            </div>
            <p className='dm-sans-medium text-[17px]'>We are working on it!</p>
          
          </div>
        </div>
      )}
    </div>
  );
}

export default Loader;

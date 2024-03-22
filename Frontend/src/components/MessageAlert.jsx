import React from "react";
import success from "../assets/images/test-success.svg";
import deleted from "../assets/images/delete.png";
import { useNavigate } from "react-router-dom";
import "./css/loader.css";

function MessageAlert(props) {
  const navigate = useNavigate();

  return (
    <>
      {props.messageShow ? (
        <div className='max-container padding-container flex justify-center absolute'>
          <div className='mt-10 sm:mx-[30vw] z-50 flex flex-col justify-center items-center gap-5  w-[316px] h-[279px] mb-6 rounded-lg bg-white  pl-[40px] border border-gray-300 '>
            <img src={success} alt='' className='w-20 h-20 mr-10 ' />
            <p className='text-center mr-10 dm-sans-medium text-[17px]'>{props.message}</p>
            <button
              className='rounded-lg bg-[#15dd22] w-[268px] h-[56px] self-center mr-10'
              onClick={() => navigate(`/user/${props.userId}/studySets`)}
            >
              <p className='dm-sans-bold text-white text-[1.2em] '>Ok</p>
            </button>
          </div>
        </div>
      ) : props.studySetDeleted ? (
        <div className='max-container padding-container flex justify-center'>
          <div className='absolute z-50 mt-10 mx-[5vw] sm:mx-[30vw] flex flex-col justify-center items-center gap-5  w-[316px] h-[279px] mb-6 rounded-lg bg-white flex-shrink-0 pl-[40px] border border-gray-300 '>
            <img src={deleted} alt='' className='w-20 h-20 mr-10 ' />
            <p className='text-center mr-10 dm-sans-medium text-[17px]'>
              Your study set has been deleted!
            </p>
            <button
              className='rounded-lg bg-[#d33f22] w-[268px] h-[56px] self-center mr-10   hover:border-gray-500'
              onClick={() => navigate(`/user/${props.userId}/studySets`)}
            >
              <p className='dm-sans-bold text-white text-[1.2em] '>Ok</p>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MessageAlert;

import React, { useContext } from 'react'
import { StudySetsContext } from '../context/StudySetsContext';
import success from "../assets/images/success.svg";
import error from "../assets/images/test-wrong.svg";

function ModalWindow() {
   const { succesWindow, setSuccesWindow,errorWindow, setErrorWindow } = useContext(StudySetsContext);

   const btnStyle = "w-full py-[21px] rounded-[8px] text-white text-[1.2em]";
   const closeWindowHandler = () => {
    setSuccesWindow(false);
    setErrorWindow(false);
  }
  return (
    <div className={`${(succesWindow || errorWindow) ? "block" : "hidden"} absolute z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center text-leading-[150%] min-w-[300px] bg-white flex flex-col items-center gap-[25px] px-[24px] pt-[30px] pb-[40px] rounded-[8px] border-[1px] border-[#BCC0C1]`}>
        <img className={(succesWindow || errorWindow) ? "block" : "hidden"} src={succesWindow ? success : error} alt="" />
        <p className={`${(succesWindow || errorWindow) ? "block text-[1.7em]" : "hidden"}`}>{succesWindow ? "Study set was added to your account!" : "Hey! You already have it in your study sets"}</p>
        <button onClick={closeWindowHandler} className={`${succesWindow ? "block bg-[#937DE2]" : errorWindow ? "block bg-[#FF5E5E]" : "hidden"} ${btnStyle}`}>OK</button>
    </div>
  )
}

export default ModalWindow
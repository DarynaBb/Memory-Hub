import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

function Footer() {
  const navigate = useNavigate();

  const handleClick = (text) => {
    console.log(`${text} clicked`);
  };

  return (
    <>
      <div>
        <div className="flex items-center ">
          <div
            className="w-[58px] h-[48px] bg-cover bg-no-repeat cursor-pointer "
            onClick={() => navigate("/")}
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className="w-[112px] h-[19px] ml-2 font-dm-sans text-xs font-bold uppercase">
            Memory Hub
          </div>
        </div>
        <div className="container flex items-start gap-[40px] md:gap-[100px] justify-center md:justify-end font-dm-sans text-[1.2em] md:text-[1.4em] md:mt-0 mt-7 ">
          <div className="flex flex-col items-start md:gap-4 gap-2 ">
            <div
              onClick={() => handleClick("Company")}
              className="cursor-pointer leading-6"
            >
              Company
            </div>
            <div
              onClick={() => handleClick("Career")}
              className="cursor-pointer leading-6"
            >
              Career
            </div>
            <div
              onClick={() => handleClick("About us")}
              className="cursor-pointer  leading-6"
            >
              About us
            </div>
          </div>
          <div className="flex flex-col items-start md:gap-4 gap-2">
            <div
              onClick={() => navigate("/contact")}
              className="cursor-pointer leading-6"
            >
              Product
            </div>
            <div
              onClick={() => handleClick("Exams")}
              className="cursor-pointer leading-6"
            >
              Exams
            </div>
            <div
              onClick={() => handleClick("Explanations")}
              className="cursor-pointer leading-6"
            >
              Explanations
            </div>
            <div
              onClick={() => handleClick("For Companies")}
              className="cursor-pointer leading-6"
            >
              For Companies
            </div>
            <div
              onClick={() => handleClick("Magazine")}
              className="cursor-pointer leading-6"
            >
              Magazine
            </div>
          </div>
          <div className="flex flex-col items-start md:gap-4 gap-2">
            <div
              onClick={() => handleClick("Help")}
              className="cursor-pointer leading-6"
            >
              Help
            </div>
            <div
              onClick={() => navigate("/contact")}
              className="cursor-pointer leading-6"
            >
              Contact
            </div>
            <div
              onClick={() => handleClick("Help Center")}
              className="cursor-pointer leading-6"
            >
              Help Center
            </div>
          </div>
        </div>
        <div className=" md:mt-2 mt-5 md:text-[1.4em] text-[1em] text-center md:text-start leading-6 ">
          Copyright © MemoryHub 2024
        </div>
      </div>
      <div className="bg-[#FFC2FF] w-full h-[8px] absloute left-0 " />
    </>
  );
}

export default Footer;

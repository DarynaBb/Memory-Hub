import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/images/arrow.svg";
import forward from "../assets/images/forward.svg";

function HomePageButtons() {
  const navigate = useNavigate();
  const { hasToken, setShowLoginForm, setIsCreateCardsClicked } =
    useContext(AuthContext);

  const onClickHandler = () => {
    hasToken ? navigate("/createSet") : setShowLoginForm(true);
    setIsCreateCardsClicked(true);
  };
  return (
    <section className='flex gap-[24px]'>
      <button
        onClick={() => navigate("/modules")}
        className='bg-[#000] min-w-[140px] text-white whitespace-nowrap text-[1.2em] md:text-[1.6em] dm-sans-bold md:px-[48px] py-[17px] md:py-[24px] rounded-[36px] hover:bg-white hover:text-black'
      >
        STUDY SETS
      </button>
      <button
        onClick={onClickHandler}
        className='bg-white min-w-[140px] whitespace-nowrap text-[1.2em] md:text-[1.6em] dm-sans-bold px-[25px] md:px-[36px] py-[9px] rounded-[36px] items-center flex gap-[6px] md:gap-[15px] lg:gap-[24px] justify-center hover:bg-[#FFC2FF]'
      >
        <p>CREATE CARDS</p>
        <div className="bg-[#FFC2FF] p-[4px] md:p-[12px] rounded-full">
          <img src={forward} alt="arrow" className="w-[20px] md:w-[24px]" />
        </div>
      </button>
    </section>
  );
}

export default HomePageButtons;

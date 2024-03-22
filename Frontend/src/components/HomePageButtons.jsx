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
    <section className=' sm:pt-[50px] pt-[10px] flex sm:flex-row flex-col sm:gap-6 gap-1 justify-start  '>
      <button
        onClick={() => navigate("/modules")}
        className='bg-[#000] w-36 h-12 md:h-16 md:w-56 md:rounded-[36px] rounded-[28px] flex justify-center items-center flex-shrink-0  text-white font-dm-sans font-bold text-base hover:bg-white hover:text-black  '
      >
        STUDY SETS
      </button>
      <button
        onClick={onClickHandler}
        className='bg-[#FFF]  w-48 md:w-60 md:h-16 h-12 md:rounded-[36px] rounded-[28px]  flex justify-center items-center flex-shrink-0 text-black font-dm-sans font-bold text-base hover:bg-[#FFC2FF]'
      >
        CREATE CARDS
        <svg onClick={() => navigate("/")} className='w-8 h-8 ml-2'>
          <image href={arrow} x='0' y='0' width='100%' height='100%' />
          <image href={forward} x='0' y='0' width='100%' height='100%' />
        </svg>
      </button>
    </section>
  );
}

export default HomePageButtons;

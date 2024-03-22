import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/images/arrow.svg";
import forward from "../assets/images/forward.svg";

function HomeLastBody() {
  const navigate = useNavigate();
  const { hasToken, setShowLoginForm, setIsCreateCardsClicked } =
    useContext(AuthContext);

  const onClickHandler = () => {
    hasToken ? navigate("/createSet") : setShowLoginForm(true);
    setIsCreateCardsClicked(true);
  };
  return (
    <div>
      <div
        className="mt-10  md:h-[700px] flex-shrink-0 rounded-[8px] bg-black p-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(245, 230, 66,.7) 25%, rgba(245, 182, 66,.6) 47%, rgba(226,159,134,.5) 100%)",
        }}
      >
        <p className="font-bold font-dm-sans  md:text-[8.8em] text-[4em] leading-[120%] md:w-[70vw] xl:w-[40vw] w-[65vw]"
        
        style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-2px",
            fontWeight: 700,
          }}
        
        >
          Are you ready to turn learning into fun?
        </p>
        <button
          onClick={onClickHandler}
          className="bg-[#FFF] rounded-[36px] w-60 h-16 flex justify-center items-center flex-shrink-0 text-black font-dm-sans font-bold text-base mt-[7%] gap-3 hover:bg-[#FFC2FF]"
        >
          CREATE CARDS
          <svg onClick={() => navigate("/")} className="w-8 h-8 ml-2">
            <image href={arrow} x="0" y="0" width="100%" height="100%" />
            <image href={forward} x="0" y="0" width="100%" height="100%" />
          </svg>
        </button>
        <p className="text-black  font-semibold font-dm-sans text-[1.7em] leading-relaxed tracking-tight mt-[5%]">
          Sign in or register to create your own flashcard set
        </p>
        <p className="text-gray-600 mt-4 font-dm font-normal text-[1.7em] leading-relaxed">
          Create your first flashcard set and experience how easy and fast you
          can improve your skills.
        </p>
      </div>
    </div>
  );
}

export default HomeLastBody;

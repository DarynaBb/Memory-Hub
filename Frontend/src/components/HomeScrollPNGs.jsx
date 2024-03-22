import React, { useRef, useEffect, useState } from "react";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import forward from "../assets/images/forward.svg";

function HomeScrollPNGs() {
  const sliderRef = useRef(null);
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 1024); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  return (
    <div>
      <div
        ref={sliderRef}
        className={`flex flex-row gap-10 justify-between overflow-x-${isTabletOrSmaller ? "scroll" : "hidden"} scrollbar-hide`}
      >
        <div className=" md:min-w-[432px] min-w-[262px] flex flex-col items-start gap-2 ">
          <img src={image3} className="rounded-[8px] object-cover" />
          <p className="font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6">
            Easily craft custom flashcards from scratch with our intuitive tool
          </p>
          <p className="text-[#9A9A9A] font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify ">
            Here's how it works: simply input your study content and seamlessly
            integrate images to enhance your cards. Say goodbye to wasted
            time—create personalized flashcards effortlessly!
          </p>
        </div>
        <div className=" md:min-w-[432px] min-w-[262px] flex flex-col items-start gap-2">
          <img src={image4} className="rounded-[8px] object-cover" />

          <p className="font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6">
            Explore your expertise with expertly crafted quizzes covering a wide
            array of subjects
          </p>
          <p className="text-[#9A9A9A] font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify ">
            Elevate your understanding and improve your grades by engaging with
            our quiz platform. With three distinct modes—learn, write, and
            test—you have the flexibility to tailor your study approach to suit
            your needs.
          </p>
        </div>
        <div className="  md:min-w-[432px] min-w-[262px] flex flex-col items-start gap-2 ">
          <img src={image5} className="rounded-[8px] object-cover" />

          <p className="font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6">
            Access millions of shared flashcards from students just like you
          </p>
          <p className="text-[#9A9A9A] font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify ">
            Sharing is caring! Memory Hub users share thousands of flashcards
            each month to enhance your knowledge across all your subjects. Learn
            from others for an exceptional learning experience.
          </p>
        </div>
      </div>
      {isTabletOrSmaller && (
        <div className="flex items-center justify-between gap-[32px] mt-20">
          <div className="h-[1px] basis-[90%] bg-[#BCC0C1]" />
          <div className="flex gap-[44px] justify-end items-center">
            <img
              src={forward}
              className="cursor-pointer rotate-180"
              onClick={slideLeft}
              alt="Scroll Left"
            />
            <img
              src={forward}
              className="cursor-pointer"
              onClick={slideRight}
              alt="Scroll Right"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScrollPNGs;

import React from "react";
import image1 from "../assets/images/image1.jpg";
import HomePageButtons from "./HomePageButtons";

function HomeHeader() {
  return (
    <div>
      <div className='relative max-w-[1440px] md:h-[695px] min-h-[450px] '>
        <img
          src={image1}
          className='w-[1440px] md:h-[695px] h-[100vh] brightness-50 md:object-cover object-none'
        />
        <div className='absolute md:top-0 top-1 left-0  flex items-start justify-start'>
          <div className='max-w-[70vw] m-10 text-white'>
            <div className='xl:text-[80px] md:text-[60px] sm:text-[46px] text-[32px] font-dm-sans font-bold text-start '>
              Unleash your full potential with our free 
              flashcard platform!
            </div>
            <p className='max-w-[40vw] font-dm-sans lg:text-[2.4em] md:text-[2em] text-[1.7em] '>
              Make studying fun, fast, and super effective with our intelligent
              flashcards feature. Create your own or search for what you need in
              our extensive flashcards library.
            </p>
            <HomePageButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;

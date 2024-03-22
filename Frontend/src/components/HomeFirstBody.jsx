import React from "react";
import image2 from "../assets/images/image2.jpg";

function HomeFirstBody() {
  return (
    <div>
      <div className=' flex flex-col lg:flex-row gap-[50px] md:gap-2 md:my-[88px] my-[50px] items-center justify-between text-justify  md:text-start'>
        <p className='md:text-[4em] sm:text-[3em] text-[2em] font-dm-sans self-start basis-2/4'>
          We see it as our responsibility to provide all students with the
          confidence and tools they need to achieve their goals.
        </p>
        <img src={image2} className='self-end basis-1/4' />
      </div>
      <p className='md:mt-[100px] mt-[50px]  font-dm-sans md:text-[4em] text-[3em] text-end mb-20'>
        Let us explain how it works!
      </p>
    </div>
  );
}

export default HomeFirstBody;
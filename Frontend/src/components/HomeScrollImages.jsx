import React, { useRef } from "react";
import image8 from "../assets/images/image8.png";
import image9 from "../assets/images/image9.png";
import image10 from "../assets/images/image10.jpeg";
import imageStudent from "../assets/images/imageStudent.jpg";
import forward from "../assets/images/forward.svg";

function HomeScrollImages() {
  const sliderRef = useRef(null);
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
        className='h-auto flex flex-row gap-10 justify-between overflow-x-scroll scrollbar-hide'
      >
        <div className='flex flex-col items-start gap-2'>
          <img
            src={image8}
            className='md:min-w-[548px] min-w-[262px] rounded-[8px] object-cover'
            alt='Image 1'
          />
          <div className='font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6'>
            Anna, University of Chicago student, 23 y.o.
          </div>
          <p className='text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify '>
            Memory Hub is a life-saver when everything I have to know seems
            endless. I can focus on one chunk at a time and make real progress,
            instead of drowning.
          </p>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <img
            src={image9}
            className='md:min-w-[548px] min-w-[262px] md:h-[408px] h-[195px] rounded-[8px] object-cover'
          />

          <div className='font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6'>
            {" "}
            Luca, Ludwig Maximilian University of Munich, 21 y.o.
          </div>
          <p className='text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify'>
            Memory Hub has truly revolutionized the way I study. The flashcard
            system is incredibly intuitive, allowing me to absorb information
            efficiently. The variety of subjects covered is impressive, and the
            platform's user-friendly interface makes learning enjoyable.
          </p>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <img
            src={image10}
            className='md:min-w-[548px] min-w-[262px] md:h-[408px] h-[195px] rounded-[8px] object-cover'
          />

          <p className='text-black font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6'>
            Johanna, Heidelberg University, 26 y.o.
          </p>
          <p className='text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify'>
            s a student, I can't recommend Memory Hub enough. The flashcard
            feature has been instrumental in helping me grasp complex concepts
            and retain information effectively.
          </p>
        </div>
        <div className='flex flex-col items-start gap-2 '>
          <img
            src={imageStudent}
            className='md:min-w-[548px] min-w-[262px] md:h-[408px] h-[195px]  rounded-[8px] object-cover'
          />
          <p className='text-black font-dm-sans font-bold text-[1.7em] leading-[25.5px] mb-6'>
            Michael, Stanford University, 22 y.o.
          </p>
          <p className='text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px] text-justify'>
            As a student, I find Memory Hub indispensable in my academic
            journey. Its interactive study materials and intuitive interface
            have enhanced my learning experience. The flashcard feature, in
            particular, has helped me grasp difficult concepts more effectively
            and retain information for exams.
          </p>
        </div>
      </div>

      <div className='flex items-center justify-between gap-[32px] mt-4'>
        <div className='h-[1px] basis-[90%] bg-[#BCC0C1]' />
        <div className='flex gap-[44px] justify-end items-center'>
          <img
            src={forward}
            className='cursor-pointer rotate-180'
            onClick={slideLeft}
            alt='Scroll Left'
          />
          <img
            src={forward}
            className='cursor-pointer'
            onClick={slideRight}
            alt='Scroll Right'
          />
        </div>
      </div>
    </div>
  );
}

export default HomeScrollImages;
import React, { useContext } from "react";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";
import image2 from "../assets/images/image2.jpg";
import pinkImage from "../assets/images/image6.png";
import { explainBlocks } from "../constants";
import advantages from "../assets/images/image7.png";
import { testimonials } from "../constants";
import arrow from "../assets/images/arrow-forward.svg";


import top from "../assets/images/closeForm.png";
import Footer from "../components/Footer";
import HomeScrollImages from "../components/HomeScrollImages";
import HomeHeader from "../components/HomeHeader";
import HomeFirstBody from "../components/HomeFirstBody";
import HomeScrollPNGs from "../components/HomeScrollPNGs";
import HomeLastBody from "../components/HomeLastBody";
import HomePageButtons from "../components/HomePageButtons";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Home() {

  const { hasToken, setShowLoginForm, setIsCreateCardsClicked } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const slide = (direction) => {
  const slider = document.getElementById('feedback-scroll');
  slider.scrollLeft += (direction === 'left' ? -300 : 300);
};

const onClickHandler = () => {
  hasToken ? navigate("/createSet") : setShowLoginForm(true);
  setIsCreateCardsClicked(true);
};

  return (
    <section className="max-container">
      <div className="hero-mobile hero-bg bg-no-repeat bg-cover bg-center lg:bg-fixed px-[10px] md:pl-[40px] pt-[50px] flex flex-col gap-[20px] md:gap-[40px] pb-[60px] brightness-50">
        <h2 className="dm-sans-bold text-[3.2em] md:text-[5em] lg:text-[8em] md:max-w-[70%] text-leading-[120%] text-white">Unleash your full potential with our free flashcard platform!</h2>
        <p className="text-[1.7em] md:text-[2.4em] text-white max-w-[500px]">Make studying fun, fast and super effective with our intelligent flashcards feature. Create your own or search for what you need in our extensive flashcards library.</p>
        <HomePageButtons />
      </div>
      <div className="px-[10px] md:padding-x-container py-[70px] flex flex-wrap md:flex-nowrap justify-between gap-[44px] md:gap-[20px]">
        <h3 className="max-w-[780px] text-[2.4em] md:text-[3em] lg:text-[4em] text-leading-[120%]">We see it as our responsibility to provide all students with the confidence and tools they need to achieve their goals.</h3>
        <div className="w-full flex justify-end">
          <img className="max-w-[166px] md:max-w-[316px] grow-0" src={image2} alt="" />
        </div>
      </div>
      <div className="px-[10px] md:padding-x-container">
        <h3 className="text-right text-[2.4em] md:text-[3em] lg:text-[4em]">Let us explain how it works!</h3>
        <ul className="w-full h-full overflow-x-scroll md:overflow-hidden scroll whitespace-nowrap md:whitespace-normal scroll-smooth scrollbar-hide flex md:justify-between gap-[32px] md:gap-[10px] mt-[50px] md:mt-[80px] pb-[40px] md:pb-[70px] border-b-[1px] border-[#BCC0C1]">
          {explainBlocks.map((block, index) => (
            <li key={index} className="min-w-[260px] max-w-[260px] md:max-w-full md:basis-[30%] text-[1.7em] text-leading-[150%]">
              <img src={block.image} alt="icon" className="mb-[24px]" />
              <h4 className="mb-[32px] dm-sans-bold whitespace-normal">{block.title}</h4>
              <p className="text-[#9A9A9A] whitespace-normal">{block.text}</p>
            </li>
          ))}
        </ul>
      </div>  
      <div className="mx-[10px] py-[40px] md:py-[100px]">
        <img src={pinkImage} alt="image" className="min-h-[450px] object-cover rounded-[8px]"  />
      </div>
      <div className="px-[10px] py-[40px] md:padding-x-container ">
        <div className="border-b-[1px] border-[#BCC0C1] flex flex-wrap sm:flex-row-reverse md:flex-nowrap justify-between pb-[40px] md:pb-[70px]">
          <div className="w-full sm:w-[45%] flex flex-col justify-between gap-[30px]">
            <div className="flex flex-col md:gap-[50px] lg:gap-[80px]">
              <h4 className="text-[1.7em] dm-sans-bold mb-[20px]">Our advantages</h4>
              <ul className="text-[2.4em] md:text[3em] lg:text-[4em] flex flex-col gap-[16px]">
                <li>Efficiency</li>
                <li>Flexibility</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div className="text-[1.7em] text-leading-[150%]">
              <h4 className="dm-sans-bold mb-[24px] md:mb-[32px]">Memory Hub offers an efficient, flexible, and accessible learning experience</h4>
              <p className="text-[#9A9A9A] mb-[20px] sm:mb-0">Its spaced repetition algorithm optimizes review intervals for better retention. Users can customize flashcards to their preferences, and the platform is accessible across devices. These features make Memory Hub a versatile tool for improving knowledge and academic performance.</p>
            </div>
          </div>
          <img className="w-full max-h-[350px] sm:max-h-full object-cover sm:w-[45%] rounded-[8px]" src={advantages} alt="image" />
        </div>
      </div>
      <div className="padding-x-container mt-[40px] md:mt-[100px]">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-[30px] mb-[40px] md:mb-[80px]">
          <h4 className="w-full md:w-[40%] text-[1.7em] dm-sans-bold">Feedback from our users</h4>
          <p className="w-full md:w-[55%] text-[2.4em] md:text-[3em] lg:text-[4em]">According to 89% of students utilizing Memory Hub's Learning and Testing modes, they report improved academic performance as a result.</p>
        </div>
        <ul id='feedback-scroll' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide flex gap-[32px] mb-[40px]'>
          {testimonials.map((testimonial, index) => (
            <li key={index} className="min-w-[286px] md:min-w-[548px] text-[1.7em]">
              <img src={testimonial.image} alt="students" className="mb-[24px]" />
              <p className="whitespace-normal dm-sans-bold mb-[32px]">{testimonial.title}</p>
              <p className="whitespace-normal text-[#9A9A9A]">{testimonial.text}</p>
            </li>
          ))}
        </ul>
        <div className='flex items-center justify-between gap-[32px]'>
            <div className='h-[1px] basis-[90%] bg-[#BCC0C1]'/>
            <div className='flex gap-[10px] md:gap-[20px] lg:gap-[44px] justify-end items-center'>
                    <img src={arrow} className='cursor-pointer rotate-180' onClick={() => slide("left")} alt="" />
                    <img src={arrow} className='cursor-pointer' onClick={() => slide("right")} alt="" />
            </div>
        </div>
      </div>
      <div className="mx-[10px] mt-[40px] md:mt-[100px] yellow-gradient pb-[16px] md:pb-[40px] lg:pb-[70px] rounded-[8px]">
        <div className="padding-x-container flex flex-col justify-between gap-[30px]">
          <p className="text-[4em] md:text-[6em] lg:text-[8em] md:w-[60%] pt-[32px] md:pt-[60px] lg:pt-[80px] text-leading-[120%] dm-sans-bold ">Are you ready to turn learning into fun?</p>
          <div>
            <button
            onClick={onClickHandler}
            className='bg-white min-w-[140px]  whitespace-nowrap text-[1.2em] md:text-[1.6em] dm-sans-bold px-[25px] md:px-[36px] py-[9px] rounded-[36px] items-center flex gap-[6px] md:gap-[15px] lg:gap-[24px] justify-center hover:bg-[#FFC2FF]'
            >
            <p>CREATE CARDS</p>
            <div className="bg-[#FFC2FF] p-[4px] md:p-[12px] rounded-full">
              <img src={arrow} alt="arrow" className="w-[20px] md:w-[24px]" />
            </div>
            </button>
          </div>
          <p className="text-[1.7em] dm-sans-bold">Sign in or register to create your own flashcard set</p>
          <p className="text-[1.7em] text-[#9A9A9A]">Create your first flashcard set and experience how easy and fast you can improve your skills.</p>
        </div>
      </div>
      <div className="mt-[50px]">
            <Footer />
      </div>
    </section>
  );
}

export default Home;

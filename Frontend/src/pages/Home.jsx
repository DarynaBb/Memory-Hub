import React from "react";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";
import top from "../assets/images/closeForm.png";
import Footer from "../components/Footer";
import HomeScrollImages from "../components/HomeScrollImages";
import HomeHeader from "../components/HomeHeader";
import HomeFirstBody from "../components/HomeFirstBody";
import HomeScrollPNGs from "../components/HomeScrollPNGs";
import HomeLastBody from "../components/HomeLastBody";

function Home() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-container padding-container">
      <section className=" relative ">
        <HomeHeader />
        <HomeFirstBody />
        <HomeScrollPNGs />

        <img
          src={image6}
          className="lg:w-[1424px] lg:h-[700px] rounded-[8px] sm:w-[375px] h-[450px] object-cover mt-[10%] "
        />

        <div className="flex flex-col lg:flex-row items-start mt-[10%] ml-[5%]">
          <img
            src={image7}
            className="w-[358px] h-[464px] sm:w-[358px] sm:h-[464px] lg:w-[500px] lg:h-[600px] rounded-[8px] mb-4 lg:mb-0 lg:mr-4"
          />
          <div className="flex flex-col lg:ml-[15%]">
            <p className="text-black font-bold text-[1.7em] font-sans whitespace-nowrap">
              Our advantages
            </p>
            <p
              className="text-black font-normal text-[4em] font-sans leading-[48px] lg:mt-[15%] mt-4"
              style={{ letterSpacing: "-2px" }}
            >
              Efficiency
            </p>
            <p
              className="text-black font-normal text-[4em] font-sans leading-[48px] mt-3"
              style={{ letterSpacing: "-2px" }}
            >
              Flexibility
            </p>
            <p
              className="text-black font-normal text-[4em] font-sans leading-[48px] mt-3"
              style={{ letterSpacing: "-2px" }}
            >
              Accessibility
            </p>
            <p className="text-black font-bold text-[1.7em] font-sans leading-[25.5px] lg:mt-[23%] mt-4">
              Memory Hub offers an efficient, flexible, and accessible learning
              experience
            </p>
            <p className="text-gray-500 font-normal text-[1.7em] font-sans leading-[25.5px] lg:mt-[5%] mt-4">
              Its spaced repetition algorithm optimizes review intervals for
              better retention. Users can customize flashcards to their
              preferences, and the platform is accessible across devices. These
              features make Memory Hub a versatile tool for improving knowledge
              and academic performance.
            </p>
          </div>
        </div>

        <div
          className="w-full bg-gray-400 h-px mt-[10%] mb-[10%]"
          style={{ maxWidth: "1360px" }}
        ></div>
      </section>
      <div className="flex justify-between items-start md:flex-row flex-col gap-10 mb-[10%]">
        <div className="dm-sans-bold font-bold text-[1.7em] leading-[25.5px] ">
          Feedback from our users
        </div>
        <div
          className="dm-sans-regular md:text-[4em] text-[2.4em] leading-snug tracking-tight basis-1/2 lg:text-justify text-start"
          style={{ letterSpacing: "1px" }}
        >
          According to 89% of students utilizing Memory Hub's Learning and
          Testing modes, they report improved academic performance as a result.
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <HomeScrollImages />
        <HomeLastBody />
        <div
          className="flex justify-center items-center gap-5 "
          onClick={scrollToTop}
        >
          <div className=" text-center font-bold cursor-pointer mt-5 text-[1.4em]">
            back to top
          </div>
          <img src={top} alt="" className="w-5 h-5 mt-5" />
        </div>
        <div
          className="w-full bg-gray-400 h-px mt-[7%] mb-[5%]"
          style={{ maxWidth: "1360px" }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

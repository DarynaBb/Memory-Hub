import React, { useContext, useEffect, useState } from "react";
import { StudySetsContext } from "../context/StudySetsContext";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import BackLink from "../components/BackLink";
import arrow from "../assets/images/arrow-forward.svg";
import "../components/css/cards.css";
import "./css/cards.css";
import Footer from "./Footer";
import ModalWindow from "./ModalWindow";

function Cards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimated, setAnimated] = useState(false);
  const { user } = useContext(AuthContext);
  const { addStudySetToUser, getStudyData, studyData, setModuleId, setTopicId, setStudySetId, setSuccesWindow, setErrorWindow} = useContext(StudySetsContext);
  const { hasToken, getUserInfo } = useContext(AuthContext);
  const {moduleId, topicId, studySetId} = useParams();
  
  useEffect(() => {
    getStudyData();
    console.log("Topic Id:", topicId);
    console.log("StudySet Id:", studySetId);
    getUserInfo();
    setModuleId(moduleId);
    setTopicId(topicId);
    setStudySetId(studySetId);
    setSuccesWindow(false);
    setErrorWindow(false);
  }, []);

  const currentTopic = studyData?.topics
  ?.filter((topic) => topic._id === topicId)[0].title;

  const currentCardsSet = studyData?.topics
    ?.filter((topic) => topic._id === topicId)[0]
    ?.studySets.filter((set) => set._id === studySetId)[0];

  const author = studyData?.topics
  ?.filter((topic) => topic._id === topicId)[0]
  ?.studySets.filter((set) => set._id === studySetId)[0].createdBy;

  const currentCard = currentCardsSet?.cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
    );
    setIsFlipped(false);
    setAnimated(true);
    setTimeout(() => {
      setAnimated(false);
    }, 100);
  };

  const handlePreviousCard = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentCardsSet?.cards.length) %
        currentCardsSet?.cards.length
    );
    setIsFlipped(false);
    setAnimated(true);
    setTimeout(() => {
      setAnimated(false);
    }, 100);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <section className='max-container padding-container relative'>
      <ModalWindow />
        {currentCardsSet && (
          <div key={currentCardsSet._id}>
            <div className="flex justify-between flex-wrap md:flex-nowrap items-center">
              <div className="basis-[30%] md:basis-[20%] order-1">
                <BackLink path={`/module/${moduleId}`} />
              </div>
              <p className='basis-[100%] md:basis-[60%] order-3 md:order-2 text-center text-[2.4em] md:text-[3em] text-leading-[120%]'>{currentCardsSet.title}</p>
              <div className="basis-[65%] md:basis-[20%] flex flex-col items-end order-2">
                <p className='text-right dm-sans-bold text-[1.4em] md:text-[1.7em]'>{currentTopic}</p>
                <Link className={`${author?.nickName ? "block": "hidden"} flex flex-col items-end text-[1.2em] md:text-[1.4em] text-leading-[150%]`} to={hasToken && user?._id === author?._id ? `/user/${user?._id}` : `/users/${author?._id}/all-study-sets` }>  
                  <p className='text-right'>Created by: <br className="md:hidden"/> {author?.nickName}</p>
                  <img className='text-right rounded-full w-[20px] sm:w-[30px] md:w-[40px]' src={author?.photo} alt="author's photo" />
                </Link>
              </div>
            </div>
            <div
              className={`flip-container flex justify-center ${
                isAnimated ? "animate" : ""
              } mt-[15px] sm:mt-[25px] md:mt-[40px]`}
              onClick={handleFlip}
            >
              <div className={`flip-card ${isFlipped ? "flipped " : ""} w-screen sm:w-[80vw] md:w-[60vw] min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] next-card`}>
                <div className={`flip-content flex flex-col items-center justify-between p-[16px] md:p-[32px]`}>
                  <div className="basis-[10%]"/>
                  <div className="basis-[80%] flex flex-col justify-center items-center">
                    <p className="text-[2em] sm:text-[2.5em] md:text-[3em] text-center text-leading-[100%]" >{currentCard?.question}</p>
                    <img src={currentCard?.image} alt=""   />
                  </div>
                  <p className="basis-[10%] text-[1.4em] text-leading-[150%]">Show the answer</p>
                </div>
                <div className={`flip-content flex justify-center items-center p-[16px] md:p-[32px]`}>
                  <p className="text-[3em] text-leading-[100%]">{currentCard?.answer}</p>
                </div>
              </div>
            </div>
            <div className='flex w-[60vw] justify-center gap-[40px] items-center mx-auto mt-[21px]'>
              <button
                onClick={handlePreviousCard}
              >
                <img src={arrow} alt="previous" className="rotate-180" />
              </button>
              <p className='text-[1.7em] dm-sans-bold'>
                {currentIndex + 1}/{currentCardsSet?.cards.length}
              </p>
              <button
                onClick={handleNextCard}
              >
                <img src={arrow} alt="next" />
              </button>
            </div>
            <div className='my-[24px] w-full sm:w-[80vw] md:w-[60vw] mx-auto'>
              <progress
                  aria-label="loading"
                  max={currentCardsSet?.cards.length}
                  value={currentIndex +1}
                  className="h-[1px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-black"> 
              </progress>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-[30px] md:mt-[50px] lg:mt-[70px]">
          <button
            className={`${hasToken ? "block" : "hidden"} bg-[#FFC2FF] text-[1.2em] dm-sans-bold uppercase text-leading-[120%] py-[8px] px-[16px] rounded-[8px]`}
            onClick={() => {addStudySetToUser(user._id, currentCardsSet._id, topicId)} }
          >
            Add to my sets
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cards;
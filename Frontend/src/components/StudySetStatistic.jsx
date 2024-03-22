import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import StartPracticeButtons from '../components/StartPracticeButtons';
import BackLink from '../components/BackLink';

function StudySetStatistic() {
    const {countCardsByStatus, round} = useContext(UserStudySetsContext);
    const {getUserInfo, user} = useContext(AuthContext);
    const {id} = useParams();
    const locate = useLocation();

    useEffect(() => {
        getUserInfo();
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    const cardsCount = studySet ? countCardsByStatus([studySet]) : { mastered: 0, needPractice: 0, notStudied: 0 };
    const userId = user?._id;
    const studySetId = studySet?._id;
    const totalCards = cardsCount.mastered + cardsCount.needPractice + cardsCount.notStudied;
    
    return (
      <div className='flex justify-center w-full'>
      <div className="mt-8 p-6 w-full bg-white rounded shadow-lg">
        <div className="basis-[30%]">
          <BackLink path={`/user/${user.id}/studySets`} />
        </div>
        {studySet && (
          <>
            <h2
              className={
                locate.pathname === `/studySet/endPractice/${id}`
                  ? "block dm-sans-medium text-[2em] mb-6"
                  : "hidden"
              }
            >
              Round: {round}
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-20">
              {/* <div className="gap-20 lg:grid-cols-12"> */}
                <div className="">
                  {/* <h2>Topic: {studySet.topicTitle}</h2> */}
                  <h3 className="dm-sans-medium text-[2.4em] mb-[20px]">
                    {studySet.studySet.title}
                  </h3>
                  <h3 className="dm-sans-medium text-[2em] mb-[10px]">
                    Description
                  </h3>
                  <p className="dm-sans-regular text-[1.4em] w-60">
                    {studySet.studySet.description}
                  </p>
                </div>
                <section className="">
                  <h2 className="dm-sans-medium text-[2em]">
                    Number of flashcards: {totalCards}{" "}
                  </h2>
                  <div className="mt-[40px] flex items-center">
                    <p className="dm-sans-regular text-[1.4em]">Mastered </p>
                    <progress
                      aria-label="loading"
                      id="p02g"
                      max={totalCards}
                      value={cardsCount.mastered}
                      className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-lime-500 [&::-moz-progress-bar]:bg-cyan-500"
                    ></progress>
                    <p className="dm-sans-medium text-[1.4em]">
                      {" "}
                      {cardsCount.mastered}
                    </p>
                    <p className="ml-[10px] dm-sans-medium text-[1.4em]">
                      Cards
                    </p>
                  </div>
                  <div className="mt-[40px] flex items-center">
                    <p className="flex-none dm-sans-regular text-[1.4em]">
                      Need practice
                    </p>
                    <progress
                      aria-label="loading"
                      id="p02g"
                      max={totalCards}
                      value={cardsCount.needPractice}
                      className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-500 [&::-moz-progress-bar]:bg-cyan-500"
                    ></progress>
                    <p className="dm-sans-medium text-[1.4em]">
                      {" "}
                      {cardsCount.needPractice}
                    </p>
                    <p className="ml-[10px] dm-sans-medium text-[1.4em]">
                      Cards
                    </p>
                  </div>
                  <div className="mt-[40px] flex items-center mb-[10px]">
                    <p className="flex-none dm-sans-regular text-[1.4em]">
                      Not studied
                    </p>
                    <progress
                      aria-label="loading"
                      id="p02g"
                      max={totalCards}
                      value={cardsCount.notStudied}
                      className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-cyan-500"
                    ></progress>
                    <p className="dm-sans-medium text-[1.4em]">
                      {" "}
                      {cardsCount.notStudied}
                    </p>
                    <p className="ml-[10px] dm-sans-medium text-[1.4em]">
                      Cards
                    </p>
                  </div>
                </section>
                <div className="">
                  <StartPracticeButtons
                    edit={studySet?.edit}
                    studySetId={studySet?._id}
                    userId={user?._id}
                  />
                </div>
              {/* </div> */}
            </div>
          </>
        )}
      </div>
      </div>
    );
}

export default StudySetStatistic
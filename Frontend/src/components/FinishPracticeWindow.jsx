import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import close from "../assets/images/close.svg"
import EndPracticeButtons from '../components/EndPracticeButtons'

function FinishPracticeWindow({correctAnswers, progress}) {
    const {countCardsByStatus, round, setRound, isRoundFinished} = useContext(UserStudySetsContext);
    const {getUserInfo, user} = useContext(AuthContext);
    const {userId, id} = useParams();
    const locate = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    const cardsCount = studySet ? countCardsByStatus([studySet]) : { mastered: 0, needPractice: 0, notStudied: 0 };
    const totalCards = cardsCount.mastered + cardsCount.needPractice + cardsCount.notStudied;
    const studySetId = studySet?._id;

    const onClickFinish = () => {
        navigate(`/user/${userId}/studySet/${studySetId}`);
        setRound(1);
    }

    return (
        <>
                {studySet && (
                    <div className={`${isRoundFinished ? "block" : "hidden"} bg-white z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[290px] p-[10px] sm:p-[24px] border-[1px] rounded-[8px] border-[#BCC0C1] mx-auto`}>
                        <div className='flex justify-between border-b-[#BCC0C1] border-b-[1px] py-[10px] mb-[24px]'>
                            <h2 className='text-[3.2em]'>Finish</h2>
                            <img onClick={onClickFinish} className='cursor-pointer' src={close} alt="finish" />
                        </div>
                        <h3 className={"block text-[2em] dm-sans-medium mb-[34px]"}>Number of rounds: {round}</h3>
                        <div className={`${locate.pathname === `/user/${userId}/studySet/practice/${id}` ? "flex" : "hidden"} text-[1.7em] mb-[20px] sm:mb-[35px] md:mb-[56px] flex-col gap-[27px]`}>
                            <div className="flex items-center gap-[8px]">
                                <p>Mastered</p>
                                <progress
                                    aria-label="loading"
                                    id="mastered"
                                    max={totalCards}
                                    value={cardsCount.mastered}
                                    className="h-[8px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-[#69CA61]"
                                ></progress>
                                <p className="whitespace-nowrap">
                                    {cardsCount.mastered} cards
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="whitespace-nowrap">Need practice </p>
                                <progress
                                    aria-label="loading"
                                    id="need-practice"
                                    max={totalCards}
                                    value={cardsCount.needPractice}
                                    className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-[#FFCC29]"
                                ></progress>
                                <p className="whitespace-nowrap">
                                    {cardsCount.needPractice} cards
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="whitespace-nowrap">Not studied</p>
                                <progress
                                    aria-label="loading"
                                    id="need-practice"
                                    max={totalCards}
                                    value={cardsCount.notStudied}
                                    className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-[#FF5E5E]"
                                ></progress>
                                <p className="whitespace-nowrap">
                                    {cardsCount.notStudied} cards
                                </p>
                            </div>  
                        </div>   
                        <div className={`${locate.pathname !== `/user/${userId}/studySet/practice/${id}` ? "flex flex-col" : "hidden"} text-[1.7em] gap-[27px] mb-[56px]`}>
                            <p>You answered {correctAnswers} out of {studySet?.cards?.length} {correctAnswers > 1 ? "questions" : "question"} correctly</p>
                            <p>Your progress: {progress}%</p>
                        </div>
                           <EndPracticeButtons />
                    </div>
                )}
       </> 
    )
}

export default FinishPracticeWindow
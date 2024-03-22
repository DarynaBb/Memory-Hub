import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import mastered from "../assets/images/btn-mastered.svg";
import needPractice from "../assets/images/btn-need-practice.svg";
import notStudied from "../assets/images/btn-not-studied.svg";

function PracticeButtons({currentSet}) {
    const {getUserInfo, user} = useContext(AuthContext);
    const {id} = useParams();
    const {currentIndex, backendApiUrl, handleNextCard, setIsRoundFinished} = useContext(UserStudySetsContext);
    const currentCard = currentSet[currentIndex];
    const currentCardId = currentCard?._id;

    useEffect(() => {
        getUserInfo();
    }, [])

    const userId = user?._id;
    const buttonStyle = "w-[50%] whitespace-nowrap min-w-[160px] sm:basis-[30%] py-[17px] px-[27px] set-box-shadow border-[1px] border-[#BCC0C1] rounded-[8px] uppercase text-[1.2em] dm-sans-bold flex gap-[8px] items-center"

    const onClickHandler = async(status) => {
        try {
            await axios.patch(`${backendApiUrl}/user/${userId}/${id}/${currentCardId}`, {
                newStatus: status
            });
            if (currentIndex === currentSet.length - 1) {
                setIsRoundFinished(true);
            } else {
                handleNextCard(currentSet);
            }
            console.log("Status changed");
        } catch (error) {
            console.log("error while changing status:", error);
        }
    }

  return (
    <div className='flex justify-center gap-[16px] md:gap-[32px] flex-wrap md:flex-nowrap'>
        <button onClick={() => onClickHandler("mastered")} className={`${buttonStyle} hover:border-[#69CA61]`}>
            <img src={mastered} alt="mastered button" />
            <p>mastered</p>
        </button>
        <button onClick={() => onClickHandler("need practice")} className={`${buttonStyle} hover:border-[#FFCC29]`}>
            <img src={needPractice} alt="need practice button" />
            <p>need practice</p>
        </button>
        <button onClick={() => onClickHandler("not studied")} className={`${buttonStyle} hover:border-[#FF5E5E]`}>
            <img src={notStudied} alt="not studied button" />
            <p>not studied</p>
        </button>
    </div>
  )
}

export default PracticeButtons
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserStudySetsContext } from '../context/UserStudySetsContext';

function EndPracticeButtons() {
    const {userId, id} = useParams();
    const navigate = useNavigate();
    const {setRound, setIsRoundFinished, setCurrentIndex, setCorrectAnswers, setWrongAnswers, setProgress} = useContext(UserStudySetsContext);

    const onClickNextRound = () => {
        setCorrectAnswers(0);
        setWrongAnswers(0); 
        setProgress(0);
        setIsRoundFinished(false);
        setCurrentIndex(0);
        setRound(prev => prev + 1);
    }

    const onClickFinish = () => {
        navigate(`/user/${userId}/studySet/${id}`);
        setRound(1);
    }

    const btnStyle = "basis-[50%] min-w-[160px] whitespace-nowrap bg-black text-white py-[19px] px-[35px] rounded-[8px] uppercase text-[1.4em] dm-sans-bold border-[1px] border-transparent hover:bg-white hover:text-black hover:border-[1px] hover:border-black"

  return (
    <div className='flex flex-wrap sm:flex-nowrap justify-center gap-[20px] '>
        <button className={btnStyle} onClick={onClickNextRound}>Next round</button>
        <button className={btnStyle} onClick={onClickFinish}>Finish</button>
    </div>
  )
}

export default EndPracticeButtons
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserStudySetsContext } from '../context/UserStudySetsContext';


function StartPracticeButtons({edit, studySetId, userId}) {

    const {deleteSavedStudySet, setStudySetId} = useContext(UserStudySetsContext);
    const navigate = useNavigate();

    const onClickPractice = (setId) => {
        setStudySetId(studySetId);
        navigate(`/user/${userId}/studySet/practice/${setId}`);
    }

    const onClickLearn = (setId) => {
        navigate(`/user/${userId}/studySet/learn-cards/${setId}`);
    }

    const onClickWrite = (setId) => {
        navigate(`/user/${userId}/study-set/write-mode/${setId}`);
    }

  return (
    <div className='flex flex-col gap-[20px]'>
        <button onClick={() => onClickPractice(studySetId)} className='border-solid border-[1px] border-black text-[1.2em] text-black py-[12px] px-[8px] rounded-[8px] hover:bg-black hover:text-white'>Start practice</button>
        <button onClick={() => onClickLearn(studySetId)} className='border-solid border-[1px] border-black text-[1.2em] text-black py-[12px] px-[8px] rounded-[8px] hover:bg-black hover:text-white'>Test your knowledge</button>
        <button onClick={() => onClickWrite(studySetId)} className='border-solid border-[1px] border-black text-[1.2em] text-black py-[12px] px-[8px] rounded-[8px] hover:bg-black hover:text-white'>Write mode</button>
    </div>
  )
}

export default StartPracticeButtons
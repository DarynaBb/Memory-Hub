import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useParams,useNavigate } from 'react-router-dom';
import StartPracticeButtons from '../components/StartPracticeButtons';
import StudySetStatistic from '../components/StudySetStatistic';

function UserStudySet() {
    const {getUserInfo, user, hasToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams();
    

    useEffect(() => {
      if (hasToken) { 
       getUserInfo();
      } else {
        navigate('/')
      }
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    
  return (
    <>
    {hasToken && (
    <section className='p-[30px] flex gap-[20px]'>
            {studySet && (
              <>
                    <StudySetStatistic />
                    {/* <StartPracticeButtons edit={studySet?.edit} studySetId={studySet?._id} userId={user?._id}/> */}
                </>
            )}
        </section>
    )}
    </>
  )
}

export default UserStudySet
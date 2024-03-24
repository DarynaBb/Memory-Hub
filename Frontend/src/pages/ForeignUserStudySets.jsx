import React, { useContext, useEffect, useState } from 'react';
import { StudySetsContext } from '../context/StudySetsContext';
import { useNavigate, useParams } from 'react-router-dom';
import StudySetsSearchBar from '../components/StudySetsSearchBar';
import BackLink from '../components/BackLink';
import arrow from "../assets/images/arrow-forward.svg";

function ForeignUserStudySets() {
    const { getUserStudySets, userStudySets, getUserShortData, userShortData, moduleId, topicId, studySetId } = useContext(StudySetsContext);
    const { userId } = useParams();
    const [groupedStudySets, setGroupedStudySets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserStudySets(userId);
        getUserShortData(userId);
    }, []);

    console.log("userStudysets", userStudySets)

    useEffect(() => {
        const filteredStudySets = userStudySets?.savedStudySets?.reduce((acc, studySet) => {
            const topicTitle = studySet?.topic?.title;
            const description = studySet?.studySet?.description || ''; 
            if (
                topicTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                description?.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                const existingTopicIndex = acc.findIndex(item => item.title === topicTitle);
                if (existingTopicIndex !== -1) {
                    acc[existingTopicIndex].studySets.push(studySet);
                } else {
                    acc.push({ title: topicTitle, studySets: [studySet] });
                }
            }
            return acc; 
        }, []);
        setGroupedStudySets(filteredStudySets);
    }, [searchQuery]);
    
    const onClickHandler = (topicId, studySetId) => {
        navigate(`/users/${userId}/topic/${topicId}/study-set/${studySetId}`);
      };

    return (
        <section className='p-[40px]'>
            <BackLink path={`/module/${moduleId}/studySet/${topicId}/${studySetId}`} />
            {userStudySets && userShortData && (
                <div>
                    <div className='flex justify-center items-center gap-[10px] mb-[20px] md:mb-[42px]'>
                        <img className='w-[30px] h-[30px] md:w-[60px] md:h-[60px] rounded-[50%]' src={userShortData?.photo} alt="" />
                        <h2 className='text-[2.4em] md:text-[3em] lg:text-[4em]'>{userShortData?.nickName}</h2>
                    </div>
                    <h3 className='text-center mb-[10px] sm:mb-[20px] md:mb-[32px] dm-sans-medium text-[1.4em] text-leadong-[150%]'>ALL STUDY SETS</h3>
                    <div className='flex flex-col w-full items-center justify-center mb-[20px] sm:mb-[30px] md:mb-[48px] mx-auto'>
                        <div className='hidden md:block w-[80%] h-[1px] bg-[#E1E1E1]'/>
                        <div className='w-[15%] h-[1px] relative z-3 -mt-[1px] bg-black'/>
                    </div>
                    <div className='mb-[40px] md:mb-[55px]'>
                        <StudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </div>
                    <ul className='flex flex-col gap-[25px] w-full items-center justify-center'>
                        {groupedStudySets?.map(({ title, studySets }) => (
                            <li key={title} className='w-full md:w-[50%]'>
                                <div className='flex items-center gap-[4px] border-b-[1px] border-[#E1E1E1] pb-[14px]'>
                                    <h3 className='dm-sans-bold text-[1.7em] md:text-[2em]'>{title}</h3>
                                    <img src={arrow} className='rotate-45' alt="arrow" />
                                </div>
                                
                                <ul className='flex flex-col w-full'>
                                    {studySets?.map(studySet => (
                                    <li key={studySet?._id} onClick={() => onClickHandler(studySet.topic._id, studySet.studySet._id)} className='border-b-[1px] w-full hover:bg-[#69CA61] cursor-pointer border-[#E1E1E1] py-[14px]'>
                                        {studySet?.studySet && ( 
                                            <div className='flex w-full justify-between items-center'>
                                                <p className='dm-sans-medium text-[1.4em] md:text-[1.7em] text-leading-[150%]'>{studySet?.studySet?.title}</p>
                                                <div className='flex hover:underline items-center gap-[8px] cursor-pointer'>
                                                    <button className='dm-sans-bold text-[1.2em] uppercase' onClick={() => onClickHandler(studySet.topic._id, studySet.studySet._id)}>Go to set</button>
                                                    <img src={arrow} alt="arrow" />
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default ForeignUserStudySets;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { useNavigate } from 'react-router-dom';
import UserStudySetsSearchBar from '../components/UserStudySetsSearchBar';
import arrow from "../assets/images/arrow-forward.svg";
import StudySetsSearchBar from '../components/StudySetsSearchBar';


function UserStudySets() {
    const { getUserInfo, user, savedStudySets, setSavedStudySets, hasToken } = useContext(AuthContext);
    const { setStudySetId, deleteSavedStudySet } = useContext(UserStudySetsContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudySets, setFilteredStudySets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken) {
            getUserInfo();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const filteredSets = user?.savedStudySets?.filter(studySet =>
            studySet?.studySet?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudySets(filteredSets);
    }, [user, searchQuery]);

    const userId = user?._id;

    const onClickHandler = (id) => {
        setStudySetId(id);
        navigate(`/user/${userId}/studySet/${id}`);
    };

    const handleDeleteStudySet = async (studySetId) => {
        try {
            await deleteSavedStudySet(userId, studySetId);
            const updatedFilteredSets = filteredStudySets.filter(set => set._id !== studySetId);
            setFilteredStudySets(updatedFilteredSets);
        } catch (error) {
            console.error('Error deleting study set:', error);
        }
    };

    const onClickEdit = (setId) => {
        navigate(`/studySet/edit/${setId}`);
    };

    return (
        <>
            {hasToken && (
                <section className='md:max-container md:padding-container flex flex-col gap-[20px]'>
                    <div className='flex justify-center items-center gap-[32px] flex-wrap sm:flex-nowrap mb-[20px] md:mb-[50px]'>
                        <div className='basis-[100%] sm:basis-[48%]'>
                            <StudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <button onClick={() => navigate('/createSet')} className='basis-[40%] sm:basis-[15%] whitespace-nowrap bg-[#FFC2FF] py-[13px] border-[1px] hover:border-[#FFC2FF] px-[50px] hover:bg-white  rounded-[8px] text-[1.2em] dm-sans-bold'>CREATE NEW SET</button>
                    </div>
                    <ul className='flex flex-col gap-[15px] '>
                        {Object.entries(
                            (filteredStudySets || []).reduce((groups, studySet) => {
                                const topicTitle = studySet?.topic?.title;
                                if (!groups[topicTitle]) {
                                    groups[topicTitle] = [];
                                }
                                groups[topicTitle].push(studySet);
                                return groups;
                            }, {}) || {}
                        ).map(([topicTitle, studySetsUnderTopic]) => (
                            <li className='w-full ' key={topicTitle}>
                                <div className='flex items-center gap-[4px] border-b-[1px] border-[#E1E1E1] pb-[14px]'>
                                    <h3 className='dm-sans-bold text-[1.7em] md:text-[2em]'>{topicTitle}</h3>
                                    <img src={arrow} className='rotate-45' alt="arrow" />
                                </div>
                                <ul className='flex w-full flex-wrap justify-between'>
                                    {studySetsUnderTopic.map(studySet => (
                                        <>
                                        <li key={studySet._id} className='border-b-[1px] basis-[75%] cursor-pointer hover:bg-[#69CA61]  border-[#E1E1E1] flex'>
                                            <div onClick={() => onClickHandler(studySet._id, topicTitle)} className='flex w-full justify-between items-center'>
                                                <p className='hover-child  dm-sans-medium text-[1.4em] md:text-[1.7em] text-leading-[150%]'>{studySet.studySet.title}</p>
                                                <div className='hover-child hidden md:flex hover:underline items-center gap-[8px] cursor-pointer'>
                                                    <button className='dm-sans-bold text-[1.2em] uppercase' onClick={() => onClickHandler(studySet.topic._id, studySet.studySet._id)}>Go to set</button>
                                                    <img src={arrow} alt="arrow" />
                                                </div>
                                                
                                            </div>
                                        </li>
                                        <div className='basis-[25%] py-[14px] border-[#E1E1E1] border-b-[1px] flex justify-end'>
                                            <button onClick={studySet?.edit === "no" ? () => handleDeleteStudySet(studySet._id) : onClickEdit}  
                                        className={`bg-black text-white dm-sans-bold uppercase min-w-[65px] max-h-[48px] text-[1.2em] py-[6px] px-[12px] sm:py-[10px] sm:px-[20px] md:px-[40px] md:py-[18px] rounded-[8px] hover:bg-white hover:text-black hover:border-black border-[1px] inline-flex items-center justify-center`}>{studySet?.edit === "no" ? "Delete" : "edit"}</button> 
                                        </div>
                                </>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );

}

export default UserStudySets;

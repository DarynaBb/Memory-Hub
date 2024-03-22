import React, { useContext, useEffect, useState } from 'react';
import { StudySetsContext } from '../context/StudySetsContext';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import StudySetsSearchBar from '../components/StudySetsSearchBar';
import arrow from "../assets/images/arrow-forward.svg";
import BackLink from './BackLink';
import Footer from './Footer';

function StudySets() {
  const { setStudySetId, setTopicId, getModulesData, modulesData, getModuleData, moduleData } = useContext(StudySetsContext);
  const { getUserInfo, setShowLoginForm, setShowSignUpForm } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const location = useLocation();
  console.log("id", moduleId)


useEffect(() => {
    getUserInfo();
    console.log("id", moduleId);
    if (location.pathname === "/all-study-sets") {
        getModulesData();
        setShowLoginForm(false);
        setShowSignUpForm(false);
    } else {
        getModuleData(moduleId);
        setShowLoginForm(false); 
        setShowSignUpForm(false); 
    }
}, [location.pathname, moduleId]);

  
let filteredStudySets;
if (location.pathname === "/all-study-sets") {
    filteredStudySets = [].concat(...(modulesData || []).map(module => (module.topics || []).map(topic => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            return { ...topic, studySets: filteredSets };
        }
        return null;
    })).filter(filteredTopic => filteredTopic !== null));
    console.log("filtered:", filteredStudySets);
} else {
    filteredStudySets = (moduleData?.topics || []).map(topic => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            return { ...topic, studySets: filteredSets };
        }
        return null;
    }).filter(filteredTopic => filteredTopic !== null);
    console.log("filtered:", filteredStudySets);
}


const studySets = location.pathname === "/all-study-sets" ? (modulesData || []).reduce((accumulator, module) => {
    return accumulator.concat((module.topics || []).reduce((topicAccumulator, topic) => {
        const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredSets.length) {
            topicAccumulator.push(...filteredSets.map(set => ({ topicId: topic._id, topic: topic.title, ...set })));
        }
        return topicAccumulator;
    }, []));
}, []) : (moduleData?.topics || []).reduce((accumulator, topic) => {
    const filteredSets = (topic.studySets || []).filter(studySet => studySet.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filteredSets.length) {
        accumulator.push(...filteredSets.map(set => ({ topicId: topic._id, topic: topic.title, ...set })));
    }
    return accumulator;
}, []);


let top6MostShared;
if (!Array.isArray(studySets)) {
    console.error("Study sets is not an array.");
} else {
    studySets.sort((a, b) => b.shared - a.shared);
    top6MostShared = studySets.slice(0, 6);
}


const goToSetHandler = (topicId, studySetId) => {
    navigate(`/module/${moduleId}/studySet/${topicId}/${studySetId}`)
    setTopicId(topicId);
    setStudySetId(studySetId);
  };

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    var scroll = document.getElementById('scroll');
    slider.scrollLeft = slider.scrollLeft - 500;
    var currentLeft = parseInt(scroll.style.left || 0);
    var newLeft = Math.max(currentLeft - 300, 0); 
    var maxLeft = slider.offsetWidth - scroll.offsetWidth; 
    scroll.style.left = Math.min(newLeft, maxLeft) + 'px'; 
};

const slideRight = () => {
    var slider = document.getElementById('slider');
    var scroll = document.getElementById('scroll');
    slider.scrollLeft = slider.scrollLeft + 500;
    var currentLeft = parseInt(scroll.style.left || 0);
    var newLeft = currentLeft + 300;
    var container = document.querySelector('.container');
    var maxLeft = container.offsetWidth - scroll.offsetWidth; 
    scroll.style.left = Math.min(newLeft, maxLeft) + 'px'; 
};

  return (
    <>
    <section className='flex flex-col py-[20px] bg-[#F6F7FB] max-container padding-container'>
        <BackLink path="/modules" />
        <div className='flex flex-col items-center mb-[20px] sm:mb-[35px] lg:mb-[64px]'>
            <StudySetsSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <h2 className='text-center text-[2.4em] md:text-[4em] mb-[16px] sm:mb-[25px] lg:mb-[50px]'>{location.pathname === "/all-study-sets" ? "All topics" : moduleData?.title}</h2>
            <ul className='flex justify-center flex-wrap gap-[10px] sm:gap-[20px] mb-[20px] md:mb-[50px]'>
                {location.pathname === "/all-study-sets" ? (modulesData?.map(module => (
                    <li className='text-center dm-sans-medium text-[1.4em] md:text-[1.7em]' key={module._id}>{module?.title}</li>
                ))) : 
                (moduleData?.topics?.map(topic => (
                    <li className='text-center dm-sans-medium text-[1.4em]' key={topic._id}>{topic?.title}</li>
                )))}
            </ul>
        
        <h2 className='text-[2.4em] md:text-[4em] text-center md:text-left mb-[20px] sm:mb-[30px] md:mb-[56px]'>Popular study sets</h2>
            <ul id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide flex gap-[32px] mb-[40px]'>
                {top6MostShared?.map((studySet, index) => (
                    <li key={studySet._id} onClick={() => goToSetHandler(studySet.topicId, studySet._id)} className={`cursor-pointer border-[1px] set-box-shadow-${index+1} border-[#BCC0C1] study-set-line-${index+1}-hover rounded-[8px] px-[16px] flex flex-col justify-between pt-[16px] pb-[21px] set-box-shadow`}>
                        <p className='dm-sans-medium text-[2em]'>{studySet.title}</p>
                        <div className={`study-set-line-${index+1} border-[2px] w-full mb-[8px]`}/>
                        <p className='min-w-[200px] max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis'>{studySet.description}</p>
                        <div className='flex justify-between items-center gap-[10px]'>
                            <p className='text-[#9A9A9A] text-leading-[150%]'>{studySet.cards.length} cards</p>
                            <div className='flex hover:underline items-center gap-[8px]'>
                                <button className='dm-sans-bold text-[1.2em] uppercase' onClick={() => goToSetHandler(studySet.topicId, studySet._id)}>Go to set</button>
                                <img src={arrow} alt="arrow" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        <div className='flex items-center justify-between gap-[32px]'>
            <div className='h-[1px] basis-[90%] bg-[#BCC0C1]'/>
            <div className='flex gap-[10px] md:gap-[20px] lg:gap-[44px] justify-end items-center'>
                    <img src={arrow} className='cursor-pointer rotate-180' onClick={slideLeft} alt="" />
                    <img src={arrow} className='cursor-pointer' onClick={slideRight} alt="" />
            </div>
        </div>

        <h2 className='text-[2.4em] md:text-[4em] mb-[20px] sm:mb-[30px] md:mb-[56px]'>All study sets</h2>
        <ul className='flex gap-[15px] md:gap-[25px] lg:gap-[32px] flex-wrap justify-between'>
            {filteredStudySets?.map((topic, topicIndex) => {
                return topic?.studySets.map((studySet, studySetIndex) => {
                    const index = topicIndex * topic.studySets.length + studySetIndex;
                    const styleClass = `study-set-line-${(index % 6) + 1}`;
                    return (
                        <li key={studySet._id} onClick={() => goToSetHandler(topic._id, studySet._id)} className={`cursor-pointer border-[1px] border-[#BCC0C1] ${styleClass}-hover rounded-[8px] basis-[100%] md:basis-[48%] lg:basis-[30%] xl:basis-[23%] px-[16px] flex flex-col justify-between pt-[16px] pb-[21px] set-box-shadow `}>
                            <p className='dm-sans-medium text-[2em]'>{studySet.title}</p>
                            <div className={`${styleClass} border-[2px] w-full mb-[8px]`}/>
                            <p className='text-[1.2em] text-leading-[150%] mb-[25px]'>{studySet.description}</p>
                            <div className='flex justify-between items-center'>
                                <p className='text-[#9A9A9A] text-leading-[150%]'>{studySet.cards.length} cards</p>
                                <div className='flex hover:underline items-center gap-[8px]'>
                                    <button className='dm-sans-bold text-[1.2em] uppercase' onClick={() => goToSetHandler(topic._id, studySet._id)}>Go to set</button>
                                    <img src={arrow} alt="arrow" />
                                </div>
                            </div>
                        </li>
                    );
                });
            })}
        </ul>
        
    </section>
    <Footer />
    </>
  );
}

export default StudySets;

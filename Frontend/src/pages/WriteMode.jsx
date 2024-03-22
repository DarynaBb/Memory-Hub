import React, { useContext, useEffect, useState } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import BackLink from '../components/BackLink';
import success from "../assets/images/test-success.svg";
import wrong from "../assets/images/test-wrong.svg";
import FinishPracticeWindow from '../components/FinishPracticeWindow';

function WriteMode() {
    const { currentIndex, setCurrentIndex, setIsRoundFinished, setRound } = useContext(UserStudySetsContext);
    const { hasToken, getUserInfo, user } = useContext(AuthContext);
    const { userId, id } = useParams();
    const [studySet, setStudySet] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentCardsSet, setCurrentCardsSet] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0);
    const [answer, setAnswer] = useState("");
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [showStatistic, setShowStatistic] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken) {
            getUserInfo();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setShowStatistic(false);
        setIsRoundFinished(false);
        setRound(1);
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setStudySet(studySet);
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
    }, [user, id]);

        useEffect(() => {
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
        
        if (currentCard) {
            const correctAnswer = currentCard?.card?.answer;
            setCorrectAnswer(correctAnswer);
            setShowMessages(false);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentCard) {
            const correctAnswer = currentCard.card.answer;
            setCorrectAnswer(correctAnswer);
        }
    }, [currentCard]);

    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) {
            setProgress(((correctAnswers / currentCardsSet.length) * 100).toFixed(0));
        }
    }, [correctAnswers, currentCardsSet]);

    useEffect(() => {
        if (currentIndex >= currentCardsSet?.length) {
            setShowStatistic(true);
        }
    }, [currentIndex, currentCardsSet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnswer("");
        setShowMessages(true);
        if (answer === correctAnswer) {
            setMessage("Correct!");
            setCorrectAnswers(prevValue => prevValue + 1);
        } else {
            setMessage(`Almost!<br />The correct answer is:<br />${correctAnswer}`);
            setWrongAnswers(prevValue => prevValue + 1);
        }
    }

    const okButtonHandler = () => {
        if (currentIndex + 1 >= currentCardsSet?.length) {
            setIsRoundFinished(true);
            setShowMessages(false);
        } else {
            setCurrentIndex(prevValue => prevValue + 1);
        }
    }

    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) {
            setProgress(((correctAnswers / currentCardsSet.length) * 100).toFixed(0));
        }
    }, [correctAnswers, currentCardsSet]);
    if (!user) {
        return null; 
    }


    return (
        <>
            {hasToken && (
                <section className='max-container padding-container'>
                    <FinishPracticeWindow correctAnswers={correctAnswers} progress={progress}/>
                    {currentCardsSet && currentCardsSet.length - 1 >= currentIndex && (
                        <div className=''>
                            <div className="flex justify-between md:items-center mb-[20px] md:mb-[32px] flex-wrap md:flex-nowrap items-center">
                                <div className="md:basis-[20%] order-1 flex items-center">
                                    <BackLink path={`/user/${userId}/studySet/${id}`} />
                                </div>
                                <p className='basis-[100%] md:basis-[60%] order-3 md:order-2 text-center text-[2.4em] md:text-[3em] text-leading-[120%]'>{studySet?.studySet?.title}</p>
                                <div className="basis-[65%] md:basis-[20%] flex flex-col items-end order-2">
                                    <p className='text-right dm-sans-bold text-[1.4em] md:text-[1.7em]'>{studySet?.topic?.title}</p>
                                </div>
                            </div>
                            <div className='w-[60vw] mx-auto relative'>
                                <div className='w-[100%] bg-[#FFF4FC] min-h-[30vh] rounded-[8px] p-[10px] flex flex-col justify-center'>
                                    <p className="text-[2.4em] sm:text-[3em] md:text-[4em] text-center text-leading-[100%]">{currentCard?.card?.question}</p>
                                </div>
                                <div className={`${showMessages ? "flex" : "hidden"} absolute z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] justify-center flex-col items-center gap-[15px] px-[24px] pt-[29px] pb-[40px] bg-white mt-[20px] min-w-[300px] border-[1px] rounded-[8px] border-[#BCC0C1]`}>
                                    <img src={isCorrect ? success : wrong} alt="" />
                                    <p className='text-[1.4em] text-leading-[150%]'>{isCorrect ? "Correct!" : <>Wrong! The right answer is: <br />"{correctAnswer}"</>}</p>
                                    <button onClick={okButtonHandler} className={`${isCorrect ? "bg-[#3EB655] hover:border-[#3EB655]" : "bg-[#FF5E5E] hover:border-[#FF5E5E]"} w-[100%] hover:bg-white text-white hover:text-black border-[1px] p-[6px] rounded-[5px]`}>OK</button>
                                </div>
                                <p className='text-[1.7em] dm-sans-bold text-center my-[21px]'>{currentIndex +1} / {currentCardsSet?.length}</p>
                                <div className='mb-[24px]'>
                                    <progress
                                        aria-label="loading"
                                        max={currentCardsSet.length}
                                        value={currentIndex +1}
                                        className="h-[1px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-black"> 
                                    </progress>
                                </div>
                            </div>
                            <div className={`w-[60vw] mx-auto`}>
                                <form action="" onSubmit={handleSubmit} className={`flex flex-col gap-[24px] items-center w-full`}>
                                    <input id="answer" disabled={showMessages ? true : false}  minLength="3" maxLength="70" required placeholder='Write your answer here' className='text-[1.7em] md:text-[2em] outline-[#BCC0C1] pl-[5px] sm:pl-[20px] md:pl-[32px] w-full border-[1px] border-[#BCC0C1] rounded-[8px] min-h-[15vh]' type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                                    <button className='uppercase text-[1.2em] dm-sans-bold py-[16px] px-[24px] rounded-[8px] bg-[#FFC2FF] border-[1px] hover:bg-white hover:border-[#FFC2FF]'>check my answer</button>
                                </form>
                            </div>
                        </div>
                    )}
                </section>
            )}
        </>
    );
}

export default WriteMode;


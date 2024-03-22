import React, { useContext, useEffect, useState } from "react";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PracticeButtons from "../components/PracticeButtons";
import CardFilter from "../components/CardFilter";
import BackLink from "../components/BackLink";
import arrow from "../assets/images/arrow-forward.svg";
import FinishPracticeWindow from "../components/FinishPracticeWindow";

function Practice() {
  const {
    currentIndex,
    isFlipped,
    setIsFlipped,
    handleNextCard,
    handlePreviousCard,
    setCurrentIndex,
    setIsRoundFinished,
    setRound,
  } = useContext(UserStudySetsContext);
  const { hasToken, getUserInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId, id } = useParams();
  const [filterStatus, setFilterStatus] = useState("all");
  const [noCardsMessage, setNoCardsMessage] = useState("");
  const [currentCardsSet, setCurrentCardsSet] = useState([]);
  const [currentStudySet, setCurrentStudySet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasToken) {
      async function fetchData() {
        await getUserInfo();
        setCurrentIndex(0);
        setRound(1);
        setIsRoundFinished(false);
        setLoading(false); // Set loading to false once user data is fetched
      }
      fetchData();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      const studySet =
        user.savedStudySets?.find((studySet) => studySet._id === id) || {};
      setCurrentStudySet(studySet);
      setCurrentCardsSet(studySet.cards || []);
    }
  }, [user, id]);

  console.log("studyset:", currentStudySet);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filterStatus]);

  useEffect(() => {
    if (filterStatus === "all") {
      getUserInfo();
      const studySet =
        user?.savedStudySets?.find((studySet) => studySet._id === id) || {};
      setCurrentStudySet(studySet);
      const allCards = studySet?.cards || [];
      setCurrentCardsSet(allCards);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentCardsSet.length === 0) {
      setNoCardsMessage("No cards available for the selected filter.");
    } else {
      setNoCardsMessage("");
    }
  }, [currentCardsSet]);

  const currentCard = currentCardsSet[currentIndex];
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilterStatus(selectedValue);
    let filteredCards = currentStudySet.cards || [];
    if (selectedValue === "mastered") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "mastered"
      );
    } else if (selectedValue === "need practice") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "need practice"
      );
    } else if (selectedValue === "not studied") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "not studied"
      );
    } else if (selectedValue === "not studied and need practice") {
      filteredCards = filteredCards.filter(
        (card) =>
          card.status === "need practice" || card.status === "not studied"
      );
    }
    setCurrentCardsSet(filteredCards);
  };

  const circleBg = (cardStatus) => {
    if (cardStatus === "mastered") return "bg-[#69CA61]";
    if (cardStatus === "need practice") return "bg-[#FFD344]";
    if (cardStatus === "not studied") return "bg-[#FF5E5E]";
  };

  return (
    !loading && (
      <div>
        {hasToken && (
          <section className="max-container padding-container relative">
            <FinishPracticeWindow />
            <div className="flex justify-between flex-wrap md:flex-nowrap items-center mb-[20px] md:mb-[32px]">
              <div className="md:basis-[20%]">
                <BackLink path={`/user/${userId}/studySet/${id}`} />
              </div>
              <p className="basis-[100%] hidden md:block md:basis-[60%] text-center text-[2.4em] md:text-[3em] text-leading-[120%]">
                {currentStudySet?.studySet?.title}
              </p>
              <div className="md:basis-[20%] flex flex-col items-end">
                <p className="text-right dm-sans-bold text-[1.4em] md:text-[1.7em]">
                  {currentStudySet?.topic?.title}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-[10px]">
              <div className="flex flex-col items-center md:items-start justify-start gap-[8px] w-full md:w-[20vw] grow-0 mb-[50px] md:mb-0">
                <p className="text-[1.7em] dm-sans-bold">
                  Cards I want to learn
                </p>
                <CardFilter
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  handleFilterChange={handleFilterChange}
                />
              </div>
              <p className="basis-[100%] md:hidden text-center text-[2.4em] text-leading-[120%]">
                {currentStudySet?.studySet?.title}
              </p>
              {noCardsMessage && (
                <p className="text-[1.6em] my-[8px]">{noCardsMessage}</p>
              )}
              {currentCardsSet?.length > 0 && (
                <>
                  <div key={currentStudySet._id} className="shrink">
                    <div
                      className={`flip-container flex justify-center`}
                      onClick={handleFlip}
                    >
                      <div
                        className={`flip-card ${
                          isFlipped ? "flipped" : ""
                        } w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw] min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] next-card`}
                      >
                        <div className="flip-content flex flex-col justify-between pt-[40px] px-[20px] pb-[32px]">
                          <div
                            className={
                              filterStatus === "all"
                                ? "flex items-center gap-[8px]"
                                : "hidden"
                            }
                          >
                            <div
                              className={`w-[13px] h-[13px] rounded-full ${circleBg(
                                currentCard?.status
                              )}`}
                            ></div>
                            <p className="text-[1.4em] md:text-[1.7em]">
                              {currentCard?.status}
                            </p>
                          </div>
                          <p className="text-[2.4em] md:text-[4em] text-center text-leading-[100%]">
                            {currentCard?.card?.question}
                          </p>
                          <img src={currentCard?.card?.image} alt="" />
                          <p className="text-[1.4em] text-leading-[150%] self-center">
                            Show the answer
                          </p>
                        </div>
                        <div className="flip-content flex justify-center">
                          <p className="text-[2.4em] md:text-[3em] text-center text-leading-[100%] p-[10px]">
                            {currentCard?.card?.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[55vw] justify-center gap-[40px] items-center mx-auto my-[21px]">
                      <button
                        onClick={() => handlePreviousCard(currentCardsSet)}
                      >
                        <img
                          src={arrow}
                          alt="previous"
                          className="rotate-180"
                        />
                      </button>
                      <p className="text-[1.7em] dm-sans-bold">
                        {currentIndex + 1}/{currentCardsSet?.length}
                      </p>
                      <button onClick={() => handleNextCard(currentCardsSet)}>
                        <img src={arrow} alt="next" />
                      </button>
                    </div>
                    <div className="mb-[24px]">
                      <progress
                        aria-label="loading"
                        max={currentCardsSet.length}
                        value={currentIndex + 1}
                        className="h-[1px] w-full overflow-hidden bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-black"
                      ></progress>
                    </div>
                    <PracticeButtons currentSet={currentCardsSet} />
                  </div>
                </>
              )}
              <div className="hidden lg:block lg:w-[20vw]" />
            </div>
          </section>
        )}
      </div>
    )
  );
}
export default Practice;

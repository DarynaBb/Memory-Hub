import { createContext, useState } from "react";
import axios from "axios";
import AlertDismissibleSuccess from "../components/AlertDismissibleSuccess";

const UserStudySetsContext = createContext();

const UserStudySetsContextProvider = ({ children }) => {
  const [studySetId, setStudySetId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [round, setRound] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [progress, setProgress] = useState(0);

  // const backendApiUrl = "http://localhost:3001";
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const handleShowAlert = (msg) => {
    setMessage(msg);
    setShowSuccessAlert(true);
  };

  const countCardsByStatus = (studySets) => {
    const cardsCount = { mastered: 0, needPractice: 0, notStudied: 0 };

    studySets?.forEach((savedStudySet) => {
      savedStudySet.cards.forEach((card) => {
        switch (card.status) {
          case "mastered":
            cardsCount.mastered++;
            break;
          case "need practice":
            cardsCount.needPractice++;
            break;
          case "not studied":
            cardsCount.notStudied++;
            break;
          default:
            break;
        }
      });
    });
    return cardsCount;
  };

  
  const deleteSavedStudySet = async (userId, setId) => {
    try {
      console.log("userId and setId received to axios", userId, setId);
      await axios.delete(`${backendApiUrl}/user/${userId}/${setId}`);
      // alert("Study set was deleted");
      handleShowAlert("Study set was deleted");
    } catch (error) {
      console.log("error while logging in:", error);
    }
  };

  const handleNextCard = (cardsArray) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === cardsArray?.length - 1) {
        return prevIndex;
      }
      const newIndex = (prevIndex + 1) % cardsArray?.length;
      setIsFlipped(false);
      return newIndex;
    });
  };

  const handlePreviousCard = (cardsArray) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return prevIndex;
      }
      const newIndex =
        (prevIndex - 1 + cardsArray?.length) % cardsArray?.length;
      setIsFlipped(false);
      return newIndex;
    });
  };

  const readImageAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        resolve(null);
      }
    });
  };

  
  return (
    <UserStudySetsContext.Provider
      value={{
        studySetId,
        setStudySetId,
        countCardsByStatus,
        deleteSavedStudySet,
        currentIndex,
        setCurrentIndex,
        currentCard,
        setCurrentCard,
        backendApiUrl,
        isFlipped,
        setIsFlipped,
        handleNextCard,
        handlePreviousCard,
        round,
        setRound,readImageAsBase64,
        isRoundFinished, setIsRoundFinished,
        correctAnswers, setCorrectAnswers,
        wrongAnswers, setWrongAnswers,
        progress, setProgress
      }}
      >
      {showSuccessAlert && (
        <AlertDismissibleSuccess
          message={message}
          onClose={() => setShowSuccessAlert(false)} // Set showSuccessAlert to false when alert is closed
        />
      )}
      {children}
    </UserStudySetsContext.Provider>
  );
};

export { UserStudySetsContext, UserStudySetsContextProvider };
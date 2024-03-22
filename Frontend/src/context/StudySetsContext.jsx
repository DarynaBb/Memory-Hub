import React, { createContext, useState } from "react";
import axios from "axios";

const StudySetsContext = createContext();

const StudySetsContextProvider = ({ children }) => {
  const [moduleData, setModuleData] = useState({});
  const [modulesData, setModulesData] = useState([]);
  const [studySetId, setStudySetId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studyData, setStudyData] = useState([]);
  const [userStudySets, setUserStudySets] = useState({});
  const [userShortData, setUserShortData] = useState({});
  const [succesWindow, setSuccesWindow] = useState(false);
  const [errorWindow, setErrorWindow] = useState(false);
  

  // const backendApiUrl = "http://localhost:3001";
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const getModulesData = async () => {
    const response = await axios.get(`${backendApiUrl}/modules`);
    console.log(response.data);
    setModulesData(response.data);
  };


  const getModuleData = async (moduleId) => {
  try {
    console.log(moduleId)
    const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
    console.log(response.data);
    setModuleData(response.data);
  } catch (error) {
    console.error('Error fetching module data:', error);
  }
};

  const getStudyData = async () => {
    const response = await axios.get(`${backendApiUrl}/topics`);
    console.log(response.data);
    setStudyData(response.data);
  };

  const getUserShortData = async (id) => {
    const response = await axios.get(`${backendApiUrl}/users/${id}`);
    console.log(response.data);
    setUserShortData(response.data);
  };

  const getUserStudySets = async (id) => {
    const response = await axios.get(`${backendApiUrl}/user/${id}/studySets`);
    console.log("getUserStudySets", response.data);
    setUserStudySets(response.data);
  };

  const addStudySetToUser = async (userId, studySetId, topicId) => {
    const studySetData = {
      edit: "no",
    };
    try {
      await axios.patch(
        `${backendApiUrl}/users/${userId}/topics/${topicId}/studySets/${studySetId}`,
        studySetData
      );
      console.log(`studySetData ${studySetData} sent to user ${userId}`);
      // alert("Study set was added to your account");
      setSuccesWindow(true);
    } catch (error) {
      console.log("error while logging in:", error);
      // alert("Study set already exists in your account");
      setErrorWindow(true);
    }
  };

  const createStudySetsAndCards = async (
    userId,
    topic,
    title,
    description,
    createdBy,
    cards
  ) => {
    console.log("cards:", cards);
    try {
      const savedStudySets = {
        topic: topic,
        title: title,
        description: description,
        createdBy: createdBy,
        cards: cards.map((card) => ({
          question: card.question,
          answer: card.answer,
          image: card.image,
        })),
      };

      const response = await axios.post(
        `${backendApiUrl}/createSet/${userId}`,
        { ...savedStudySets }
      );
    } catch (error) {
      console.error("Error updating study set:", error.message);

      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
      }
      throw error;
    }
  };
  
  const editStudySet = async (
    userId,
    topicId,
    studySetId,
    topicTitle,
    title,
    description,
    cardsInfo
  ) => {

    try {
      const updatedStudySets = {
        topicTitle: topicTitle,
        title: title,
        description: description,
        cards: cardsInfo.map((card) => {
          //console.log("card:", card);
          return {
          question: card.question,
          answer: card.answer,
          image: card.image,
          cardId: card.id,
      }
      })
    }
      const response = await axios.patch(
        `${backendApiUrl}/editSet/${userId}/${topicId}/${studySetId}`,
        updatedStudySets,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating study set:", error.message);

      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
      }
      throw error;
    }
  };

  const deleteCard = async (userId, studySetId, cardId) => {
    try {
      const response = await axios.delete(
        `${backendApiUrl}/deleteCard/${userId}/${studySetId}/${cardId}`
      );

      if (response.status === 200) {
        
        return true;
      } else {
        console.error("Error deleting card. Server response:", response);
        return false;
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      return false;
    }
  };

  return (
    <StudySetsContext.Provider
      value={{
        getModuleData,
        moduleData,
        studySetId,
        setStudySetId,
        topicId,
        setTopicId,
        addStudySetToUser,
        createStudySetsAndCards,
        answer,
        setAnswer,
        image,
        setImage,
        question,
        setQuestion,
        title,
        setTitle,
        description,
        setDescription,
        getStudyData,
        studyData,
        setStudyData,
        getUserStudySets,
        userStudySets,
        setUserStudySets,
        userShortData,
        setUserShortData,
        getUserShortData,
        editStudySet,
        deleteCard,
        getModulesData,
        modulesData, setModulesData,
        moduleId, setModuleId,
        succesWindow, setSuccesWindow,
        errorWindow, setErrorWindow
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};

export { StudySetsContext, StudySetsContextProvider };

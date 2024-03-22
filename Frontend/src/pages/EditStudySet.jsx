import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import trash from "../assets/images/trash.png";
import openIcon from "../assets/images/openForm.svg";
import closeIcon from "../assets/images/closeForm.png";
import BackLink from "../components/BackLink";
import group from "../assets/images/group.svg";
import EditBtns from "../components/EditBtns";
import MessageAlert from "../components/MessageAlert";
import Loader from "../components/Loader";

const EditStudySet = () => {
  const { editStudySet, deleteCard } = useContext(StudySetsContext);
  const { readImageAsBase64 } = useContext(UserStudySetsContext);
  const { id } = useParams();
  const { userId, user, getUserInfo, hasToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [messageShow, setmessageShow] = useState(false);
  const [studySetDeleted, setStudySetDeleted] = useState(false);
  const [loader, setLoader] = useState(false);
  const savedStudySet = user?.savedStudySets?.find(
    (studySet) => studySet._id === id
  );
  const [updatedTopicTitle, setUpdatedTopicTitle] = useState(
    savedStudySet?.topic?.title
  );

  const studySetId = savedStudySet?.studySet?._id || "";

  const [topicId, setTopicId] = useState(savedStudySet?.topic?._id || "");

  const cardsDefault = savedStudySet?.cards || [];
  cardsDefault.sort((a, b) => (a.card?._id > b.card?._id ? 1 : -1));
  const cardsInfo = cardsDefault.map((cardSet) => ({
    question: cardSet.card?.question,
    answer: cardSet.card?.answer,
    image: cardSet?.card?.image,
    id: cardSet.card?._id,
  }));

  const [formState, setFormState] = useState({
    topicTitle: savedStudySet?.topic?.title || "",
    title: savedStudySet?.studySet?.title || "",
    description: savedStudySet?.studySet?.description || "",
    cards: cardsInfo,
  });

  useEffect(() => {
    if (!hasToken) {
      navigate("/");
    } else {
      getUserInfo();
      if (studySetId !== -1 && savedStudySet && cardsInfo) {
        setFormState((prevFormState) => ({
          ...prevFormState,
          topicTitle: savedStudySet.topic?.title || "",
          title: savedStudySet.studySet?.title || "",
          description: savedStudySet.studySet?.description || "",
          cards: cardsInfo,
        }));
      }
    }
  }, [userId]);

  const topicHandler = (e) => {
    const chosenTopic = e.target.textContent || e.target.value;
    setUpdatedTopicTitle(chosenTopic);
    setFormState((prevState) => ({
      ...prevState,
      topicTitle: chosenTopic,
    }));
    setOpen(false);
  };

  const topicIdFinder = async () => {
    const foundTopic = await user?.savedStudySets
      ?.map((eachSet) => eachSet?.topic)
      .find((eachTopic) => eachTopic?.title === updatedTopicTitle);
    if (foundTopic) {
      const foundTopicId = foundTopic?._id;
      setTopicId(foundTopicId);
    } else {
      console.log("topic is new. The current topicId is:", topicId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoader(true); 
      setTimeout(() => {
        setLoader(false);
        setmessageShow(true);
      }, 3000);
      topicIdFinder();
      await editStudySet(
        userId,
        topicId,
        savedStudySet?.studySet?._id || "",
        formState.topicTitle,
        formState.title,
        formState.description,
        formState.cards
      );
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoader(true); 
      setTimeout(() => {
        setLoader(false);
        setmessageShow(true);
      }, 3000);
      setFormState((prevFormState) => ({
        ...prevFormState,
        topicTitle: savedStudySet.topic?.title || "",
        title: savedStudySet.studySet?.title || "",
        description: savedStudySet.studySet?.description || "",
        cards: cardsInfo,
      }));
     
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (file, index) => {
    try {
      const base64Data = await readImageAsBase64(file);
      setFormState((prevFormState) => ({
        ...prevFormState,
        cards: prevFormState.cards.map((card, cardIndex) =>
          cardIndex === index ? { ...card, image: base64Data } : card
        ),
      }));
      
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCardChange = async (index, field, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      cards: prevFormState.cards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [field]: value } : card
      ),
    }));
  };

  const handleAddCard = () => {
    setFormState({
      ...formState,
      cards: [...formState.cards, { question: "", answer: "", image: "" }],
    });
  };

  const handleRemoveCard = async (cardId) => {
    try {
      await deleteCard(userId, studySetId, cardId);
      getUserInfo();
      setFormState((prevFormState) => ({
        ...prevFormState,
        topicTitle: savedStudySet.topic?.title || "",
        title: savedStudySet.studySet?.title || "",
        description: savedStudySet.studySet?.description || "",
        cards: cardsInfo.filter(card => card.id !== cardId), 
      }));
 
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  
  const toggleList = () => {
    setOpen(!isOpen);
  };

  const setId = savedStudySet?.studySet?._id;

  return (
    <div className=' max-container padding-container regal-blue flex flex-col '>
      <BackLink />
      <Loader loader={loader} />
      <MessageAlert
        messageShow={messageShow}
        userId={userId}
        studySetDeleted={studySetDeleted}
        message='The study set has been edited!'
      />
      {hasToken && (
        <form
          className={`relative flex flex-col justify-center text-[1.7em] mx-auto md:w-[1128px] my-auto ${
            !messageShow && !studySetDeleted && !loader ? "display" : "blur"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className='dm-sans-medium mb-6 text-[20px]'>Edit Study Set</h2>
          <div className='container flex md:flex-row flex-col justify-between md:mb-6 mb-9 items-center'>
            <input
              className='container min-h-[78px] basis-19/40 border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
              placeholder='Create your own topic*'
              type='text'
              name='topicTitle'
              value={formState.topicTitle}
              onChange={topicHandler}
            />
            <div className='container flex justify-between items-center md:hidden'>
              <div className='w-auto border-b-2 line-color block basis-3/6'></div>
              <p className='md:basis-1/20 leading-150 dm-sans-regular text-center basis-1/6'>
                or
              </p>
              <div className='w-auto border-b-2 block basis-3/6'></div>
            </div>
            <p className='basis-1/20 leading-150 dm-sans-regular text-center hidden md:block'>
              or
            </p>
            <div className='container max-h-[78px] min-h-[78px] basis-19/40 border border-solid border-gray-300 rounded-lg bg-white flex-shrink-0 pl-[40px]'>
              <div className='flex items-center'>
                <div
                  className={`dm-sans-regular w-full py-5 cursor-pointer mt-1 sm:text-[17px] sm:px-1 text-[14px] `}
                >
                  Choose from already created topics
                </div>
                {!isOpen ? (
                  <img
                    src={openIcon}
                    alt='click to hide options'
                    onClick={toggleList}
                    className='cursor-pointer mx-5 mt-1  '
                  />
                ) : (
                  <img
                    src={closeIcon}
                    alt='click to show options'
                    onClick={toggleList}
                    className='cursor-pointer mx-5 mt-2  '
                  />
                )}
              </div>
              {isOpen && (
                <ul className='dm-sans-regular w-full bg-transparent relative mt-1 border  border-gray-300 overflow-y-auto max-h-80 custom-scrollbar rounded-md'>
                  {[
                    ...new Set(
                      user?.savedStudySets?.map(
                        (studySet) => studySet.topic?.title
                      )
                    ),
                  ].map((topicTitle) => (
                    <li
                      key={topicTitle}
                      value={topicTitle}
                      onClick={topicHandler}
                      className='cursor-pointer dm-sans-regular px-4 py-2 hover:bg-gray-100 bg-white'
                    >
                      {topicTitle}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <input
            className='container h-[78px] mb-6 border border-solid border-gray-300 rounded-lg bg-white  flex-shrink-0 pl-[40px] '
            id='title'
            type='text'
            placeholder='Add Title*'
            name='title'
            value={formState.title}
            onChange={handleChange}
          />
          <div className='mb-6'>
            <textarea
              style={{ resize: "none", overflow: "auto" }}
              className='container h-[190px] mb-6 flex-shrink-0 border border-solid border-gray-300 rounded-lg bg-white pl-[40px] pt-[24px]'
              id='description'
              placeholder='Add description*'
              name='description'
              value={formState.description}
              onChange={handleChange}
            />
          </div>
          {formState?.cards &&
            formState.cards.map((card, index) => (
              <div
                key={index}
                className='container flex flex-col border border-solid border-gray-300 rounded-lg bg-white mb-6 '
              >
                <div className='flex justify-between items-center pt-5 pb-1 border-b-2'>
                  <p className='dm-sans-bold text-[20px] pl-10'>{index + 1}</p>
                  <img
                    src={trash}
                    className='pr-10 cursor-pointer'
                    alt='trashcan'
                    onClick={() => handleRemoveCard(card.id)}
                  />
                </div>
                <div className='container flex sm:flex-row flex-col justify-evenly px-10 gap-9 py-5'>
                  <div className='border-b-2 basis-2/6'>
                    <textarea
                      style={{ resize: "none", overflow: "auto" }}
                      className='w-full h-[100px] custom-scrollbar'
                      id={`question${index}`}
                      type='text'
                      placeholder={`Write your Question*`}
                      name={`question${index}`}
                      value={card.question}
                      onChange={(e) =>
                        handleCardChange(index, "question", e.target.value)
                      }
                    />
                  </div>
                  <div className='border-b-2 basis-2/6 '>
                    <textarea
                      style={{ resize: "none", overflow: "auto" }}
                      className='w-full h-[100px] custom-scrollbar basis-2/6'
                      id={`answer${index}`}
                      type='text'
                      placeholder={`Write your Answer*`}
                      name={`answer${index}`}
                      value={card.answer}
                      onChange={(e) =>
                        handleCardChange(index, "answer", e.target.value)
                      }
                    />
                  </div>
                  <div className='min-w-24 h-16 flex justify-center items-center outline-dashed outline-2 outline-offset-1 mx-auto my-auto'>
                    {card.image ? (
                      <label
                        htmlFor={`image${index}`}
                        className='cursor-pointer '
                      >
                        <img
                          src={card.image}
                          alt='insert image'
                          className='object-cover min-w-24 h-16'
                        />
                      </label>
                    ) : (
                      <label
                        htmlFor={`image${index}`}
                        className='cursor-pointer'
                      >
                        <img
                          src={group}
                          alt='default image'
                          className='object-cover'
                        />
                      </label>
                    )}
                    <input
                      type='file'
                      id={`image${index}`}
                      accept='image/*'
                      className='hidden '
                      name={`image${index}`}
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

          <div
            className='container dm-sans-medium flex justify-center  cursor-pointer py-[40px] hover:underline '
            onClick={handleAddCard}
          >
            + Add new Card
          </div>
          <EditBtns
            userId={userId}
            setId={setId}
            setStudySetDeleted={setStudySetDeleted}
          />
        </form>
      )}
    </div>
  );
};
export default EditStudySet;

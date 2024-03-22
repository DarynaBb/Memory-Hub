import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import "../components/css/form.css";
import Card from "../components/FormCard";
import TopicList from "../components/TopicList";
import BackLink from "../components/BackLink";
import Loader from "../components/Loader";
import MessageAlert from "../components/MessageAlert";

function CreateSets() {
  const {
    createStudySetsAndCards,
    answer,
    setAnswer,
    image,
    setImage,
    question,
    setQuestion,
    setTitle,
    setDescription,
  } = useContext(StudySetsContext);
  const [updatedTopicTitle, setUpdatedTopicTitle] = useState("");
  const { user, userId, getUserInfo, hasToken } = useContext(AuthContext);
  const { readImageAsBase64 } = useContext(UserStudySetsContext);
  const [lines, setLines] = useState([1]);
  const [messageShow, setmessageShow] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (hasToken) {
      getUserInfo();
    } else {
      navigate("/");
    }
  }, [userId]);

  const handleCreateSets = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formObject = {
        topic: formData.get("topic"),
        title: formData.get("title"),
        description: formData.get("description"),
        createdBy: userId,
        cards: [],
      };

      for (let i = 0; i < lines.length; i++) {
        const question = formData.get(`question${i}`);
        const answer = formData.get(`answer${i}`);
        const imageFile = formData.get(`image${i}`);
        let image = "";
        if (imageFile.size > 0) {
          image = await readImageAsBase64(imageFile);
        }
        formObject.cards.push({
          question,
          answer,
          image,
        });
      }

      if (formObject) {
        setLoader(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          setLoader(false);
          setmessageShow(true);
        }, 3000);
        await createStudySetsAndCards(
          userId,
          updatedTopicTitle,
          formObject.title,
          formObject.description,
          formObject.createdBy,
          formObject.cards
        );

        setQuestion([""]);
        setAnswer([""]);
        setImage([""]);
        setTitle("");
        setDescription("");
      } else {
        console.error("formObject is not defined.");
      }
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
    }
  };
  // const removeLine = (indexToRemove) => {
  //   const updatedLines = [...lines];
  //   updatedLines.splice(indexToRemove, 1);
  //   setLines(updatedLines);
  // };
  const handleSelectTopic = (selectedTopic) => {
    setUpdatedTopicTitle(selectedTopic);
  };

  return (
    <div className=' max-container padding-container regal-blue flex flex-col relative '>
      <BackLink />
      <Loader loader={loader} />
      <MessageAlert
        messageShow={messageShow}
        userId={userId}
        message='Your study set has been successfully created!'
      />
      {hasToken && (
        <form
          className={`relative flex flex-col justify-center text-[1.7em] mx-auto md:w-[1128px] my-auto ${
            !messageShow && !loader ? "display" : "blur"
          }`}
          onSubmit={handleCreateSets}
        >
          <h2 className='dm-sans-medium mb-6 text-[20px]'>Creating new set</h2>
          <div className='container flex md:flex-row flex-col justify-between md:mb-6 mb-9 items-center'>
            <input
              className='container min-h-[78px] basis-19/40 border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
              placeholder='Create your own topic*'
              type='text'
              name='topic'
              value={updatedTopicTitle}
              onChange={(e) => setUpdatedTopicTitle(e.target.value)}
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
            <TopicList onSelectTopic={handleSelectTopic} />
          </div>
          <input
            className='container h-[78px] mb-6 border border-solid border-gray-300 rounded-lg bg-white  flex-shrink-0 pl-[40px] '
            id='title'
            type='text'
            placeholder='Add Title*'
            name='title'
          />
          <textarea
            className='container h-[190px] mb-6 flex-shrink-0 border border-solid border-gray-300 rounded-lg bg-white pl-[40px] pt-[24px]'
            id='description'
            placeholder='Add description*'
            name='description'
            style={{ resize: "none", overflow: "auto" }}
          />
          <Card lines={lines} setLines={setLines} />
          <div className='container flex justify-center items-center sm:flex-row md:justify-end flex-col gap-8'>
            <button
              className='flex justify-center items-center flex-shrink-0 btn-hover-color create-btn-color w-[172px] h-[56px] p-[8px 16px]  text-black text-xs leading-120 uppercase cursor-pointer rounded-[8px] dm-sans-bold  '
              type='submit'
            >
              create new set
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateSets;

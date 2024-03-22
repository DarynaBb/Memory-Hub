import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import openIcon from "../assets/images/openForm.svg";
import closeIcon from "../assets/images/closeForm.png";

function TopicList({ onSelectTopic, mode }) {
  const { user } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const toggleList = () => {
    setOpen(!isOpen);
  };

  const handleSelectTopic = (topicTitle) => {
    onSelectTopic(topicTitle);
    setSelectedTopic(topicTitle);
    setOpen(false);
  };

  const topicHandler = (e) => {
    const chosenTopic = e.target.value;
    setSelectedTopic(chosenTopic);
    onSelectTopic(chosenTopic);
  };

  return (
    <div className='container max-h-[78px] min-h-[78px] basis-19/40 border border-solid border-gray-300 rounded-lg bg-white flex-shrink-0 pl-[40px]'>
      <div className='flex items-center sm:text-[17px]  text-[14px]'>
        <div
          className={`dm-sans-regular w-full py-5 cursor-pointer mt-1 `}
          onClick={toggleList}
        >
          {selectedTopic || "Choose from already created topics"}
        </div>
        {!isOpen ? (
          <img
            src={openIcon}
            alt='click to hide options'
            onClick={toggleList}
            className='cursor-pointer mx-5 mt-1'
          />
        ) : (
          <img
            src={closeIcon}
            alt='click to show options'
            onClick={toggleList}
            className='cursor-pointer mx-5 mt-1 '
          />
        )}
      </div>
      {isOpen && (
        <ul className='dm-sans-regular w-full bg-transparent relative mt-1 border  border-gray-300 overflow-y-auto max-h-80 custom-scrollbar rounded-md'>
          {[
            ...new Set(
              user?.savedStudySets?.map((studySet) => studySet.topic?.title)
            ),
          ].map((topicTitle) => (
            <li
              key={topicTitle}
              onClick={() => handleSelectTopic(topicTitle)}
              className='cursor-pointer dm-sans-regular px-4 py-2 hover:bg-gray-100 bg-white'
            >
              {topicTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicList;
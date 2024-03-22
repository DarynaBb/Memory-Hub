// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const TopicDropdown = ({ selectedTopic, onTopicChange }) => {
//   const [topics, setTopics] = useState([]);
//   const [newTopic, setNewTopic] = useState("");
//   const { getUserInfo, user } = useContext(AuthContext);

//   useEffect(() => {
//     getUserInfo();
//     const userCreatedTopics =
//       user?.savedStudySets
//         ?.filter((studySet) => studySet.edit === "yes")
//         .map((studySet) => studySet.topic.title) || [];

//     setTopics(userCreatedTopics);
//   }, [user, getUserInfo]);

//   const handleDropdownChange = (e) => {
//     const selectedValue = e.target.value;
//     onTopicChange(selectedValue);
//     setNewTopic("");
//   };

//   const handleNewTopicChange = (e) => {
//     setNewTopic(e.target.value);
//   };

//   const handleAddNewTopic = () => {
//     onTopicChange(newTopic);
//     setNewTopic("");
//   };

//   return (
//     <div>
//       <label htmlFor="topicDropdown">Select or Add Topic:</label>
//       <select
//         id="topicDropdown"
//         value={selectedTopic}
//         onChange={handleDropdownChange}
//       >
//         <option value="">Select Topic</option>
//         {topics.map((topic) => (
//           <option key={topic} value={topic}>
//             {topic}
//           </option>
//         ))}
//       </select>
//       <div>
//         <label htmlFor="newTopic">New Topic:</label>
//         <input
//           type="text"
//           id="newTopic"
//           placeholder="Enter new topic"
//           value={newTopic}
//           onChange={handleNewTopicChange}
//         />
//         <button type="button" onClick={handleAddNewTopic}>
//           Add Topic
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicDropdown;

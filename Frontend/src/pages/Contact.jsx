import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BackLink from "../components/BackLink";

const Contact = () => {
  const { firstName, setFirstName, lastName, setLastName } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className='max-container padding-container regal-blue flex flex-col mb-20'>
        <BackLink />
        <form
          className='dm-sans-medium mb-6 text-[16px] flex flex-col justify-center mx-auto md:w-[1128px] gap-3'
          onSubmit={handleSubmit}
        >
          <h2 className='dm-sans-medium mb-6 text-[20px]'>Contact Us</h2>
          <span>First Name</span>
          <input
            type='text'
            name='name'
            value={firstName}
            onChange={handleChange}
            className='container min-h-[78px] max-w-[500px] basis-19/40 border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
          />
          <span>Last Name</span>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            className='container min-h-[78px] max-w-[500px] border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
          />
          <span>Email</span>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            className='container min-h-[78px] max-w-[500px]  basis-19/40 border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
            required
          />
          <span>Message</span>
          <textarea
          rows="5" cols="15"
            name='message'
            value={message}
            onChange={handleChange}
            className='container min-h-[120px] max-w-[700px]  basis-19/40 border border-solid border-gray-300 rounded-lg bg-white pl-[40px]'
            placeholder='Write your message here...'
            required
          />
          <button
            type='submit'
            className='bg-blue-500 text-white max-w-[100px]  py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;

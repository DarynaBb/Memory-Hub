import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function UserPageNavigation() {
  const {getUserInfo, user} = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  },[])

  const userId = user?._id;

  return (
    <section className='flex flex-col gap-[30px] border-[1px] border-gray-400 p-[20px]'>
        <h2>Account navigation:</h2>
        <Link to={`/user/${userId}/studySets`}>Study sets page</Link>
        <Link to="/createSet">Create new set page</Link>
        <Link to="/userProfileUpdate">Settings</Link>
    </section>
  )
}

export default UserPageNavigation
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { StudySetsContext } from '../context/StudySetsContext';

function UserProfile() {
  const {getUserInfo, user} = useContext(AuthContext);
  const {isSetAddedToUser, setIsSetAddedToUser} = useContext(StudySetsContext);

  useEffect(() => {
    getUserInfo();

  }, [])

  return (
    <div>
      
    </div>
  )
}

export default UserProfile

import React, { useContext, useEffect } from 'react'
import Cards from '../components/Cards'
import { AuthContext } from '../context/AuthContext';


function StudySet() {
  const {setShowLoginForm, setShowSignUpForm} = useContext(AuthContext);
  
  useEffect(() => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
  }, [])



  return (
    <div>
      <Cards />
    </div>
  )
}

export default StudySet

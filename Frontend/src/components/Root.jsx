import { Outlet } from 'react-router-dom'
import NavBar from "../components/NavBar"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Root() {
  return (
      <>
        <NavBar />
        <LoginForm />
        <SignUpForm />
        <Outlet />
      </>
  )
}

export default Root
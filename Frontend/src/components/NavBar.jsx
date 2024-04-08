import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import logout from "../assets/images/logout.png";

function NavBar() {
  const {
    setShowLoginForm,
    setShowSignUpForm,
    hasToken,
    logoutHandler,
    getUserInfo,
    user,
    userId
  } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    getUserInfo();
  }, []);

  // const userId = user?._id;

  const onClickLoginHandler = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const onClickSignUpHandler = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  };

  return (
    <>
      <div className='bg-[#FFC2FF] w-full h-[8px] relative' />
      <nav className='p-4 flex justify-between items-start mobile:items-center padding-container max-container gap-[12px]'>
        <div
          className='flex items-center cursor-pointer '
          onClick={() => navigate("/")}
        >
          <div
            className='w-[58px] h-[48px] bg-cover bg-no-repeat '
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className='text-[1.6em] sm:whitespace-nowrap font-semibold ml-2 text-black font-dm-sans uppercase'>
            Memory Hub
          </div>
        </div>
          <ul className='flex gap-2 items-center uppercase flex-wrap justify-end'>
            {!hasToken ? (
              <>
                <li>
                  <button
                    onClick={onClickLoginHandler}
                    className='auth-button text-black font-dm-sans text-[1.2em] font-bold uppercase hover:underline focus:underline'
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={onClickSignUpHandler}
                    className='w-[47px] h-[12px] auth-button flex items-center font-bold gap-2 justify-center bg-black text-white px-9 py-4  text-[1.2em] rounded-full hover:bg-white hover:text-black hover:border-2 hover:border-black uppercase '
                  >
                    SignUp
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={`/user/${userId}`}
                    className='auth-button text-black font-dm-sans text-[1.2em] uppercase '
                  >
                    <img src={user?.photo} alt="" className="sm:hidden w-[24px] h-[24px] rounded-full" />
                    <p className="hidden sm:block">MY ACCOUNT</p>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      logoutHandler(e);
                      navigate("/");
                    }}
                    className='flex justify-center items-center gap-2.5 sm:px-6 sm:py-3 sm:border sm:border-black text-black font-bold uppercase text-[1.2em] leading-[120%] sm:rounded-full hover:border-3 hover:border-black hover:bg-black hover:text-white '
                  >
                    <img src={logout} alt="" className="sm:hidden w-[24px] h-[24px]" />
                    <p className="hidden sm:block">LOGOUT</p>
                  </button>
                </li>
              </>
            )}
          </ul>
      </nav>
    </>
  );
}

export default NavBar;

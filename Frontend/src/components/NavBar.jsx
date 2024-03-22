import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import menu from "../assets/images/menu.svg";

function NavBar() {
  const {
    showLoginForm,
    setShowLoginForm,
    showSignUpForm,
    setShowSignUpForm,
    hasToken,
    logoutHandler,
    getUserInfo,
    user,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  const handleWindowResize = () => {
    setIsSmallScreen(window.innerWidth < 640);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const userId = user?._id;

  const onClickLoginHandler = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
    setShowMenu(false);
  };

  const onClickSignUpHandler = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    setShowMenu(false);
  };

  return (
    <>
      <div className='bg-[#FFC2FF] w-full h-[8px] ' />
      <nav className='p-4 flex justify-between items-center padding-container max-container'>
        <div
          className='flex items-center cursor-pointer '
          onClick={() => navigate("/")}
        >
          <div
            className='w-[58px] h-[48px] bg-cover bg-no-repeat '
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className=' text-[1.6em] font-semibold ml-2 text-black font-dm-sans uppercase'>
            Memory Hub
          </div>
        </div>
        {isSmallScreen ? (
          <div className='relative' ref={menuRef}>
            <img
              src={menu}
              alt=''
              onClick={() => setShowMenu(!showMenu)}
              className='cursor-pointer relative w-[32px] h-[32px]'
            />
            {showMenu && (
              <ul className='absolute uppercase z-50 top-5 right-5 w-[200px] h-[120px] border-2 py-4  bg-white shadow-lg rounded dm-sans-medium text-[1.4em] flex flex-col gap-5 justify-center'>
                {!hasToken ? (
                  <>
                    <li
                      onClick={onClickLoginHandler}
                      className='px-4 py-2 cursor-pointer hover:underline'
                    >
                      Login
                    </li>
                    <li
                      onClick={onClickSignUpHandler}
                      className='px-4 py-2 cursor-pointer hover:underline  '
                    >
                      SIGNUP
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      onClick={() => navigate(`/user/${userId}`)}
                      className='px-4 py-2 cursor-pointer hover:underline'
                    >
                      My Account
                    </li>
                    <li
                      onClick={(e) => {
                        logoutHandler(e);
                        navigate("/");
                      }}
                      className='px-4 py-2 cursor-pointer hover:underline'
                    >
                      LOGOUT
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        ) : (
          <ul className='flex gap-4 items-center uppercase'>
            {!hasToken ? (
              <>
                <li className='block'>
                  <button
                    onClick={onClickLoginHandler}
                    className='auth-button text-black font-dm-sans text-[1.4em] font-bold uppercase hover:underline focus:underline'
                  >
                    Login
                  </button>
                </li>
                <li className='block'>
                  <button
                    onClick={onClickSignUpHandler}
                    className='w-[47px] h-[12px] auth-button inline-flex items-center font-bold gap-2 px-9 py-4 justify-center bg-black text-white text-[1.2em] rounded-full hover:bg-white hover:text-black hover:border-2 hover:border-black uppercase '
                  >
                    SignUp
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='block'>
                  <Link
                    to={`/user/${userId}`}
                    className='auth-button text-black font-dm-sans text-[1.2em] uppercase '
                  >
                    MY ACCOUNT
                  </Link>
                </li>
                <li className='block'>
                  <button
                    onClick={(e) => {
                      logoutHandler(e);
                      navigate("/");
                    }}
                    className='inline-flex justify-center items-center gap-2.5 px-6 py-3 border border-black text-black font-bold uppercase text-[1.2em] leading-[120%] rounded-full hover:text-black hover:border-3 hover:border-black hover:bg-black hover:text-white '
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </>
  );
}

export default NavBar;

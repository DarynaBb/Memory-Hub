import React, { useContext, useEffect,useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UserStatistic from "../components/UserStatistic";
import UserPageNavigation from "../components/UserPageNavigation";
import UserStudySets from "./UserStudySets";

function UserProfile() {
  const { getUserInfo, user, hasToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (hasToken) {
      getUserInfo();
    } else {
      navigate("/");
    }
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  })

  const wrapperRef = useRef(null)

  const handleKeyDown = e => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          })
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          })
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          })
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          })
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  },[])
  return (
    <>
    {hasToken && (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <img
          src={user?.photo}
          alt="profile picture"
          className="m-4 w-[60px] h-[60px] rounded-full"
        />
        <p className="text-[3em]">
          {user?.firstName} {user?.lastName}
        </p>
        <p></p>
      </div>
      <section className="w-[80%] m-auto" aria-multiselectable="false">
        <ul
          className="flex flex-col md:flex-row justify-center items-center border-b border-slate-200"
          role="tablist"
          ref={wrapperRef}
        >
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300  hover:stroke-gray-100  focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 1
                  ? "border-gray-800 stroke-gray-800 text-gray-800 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:text-slate-500"
              }`}
              id="tab-label-1a"
              role="tab"
              aria-setsize="3"
              aria-posinset="1"
              tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
              aria-controls="tab-panel-1a"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span>ACCOUNT INFORMATION</span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300  hover:stroke-gray-100  focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 2
                  ? "border-gray-800 stroke-gray-800 text-gray-800 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:text-slate-500"
              }`}
              id="tab-label-2a"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
              aria-controls="tab-panel-2a"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span>MY STATISTIC</span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300  hover:stroke-gray-100  focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 3
                  ? "border-gray-800 stroke-gray-800 text-gray-800 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-gray-900 hover:text-gray-900 focus:border-gray-900 focus:stroke-gray-900 focus:text-gray-900 disabled:text-slate-500"
              }`}
              id="tab-label-3a"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              tabIndex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
              aria-controls="tab-panel-2a"
              aria-selected={`${
                tabSelected.currentTab === 3 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
            >
              <span>MY STUDY SETS</span>
            </button>
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <div
            className={`min-w-[100%] md:min-w-[548px] border-[1px] border-[#BCC0C1] rounded-[8px] mt-[30px] p-[30px] md:p-[40px] ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1a"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1a"
            tabIndex="-1"
          >
            <div>
              <p className="dm-sans-medium text-[2em]">User name</p>
              <p className="dm-sans-regular text-gray-700 text-[1.4em]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="dm-sans-medium text-[2em] mt-4">Art of account</p>
              <p className="dm-sans-regular text-[1.4em] text-gray-700">Student</p>
              <div className="flex justify-between flex-wrap md:flex-nowrap">
                <div>
                  <p className="dm-sans-medium text-[2em] mt-4">Email address</p>
                  <p className="dm-sans-regular text-[1.4em] text-gray-700">{user?.email}</p>
                </div>
                <div className="w-full dm-sans-bold flex justify-end items-end mt-[45px] md:mt-0 ">
                  <Link
                    to="/userProfileUpdate"
                    className="bg-black max-h-[48px] flex items-center uppercase text-white text-[1.2em] px-[40px] py-[18px] rounded-[8px] hover:bg-white hover:text-black hover:border-black border-[1px]"
                  >
                    Edit
                  </Link>
              </div>
              </div>
              
            </div>
          </div>
          <div
            className={`w-[600px] rounded-lg mt-[30px] ${
              tabSelected.currentTab === 2 ? "" : "hidden"
            }`}
            id="tab-panel-2a"
            aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-2a"
            tabIndex="-1"
          >
            <div className="flex flex-col">
              <div className="w-full items-center overflow-hidden rounded-xl border border-[#BCC0C1] p-[30px] md:p-[40px]">
                <div className="w-full rounded-[8px] bg-white p-2">
                  <div className="bg-white">
                    <UserStatistic />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full py-4 ${
              tabSelected.currentTab === 3 ? "" : "hidden"
            }`}
            id="tab-panel-3a"
            aria-hidden={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-3a"
            tabIndex="-1"
          >
            <UserStudySets />
          </div>
        </div>
      </section>
    </div>
  )}
  </>
  );
}

export default UserProfile;

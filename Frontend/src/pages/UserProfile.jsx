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
          className="m-4 w-[60px] h-[60px] rounded-full border-2 border-white shadow-lg shadow-black-500/50"
        />
        <p className="text-[3em] dm-sans-regular bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
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
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-gray-100 hover:stroke-gray-100 focus:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed ${
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
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-gray-100 hover:stroke-gray-100 focus:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed ${
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
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-gray-100 hover:stroke-gray-100 focus:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed ${
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
            className={` w-[600px] border-solid border-2 border-gray-300 rounded-3xl mt-[30px] p-4 shadow-lg ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1a"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1a"
            tabIndex="-1"
          >
            <div className="relative flex h-32 justify-center rounded-xl bg-cover">
              <img
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex items-center justify-center">
                <img
                  className="m-4 w-[70px] h-[70px] rounded-full border-[3px] border-white shadow-lg shadow-black-500/50"
                  src={user?.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="dm-sans-medium text-[2em]">User name</p>
              <p className="dm-sans-regular text-gray-700 text-[1.4em]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="dm-sans-medium text-[2em] mt-4">Art of account</p>
              <p className="dm-sans-regular text-[1.4em] text-gray-700">Student</p>
              <p className="dm-sans-medium text-[2em] mt-4">Email address</p>
              <p className="dm-sans-regular text-[1.4em] text-gray-700">{user?.email}</p>
              <div className="dm-sans-bold text-[1.2em] flex justify-end">
                <Link
                  to="/userProfileUpdate"
                  className="bg-gray-800 text-white px-6 py-2 rounded-3xl mt-[-40px] absolute hover:bg-white hover:text-black hover:border-black border-2"
                >
                  Edit
                </Link>
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
              <div className="relative w-full items-center overflow-hidden rounded-xl border  p-[1.5px]">
                <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                <div className="relative w-full rounded-[0.60rem] bg-white p-2">
                  <div className="bg-white p-7 rounded-md">
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

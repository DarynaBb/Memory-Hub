import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import PasswordChangePopup from "../components/PasswordChangePopup";
//import { set } from "mongoose";
import { useNavigate } from "react-router-dom";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import AlertDismissibleSuccess from "../components/AlertDismissibleSuccess";
import BackLink from '../components/BackLink';

function ProfileSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { readImageAsBase64 } = useContext(UserStudySetsContext);

  const { getUserInfo, user, logoutHandler, hasToken } =
    useContext(AuthContext);
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      getUserInfo();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoto(user.photo || "");
    }
  }, [user]);

  const handleShowAlert = (msg) => {
    setMessage(msg);
    setShowSuccessAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        firstName.trim() ||
        lastName.trim() ||
        email.trim() ||
        selectedPhoto
      ) {
        // Verwende selectedPhoto statt photo
        if (selectedPhoto) {
          const formData = new FormData();
          formData.append("photo", selectedPhoto); // Füge das ausgewählte Bild zur FormData hinzu
          formData.append("photoUrl", photoUrl || "");

          const response = await axios.post(
            `${backendApiUrl}/user/uploadPhoto/${user._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // const photoUrl = response.data.photoUrl;
          setPhoto(photoUrl); // Aktualisiere das angezeigte Profilbild
        }

        await axios.patch(`${backendApiUrl}/user/${user._id}`, {
          firstName,
          lastName,
          email,
          photo, // Verwende selectedPhoto statt photo
        });

        // alert("Profile successfully updated");
        handleShowAlert("Profile successfully updated");
        setTimeout(() => {
          navigate(`/user/${user._id}`);
        }, 2000);
      } else {
        alert("No changes made");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleOpenPasswordChange = () => {
    setIsPasswordChangeOpen(true);
  };

  const handleClosePasswordChange = () => {
    setIsPasswordChangeOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(
        `${backendApiUrl}/user/changePassword/${user._id}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        alert("Password successfully changed!");
        setIsPasswordChangeOpen(false);
      } else {
        alert("Password change failed: " + response.data.error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  const handlePhotoChange = async (e) => {
    if (e.target.files.length) {
      setSelectedPhoto(e.target.files[0]);
      const base64data = await readImageAsBase64(e.target.files[0]);
      setPhoto(base64data);
      console.log(photo);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await logoutHandler();
        await axios.delete(`${backendApiUrl}/user/${user._id}`);
        alert("Your account has been successfully deleted");
        navigate("/");
      } catch (error) {
        console.error("Error deleting the account:", error);
        alert("Error deleting the account");
      }
    }
  };

  // Funktion zum Setzen des ausgewählten Fotos
  const handleSelectPhoto = (photoUrl) => {
    setSelectedPhoto(photoUrl); // Setze das ausgewählte Foto zurück, falls bereits eines ausgewählt wurde
    setPhoto(photoUrl); // Setze das ausgewählte Foto als Profilbild
    setPhotoUrl(photoUrl);
  };

  return (
    <div>
      <div className="ml-4">
        <BackLink path={`/user/${user.id}`} />
      </div>
    <div className="bg-[#F6F7FB] flex justify-center">
      {hasToken && (
        <section className="max-w-4xl mx-auto my-8 p-2 md:mr-[80px] md:ml-[80px]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:mr-[40px] w-52">
                <img
                  className="w-[50px] h-[50px]border-2 rounded-full border-white shadow-lg"
                  src="https://i.ibb.co/3cS2VGt/id-card.png"
                  alt="id-card"
                  border="0"
                ></img>
                <p className="dm-sans-medium text-[20px] mt-2">User name</p>
              </div>
              <div className="border-[1px] w-full border-[#BCC0C1] rounded-md p-4 bg-white">
                <p className="dm-sans-medium text-[20px]">
                  Change user name
                </p>
                <p className="dm-sans-regular text-[14px]">
                  Your current user name is{" "}
                  <b>
                    {user.firstName} {user.lastName}
                  </b>{" "}
                </p>
                <div className="relative mb-6">
                  <input
                    id="firstName"
                    type="text"
                    name="id-b04"
                    placeholder="your name"
                    className="peer relative h-10 w-[350px] border-b border-slate-200 px-4 text-sm text-black placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <small className="absolute flex w-[350px] justify-between px-4 py-1 text-xs text-gray-600 transition peer-invalid:text-pink-500">
                    <span>New first name</span>
                  </small>
                </div>
                <div className="relative mb-6">
                  <input
                    id="lastName"
                    type="text"
                    name="id-b04"
                    placeholder="your name"
                    className="peer relative h-10 w-[350px] border-b border-slate-200 px-4 text-sm text-black placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <small className="absolute flex w-[350px] justify-between px-4 py-1 text-xs text-gray-600 transition peer-invalid:text-pink-500">
                    <span>New last name</span>
                  </small>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="md:mr-[40px] w-52">
                <img
                  className="w-[50px] h-[50px]border-2 rounded-full border-white shadow-lg"
                  // src="https://i.ibb.co/0jP2nLy/Profile-photo.png"
                  src={photo}
                  alt="Profile-photo"
                  border="0"
                ></img>
                <p className="dm-sans-medium text-[20px] mt-2">Profile photo</p>
              </div>
              <div className="border-[1px] w-full border-[#BCC0C1] rounded-md p-4 bg-white">
                <p className="dm-sans-medium text-[20px]">
                  Choose your profile picture
                </p>
                <div className="flex justify-center gap-[5%] md:gap-[8%] my-6 mx-10">
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/FmNDDsp/bear.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/FmNDDsp/bear.png")}
                  ></img>
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/sJ4275v/lion.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/sJ4275v/lion.png")}
                  ></img>
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/B6MNTqr/shrimp.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/B6MNTqr/shrimp.png")}
                  ></img>
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/grjHS27/crab.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/grjHS27/crab.png")}
                  ></img>
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/Xyf9jmv/frog.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/Xyf9jmv/frog.png")}
                  ></img>
                  <img
                    className="w-[50px] h-[50px] cursor-pointer border-2 rounded-full border-white shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300"
                    src="https://i.ibb.co/L0XJ0t0/sea-lion.png"
                    alt="bear"
                    border="0"
                    onClick={() => handleSelectPhoto("https://i.ibb.co/L0XJ0t0/sea-lion.png")}
                  ></img>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <hr className="flex-grow border border-gray-200 border-t-0"></hr>
                  <span className="dm-sans-regular text-[14px]">or</span>
                  <hr className="flex-grow border border-gray-200 border-t-0"></hr>
                </div>
                <label
                  htmlFor="photo"
                  className="flex items-center justify-center bg-black dm-sans-bold text-[12px] text-white rounded-md cursor-pointer px-4 py-2 max-w-[200px] mx-auto mt-2 hover:bg-white hover:text-black hover:border-black border-2"
                >
                  <input
                    type="file"
                    id="photo"
                    onChange={(e) => handlePhotoChange(e)}
                    className="hidden"
                    accept="image/*"
                  />
                  ADD YOUR OWN PHOTO
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="md:mr-[40px] w-52">
                <img
                  className="w-[50px] h-[50px] border-2 rounded-full border-white shadow-lg"
                  src="https://i.ibb.co/Y7nFH12/compose.png"
                  alt="id-card"
                  border="0"
                ></img>
                <p className="dm-sans-medium text-[20px] mt-2">Art of account</p>
              </div>
              <div className="border-[1px] w-full border-[#BCC0C1] rounded-md bg-white">
                <p className="dm-sans-medium text-[20px] mx-[20px] mt-[10px]">
                  Teacher or student account
                </p>
                <p className="dm-sans-regular text-[14px] mx-[20px]">
                  Select your account type here:
                </p>
                <div className="flex flex-col ml-6 my-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="teacher" className="dm-sans-medium text-[20px]">
                      <input
                        type="radio"
                        id="teacher"
                        name="role"
                        value="teacher"
                        className="mr-2 size-4"
                      />
                      Teacher
                    </label>
                    <label htmlFor="student" className="dm-sans-medium text-[20px]">
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="student"
                        className="mr-2 size-4"
                      />
                      Student
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="md:mr-[40px] w-52">
                <img
                  className="w-[50px] h-[50px] border-2 rounded-full border-white shadow-lg"
                  src="https://i.ibb.co/zxWfcJ6/email.png"
                  alt="id-card"
                  border="0"
                ></img>
                <p className="dm-sans-medium text-[20px] mt-2">Email address</p>
              </div>
              <div className="border-[1px] w-full border-[#BCC0C1] rounded-md p-4 bg-white">
                <p className="dm-sans-medium text-[20px]">
                  Change Email address
                </p>
                <p className="dm-sans-regular text-[14px]">
                  Your current email address is <b>{user.email}</b>{" "}
                </p>
                <div className="relative mb-6 ">
                  <input
                    id="email"
                    type="text"
                    name="id-b03"
                    placeholder="your name"
                    className="peer relative h-10 w-[350px] border-b border-slate-200 px-4 text-sm text-black placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small className="absolute flex w-[350px] justify-between px-4 py-1 text-xs text-gray-600 transition peer-invalid:text-pink-500">
                    <span>New Email address</span>
                  </small>
                </div>
              </div>
            </div>
            <button type="submit" className="ml-auto mb-8 md:mb-0 bg-black text-white px-12 py-3 dm-sans-bold text-[12px] rounded-md mt-4 hover:bg-white hover:border-black border-2 hover:text-black md:ml-52 md:mt-4">
              Save</button>
            {showSuccessAlert && (
              <AlertDismissibleSuccess
                message={message}
                onClose={() => setShowSuccessAlert(false)} // Set showSuccessAlert to false when alert is closed
              />
            )}
          </form>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="md:mr-[40px] w-52">
              <img
                className="w-[50px] h-[50px] border-2 rounded-full border-white shadow-lg"
                src="https://i.ibb.co/nrbHxHF/change-password.png"
                alt="id-card"
                border="0"
              ></img>
              <p className="dm-sans-medium text-[2em] mt-2">Password</p>
            </div>
            <div className="border-[1px] w-full border-[#BCC0C1] rounded-md p-4 bg-white">
              <p className="dm-sans-medium text-[2em]">
                Change password
              </p>
              <div className="mt-4 ">
                {/* <label className="block text-sm font-semibold mb-2" htmlFor="password">Password:</label> */}
                <button className={isPasswordChangeOpen ? 'hidden' : "bg-black text-white px-8 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border-2"} onClick={handleOpenPasswordChange}>Change Passwort</button>
                {isPasswordChangeOpen && (
                  <PasswordChangePopup
                    onClose={handleClosePasswordChange}
                    onPasswordChange={handlePasswordChange}
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                  />
                )}
              </div>

            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="md:mr-[40px] w-52">
              <img
                className="w-[50px] h-[50px] border-2 rounded-full border-white shadow-lg"
                src="https://i.ibb.co/PDnccV0/delete.png"
                alt="id-card"
                border="0"
              ></img>
              <p className="dm-sans-medium text-[2em] mt-2">Delete account</p>
            </div>
            <div className="border-[1px] w-full border-[#BCC0C1] rounded-md p-4 bg-white">
              <p className="dm-sans-medium text-[2em]">
                Delete <b>{user.firstName} {user.lastName}</b> account permanently
              </p>
              <p className="dm-sans-regular text-[1.4em]">
                Think about this very carefully. All your data will be deleted and this cannot be undone.
              </p>
              <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-16 py-3 dm-sans-bold text-[1.2em] rounded-md hover:bg-red-600 mt-4">
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
    </div>
  );
}

export default ProfileSettings;

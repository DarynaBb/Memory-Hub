import React, { useState } from "react";
function PasswordChangePopup({ onClose, onPasswordChange, oldPassword, setOldPassword, newPassword, setNewPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  
  return (
    <div className=" password-change-popup">
      {/* <h2>Passwort ändern</h2> */}
      {/* <input type="password" placeholder="Altes Passwort" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='border-2' />
      <input type="password" placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border-2'/>
      <button onClick={onPasswordChange}className="flex mb-1 mt-1 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Passwort ändern</button>
      <button onClick={onClose}className="  bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Abbrechen</button>
    //////////////////////////// */}
    <div className="relative my-6 mb-[30px] mx-[20px]">
            <input
              id="id-b14"
              type={showPassword ? "text" : "password"}
              // value={state["id-b14"]}
              name="id-b14"
              placeholder="Altes Passwort"
              value={oldPassword}
              className="peer relative h-10 w-[350px] border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label
              htmlFor="id-b14"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-stone-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your current password
            </label>
            {showPassword ? (
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-44 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-2 description-2"
                role="graphics-symbol"
              >
                <title id="title-2">Check mark icon</title>
                <desc id="description-2">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-44 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-2d description-2d"
                role="graphics-symbol"
              >
                <title id="title-2d">Check mark icon</title>
                <desc id="description-2d">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
            <small className="absolute flex w-[350px] justify-between px-4 py-1 text-xs text-black transition peer-invalid:text-pink-500">
              {/* <span>Text field with helper text</span> */}
              {/* <span className="text-slate-500">1/10</span> */}
            </small>
          </div>
          <div className="relative my-6 mb-[30px] mx-[20px]">
            <input
              id="id-b15"
              type={showPassword2 ? "text" : "password"}
              // value={state["id-b14"]}
              value={newPassword}
              name="id-b15"
              placeholder="your name"
              className="peer relative h-10 w-[350px] border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-stone-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label
              htmlFor="id-b15"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-stone-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your new password
            </label>
            {showPassword2 ? (
              <svg
                onClick={() => setShowPassword2(!showPassword2)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-44 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-2 description-2"
                role="graphics-symbol"
              >
                <title id="title-2">Check mark icon</title>
                <desc id="description-2">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setShowPassword2(!showPassword2)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-44 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-2d description-2d"
                role="graphics-symbol"
              >
                <title id="title-2d">Check mark icon</title>
                <desc id="description-2d">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
            <small className="absolute flex w-[350px] justify-between px-4 py-1 text-xs text-black transition peer-invalid:text-pink-500">
              {/* <span>Text field with helper text</span> */}
              {/* <span className="text-slate-500">1/10</span> */}
            </small>
          </div>
          <button onClick={onPasswordChange}className="bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4">Passwort ändern</button>
      <button onClick={onClose}className=" bg-black text-white px-10 py-3 dm-sans-bold text-[1.2em] rounded-md mt-4 mx-4 ">Abbrechen</button>
    </div>
  );
}

export default PasswordChangePopup;

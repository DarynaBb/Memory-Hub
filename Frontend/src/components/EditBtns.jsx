import React from "react";
import axios from "axios";

const EditBtns = (props) => {
 
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const deleteSavedStudySet = async () => {
    try {
        const url = `${backendApiUrl}/${props.userId}/${props.setId}`;
        console.log("Delete URL:", url); 
        await axios.delete(url);
        props.setStudySetDeleted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.log("Error while deleting study set:", error);
    }
};

  return (
    <div>
      <div className='container flex items-center sm:flex-row sm:justify-end flex-col gap-8'>
        <button
          className='flex justify-center items-center bg-white w-[172px] btn-hover-color h-[56px] p-[8px 16px]  text-black text-xs leading-120 uppercase cursor-pointer rounded-[8px] dm-sans-bold  '
          type='button'
          onClick={deleteSavedStudySet}
        >
          delete study set
        </button>
        <button
          className='flex justify-center sm: items-center btn-hover-color create-btn-color w-[172px] h-[56px] p-[8px 16px]  text-black text-xs leading-120 uppercase cursor-pointer rounded-[8px] dm-sans-bold  '
          type='submit'
        >
          SAVE CHANGES
        </button>
      </div>
     
    </div>
  );
}

export default EditBtns;

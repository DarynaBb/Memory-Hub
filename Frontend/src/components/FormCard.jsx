import React from "react";
import trash from "../assets/images/trash.png";
import group from "../assets/images/group.svg";

function Card(props) {


  const addLine = () => {
    const newLines = [...props.lines, props.lines.length + 1];
    props.setLines(newLines);
  };

  const handleRemoveLine = (index) => {
    const newLines = props.lines.filter((line, i) => i !== index);
    props.setLines(newLines);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    props.setLines((prevLines) =>
      prevLines.map((line, i) =>
        i === index ? { ...line, image: URL.createObjectURL(file) } : line
      )
    );
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      {props.lines.map((line, index) => (
       
        <div key={index} className='container flex flex-col border border-solid border-gray-300 rounded-lg bg-white mb-6 '>
          <div className='flex justify-between items-center pt-5 pb-1 border-b-2'>
            <p className='dm-sans-bold text-[20px] pl-10'>{index + 1}</p>
            <img
              src={trash}
              className='pr-10'
              alt='trashcan'
              onClick={() => handleRemoveLine(index)}
            />
          </div>

          <div className='flex md:flex-row flex-col justify-evenly px-10 gap-9 py-5'>
            <div className='border-b-2 basis-2/6'>
              <textarea
              style={{ resize: 'none', overflow: 'auto' }}
                className='w-full h-[100px] custom-scrollbar '
                id={`question${index}`}
                type='text'
                placeholder={`Write your Question*`}
                name={`question${index}`}
              />
            </div>
            <div className='border-b-2 basis-2/6 '>
              <textarea
              style={{ resize: 'none', overflow: 'auto' }}
                className='w-full h-[100px] custom-scrollbar resize-none'
                id={`answer${index}`}
                type='text'
                placeholder={`Write your Answer*`}
                name={`answer${index}`}
              />
             </div>
            <div className='min-w-24 h-16 flex justify-center items-center outline-dashed outline-2 outline-offset-1 mx-auto my-auto'>
              {line.image ? (
                <label htmlFor={`image${index}`} className='cursor-pointer '>
                  <img
                    src={line.image}
                    alt='insert image'
                    className='object-cover min-w-24 h-16'
                  />
                </label>
              ) : (
                <label htmlFor={`image${index}`} className='cursor-pointer'>
                  <img
                    src={group}
                    alt='default image'
                    className='object-cover '
                  />
                </label>
              )}
              <input
                type='file'
                accept='image/*'
                name={`image${index}`}
                onChange={(e) => handleImageChange(e, index)}
                className='hidden'
                id={`image${index}`}
              />
            </div>
          </div>
        </div>
      ))}

      <div
        className='dm-sans-medium flex  hover:underline cursor-pointer py-[40px] '
        onClick={addLine}
      >
        + Add new Card
      </div>
    </div>
  
  );
}

export default Card;

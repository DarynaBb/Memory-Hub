import React, { useState, useEffect } from "react";

export default function AlertDismissibleSuccess({ message, onClose }) {
  const [dismiss, setDismiss] = useState(false);

  // Hide the alert after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDismiss(true);
      onClose(); // Close the alert after dismissing
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <>
      {/*<!-- Component: Dismissible Success Alert --> */}
      <div
        className={`${
          dismiss && "hidden"
        } fixed bottom-4 left-4 right-4 w-full max-w-sm mx-auto rounded border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-500 z-50`}
        role="alert"
      >
        {/*  <!-- Text --> */}
        <p className="text-center">{message}</p>
        {/*  <!-- Close button --> */}
        <button
          aria-label="Close"
          className="absolute top-2 right-2 h-6 w-6 rounded-full px-1 bg-emerald-100 text-emerald-500 hover:bg-emerald-200 focus:bg-emerald-200 focus:outline-none"
          onClick={() => {
            setDismiss(true);
            onClose(); // Close the alert when the close button is clicked
          }}
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/*<!-- End Dismissible Success Alert --> */}
    </>
  );
}

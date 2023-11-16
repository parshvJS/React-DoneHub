import React from 'react';

const LogoutPopup = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black opacity-50" onClick="{onClose}"></div>
  <div className="w-5/2 relative max-w-md rounded-lg bg-white p-6 shadow-lg">
    <div className="mb-2 text-xl font-medium">Are you sure you want to logout ?</div>
    <div className="flex justify-center">
      <div className="mb-10 text-center font-medium">All Data/Changes Saved</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle mt-1.5 ml-2" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
      </svg>
    </div>
    <div className="flex justify-between">
      <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500" onClick={onLogout}>Logout</button>
      <button className="rounded-lg bg-gray-300 px-4 py-2 text-black hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500" onClick={onClose}>Back</button>
    </div>
  </div>
</div>

  );
};

export default LogoutPopup;

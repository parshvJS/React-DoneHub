import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authServiceObj from '../../../appwrite/authService';
import { logout } from '../../../store/authSlice';
import LogoutPopup from './LogoutPopup';

function LogoutBtn() {
  const dispatch = useDispatch()

  // function logoutHandler() {

  //     authServiceObj.logout()
  //         .then(() => {
  //             dispatch(logout())
  //         })
  // }
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleLogout = () => {

    authServiceObj.logout()
      .then(() => {
        dispatch(logout())
      })
    setPopupOpen(false);
  }

  return (
    <>



      <div className="text-center ">
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
          onClick={() => setPopupOpen(true)}>
          Logout
        </button>

        <LogoutPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} onLogout={handleLogout} />
      </div>
    </>
  );
}

export default LogoutBtn;
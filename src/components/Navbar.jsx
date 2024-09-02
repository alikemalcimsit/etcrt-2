import React, { useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { FaUser, FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import glitch from "../assets/giphy2.webp";

export default function Navbar({ cart }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [click, setClick] = useState(false);

  const handleLogout = () => {
    auth.signOut(); // Firebase Authentication'dan çıkış yap
  };

  const handleUserClick = () => {
    setClick(!click);
  };

  const userPageFunc = () => {
    if (user) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${glitch})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className='relative flex text-white items-center justify-between md:px-20 px-1 xl:px-20 mb-12 py-8'>
      <div>
        <Link to="/">
          <h1 className="monoton-regular md:text-3xl text-lg w-full   xl:text-4xl cursor-pointer">FERRANTE & RICCI<span className="md:text-3xl text-lg xl:text-4xl align-top">®</span></h1>
        </Link>
      </div>

     

      <div className='flex items-center justify-center  gap-2 md:gap-4 xl:gap-4'>
        
        <div className='bg-[#A38070] border-2 cursor-pointer flex items-center justify-center rounded-full p-2'>
          <Link to="/sepet">
            <div className='relative z-0'>
              <FaCartShopping className='xl:text-3xl md:text-2xl text-xl' color='white' ></FaCartShopping>
              <span className='text-[12px] text-black z-50 font-bold absolute left-[10px] inset-0'>{cart.length}</span>
            </div>
          </Link>
        </div>
        <div className='relative'>
          <div className='bg-[#A38070] border-2 cursor-pointer flex items-center justify-center rounded-full p-2' onClick={handleUserClick}>
            <FaUser color='white' className='xl:text-3xl md:text-2xl text-xl'></FaUser>
          </div>
          {click && (
            <div className='absolute top-12 right-0 bg-white  text-black rounded-lg z-50 shadow-lg p-2'>
              <button onClick={userPageFunc} className='block w-full text-left px-4 py-2 hover:bg-gray-200'>Siparişlerim</button>
              <button onClick={handleLogout} className='block w-full text-left px-4 py-2 hover:bg-gray-200'>Çıkış Yap</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

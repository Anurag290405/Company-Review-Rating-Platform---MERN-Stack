import React from 'react';

export default function Header(){
  return (
    <header className="bg-white shadow-sm relative w-[1440px] h-[75px] mx-auto">
      {/* Logo and brand name */}
      <div className="flex items-center gap-3 absolute w-[210px] h-[40px] top-[16px] left-[80px]">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">★</div>
        <div className="text-xl font-semibold">Review&RATE</div>
      </div>

      {/* Search bar */}
      <div className="absolute w-[384px] h-[37px] top-[18px] left-[730px]">
        <input 
          placeholder="Search..." 
          className="w-full h-full border border-gray-300 px-3 rounded-[5px]" 
        />
      </div>

      {/* SignUp button */}
      <button className="text-sm absolute w-[60px] h-[26px] top-[26px] left-[1163px]">
        SignUp
      </button>

      {/* Login button */}
      <button className="text-sm absolute w-[45px] h-[26px] top-[26px] left-[1272px]">
        Login
      </button>
    </header>
  );
}

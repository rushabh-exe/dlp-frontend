import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CNavlink({ to, children }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={` ${isActive ? 'text-red-800 bg-slate-200 px-8 py-4 border-2 border-gray-200 rounded-full text-2xl font-bold hover:bg-slate-300 hover:text-red-900 transition duration-300' : 'px-8 py-4 border-2 border-gray-200 rounded-full bg-white text-2xl font-bold text-gray-800 hover:bg-slate-300 hover:text-red-900 transition duration-300'}`}
    >
      {children}
    </Link>
  );
}

export default CNavlink;

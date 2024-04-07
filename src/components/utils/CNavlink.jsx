import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CNavlink({ to, children }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to} className={` ${isActive ? 'text-red-800 bg-slate-200 p-2 border-r-2 border-gray-200' : 'hover:bg-slate-200 p-2 border-r-2 border-gray-200'}`} >
      {children}
    </Link>
  );
}

export default CNavlink;

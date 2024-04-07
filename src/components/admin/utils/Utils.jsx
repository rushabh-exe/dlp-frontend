import React from 'react'
import NavLink from '../../../components/utils/CNavlink'
import { Outlet } from 'react-router-dom'
function Utils() {
  return (
    <div>
      <div className='bg-white flex flex-wrap w-fit'>
        <NavLink to='/admin/utils/Subject'>Subject</NavLink>
        <NavLink to='/admin/utils/Teacher'>Teacher</NavLink>
      </div>
      <Outlet/>
    </div>
  )
}

export default Utils
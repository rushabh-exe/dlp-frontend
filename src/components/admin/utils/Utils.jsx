import React from 'react'
import NavLink from '../../../components/utils/CNavlink'
function Utils() {
  return (
    <div>
      <div className=' flex flex-wrap gap-5 w-fit'>
        <NavLink to='/admin/utils/Subject'>Subject</NavLink>
        <NavLink to='/admin/utils/Teacher'>Teacher</NavLink>
      </div>
    </div>
  )
}

export default Utils
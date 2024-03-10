import React from 'react'

function ClassroomAlloc() {
  return (
    <div className="table mx-auto bg-white shadow-md rounded-lg max-w-4xl w-full overflow-hidden">
      <section className="table_header bg-red-700 text-white  text-xl text-center py-3">
        <h1>Classroom Allocation SY</h1>
      </section>
      <section className="table_body bg-gray-100">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Sr.no.</th>
              <th className="p-2 border border-gray-400">Div</th>
              <th className="p-2 border border-gray-400">Div</th>
              <th className="p-2 border border-gray-400">Classes</th>
              <th className="p-2 border border-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
              <tr className="hover:bg-gray-300 transition-all duration-500">
                <td className="p-2 border border-gray-400">1</td>
                <td className="p-2 border border-gray-400">SyA</td>
                <td className="p-2 border border-gray-400">TyA</td>
                <td className="p-2 border border-gray-400">801,802</td>
                <td className="p-2 border border-gray-400"><button className='bg-red-200 w-full'>send</button></td>
              </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default ClassroomAlloc
import { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherUtils() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhone] = useState('');
  const [type, setType] = useState('');
  const [teachers, setTeachers] = useState([]);


  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/admin/create/vitals/createTeacher', {
        name,
        email,
        phno,
        type
      });
      console.log('Success:', response.data);
      clearInputs();
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (type, email) => {
    try {
      if (type === "Teaching") {
        type = "teachingStaff";
      } else {
        type = "nonteachingStaff";
      }
      console.log(type);
      const response = await axios.delete(`http://localhost:3001/admin/create/vitals/teachers/${type}/${email}`);
      console.log('Deleted:', response.data);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };


  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.Name);
    setEmail(teacher.Email);
    setPhone(teacher.phno);
    setType(teacher.Type);
  };

  const handleSave = async () => {
    try {
      let updatedType = editingTeacher.Type === "Teaching" ? "teachingStaff" : "nonteachingStaff";
      const response = await axios.put(`http://localhost:3001/admin/vitals/teachers/${updatedType}`, {
        teachers: [{
          email: editingTeacher.Email,
          name,
          phno,
          type: editingTeacher.Type // Send the original type value
        }]
      });
      console.log('Updated:', response.data);
      fetchTeachers();
      setEditingTeacher(null);
      clearInputs();
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };
  
  


  const fetchTeachers = async () => {
    try {
      const teachingResponse = await axios.get('http://localhost:3001/admin/create/vitals/teachers/teachingStaff');
      // const nonTeachingResponse = await axios.get('http://localhost:3001/admin/create/vitals/teachers/nonteachingStaff');
      // const nonTeachingResponse=[
      //   {
      //     ID: 1001,
      //     name: "Dummy Non-Teaching Teacher",
      //     email: "dummy@example.com",
      //     phno: "123-456-7890"
      //   }
      // ]
      // Map the response data to match the initial state structure
      const mappedTeachingData = teachingResponse.data.map((teacher) => ({
        ID: teacher.ID,
        Name: teacher.name,
        Email: teacher.email,
        Phone: teacher.phno,
        Type: "Teaching"
      }));

      // const mappedNonTeachingData = nonTeachingResponse.data.map((teacher) => ({
      //   ID: teacher.ID,
      //   Name: teacher.name,
      //   Email: teacher.email,
      //   Phone: teacher.phno,
      //   Type: "Non Teaching"
      // }));
      // Merge teaching and non-teaching staff into a single array
      const allTeachers = [...mappedTeachingData];
      console.log('Response:', allTeachers);
      setTeachers(allTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };



  useEffect(() => {
    fetchTeachers();
  }, []);

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setType('');
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h3 className="text-xl font-bold mb-4">Teacher Data</h3>
        <table className="w-full border-collapse mb-4 bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Edit</th>
              <th className="border p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all duration-500">
                <td className="border text-center p-3">{teacher.ID}</td>
                <td className="border p-3 text-center">
                  {editingTeacher && editingTeacher.ID === teacher.ID ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 rounded border border-gray-300"
                    />
                  ) : teacher.Name}
                </td>
                <td className="border p-3 text-center">
                  {editingTeacher && editingTeacher.ID === teacher.ID ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 rounded border border-gray-300"
                    />
                  ) : teacher.Email}
                </td>
                <td className="border p-3 text-center">
                  {editingTeacher && editingTeacher.ID === teacher.ID ? (
                    <input
                      type="text"
                      value={phno}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2 rounded border border-gray-300"
                    />
                  ) : teacher.Phone}
                </td>
                <td className="border p-3 text-center">
                  {editingTeacher && editingTeacher.ID === teacher.ID ? (
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="p-2 rounded border border-gray-300"
                    >
                      <option value="Teaching">Teaching</option>
                      <option value="Non Teaching">Non Teaching</option>
                    </select>
                  ) : teacher.Type}
                </td>
                <td className="border p-3 text-center">
                  {editingTeacher && editingTeacher.ID === teacher.ID ? (
                    <div>
                      <button onClick={handleSave} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 mr-2">Save</button>
                      <button onClick={() => setEditingTeacher(null)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(teacher)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2">Edit</button>
                  )}
                </td>
                <td className="border p-3 text-center">
                  <button onClick={() => handleDelete(teacher.Type, teacher.Email)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <button onClick={() => setIsAddTeacherOpen(true)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Add New Teacher</button>

      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-2/4 rounded-lg overflow-hidden shadow-xl">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Teacher</h2>
                <button
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    value={phno}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-700">Type:</label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Non Teaching">Non Teaching</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddTeacherOpen(false);
                      clearInputs();
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default TeacherUtils;


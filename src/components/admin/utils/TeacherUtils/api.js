import axios from 'axios';

const apikey = import.meta.env.VITE_API_URL;

export const fetchTeachers = async () => {
  return axios.get(`${apikey}admin/create/vitals/teachers/teachingStaff`);
};

export const createTeacher = async (formData) => {
  return axios.post(`${apikey}admin/create/vitals/createTeacher`, formData);
};

export const deleteTeacher = async (type, email) => {
  return axios.delete(`${apikey}admin/create/vitals/teachers/${type}/${email}`);
};

export const updateTeacher = async (updatedType, formData, email) => {
  return axios.put(`${apikey}admin/vitals/teachers/${updatedType}`, {
    teachers: [{ ...formData, email }]
  });
};

import axios from 'axios';

const apikey = import.meta.env.VITE_API_URL;

export const fetchSubjects = async (year: string) => {
  return axios.get(`${apikey}admin/create/vitals/${year}`);
};

export const addSubject = async (year: string, sem: number, subject: string) => {
  return axios.post(`${apikey}admin/create/vitals/${year}`, { year, sem, subject });
};

export const deleteSubject = async (year: string, subjectName: string) => {
  return axios.delete(`${apikey}admin/create/vitals/${year}/${subjectName}`);
};

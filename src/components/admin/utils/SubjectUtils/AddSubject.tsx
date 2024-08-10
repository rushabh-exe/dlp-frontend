import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SubjectRow from './SubjectRow';

interface AddSubjectProps {
  yearProp: string;
  onError: (message: string) => void;
}

function AddSubject({ yearProp, onError }: AddSubjectProps) {
  const [sem, setSem] = useState<number>(0);
  const [subject, setSubject] = useState<string>('');
  const [subjects, setSubjects] = useState<any[]>([]);
  const apikey = import.meta.env.VITE_API_URL;

  const fetchSubjectData = useCallback(async () => {
    try {
      const response = await axios.get(`${apikey}admin/create/vitals/${yearProp}`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
      onError('Failed to fetch subjects.');
    }
  }, [apikey, yearProp, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apikey}admin/create/vitals/${yearProp}`, { year: yearProp, sem, subject });
      setSubject('');
      fetchSubjectData();
    } catch (error) {
      console.error('Error adding subject:', error);
      onError('Failed to add subject.');
    }
  };

  const handleDelete = async (subjectName: string) => {
    try {
      await axios.delete(`${apikey}admin/create/vitals/${yearProp}/${subjectName}`);
      fetchSubjectData();
    } catch (error) {
      console.error('Error deleting subject:', error);
      onError('Failed to delete subject.');
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, [fetchSubjectData]);

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        {subjects.map((subject, index) => (
          <SubjectRow
            key={index}
            subject={subject}
            onDelete={handleDelete}
          />
        ))}
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring focus:border-red-500 flex-grow"
            placeholder="Enter a new subject"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded-r-full hover:bg-red-600 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;

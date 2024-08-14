import React, { useState } from 'react';
import YearSelection from './YearSelection';
import AddSubject from './AddSubject';

function SubjectUtils() {
  const [year, setYear] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleYearSelect = (selectedYear: string) => {
    setYear(selectedYear);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subject Management</h1>
      {error && <div className='text-red-500 mb-4'>{error}</div>}
      {!year ? (
        <YearSelection onYearSelect={handleYearSelect} />
      ) : (
        <AddSubject yearProp={year} onError={setError} />
      )}
    </div>
  );
}

export default SubjectUtils;
